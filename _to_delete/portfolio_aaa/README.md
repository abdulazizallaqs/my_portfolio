# Abdulaziz Alaqs — AI & Software Engineer Portfolio

A personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Every section
is driven from a single structured data file, so content updates never require touching
component code.

## Sections

- **Hero** — name, role, and a rotating list of specialisations
- **Ask My AI Assistant** — a Gemini-powered chat that answers questions about my work
- **Background** — programming journey and AI engineering capabilities (three tabs: Background / AI Engineering / How I Build)
- **Skills** — six rotating categories, AI-first
- **Projects** — flip cards with problem, impact, tech stack, and links
- **Experience** — animated timeline
- **Contact** — form (EmailJS or mailto fallback) plus direct links

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

**Deploying to Vercel:** add `GEMINI_API_KEY` under Project Settings → Environment Variables.

### Before deploying

- Update the domain in `public/robots.txt` and `public/sitemap.xml`
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

Next.js 16 · React 19 · TypeScript · Tailwind CSS · lucide-react · EmailJS

## Contact

- Email: abdulazizallaqs@gmail.com
- GitHub: https://github.com/abdulazizallaqs

---

Originally forked from a portfolio template by [@eshfaq-ux](https://github.com/eshfaq-ux); all content, structure, and copy have been rewritten.
