import type { ReactNode } from 'react'
import type { Viewport } from 'next'
import SiteLayout from '@/components/SiteLayout'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06B6D4',
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>
}
