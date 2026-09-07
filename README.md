# Abdulaziz Alaqs — AI & Software Engineer Portfolio

A personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Every section
is driven from a single structured data file, so content updates never require touching
component code.

## Sections

- **Hero** — name, role, and a rotating list of specialisations
- **Ask My AI Assistant** — AAA, a chat assistant that answers questions about my work
- **Background** — programming journey and AI engineering capabilities (three tabs: Background / AI Engineering / How I Build)
- **What I Build** — the end-to-end delivery pipeline I run alone, with proof per stage, plus what someone can commission
- **Skills** — six rotating categories, AI-first
- **Projects** — flip cards with problem, impact, tech stack, and links
- **Experience** — animated timeline
- **Certifications** — filterable by category
- **Contact** — form (EmailJS or mailto fallback) plus direct links

## Language and theme

The site ships bilingual (English / Arabic) and in two themes (dark by default, light optional).

**Language is a URL, not a setting.** `/` is English and `/ar` is Arabic, each fully rendered
on the server. This is not cosmetic: a language that only exists behind a client-side toggle
has no URL, so a search engine can never index it — it crawls whatever the server sends and
does not click buttons or read `localStorage`. Before the split, the served HTML contained
**4 Arabic words**; now the Arabic page contains over **2,100**.

The two languages sit under separate root layouts (`app/(en)` and `app/(ar)`, route groups, so
they do not appear in the URL) because each needs its own `<html lang>` and `dir` in the served
markup. Switching language is a real navigation, and the switch in the nav bar is an `<a>`, not
a button — that link is how a crawler discovers the other version.

**Theme** is still a stored per-visitor preference (`aa.theme` in `localStorage`), applied by
an inline script in `components/RootShell.tsx` before first paint so there is no flash. It
survives the language switch.

`lib/site-context.tsx` is the single source of truth. The provider is *told* which language
it is rendering by the route that mounts it. `useSite()` returns:

| Value | What it is |
|---|---|
| `lang` / `dir` / `isRTL` | `'en' \| 'ar'`, and the matching document direction |
| `t` | UI copy for the active language, from `lib/ui.ts` |
| `data` | `data/portfolio.json` or `data/portfolio.ar.json` |
| `theme` | `'dark' \| 'light'` |
| `otherLangHref` | This page's URL in the other language |
| `toggleLang` / `setTheme` / `toggleTheme` | Switches |

**Adding or changing copy:** English is the schema of record. Edit `data/portfolio.json`
and `lib/ui.ts` (the `ui.en` object), then mirror the same keys in `data/portfolio.ar.json`
and `ui.ar`. Both objects are typed, so a missing key is a build error rather than a blank
spot on the page.

