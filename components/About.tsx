'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Brain,
  Cpu,
  Code2,
  Database,
  Workflow,
  ShieldCheck,
  Users,
  ArrowRight,
  CheckCircle,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import { useI18n } from './I18nProvider'
import { personal, personalByLocale } from '@/data/personal'
import { about, approach, capabilities, expertise, journey, stats } from '@/data/resume'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const icons: Record<string, LucideIcon> = {
  brain: Brain,
  cpu: Cpu,
  workflow: Workflow,
  code: Code2,
  database: Database,
  shield: ShieldCheck,
}

export default function About() {
  const { t, locale } = useI18n()
  const p = personalByLocale[locale]
  const [activeTab, setActiveTab] = useState<'background' | 'ai' | 'approach'>('background')

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: expertiseRef, isVisible: expertiseVisible } = useScrollAnimation()

  const tabs = [
    { id: 'background', label: t.about.tabs.background },
    { id: 'ai', label: t.about.tabs.ai },
    { id: 'approach', label: t.about.tabs.approach },
  ] as const

  const statusCards = [
    {
      icon: '🚀',
      title: t.about.cards.availability,
      subtitle: p.availability,
      detail: t.about.cards.availabilityDetail,
      color: 'from-teal-500/10 to-teal-500/10 border-teal-500/30 text-teal-100',
    },
    {
      icon: '🧠',
      title: t.about.cards.focus,
      subtitle: t.about.cards.focusValue,
      detail: t.about.cards.focusDetail,
      color: 'from-blue-500/10 to-sky-500/10 border-blue-500/30 text-blue-100',
    },
    {
      icon: '🛠️',
      title: t.about.cards.stack,
      subtitle: t.about.cards.stackValue,
      detail: t.about.cards.stackDetail,
      color: 'from-blue-500/10 to-cyan-500/10 border-cyan-500/30 text-cyan-100',
    },
    {
      icon: '🎓',
      title: t.about.cards.education,
      subtitle: t.about.cards.educationValue,
      detail: t.about.cards.educationDetail,
      color: 'from-sky-500/10 to-sky-500/10 border-sky-500/30 text-sky-100',
    },
  ]

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" aria-hidden="true" />
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={headerRef} className="mb-14 text-center" style={animationVariants.fadeInUp(headerVisible)}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 px-6 py-3 text-sm font-medium text-cyan-300">
              <Users size={18} aria-hidden="true" />
              {t.about.badge}
            </div>
            <h2 className="mb-5 text-4xl font-bold sm:text-5xl">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
                {t.about.heading}
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-400 sm:text-xl">
              {t.about.subheading}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
              {stats[locale].map((stat) => (
                <div key={stat.label} className="group text-center">
                  <div
                    className={`bg-gradient-to-r text-3xl font-bold sm:text-4xl ${stat.gradient} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110`}
                  >
                    {stat.value}
                  </div>
                  <div className="mx-auto max-w-[11rem] text-sm font-medium text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={contentRef} className="mb-16 grid gap-12 lg:grid-cols-2">
            {/* Left: tabs */}
            <div className="space-y-8" style={animationVariants.fadeInLeft(contentVisible, 150)}>
              <div
                className="flex flex-wrap gap-2 rounded-2xl border border-cyan-500/15 bg-ink-800/70 p-2"
                role="tablist"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-w-0 flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                        : 'text-slate-400 hover:bg-ink-900/60 hover:text-cyan-400'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="min-h-[22rem]">
                {activeTab === 'background' && (
                  <div className="animate-fade-up space-y-6">
                    <p className="text-lg leading-relaxed text-slate-300">{about[locale].summary}</p>
                    <div className="space-y-4 pt-1">
                      {journey[locale].map((step) => (
                        <div
                          key={step.title}
                          className="flex gap-4 rounded-xl border border-cyan-500/15 bg-ink-900/60 p-4 transition-all duration-300 hover:border-cyan-400/30"
                        >
                          <div className="pt-1 text-2xl leading-none" aria-hidden="true">
                            {step.icon}
                          </div>
                          <div>
                            <h3 className="mb-1 text-base font-semibold text-white">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-400">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="animate-fade-up space-y-6">
                    <p className="leading-relaxed text-slate-300">{about[locale].aiSummary}</p>
                    <div className="grid gap-3">
                      {capabilities[locale].map((capability) => (
                        <div key={capability} className="flex items-start gap-3">
                          <CheckCircle
                            size={20}
                            className="mt-0.5 flex-shrink-0 text-teal-400"
                            aria-hidden="true"
                          />
                          <span className="text-slate-300">{capability}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5">
                      <p className="text-sm leading-relaxed text-cyan-100">
                        <span className="font-semibold">{t.about.inPractice}</span>{' '}
                        {t.about.inPracticeBody}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'approach' && (
                  <div className="animate-fade-up space-y-6">
                    <p className="text-lg leading-relaxed text-slate-300">
                      {about[locale].approachIntro}
                    </p>
                    <div className="grid gap-4">
                      {approach[locale].map((item) => (
                        <div
                          key={item.title}
                          className="rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-2xl" aria-hidden="true">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-2 text-lg font-bold text-cyan-100">{item.title}</h3>
                              <p className="mb-3 leading-relaxed text-cyan-100/80">{item.desc}</p>
                              <div className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-200">
                                {item.metrics}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-cyan-400">
                <ArrowRight size={20} className="rtl:rotate-180" aria-hidden="true" />
                <span className="font-medium">{p.availability}</span>
              </div>
            </div>

            {/* Right: profile card + status */}
            <div className="space-y-6" style={animationVariants.fadeInRight(contentVisible, 250)}>
              <div className="rounded-2xl border border-cyan-500/15 bg-ink-900/70 p-6 shadow-lg backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-[2px] shadow-lg">
                      <Image
                        src="/profile.jpg"
                        alt={p.name}
                        width={160}
                        height={160}
                        className="h-full w-full rounded-[14px] object-cover object-center"
                      />
                    </div>
                    <span className="absolute -bottom-1 -end-1 h-5 w-5 rounded-full border-4 border-ink-900 bg-teal-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {locale === 'ar' ? (
                        <span className="latin">{personal.name}</span>
                      ) : (
                        <span dir="rtl">{personal.nameArabic}</span>
                      )}
                    </p>
                    <p className="text-sm font-medium text-cyan-400">{p.role}</p>
                    <p className="mt-1 text-sm text-slate-500">📍 {p.location}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {statusCards.map((item, index) => (
                  <div
                    key={item.title}
                    className={`bg-gradient-to-r ${item.color} rounded-xl border p-4 transition-transform duration-300 hover:scale-[1.02]`}
                    style={animationVariants.fadeInUp(contentVisible, getStaggerDelay(index, 90) + 300)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl" aria-hidden="true">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold">{item.title}</h3>
                        <p className="text-sm opacity-90">{item.subtitle}</p>
                        <p className="mt-1 text-xs opacity-75">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="group block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-center text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700"
              >
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Rocket
                    size={24}
                    className="transition-transform duration-300 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                  <span className="text-lg font-semibold">{t.about.ctaTitle}</span>
                </div>
                <p className="text-sm text-cyan-100">{t.about.ctaSub}</p>
              </a>
            </div>
          </div>

          {/* Core expertise */}
          <div ref={expertiseRef} className="mt-16" style={animationVariants.fadeInUp(expertiseVisible)}>
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
                  {t.about.coreExpertise}
                </span>
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">{t.about.coreExpertiseSub}</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {expertise[locale].map((item, index) => {
                const Icon = icons[item.icon]
                return (
                  <div
                    key={item.title}
                    className={`group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br p-7 ${item.bgColor} backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/40`}
                    style={animationVariants.slideInUp(expertiseVisible, getStaggerDelay(index, 110))}
                  >
                    <div className="relative z-10">
                      <div className="mb-6 flex items-center justify-between gap-3">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} shadow-xl transition-transform duration-500 group-hover:scale-110`}
                        >
                          <Icon size={26} className="text-white" aria-hidden="true" />
                        </div>
                        <div className="text-end">
                          <div
                            className={`bg-gradient-to-r text-2xl font-bold ${item.color} bg-clip-text text-transparent`}
                          >
                            {item.level}%
                          </div>
                          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            {t.about.proficiency}
                          </div>
                        </div>
                      </div>

                      <div
                        className="mb-6 h-2.5 w-full overflow-hidden rounded-full bg-ink-800/70"
                        role="progressbar"
                        aria-valuenow={item.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={item.title}
                      >
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-[width] duration-1000 ease-out`}
                          style={{
                            width: expertiseVisible ? `${item.level}%` : '0%',
                            transitionDelay: `${index * 150}ms`,
                          }}
                        />
                      </div>

                      <h4 className="mb-3 text-xl font-bold text-white">{item.title}</h4>
                      <p className="mb-4 text-sm leading-relaxed text-slate-400">{item.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-cyan-500/25 bg-ink-900/60 px-3 py-1.5 text-xs font-medium text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
