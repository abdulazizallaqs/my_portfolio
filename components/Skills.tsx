'use client'

import { useEffect, useState } from 'react'
import { Brain, Code2, Server, Database, Layers, Wrench, type LucideIcon } from 'lucide-react'
import SectionBackground from './SectionBackground'
import { useI18n } from './I18nProvider'
import { skillGroups } from '@/data/resume'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  code: Code2,
  server: Server,
  layers: Layers,
  database: Database,
  wrench: Wrench,
}

export default function Skills() {
  const { t, locale, isRtl } = useI18n()
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()

  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!skillsVisible || !auto) return
    const id = setInterval(() => setCurrent((v) => (v + 1) % skillGroups.length), 6000)
    return () => clearInterval(id)
  }, [skillsVisible, auto])

  const select = (index: number) => {
    setCurrent(index)
    setAuto(false)
  }

  const offset = isRtl ? current * 100 : -current * 100

  return (
    <SectionBackground variant="secondary" className="section-padding" id="skills">
      <div className="container-custom px-4 sm:px-6">
        <div ref={headerRef} className="mb-12 text-center" style={animationVariants.fadeInUp(headerVisible)}>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{t.skills.heading}</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">{t.skills.subheading}</p>
        </div>

        <div
          className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label={t.skills.heading}
        >
          {skillGroups.map((group, index) => (
            <button
              key={group.label.en}
              role="tab"
              aria-selected={current === index}
              onClick={() => select(index)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                current === index
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-ink-900/60 text-slate-300 hover:bg-ink-900/80 hover:text-cyan-300'
              }`}
              style={animationVariants.scaleIn(headerVisible, getStaggerDelay(index, 60))}
            >
              {group.label[locale]}
            </button>
          ))}
        </div>

        <div
          ref={skillsRef}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-ink-900/70 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10"
          style={animationVariants.scaleIn(headerVisible, 200)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {skillGroups.map((group, groupIndex) => (
              <div
                key={group.label.en}
                className="w-full flex-shrink-0 px-1 sm:px-4"
                aria-hidden={current !== groupIndex}
              >
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                  {group.skills.map((skill, index) => (
                    <SkillRing
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={skill.color}
                      icon={icons[group.icon]}
                      active={skillsVisible && current === groupIndex}
                      delay={index * 70}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {skillGroups.map((group, index) => (
            <button
              key={group.label.en}
              onClick={() => select(index)}
              aria-label={group.label[locale]}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === index
                  ? 'w-12 bg-gradient-to-r from-cyan-500 to-blue-500'
                  : 'w-2 bg-ink-800 hover:bg-ink-700'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionBackground>
  )
}

function SkillRing({
  name,
  level,
  color,
  icon: Icon,
  active,
  delay,
}: {
  name: string
  level: number
  color: string
  icon: LucideIcon
  active: boolean
  delay: number
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) {
      setProgress(0)
      return
    }
    const start = setTimeout(() => setProgress(level), delay)
    return () => clearTimeout(start)
  }, [active, level, delay])

  const circumference = 2 * Math.PI * 42
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="group flex flex-col items-center">
      <div className="relative mb-3 h-24 w-24 sm:h-28 sm:w-28">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${name} — ${level}%`}
        >
          <circle cx="50" cy="50" r="42" stroke="rgba(148,163,184,0.18)" strokeWidth="5" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={color}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon size={20} strokeWidth={1.75} style={{ color }} aria-hidden="true" />
          <div className="mt-1 text-sm font-bold text-white sm:text-base">{level}%</div>
        </div>
      </div>
      <h3 className="px-1 text-center text-xs font-semibold text-slate-200 transition-colors duration-300 group-hover:text-cyan-300 sm:text-sm">
        <span className="latin">{name}</span>
      </h3>
    </div>
  )
}
