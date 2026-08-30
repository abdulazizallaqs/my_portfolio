import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildMetadata, personSchema } from '@/lib/metadata'
import { getDictionary } from '@/lib/dictionary'

const locale = 'en' as const
const t = getDictionary(locale)

export const metadata: Metadata = buildMetadata({
  locale,
  path: '/',
  title: t.meta.homeTitle,
  description: t.meta.homeDescription,
})

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
      />
      <HomePage />
    </>
  )
}
