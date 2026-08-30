'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProjectCard from './ProjectCard'
import { useI18n } from './I18nProvider'
import { projects } from '@/data/projects'

export default function ProjectsIndex() {
  const { t, href } = useI18n()

  return (
    <div className="bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950">
      <header className="relative overflow-hidden border-b border-cyan-500/15 pb-12 pt-32">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />
        <div className="container-custom relative z-10">
          <Link
            href={href('/')}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
            {t.projects.backHome}
          </Link>
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
              {t.projects.allHeading}
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
            {t.projects.allSubheading}
          </p>
        </div>
      </header>

      <div className="container-custom py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
