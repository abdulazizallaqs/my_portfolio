import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetail from '@/components/ProjectDetail'
import { getProject, projects } from '@/data/projects'
import { personalByLocale } from '@/data/personal'
import { buildMetadata, projectSchema } from '@/lib/metadata'

const locale = 'en' as const

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const content = project[locale]
  return buildMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: `${content.title} — ${personalByLocale[locale].name}`,
    description: content.summary,
    images: project.images.length > 0 ? [project.images[0].src] : undefined,
  })
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const content = project[locale]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectSchema({
              locale,
              name: content.title,
              description: content.summary,
              path: `/projects/${project.slug}`,
              keywords: project.tech,
            })
          ),
        }}
      />
      <ProjectDetail project={project} />
    </>
  )
}
