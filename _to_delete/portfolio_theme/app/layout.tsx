import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abdulaziz Alaqs — AI & Software Engineer',
  description:
    'AI & Software Engineer building LLM-powered products end to end: OpenAI and Gemini integration, prompt engineering, rule-based inference systems, Node.js and Python backends, Next.js and Flutter interfaces.',
  keywords: [
    'AI Engineer',
    'Software Engineer',
    'LLM Integration',
    'OpenAI API',
    'Google Gemini',
    'Prompt Engineering',
    'Machine Learning',
    'Next.js',
    'Node.js',
    'Python',
    'Flutter',
    'Abdulaziz Alaqs'
  ],
  authors: [{ name: 'Abdulaziz Alaqs' }],
  openGraph: {
    title: 'Abdulaziz Alaqs — AI & Software Engineer',
    description:
      'I build software that thinks — LLM-powered products, intelligent apps, and the backends that carry them.',
    type: 'website',
    images: ['/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulaziz Alaqs — AI & Software Engineer',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06B6D4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-ink-950 text-slate-300 antialiased">
        {children}
      </body>
    </html>
  )
}
