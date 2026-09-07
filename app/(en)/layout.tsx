import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import RootShell from '@/components/RootShell'
import { metadataFor } from '@/lib/seo'
import '../globals.css'

export const metadata: Metadata = metadataFor('en')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050B18' },
    { media: '(prefers-color-scheme: light)', color: '#F6F9FC' },
  ],
}

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
