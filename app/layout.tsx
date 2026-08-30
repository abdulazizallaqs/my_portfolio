import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import { SiteProvider } from '@/lib/site-context'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://abdulaziz-alaqs.vercel.app'),
  title: 'Abdulaziz Alaqs — Software & AI Engineer',
  description:
    'Software & AI Engineer who designs, builds and ships whole systems: architecture, backends, data pipelines, LLM integration and the interface on top. Gemini & OpenAI, ASP.NET Core, Node.js, Flutter.',
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'LLM Integration',
    'OpenAI API',
    'Google Gemini',
    'RAG Pipelines',
    'Machine Learning',
    'Next.js',
    'Node.js',
    'ASP.NET Core',
    'Python',
    'Flutter',
    'Riyadh',
    'Saudi Arabia',
    'Abdulaziz Alaqs',
    'عبدالعزيز العقص',
    'مهندس ذكاء اصطناعي',
  ],
  authors: [{ name: 'Abdulaziz Alaqs' }],
  alternates: {
    languages: { en: '/', ar: '/' },
  },
  openGraph: {
    title: 'Abdulaziz Alaqs — Software & AI Engineer',
    description:
      'I design and ship whole systems — architecture, data, the AI layer, and the interface on top.',
    type: 'website',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulaziz Alaqs — Software & AI Engineer',
    images: ['/og-image.svg'],
  },
  robots: { index: true, follow: true },
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
      </head>
      <body className="font-sans bg-ink-950 text-body antialiased">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  )
}