**RTL** is handled with Tailwind logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`,
`start-*`) and the `rtl:` variant — not with mirrored stylesheets. When adding markup, reach
for the logical property rather than `ml-*` / `left-*` and Arabic works for free.

### Theming tokens

Colours are CSS custom properties in `app/globals.css`, exposed to Tailwind through
`rgb(var(--x) / <alpha-value>)` in `tailwind.config.js`. Adding `.light` to `<html>` swaps
the token block and the whole site follows — no component carries a `dark:` variant.

| Token group | Use |
|---|---|
| `--ink-950 … --ink-700` | Surfaces: page, cards, gradients, inputs, borders |
| `--fg`, `--fg-body`, `--fg-muted`, `--fg-subtle`, `--fg-faint` | Text ramp, every step ≥ 4.5:1 contrast in both themes |
| `--hg-1..3`, `--br-1..3` | Gradient stops for the `.heading-gradient` and `.brand-gradient` utilities |
| `pure` / `carbon` | Literal white / near-black, for text sitting on an accent fill in both themes |

In Tailwind these read as `bg-ink-900`, `text-fg`, `text-muted`, and so on. Use the
`.heading-gradient` utility for gradient headings instead of a `from-… bg-clip-text` chain,
so light mode is handled automatically.

## Editing content

Almost everything lives in **`data/portfolio.json`**:

| Key | What it controls |
|---|---|
| `personal` | Name, title, tagline, email, LinkedIn, GitHub, location |
| `about.description` | The main Background paragraph |
| `skills` | Skill groups used across the site |
| `projects` | Project cards (leave `demo` as `""` to hide the demo button) |
| `experience` | Timeline entries |

Section-specific copy that isn't in the JSON — the Background tabs, expertise cards,
and the skill rings — lives in `components/About.tsx` and `components/Skills.tsx`.

### Add your photo

The hero and profile card currently show your initials on a gradient. To use a real photo:

1. Drop the image in `public/` (e.g. `public/profile.jpg`)
2. In `components/Hero.tsx`, replace the `<span>{initials}</span>` block with an `<img src="/profile.jpg" ... />`
3. Do the same in the profile card in `components/About.tsx`

### The AI Assistant

The "Ask My AI Assistant" section is a chat backed by the Google Gemini API. The route at
`app/api/assistant/route.ts` builds a system prompt from `data/portfolio.json`, so the
assistant automatically stays in sync with the rest of the site — update the JSON and the
assistant knows the new content.

**Setup:**

1. Get a free API key at https://aistudio.google.com/app/apikey
2. Create a `.env.local` file in the project root:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Restart the dev server.

Without a key the chat still renders and replies with a short "not connected yet" message,
so the site never looks broken.

**Not working? Check it in one step.** With the dev server running, open:

```
http://localhost:3000/api/assistant
```

That health check tells you exactly what is wrong:

| Response `status` | Meaning | Fix |
|---|---|---|
| `not-configured` | The key was never loaded | Put `GEMINI_API_KEY=...` in `.env.local` (project root, same folder as `package.json`) and **restart** the dev server |
| `key-present-but-no-model-answered` | Key found, Google rejected it | `400` = key is invalid, `403` = the Generative Language API isn't enabled for that key, `404` = model unavailable on your key |
| `ready` | Working — `activeModel` names the model in use | — |

Two things trip people up most often: the file must be named exactly `.env.local`
(not `env.local` or `.env.local.txt`), and Next.js only reads it at startup — you have to
stop the server with Ctrl+C and run `npm run dev` again.

**Model:** defaults to `gemini-2.5-flash`. Google has retired `gemini-1.5-flash`, so it is
no longer served by the API. To pin a different model, set `GEMINI_MODEL` in `.env.local`;
the route falls through a list of candidates if the requested model is unavailable on your
key, so the chat keeps working when Google rotates models.

**Why it feels fast.** Three things, all in `app/api/assistant/route.ts`:

1. **It streams.** The route calls `streamGenerateContent`, unwraps Google's SSE frames and
   pipes plain text straight to the browser, which appends it to the bubble as it lands. The
   first words show up in a couple of hundred milliseconds instead of after the whole answer
   is generated.
2. **Thinking is off.** Gemini 2.5 Flash runs a reasoning pass by default that adds seconds
   and buys nothing for a five-sentence answer, so the route sends
   `generationConfig.thinkingConfig.thinkingBudget = 0`. A model that rejects the field is
   retried once without it, so this can never break the chat.
3. **A tighter budget.** `maxOutputTokens` is 500 and only the last 10 turns are sent.

Set `GEMINI_API_BASE` to point the route at a local mock instead of Google — that is how the
streaming path is tested without spending a real key.

**Deploying to Vercel:** add `GEMINI_API_KEY` under Project Settings → Environment Variables.

## SEO

The site has to be found by two very different searches: someone typing a job title, and
someone typing "مبرمج مواقع" or "build me a web app". Both sets of terms are covered.

- `lib/seo.ts` is the single source: title, description, keywords, and the JSON-LD graph —
  all of it per-language. The structured data is **generated from the portfolio JSON**, so
  updating a project or a certification updates what search engines see; they cannot drift.
- Keywords are **not** shared between the two pages. Someone searching in Arabic types
  different words than someone searching in English, and mixing both sets into one page
  dilutes both. Each page carries only its own language's terms.
- Both pages declare `canonical` and a full set of `hreflang` alternates, so Google knows they
  are the same content in two languages rather than duplicates competing with each other.
- The graph publishes a `Person`, a `ProfessionalService` with an offer catalogue of what he
  builds, a `WebSite`, and one `SoftwareApplication` per live project.
- The `<h1>` types itself in on screen, so it also carries a screen-reader-only copy of the
  real heading — otherwise crawlers that do not run JavaScript would see an empty `<h1>`,
  which is the single most valuable tag on the page.
- `public/og-image.png` is a real 1200×630 PNG (SVG social cards do not render on most
  platforms). Regenerate it by editing the HTML in the git history and re-screenshotting.
- `public/robots.txt` and `public/sitemap.xml` carry the live domain and `hreflang`
  alternates for both languages.

After deploying, submit the sitemap once in Google Search Console — that is what actually
gets the site crawled quickly.

### Before deploying

- Update the domain in `lib/seo.ts`, `public/robots.txt` and `public/sitemap.xml` if it changes
- Add your real LinkedIn URL in `data/portfolio.json` if it differs
- Optionally configure EmailJS (see `EMAILJS_SETUP.md`); without it the contact form falls back to a `mailto:` link

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploying

Push to GitHub and import the repository on [Vercel](https://vercel.com) — no configuration needed.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · lucide-react · EmailJS · Google Gemini

## Contact

- Email: abdulazizallaqs@gmail.com
- GitHub: https://github.com/abdulazizallaqs

---

Originally forked from a portfolio template by [@eshfaq-ux](https://github.com/eshfaq-ux); all content, structure, and copy have been rewritten.
