import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { SiteProvider } from '@/lib/site-context'
import { SITE_URL, TITLE, DESCRIPTION, KEYWORDS, buildJsonLd } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Abdulaziz Alaqs',
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: 'Abdulaziz Alaqs', url: SITE_URL }],
  creator: 'Abdulaziz Alaqs',
  publisher: 'Abdulaziz Alaqs',
  applicationName: 'Abdulaziz Alaqs — Software & AI Engineer',
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: { en: '/', ar: '/', 'x-default': '/' },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Abdulaziz Alaqs',
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Abdulaziz Alaqs — Software & AI Engineer. Web apps, internal systems and AI features, built end to end.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050B18' },
    { media: '(prefers-color-scheme: light)', color: '#F6F9FC' },
  ],
}

/**
 * Applies the stored theme and language before first paint so the page never
 * flashes the wrong palette or direction. Kept tiny and dependency-free.
 */
const NO_FLASH = `
(function(){
  try {
    var l = localStorage.getItem('aa.lang') === 'ar' ? 'ar' : 'en';
    var t = localStorage.getItem('aa.theme') === 'light' ? 'light' : 'dark';
    var r = document.documentElement;
    r.lang = l;
    r.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (t === 'light') r.classList.add('light');
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth" suppressHydrationWarning>
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
        {/* Structured data, generated from data/portfolio.json so it never drifts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body className="font-sans bg-ink-950 text-body antialiased">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  )
}
