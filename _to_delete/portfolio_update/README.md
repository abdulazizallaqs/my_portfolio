# Abdulaziz Alaqs — AI & Software Engineer Portfolio

A personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Every section
is driven from a single structured data file, so content updates never require touching
component code.

## Sections

- **Hero** — name, role, and a rotating list of specialisations
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
