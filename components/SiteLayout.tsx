import type { ReactNode } from 'react'
import { I18nProvider } from './I18nProvider'
import Navigation from './Navigation'
import Footer from './Footer'
import { getDictionary } from '@/lib/dictionary'
import { dirFor, type Locale } from '@/lib/locales'
import '@/app/globals.css'

/**
 * The single <html> shell used by both locale route groups.
 * `lang` and `dir` are set on the server, so Arabic renders RTL on first paint.
 */
export default function SiteLayout({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const dictionary = getDictionary(locale)

  return (
    <html lang={locale} dir={dirFor(locale)} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06B6D4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-950 font-sans text-slate-300 antialiased">
        <I18nProvider locale={locale} dictionary={dictionary}>
          <a href="#main" className="skip-link">
            {dictionary.nav.skipToContent}
          </a>
          <Navigation />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
