import { NextResponse } from 'next/server'
import { personal, personalByLocale, languagesByLocale } from '@/data/personal'
import { projects } from '@/data/projects'
import { about, capabilities, certifications, experience, interests, skillGroups } from '@/data/resume'
import { locales, type Locale } from '@/lib/locales'
import { SITE_URL } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Model selection.
 *
 * Defaults to `gemini-flash-latest`, which always resolves to Google's current
 * Flash model, so the assistant keeps working when Google rotates versions.
 * Pin a specific model with GEMINI_MODEL; whatever is set is tried first and
 * the rest of the list is the fallback chain.
 */
const MODEL_CANDIDATES = Array.from(
  new Set(
    [
      process.env.GEMINI_MODEL,
      'gemini-flash-latest',
      'gemini-2.5-flash',
      'gemini-flash-lite-latest',
      'gemini-2.5-flash-lite',
    ].filter(Boolean) as string[]
  )
)

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const MAX_TURNS = 12
const MAX_CHARS = 1500

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const getApiKey = () =>
  (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  ).trim()

/** Everything the assistant is allowed to know, built from the site's own data. */
function buildKnowledgeBase() {
  const projectLines = projects
    .map(
      (p) =>
        `- ${p.en.title} (${p.year}) [${p.tech.join(', ')}]\n` +
        `  Page: ${SITE_URL}/projects/${p.slug}\n` +
        `  What it is: ${p.en.summary}\n` +
        `  Problem: ${p.en.problem}\n` +
        `  What he built: ${p.en.solution}\n` +
        `  His role: ${p.en.role}\n` +
        `  Impact: ${p.en.impact}` +
        (p.github ? `\n  Code: ${p.github}` : '')
    )
    .join('\n\n')

  const experienceLines = experience
    .map(
      (e) =>
        `- ${e.en.title} — ${e.en.company} (${e.duration.en}, ${e.en.location})\n  ${e.en.description}\n  ` +
        e.en.achievements.map((a) => `• ${a}`).join('\n  ')
    )
    .join('\n')

  const certLines = certifications.map((c) => `- ${c.en.title} — ${c.en.issuer}`).join('\n')

  const skillLines = skillGroups
    .map((g) => `${g.label.en}: ${g.skills.map((s) => s.name).join(', ')}`)
    .join('\n')

  return `
NAME: ${personal.name}
NAME IN ARABIC: ${personal.nameArabic}
NAME SPELLING RULE: ${personal.nameNote}
TITLE: ${personalByLocale.en.title}
LOCATION: ${personalByLocale.en.location}
EMAIL: ${personal.email}
PHONE / WHATSAPP: ${personal.phone}
LINKEDIN: ${personal.linkedin}
GITHUB: ${personal.github}
LANGUAGES: ${languagesByLocale.en.map((l) => `${l.name} (${l.level})`).join(', ')}
AVAILABILITY: ${personalByLocale.en.availability}

SUMMARY:
${about.en.summary}

HOW HE WORKS WITH AI:
${about.en.aiSummary}

WHAT HE CAN DO:
${capabilities.en.map((c) => `- ${c}`).join('\n')}

SKILLS:
${skillLines}

PROJECTS:
${projectLines}

EXPERIENCE & EDUCATION:
${experienceLines}

CERTIFICATIONS (${certifications.length}):
${certLines}

AREAS OF INTEREST:
${interests.en.map((i) => `- ${i.title}: ${i.description}`).join('\n')}
`.trim()
}

