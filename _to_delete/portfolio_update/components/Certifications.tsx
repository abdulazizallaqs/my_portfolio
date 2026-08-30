'use client'

import { useState, useMemo } from 'react'
import { Award, BadgeCheck, Cloud, Brain, ClipboardList, Languages } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const CATEGORY_STYLES: Record<string, { icon: typeof Brain; color: string; chip: string }> = {
  'AI & Machine Learning': {
    icon: Brain,
    color: 'from-violet-500 via-purple-500 to-fuchsia-600',
    chip: 'bg-violet-50 text-violet-700 border-violet-200'
  },
  'Cloud & DevOps': {
    icon: Cloud,
    color: 'from-cyan-500 via-teal-500 to-blue-600',
    chip: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  'Delivery & Management': {
    icon: ClipboardList,
    color: 'from-orange-500 via-amber-500 to-red-600',
    chip: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  Languages: {
    icon: Languages,
    color: 'from-emerald-500 via-green-500 to-teal-600',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
}

const FALLBACK_STYLE = {
  icon: Award,
  color: 'from-indigo-500 via-blue-500 to-purple-600',
  chip: 'bg-indigo-50 text-indigo-700 border-indigo-200'
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <BadgeCheck size={18} />
            Certifications
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Credentials &amp; Continuous Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
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
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
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

                <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug group-hover:text-indigo-700 transition-colors duration-300">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-indigo-600 mb-3">{cert.issuer}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
              </div>
            )
          })}
        </div>

        {/* Areas of Interest */}
        {interests.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
              Areas of Interest
            </h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Where I&apos;m pushing my work next
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {interests.map((interest, index) => (
                <div
                  key={interest.title}
                  className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-6 border border-indigo-100 hover:shadow-lg transition-all duration-300"
                  style={animationVariants.fadeInUp(gridVisible, getStaggerDelay(index, 100))}
                >
                  <h4 className="font-bold text-indigo-900 mb-2">{interest.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{interest.description}</p>
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
