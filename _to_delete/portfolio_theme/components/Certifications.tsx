'use client'

import { useState, useMemo } from 'react'
import { Award, BadgeCheck, Cloud, Brain, ClipboardList, Languages } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const CATEGORY_STYLES: Record<string, { icon: typeof Brain; color: string; chip: string }> = {
  'AI & Machine Learning': {
    icon: Brain,
    color: 'from-cyan-400 via-sky-500 to-blue-600',
    chip: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
  },
  'Cloud & DevOps': {
    icon: Cloud,
    color: 'from-sky-400 via-blue-500 to-cyan-600',
    chip: 'bg-sky-500/10 text-sky-300 border-sky-500/30'
  },
  'Delivery & Management': {
    icon: ClipboardList,
    color: 'from-teal-400 via-cyan-500 to-sky-600',
    chip: 'bg-teal-500/10 text-teal-300 border-teal-500/30'
  },
  Languages: {
    icon: Languages,
    color: 'from-blue-400 via-cyan-500 to-teal-600',
    chip: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
  }
}

const FALLBACK_STYLE = {
  icon: Award,
  color: 'from-cyan-400 via-blue-500 to-sky-600',
  chip: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
}

const Certifications = () => {
  const { certifications, interests } = portfolioData
  const [activeFilter, setActiveFilter] = useState('All')

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ triggerOnce: true })

  const categories = useMemo(() => {
    const unique = Array.from(new Set(certifications.map((c) => c.category)))
    return ['All', ...unique]
  }, [certifications])

  const visible = activeFilter === 'All'
    ? certifications
    : certifications.filter((c) => c.category === activeFilter)

  if (certifications.length === 0) return null

  return (
    <SectionBackground variant="secondary" className="section-padding" id="certifications">
      <div className="container-custom px-4 sm:px-6">
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-300 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <BadgeCheck size={18} />
            Certifications
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Credentials &amp; Continuous Learning
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {certifications.length} certifications across AI, generative AI, cloud, and Agile delivery
          </p>
        </div>

        {/* Filters */}
        <div
          className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-10"
          style={animationVariants.fadeInUp(headerVisible, 200)}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 min-h-[40px] transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow scale-105'
                  : 'bg-ink-900/60 text-slate-300 hover:bg-ink-900/70 border border-cyan-500/20'
              }`}
              style={animationVariants.scaleIn(headerVisible, getStaggerDelay(index, 70))}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto"
        >
          {visible.map((cert, index) => {
            const style = CATEGORY_STYLES[cert.category] ?? FALLBACK_STYLE
            const IconComponent = style.icon
            return (
              <div
                key={cert.title}
                className="group relative bg-ink-900/70 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={animationVariants.slideInUp(gridVisible, getStaggerDelay(index, 70))}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${style.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <IconComponent size={22} className="text-white" />
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${style.chip}`}>
                    {cert.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 leading-snug group-hover:text-cyan-300 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400 mb-3">{cert.issuer}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{cert.description}</p>
              </div>
            )
          })}
        </div>

        {/* Areas of Interest */}
        {interests.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
              Areas of Interest
            </h3>
            <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
              Where I&apos;m pushing my work next
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {interests.map((interest, index) => (
                <div
                  key={interest.title}
                  className="bg-gradient-to-br from-cyan-500/10 via-ink-900/60 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/25 hover:border-cyan-400/50 hover:shadow-glow transition-all duration-300"
                  style={animationVariants.fadeInUp(gridVisible, getStaggerDelay(index, 100))}
                >
                  <h4 className="font-bold text-cyan-300 mb-2">{interest.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{interest.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionBackground>
  )
}

export default Certifications
