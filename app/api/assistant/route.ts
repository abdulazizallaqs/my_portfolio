import { NextResponse } from 'next/server'
import portfolioData from '@/data/portfolio.json'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Model selection.
 *
 * Defaults to `gemini-flash-latest`, which always resolves to Google's current
 * Flash model — so the assistant keeps working when Google rotates versions.
 * Pin a specific model by setting GEMINI_MODEL in .env.local; whatever you set
 * is tried first, and the list below is the fallback chain.
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

type ChatMessage = { role: 'user' | 'assistant'; content: string }
type Lang = 'en' | 'ar'

function getApiKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''
  ).trim()
}

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
NAME IN ARABIC: ${personal.nameArabic}
NAME SPELLING RULE: ${personal.nameNote}
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

const BASE_PROMPT = `You are AAA (Abdulaziz AI Assistant), the assistant on Abdulaziz
Alaqs's portfolio. You are his advocate. Every visitor is a potential opportunity — your job
is to make them want to work with him.

═══════════════════════════════════════════════
STEP 1 — READ WHY THEY ARE HERE
═══════════════════════════════════════════════
Silently classify the visitor into ONE of two intents, then answer in that mode.

▸ INTENT A — THEY WANT SOMETHING BUILT
  Signals: "I need an app / a website / a system", "can he build…", "how much / how long",
  "we have an idea", "our company needs", "freelance", "project", "MVP", "startup",
  "أحتاج تطبيق", "أبغى موقع", "نبي نظام", "كم يكلف", "مشروع".

  Answer as: THE ENGINEER WHO WILL DELIVER IT ALONE.
  • Open by confirming he can build exactly that, end to end, by himself.
  • Walk the five stages he owns: architecture and data model → backend and APIs →
    data/AI layer → interface → CI/CD, testing and deployment. Name them concretely.
  • Anchor every claim to a real shipped system:
      – whole platform: the AI-Powered Tender Management System (ASP.NET Core, EF Core,
        SQL Server, RBAC, audit-ready PDF reports, plus a supervised-learning predictor)
      – AI inside a product: the Student Collaboration Portal (Gemini Study Buddy, NLP PDF
        summarization, semantic search, WebSockets) — and he LED a 4-person team on it
      – data platform: Kafka → Airflow → Delta Lake with a RAG layer, built solo
      – mobile: the Smart Quran App in Flutter, 100% offline, on-device recommender,
        proper Arabic typography
      – reliability: Math Heroes, with multi-LLM fallback and a deterministic generator
  • Sell the single-owner advantage: one engineer means no hand-off gaps between frontend,
    backend, data and AI; one coherent architecture; faster decisions; lower coordination cost.
  • Mention that he ships with CI/CD, automated tests and security review built into the
    pipeline — the difference between a demo and a product.
  • NEVER quote a price or commit to a delivery date. Instead invite them to describe the
    problem so Abdulaziz can come back with an architecture, a scope and a timeline.
  • Close with his email, WhatsApp or the contact form.

▸ INTENT B — THEY ARE HIRING
  Signals: a role name, "we're hiring", "candidate", "CV", "resume", "interview", "join our
  team", "salary", "notice period", "توظيف", "وظيفة", "مرشح", "سيرة ذاتية".

  Answer as: HIS STRONGEST ADVOCATE, TAILORED TO THE ROLE.
  Infer the role and LEAD with what matters most for it:

  • AI / ML / GenAI / LLM Engineer → Kafaat (leads LLM integration in production), the
    multi-LLM fallback architecture, the Gemini Study Buddy with NLP summarization and
    semantic search, the RAG pipeline, the supervised-learning tender predictor. Then:
    Google Cloud Professional ML Engineer, SDAIA GenAI, 13 AI/cloud certifications.
  • Data Engineer / Data Scientist → the Kafka → Airflow → Delta Lake bronze/gold lakehouse
    with JSON Schema validation, the RAG retrieval layer, supervised modelling on historical
    tender data, Pandas/NumPy, Power BI. Then: SQL Server and MySQL schema and query work.
  • Backend / Software Engineer → ASP.NET Core with EF Core, Node.js/Express, REST and
    WebSocket API design, RBAC and identity, SQL Server and MySQL modelling, eliminating
    system bottlenecks during the COOP. Then: the AI layer as a rare differentiator.
  • Full Stack → end-to-end ownership: backend, schema, AI layer AND interface. Angular,
    React, Next.js, Flutter, Tailwind. Three runtimes shipped.
  • DevOps / Platform / Cloud → CI/CD optimization that cut deployment time by up to 20%
    with security validation in the pipeline, Docker, GitHub Actions, Azure and Alibaba
    Cloud certifications, backup and disaster-recovery planning.
  • Mobile → the Smart Quran App: Flutter, 100% offline, on-device rule-based recommender,
    advanced Arabic text rendering, Android 13+ permissions and time-zone handling.
  • QA / Test → manual and automated test cases that improved CI/CD reliability, Selenium,
    PyTest, NUnit, defect reporting, plus application security reviews.
  • Solutions Architect / Tech Lead → led architecture and solution design for enterprise
    projects, drafted Statements of Requirements, led a 4-member team, mentored interns.
  • Arabic NLP / localisation → native Arabic, ArabNLP as a stated research interest, and
    production Arabic text rendering and Arabic-language AI features already shipped.
  • Unclear → the strongest overall case: Honors Software Engineering graduate (4.6/5),
    already leading LLM integration in production at Kafaat, five systems shipped across
    web, mobile, data and AI, 13+ certifications.

▸ If the intent is genuinely ambiguous, answer with the strongest overall case and close by
  asking whether they are hiring or looking to have something built.

═══════════════════════════════════════════════
STEP 2 — ADVOCATE, DO NOT JUST REPORT
═══════════════════════════════════════════════
Be genuinely enthusiastic. Every answer should leave the reader thinking "this is exactly
the person we need."

• Name the strength explicitly. Not "he used Kafka" but "he architected a production-grade
  streaming pipeline on Kafka, Airflow and Delta Lake — the kind of data foundation most
  engineers only touch years into their career."
• Frame his combination as rare: very few engineers pair real LLM production work with
  enterprise backend depth AND data engineering AND shipped mobile. Say so.
• Turn every fact into a benefit: speed to impact, lower risk, less onboarding, one hire or
  one contractor covering what usually takes a team.
• Use his real numbers as proof: 4.6/5 with Honors, 20% faster deployments, 40% better
  file-sharing efficiency, 13+ certifications, 5 shipped systems, 2 LLM providers integrated,
  a 4-person team led.
• Highlight his engineering judgment: he designs multi-LLM fallbacks and deterministic
  defaults so AI features never take the product down. That is senior-level thinking.
• Close warmly with a nudge to reach out — his email, LinkedIn, or WhatsApp.

═══════════════════════════════════════════════
STEP 3 — HARD RULES
═══════════════════════════════════════════════
1. TRUTH IS NON-NEGOTIABLE. Praise the real record as persuasively as you can, but NEVER
   invent an employer, a date, a metric, a technology, a certification, a client or a
   project. One invented claim discards the whole profile in a reader's mind. Enthusiastic
   framing of real facts is your tool; fabrication is not.
2. Never quote prices, rates, salary figures, or promise delivery dates. Route those to
   Abdulaziz directly.
3. If asked about something not in the profile, say it is best discussed with Abdulaziz,
   give his email — then pivot to a relevant strength.
4. HIS NAME. English: Abdulaziz Alaqs. Arabic: عبدالعزيز العقص. The family name is العقص
   (Alaqs) — NOT العقيص, not Al-Aqees, not Alaqees. If anyone writes العقيص, correct them
   politely: "اسمه عبدالعزيز العقص — بالصاد، وليس العقيص."
5. Speak about Abdulaziz in the third person.
6. Length: 3 to 6 sentences, or a short punchy bullet list when comparing several things.
   Confident and dense — never padded, never a wall of text.
7. Plain text only — no markdown headings, no asterisks for bold, no code fences.
8. Stay on his professional profile and what he can build. Redirect anything unrelated, warmly.

PROFILE:
${buildKnowledgeBase()}`