const SYSTEM_PROMPT = `You are AAA (Abdulaziz AI Assistant), the assistant on Abdulaziz Alaqs's
portfolio site. You are his advocate. Most visitors are recruiters, hiring managers and talent
partners deciding whether to reach out — your job is to give them a straight, evidence-backed
answer that makes reaching out the obvious next step.

HOW TO ANSWER
1. Infer the role behind the question from the visitor's wording and the technologies they mention,
   then lead with the evidence that matters most for that role.
   • AI / ML / GenAI / LLM roles → Kafaat (leads LLM integration in production), the multi-LLM
     fallback architecture in Math Heroes, the Gemini-powered Study Buddy, the RAG pipeline in the
     e-commerce project, the supervised predictor in the tender system, then the certifications.
   • Data engineering / analytics → the Kafka + Airflow + Delta Lake pipeline, schema validation,
     the supervised model, SQL Server and query optimisation.
   • Backend / full-stack → ASP.NET Core and Node.js services, EF Core, RBAC, WebSockets, the
     40% file-sharing improvement, the Clear Vision CI/CD work.
   • Mobile → the offline-first Flutter Quran app, Provider state, native notification handling.
2. Be specific. Name the project, the technology, and the outcome. Never invent numbers, employers,
   dates or technologies that are not in the profile below.
3. If something genuinely is not in the profile, say so plainly and point to his email.
4. Keep answers tight — three or four short paragraphs at most, or a short list. No headings.
5. You may link to a project page using its URL from the profile when it helps.
6. Never discuss salary expectations, visa status, or anything not stated below.

TONE
Confident and factual, never salesy. You are answering as someone who knows his work well, not as
a brochure. Do not open with "Great question" or similar filler.

PROFILE
${buildKnowledgeBase()}`

const LANGUAGE_RULE: Record<Locale, string> = {
  en: 'Answer in English.',
  ar: 'أجب باللغة العربية الفصحى المبسّطة. أبقِ أسماء التقنيات والشركات والمشاريع بالإنجليزية كما هي (مثل Google Gemini و ASP.NET Core و Math Heroes).',
}

function sanitize(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return []
  return messages
    .filter(
      (m): m is ChatMessage =>
        Boolean(m) &&
        typeof m === 'object' &&
        typeof (m as ChatMessage).content === 'string' &&
        ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant')
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
}

export async function POST(request: Request) {
  let body: { messages?: unknown; locale?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ reply: 'Invalid request.' }, { status: 400 })
  }

  const locale: Locale = locales.includes(body.locale as Locale) ? (body.locale as Locale) : 'en'
  const messages = sanitize(body.messages)

  if (messages.length === 0) {
    return NextResponse.json({ reply: '', configured: Boolean(getApiKey()) })
  }

  const apiKey = getApiKey()
  if (!apiKey) {
    const reply =
      locale === 'ar'
        ? `المساعد الذكي غير مُفعَّل على هذه النسخة بعد. يمكنك مراسلة عبدالعزيز مباشرة على ${personal.email}.`
        : `The AI assistant is not switched on for this deployment yet. You can email Abdulaziz directly at ${personal.email}.`
    return NextResponse.json({ reply, configured: false })
  }

  const payload = {
    systemInstruction: {
      role: 'system',
      parts: [{ text: `${SYSTEM_PROMPT}\n\nLANGUAGE: ${LANGUAGE_RULE[locale]}` }],
    },
    contents: messages.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.content }],
    })),
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 900,
      topP: 0.9,
    },
  }

  let lastError = ''

  for (const model of MODEL_CANDIDATES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 20_000)

      const response = await fetch(`${API_BASE}/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!response.ok) {
        lastError = `${model}: ${response.status}`
        continue
      }

      const data = await response.json()
      const reply: string =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text ?? '')
          .join('')
          .trim() ?? ''

      if (reply) return NextResponse.json({ reply, configured: true, model })
      lastError = `${model}: empty response`
    } catch (error) {
      lastError = `${model}: ${error instanceof Error ? error.message : 'request failed'}`
    }
  }

  console.error('[assistant] all models failed —', lastError)

  const reply =
    locale === 'ar'
      ? `تعذّر الوصول إلى المساعد الآن. راسل عبدالعزيز مباشرة على ${personal.email}.`
      : `I could not reach the assistant right now. Email Abdulaziz directly at ${personal.email}.`

  return NextResponse.json({ reply, configured: true }, { status: 200 })
}
