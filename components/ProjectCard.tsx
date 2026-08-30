'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Star } from 'lucide-react'
import { useI18n } from './I18nProvider'
import type { Project } from '@/data/projects'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t, locale, href } = useI18n()
  const content = project[locale]
  const cover = project.images[0]
  const url = href(`/projects/${project.slug}`)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-ink-900/70 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-glow">
      <div className={`relative h-44 bg-gradient-to-br ${project.accent} overflow-hidden`}>
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt[locale]}
            width={cover.width}
            height={cover.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 ${
              cover.height > cover.width ? 'object-center' : 'object-top'
            }`}
            priority={index < 2}
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

        {project.featured && (
          <span className="absolute top-3 start-3 inline-flex items-center gap-1 rounded-full bg-ink-950/70 px-2.5 py-1 text-xs font-medium text-amber-300 backdrop-blur">
            <Star size={12} fill="currentColor" aria-hidden="true" />
            {t.projects.status[project.status]}
          </span>
        )}
        <span className="absolute top-3 end-3 rounded-full bg-ink-950/70 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur">
          <span className="latin">{project.year}</span>
        </span>

        <h3 className="absolute bottom-3 start-4 end-4 text-lg font-bold text-white drop-shadow sm:text-xl">
          {content.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-400">{content.summary}</p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-500/15 px-2.5 py-1 text-[11px] font-medium text-blue-200"
            >
              <span className="latin">{tech}</span>
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-full bg-ink-800 px-2.5 py-1 text-[11px] font-medium text-slate-400">
              <span className="latin">+{project.tech.length - 4}</span>
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-cyan-500/10 pt-4">
          <Link
            href={url}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          >
            {/* Stretched link: the whole card is clickable, nested links stay on top */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            <span className="relative z-10">{t.projects.readCase}</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 rounded-lg p-2 text-slate-400 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
              aria-label={`${content.title} — ${t.projects.code}`}
            >
              <Github size={18} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
