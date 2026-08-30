'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionBackground from './SectionBackground'
import ProjectCard from './ProjectCard'
import { useI18n } from './I18nProvider'
import { projects } from '@/data/projects'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

export default function Projects() {
  const { t, href } = useI18n()
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  return (
    <SectionBackground variant="tertiary" className="section-padding" id="projects">
      <div className="container-custom px-4 sm:px-6">
        <div ref={headerRef} className="mb-12 text-center" style={animationVariants.fadeInUp(headerVisible)}>
          <h2 className="mb-4 text-4xl font-bold text-white">{t.projects.heading}</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">{t.projects.subheading}</p>
        </div>

        <div ref={gridRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={project.slug} style={animationVariants.slideInUp(gridVisible, getStaggerDelay(index, 110))}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={href('/projects')}
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 px-7 py-3.5 font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/10"
          >
            {t.projects.viewAll}
            <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </SectionBackground>
  )
}
