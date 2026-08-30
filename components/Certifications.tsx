'use client'

import { useMemo, useState } from 'react'
import { Award, BadgeCheck, Cloud, Brain, ClipboardList, type LucideIcon } from 'lucide-react'
import SectionBackground from './SectionBackground'
import { useI18n } from './I18nProvider'
import { certCategoryLabels, certifications, interests, type CertCategory } from '@/data/resume'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const styles: Record<CertCategory, { icon: LucideIcon; color: string; chip: string }> = {
  ai: {
    icon: Brain,
    color: 'from-cyan-400 via-sky-500 to-blue-600',
    chip: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  },
  cloud: {
    icon: Cloud,
    color: 'from-sky-400 via-blue-500 to-cyan-600',
    chip: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
  },
  delivery: {
    icon: ClipboardList,
    color: 'from-teal-400 via-cyan-500 to-sky-600',
    chip: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
  },
}

export default function Certifications() {
  const { t, locale } = useI18n()
  const [filter, setFilter] = useState<CertCategory | 'all'>('all')

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation()

  const categories = useMemo(() => {
    const unique = Array.from(new Set(certifications.map((c) => c.category)))
    return ['all', ...unique] as (CertCategory | 'all')[]
  }, [])

  const visible = filter === 'all' ? certifications : certifications.filter((c) => c.category === filter)

  return (
    <SectionBackground variant="secondary" className="section-padding" id="certifications">
      <div className="container-custom px-4 sm:px-6">
        <div ref={headerRef} className="mb-10 text-center" style={animationVariants.fadeInUp(headerVisible)}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 px-6 py-3 text-sm font-medium text-cyan-300">
            <BadgeCheck size={18} aria-hidden="true" />
            {t.certifications.badge}
          </div>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">{t.certifications.heading}</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            <span className="latin">{certifications.length}</span> {t.certifications.subheading}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                filter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow'
                  : 'border border-cyan-500/20 bg-ink-900/60 text-slate-300 hover:bg-ink-900/80'
              }`}
              style={animationVariants.scaleIn(headerVisible, getStaggerDelay(index, 60))}
            >
              {certCategoryLabels[category][locale]}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((cert, index) => {
            const style = styles[cert.category] ?? { ...styles.ai, icon: Award }
            const Icon = style.icon
            const data = cert[locale]
            return (
              <div
                key={data.title}
                className="group flex flex-col rounded-2xl border border-cyan-500/15 bg-ink-900/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                style={animationVariants.slideInUp(gridVisible, getStaggerDelay(index, 55))}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${style.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={22} className="text-white" aria-hidden="true" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.chip}`}>
                    {certCategoryLabels[cert.category][locale]}
                  </span>
                </div>

                <h3 className="mb-1 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-300">
                  {data.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-cyan-400">{data.issuer}</p>
                <p className="text-sm leading-relaxed text-slate-400">{data.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h3 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl">
            {t.certifications.interestsHeading}
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-center text-slate-400">
            {t.certifications.interestsSub}
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {interests[locale].map((interest, index) => (
              <div
                key={interest.title}
                className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 via-ink-900/60 to-blue-500/10 p-6 transition-all duration-300 hover:border-cyan-400/50"
                style={animationVariants.fadeInUp(gridVisible, getStaggerDelay(index, 90))}
              >
                <h4 className="mb-2 font-bold text-cyan-300">{interest.title}</h4>
                <p className="text-sm leading-relaxed text-slate-400">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionBackground>
  )
}
