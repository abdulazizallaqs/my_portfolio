import { NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Model selection.
 *
 * Set GEMINI_MODEL in .env.local to pin a specific model. Whatever you set is
 * tried first; if it is unavailable on your key the route falls through the
 * list below so the assistant keeps working when Google retires a model.
 *
 * Note: gemini-1.5-flash has been retired by Google and is no longer served by
 * the Gemini API — it is kept last purely as a legacy fallback.
 */
const MODEL_CANDIDATES = Array.from(
  new Set(
    [
      process.env.GEMINI_MODEL,
      'gemini-2.5-flash',
      'gemini-3.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-1.5-flash',
    ].filter(Boolean) as string[]
  )
)

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function buildKnowledgeBase() {
  const { personal, about, skills, projects, experience, certifications, interests, languages } =
    portfolioData as any

  const projectLines = projects
    .map(
      (p: any) =>
        `- ${p.title} [${p.tech.join(', ')}]\n  What it is: ${p.description}\n  Impact: ${p.impact}${
          p.github ? `\n  Code: ${p.github}` : ''
        }`
    )
    .join('\n')

  const experienceLines = experience
    .map(
      (e: any) =>
        `- ${e.title} — ${e.company} (${e.duration}, ${e.location})\n  ${e.description}\n  ${e.achievements
          .map((a: string) => `• ${a}`)
          .join('\n  ')}`
    )
    .join('\n')

  const certLines = certifications
    .map((c: any) => `- ${c.title} — ${c.issuer} (${c.category})`)
    .join('\n')

  return `
NAME: ${personal.name}
TITLE: ${personal.title}
LOCATION: ${personal.location}
EMAIL: ${personal.email}
PHONE / WHATSAPP: ${personal.phone}
LINKEDIN: ${personal.linkedin}
GITHUB: ${personal.github}
LANGUAGES: ${languages.map((l: any) => `${l.name} (${l.level})`).join(', ')}

SUMMARY:
${about.description}

AI & MACHINE LEARNING SKILLS: ${skills.ai_ml.join(', ')}
PROGRAMMING & FRAMEWORKS: ${skills.programming.join(', ')}
DATA, TOOLS & PLATFORMS: ${skills.tools.join(', ')}
ENGINEERING PRACTICE: ${skills.automation.join(', ')}

PROJECTS:
${projectLines}

EXPERIENCE & EDUCATION:
${experienceLines}

CERTIFICATIONS (${certifications.length}):
${certLines}

AREAS OF INTEREST:
${interests.map((i: any) => `- ${i.title}: ${i.description}`).join('\n')}
`.trim()
}

const SYSTEM_PROMPT = `You are the AI assistant on Abdulaziz Alaqs's portfolio website.

Your job is to answer questions from visitors — recruiters, hiring managers, engineers,
and potential collaborators — about Abdulaziz's background, skills, projects, experience,
and how to reach him.

RULES:
1. Answer ONLY from the profile below. If something is not in it, say you don't have that
   detail and suggest contacting Abdulaziz directly at ${(portfolioData as any).personal.email}.
2. Never invent employers, dates, metrics, technologies, or certifications.
3. Be concise — usually 2 to 4 sentences. Use a short bullet list only when the visitor asks
   for several items (projects, skills, certifications).
4. Speak about Abdulaziz in the third person, in a warm and professional tone.
5. Reply in the same language the visitor writes in. If they write Arabic, answer in Arabic.
6. Stay on topic: Abdulaziz's professional profile as a Software & AI Engineer. If asked about
   something unrelated, politely redirect to what you can help with.
7. Plain text only — no markdown headings, no bold markers, no code fences.

PROFILE:
${buildKnowledgeBase()}`

async function callGemini(model: string, apiKey: string, messages: ChatMessage[]) {
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(`${API_BASE}/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 600,
        topP: 0.9,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      ],
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return { ok: false as const, status: res.status, detail }
  }

  const data = await res.json()
  const text: string =
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') ?? ''

  return { ok: true as const, text: text.trim() }
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "The assistant isn't connected yet — add a GEMINI_API_KEY to .env.local and restart the dev server. In the meantime, everything it would tell you is on this page, and you can reach Abdulaziz at " +
          (portfolioData as any).personal.email +
          '.',
        configured: false,
      },
      { status: 200 }
    )
  }

  let messages: ChatMessage[] = []
  try {
    const body = await request.json()
    messages = Array.isArray(body?.messages) ? body.messages : []
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  messages = messages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim())
    .slice(-12)
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content.slice(0, 2000),
    }))

  if (messages.length === 0) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 })
  }

  let lastDetail = ''
  for (const model of MODEL_CANDIDATES) {
    try {
      const result = await callGemini(model, apiKey, messages)
      if (result.ok && result.text) {
        return NextResponse.json({ reply: result.text, model, configured: true })
      }
      if (result.ok) {
        lastDetail = 'Empty response from ' + model
        continue
      }
      // 404 / 400 usually means the model is not available on this key — try the next one.
      lastDetail = `${model}: ${result.status} ${result.detail.slice(0, 300)}`
      if (result.status === 401 || result.status === 403) break
    } catch (error) {
      lastDetail = `${model}: ${(error as Error).message}`
    }
  }

  console.error('[assistant] all models failed —', lastDetail)
  return NextResponse.json(
    {
      reply:
        "Sorry — I couldn't reach the model just now. Please try again, or email Abdulaziz at " +
        (portfolioData as any).personal.email +
        '.',
      configured: true,
    },
    { status: 200 }
  )
}
