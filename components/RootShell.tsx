import { ReactNode } from 'react'
import { SiteProvider } from '@/lib/site-context'
import { buildJsonLd } from '@/lib/seo'
import type { Lang } from '@/lib/ui'

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong palette. Language is no longer stored — it comes from the URL — so
 * this only has one job now. Kept tiny and dependency-free.
 */
const NO_FLASH = `
(function(){
  try {
    if (localStorage.getItem('aa.theme') === 'light') {
      document.documentElement.classList.add('light');
    }
  } catch (e) {}
})();
`

/**
 * The shared <html> shell. Each language has its own root layout so the served
 * HTML carries the right `lang` and `dir` — a crawler must be able to tell the
 * page's language without running JavaScript.
 */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={lang} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured data, generated from the portfolio JSON so it never drifts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
        />
      </head>
      <body className="font-sans bg-ink-950 text-body antialiased">
        <SiteProvider lang={lang}>{children}</SiteProvider>
      </body>
    </html>
  )
}
