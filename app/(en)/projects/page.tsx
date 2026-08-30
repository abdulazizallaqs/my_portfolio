import type { Metadata } from 'next'
import ProjectsIndex from '@/components/ProjectsIndex'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary } from '@/lib/dictionary'

const locale = 'en' as const
const t = getDictionary(locale)

export const metadata: Metadata = buildMetadata({
  locale,
  path: '/projects',
  title: t.meta.projectsTitle,
  description: t.meta.projectsDescription,
})

export default function Page() {
  return <ProjectsIndex />
}