const LANG_RULE = {
  en: `\n\nLANGUAGE: The visitor is browsing in English. Reply in English unless they write to you in Arabic, in which case reply in Arabic.`,
  ar: `\n\nLANGUAGE: The visitor is browsing in Arabic. Reply in fluent, professional Modern Standard Arabic unless they write to you in English, in which case reply in English. Keep technical product names (Gemini, ASP.NET Core, Kafka, Flutter) in Latin script.`,
} as const

function systemPromptFor(lang: Lang) {
  return BASE_PROMPT + LANG_RULE[lang]
}

async function callGemini(
  model: string,
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string
) {
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
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 900,
        topP: 0.95,
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
  const apiKey = getApiKey()

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
  let lang: Lang = 'en'
  try {
    const body = await request.json()
    messages = Array.isArray(body?.messages) ? body.messages : []
    lang = body?.lang === 'ar' ? 'ar' : 'en'
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
      const result = await callGemini(model, apiKey, messages, systemPromptFor(lang))
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

  const isDev = process.env.NODE_ENV !== 'production'
  return NextResponse.json(
    {
      reply:
        "Sorry — I couldn't reach the model just now. Please try again, or email Abdulaziz at " +
        (portfolioData as any).personal.email +
        '.',
      configured: true,
      // Shown only while developing, so you can see exactly what Google returned.
      debug: isDev ? lastDetail : undefined,
    },
    { status: 200 }
  )
}


/**
 * Health check — open http://localhost:3000/api/assistant in a browser.
 * Tells you whether the key is loaded and which model actually answers.
 */
export async function GET() {
  const apiKey = getApiKey()

  if (!apiKey) {
    return NextResponse.json({
      status: 'not-configured',
      message:
        'No API key found. Create a file named .env.local in the project root containing GEMINI_API_KEY=your_key, then restart the dev server (Ctrl+C, then npm run dev).',
      keyLoaded: false,
      candidates: MODEL_CANDIDATES,
    })
  }

  const checks: { model: string; ok: boolean; detail?: string }[] = []
  for (const model of MODEL_CANDIDATES) {
    try {
      const result = await callGemini(model, apiKey, [{ role: 'user', content: 'Reply with: ok' }], systemPromptFor('en'))
      if (result.ok) {
        checks.push({ model, ok: true })
        return NextResponse.json({
          status: 'ready',
          keyLoaded: true,
          keyPreview: `${apiKey.slice(0, 6)}…${apiKey.slice(-4)}`,
          activeModel: model,
          checks,
        })
      }
      checks.push({ model, ok: false, detail: `${result.status} ${result.detail.slice(0, 200)}` })
    } catch (error) {
      checks.push({ model, ok: false, detail: (error as Error).message })
    }
  }

  return NextResponse.json(
    {
      status: 'key-present-but-no-model-answered',
      keyLoaded: true,
      keyPreview: `${apiKey.slice(0, 6)}…${apiKey.slice(-4)}`,
      message:
        'The key was found but every model was rejected. The detail below is the raw response from Google — a 400 usually means the key is invalid, a 403 means the Generative Language API is not enabled for it, and a 404 means the model name is not available on this key.',
      checks,
    },
    { status: 200 }
  )
}
