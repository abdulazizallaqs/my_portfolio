'use client'

import { useState } from 'react'
import { Calendar, MapPin, TrendingUp, Award, Code, Briefcase, ChevronDown } from 'lucide-react'
import SectionBackground from './SectionBackground'
import { useI18n } from './I18nProvider'
import { experience, type ExperienceEntry } from '@/data/resume'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

export default function Experience() {
  const { t } = useI18n()
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation()

  return (
    <SectionBackground variant="quaternary" className="section-padding" id="experience">
      <div className="container-custom px-4 sm:px-6">
        <div ref={headerRef} className="mb-14 text-center" style={animationVariants.fadeInUp(headerVisible)}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-300">
            <Briefcase size={16} aria-hidden="true" />
            {t.experience.badge}
          </div>
          <h2 className="mb-5 text-4xl font-bold sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
              {t.experience.heading}
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400">
            {t.experience.subheading}
          </p>
        </div>

        <div ref={timelineRef} className="mx-auto max-w-3xl">
          <ol className="relative space-y-8 ps-8 sm:ps-10">
            <span
              className="absolute inset-y-0 start-[7px] w-0.5 rounded-full bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-500/20 sm:start-[9px]"
              aria-hidden="true"
            />
            {experience.map((entry, index) => (
              <li
                key={index}
                className="relative"
                style={animationVariants.slideInUp(timelineVisible, getStaggerDelay(index, 150))}
              >
                <span
                  className="absolute -start-8 top-7 flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink-950 bg-gradient-to-r from-cyan-400 to-blue-500 sm:-start-10"
                  aria-hidden="true"
                />
                <TimelineCard entry={entry} defaultOpen={index === 0} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionBackground>
  )
}

function TimelineCard({ entry, defaultOpen }: { entry: ExperienceEntry; defaultOpen: boolean }) {
  const { t, locale } = useI18n()
  const [open, setOpen] = useState(defaultOpen)
  const data = entry[locale]

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-ink-900/75 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" aria-hidden="true" />
        <span className="text-sm font-medium uppercase tracking-wide text-cyan-400">{data.type}</span>
      </div>

      <h3 className="mb-3 text-2xl font-bold leading-tight text-white">{data.title}</h3>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <p className="text-lg font-semibold text-cyan-400">{data.company}</p>
        <div className="flex flex-wrap items-center gap-2 text-slate-400">
          <span className="flex items-center gap-1.5 rounded-full bg-ink-800 px-3 py-1">
            <Calendar size={14} aria-hidden="true" />
            <span className="text-sm font-medium">{entry.duration[locale]}</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-ink-800 px-3 py-1">
            <MapPin size={14} aria-hidden="true" />
            <span className="text-sm font-medium">{data.location}</span>
          </span>
        </div>
      </div>

      <p className="mb-5 leading-relaxed text-slate-300">{data.description}</p>

      <div className="mb-4 flex flex-wrap items-center gap-5 text-sm text-slate-400">
        <span className="flex items-center gap-2">
          <Award size={16} className="text-amber-400" aria-hidden="true" />
          {data.achievements.length} {t.experience.achievementsCount}
        </span>
        <span className="flex items-center gap-2">
          <Code size={16} className="text-blue-400" aria-hidden="true" />
          {entry.technologies.length} {t.experience.technologiesCount}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
      >
        {open ? t.experience.collapse : t.experience.expand}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="mt-6 animate-fade-up space-y-6">
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-teal-500">
                <TrendingUp size={13} className="text-white" aria-hidden="true" />
              </span>
              {t.experience.achievements}
            </h4>
            <ul className="space-y-3">
              {data.achievements.map((achievement) => (
                <li key={achievement} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-teal-400 to-teal-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-slate-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-cyan-500">
                <Code size={13} className="text-white" aria-hidden="true" />
              </span>
              {t.experience.technologies}
            </h4>
            <div className="flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-3 py-1.5 text-sm font-medium text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
