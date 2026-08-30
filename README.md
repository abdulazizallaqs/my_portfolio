# Abdulaziz Alaqs — Portfolio

A bilingual (English / Arabic) personal site built with **Next.js 16**, **TypeScript** and
**Tailwind CSS**. Every project has its own page, in both languages, with proper canonical
and `hreflang` tags so search engines index the pair correctly.

---

## URLs

| Page | English | Arabic |
|---|---|---|
| Home | `/` | `/ar` |
| All projects | `/projects` | `/ar/projects` |
| A project | `/projects/math-heroes` | `/ar/projects/math-heroes` |

Project slugs: `tender-management-system`, `student-helper`, `ecommerce-data-pipeline`,
`math-heroes`, `quran-app`.

Short links redirect for convenience — `/math-heroes` → `/projects/math-heroes` (see
`next.config.js`). `/sitemap.xml` and `/robots.txt` are generated automatically.

---

## Running it locally

```bash
npm install
cp .env.example .env.local   # then fill in what you need
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

---

## Environment variables

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | For production | The canonical domain. Sitemap, robots, canonical links, `hreflang` and Open Graph URLs all derive from it. |
| `GEMINI_API_KEY` | Optional | Turns on the AAA assistant. Free key: <https://aistudio.google.com/app/apikey> |
| `GEMINI_MODEL` | Optional | Pins a model. Defaults to `gemini-flash-latest`, which always points at Google's current Flash model. |
| `NEXT_PUBLIC_EMAILJS_*` | Optional | Sends the contact form through EmailJS. Without them the form opens the visitor's mail client instead. |

Nothing here is mandatory for the site to run — every optional feature degrades gracefully.

---

## Where the content lives

All content is data, not markup. To change what the site says, edit these files only:

| File | What it holds |
|---|---|
| `data/personal.ts` | Name, contact details, title, tagline, location — per language |
| `data/projects.ts` | Every project: slug, year, tech, links, screenshots, and the full English + Arabic case study |
| `data/resume.ts` | Summary, expertise, skills, experience, certifications, interests — per language |
| `lib/dictionary.ts` | Every interface string (buttons, headings, labels) in both languages |

### Adding a project

Append an entry to the `projects` array in `data/projects.ts`. Give it a `slug`, then fill in
the `en` and `ar` blocks. TypeScript will tell you if anything is missing — and that is the
whole point: an Arabic translation cannot be forgotten silently.

The page, the card on the home page, the projects index, the sitemap entry and both language
alternates are generated from that one entry.

### Adding screenshots

Put images in `public/projects/<slug>/` and reference them in the project's `images` array with
their real `width` and `height` plus alt text in both languages. WebP at ~1600px wide keeps the
page fast.

---

## How the two languages work

There is no translation library. Two Next.js route groups each own a root layout:

```
app/
  (en)/          → /            /projects        /projects/[slug]
  (ar)/ar/       → /ar          /ar/projects     /ar/projects/[slug]
```

Each layout renders `<html lang dir>` on the server, so Arabic is right-to-left on first
paint — no flash, no client-side swap. `components/I18nProvider.tsx` passes the dictionary
down; client components read it with `useI18n()`.

Layout direction uses logical CSS properties (`ms-`, `me-`, `ps-`, `start-`, `end-`) so a single
set of styles serves both directions. Latin fragments inside Arabic text are wrapped in
`.latin`, which isolates them from the bidirectional algorithm.

The language switcher keeps the visitor on the same page: `/projects/math-heroes` ↔
`/ar/projects/math-heroes`.

---

## The AI assistant (AAA)

`app/api/assistant/route.ts` builds its knowledge base from `data/*.ts` at request time, so the
assistant is always in sync with the site — update a project and it knows about it. It tries a
chain of Gemini models in order and falls back through them; with no API key it returns a clear
message instead of breaking. It answers in whichever language the visitor is browsing in.

---

## Deploying

1. Push the repository to GitHub.
2. Import it at <https://vercel.com/new> — the framework is detected automatically.
3. Add the environment variables above (at minimum `NEXT_PUBLIC_SITE_URL`).
4. Add your domain under **Settings → Domains** and point its DNS at Vercel.

Every push to the default branch then deploys automatically.

---

## Accessibility and performance notes

- Skip-to-content link, labelled landmarks, and `aria-*` on every interactive control.
- All motion is disabled under `prefers-reduced-motion`.
- Scroll reveals have a timeout failsafe, so content is never stuck invisible.
- Screenshots are WebP, sized and lazy-loaded through `next/image`.
- JSON-LD (`Person` on the home page, `CreativeWork` on each project) for rich results.
