'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Brain, Cpu, Code2, Database, Workflow, ShieldCheck, Users, ArrowRight, CheckCircle, Rocket } from 'lucide-react'
import { useSite } from '@/lib/site-context'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const About = () => {
  const { t, data } = useSite()
  const { about, personal } = data
  const c = t.about
  const [activeTab, setActiveTab] = useState('background')

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: expertiseRef, isVisible: expertiseVisible } = useScrollAnimation({ triggerOnce: true })

  const expertiseVisuals = [
    { icon: Brain, level: 92, color: 'from-cyan-500 via-sky-500 to-blue-600', bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5', shadowColor: 'shadow-cyan-500/20' },
    { icon: Cpu, level: 87, color: 'from-sky-500 via-cyan-500 to-blue-600', bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5', shadowColor: 'shadow-sky-500/20' },
    { icon: Workflow, level: 85, color: 'from-teal-500 via-cyan-500 to-sky-600', bgColor: 'from-teal-500/10 via-cyan-500/10 to-sky-500/5', shadowColor: 'shadow-teal-500/20' },
    { icon: Code2, level: 90, color: 'from-blue-500 via-sky-500 to-cyan-600', bgColor: 'from-blue-500/10 via-sky-500/10 to-cyan-500/5', shadowColor: 'shadow-blue-500/20' },
    { icon: Database, level: 88, color: 'from-cyan-500 via-sky-500 to-blue-600', bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5', shadowColor: 'shadow-cyan-500/20' },
    { icon: ShieldCheck, level: 86, color: 'from-sky-500 via-cyan-500 to-blue-600', bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5', shadowColor: 'shadow-sky-500/20' },
  ]

  const expertise = c.expertise.map((item, i) => ({ ...item, ...expertiseVisuals[i] }))

  const statGradients = [
    'from-cyan-500 to-sky-600',
    'from-teal-500 to-cyan-600',
    'from-sky-500 to-blue-600',
    'from-blue-500 to-cyan-600',
  ]

  const cardTones = [
    'bg-gradient-to-r from-teal-500/10 to-teal-500/10 border-teal-500/30 text-teal-200',
    'bg-gradient-to-r from-blue-500/10 to-sky-500/10 border-blue-500/30 text-blue-200',
    'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-200',
    'bg-gradient-to-r from-sky-500/10 to-sky-500/10 border-sky-500/30 text-sky-200',
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 relative overflow-hidden" id="about">
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none"></div>
      <div className="container-custom px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className="text-center mb-16"
            style={animationVariants.fadeInUp(headerVisible)}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-300 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Users size={18} />
              {c.badge}
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 relative isolate">
              <span className="absolute -inset-2 -z-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl" aria-hidden="true"></span>
              <span className="relative heading-gradient">{c.heading}</span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted max-w-4xl mx-auto leading-relaxed font-light mb-8">
              {c.lede}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
              {c.stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`relative z-10 text-3xl sm:text-4xl font-bold bg-gradient-to-r ${statGradients[index]} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted font-medium max-w-[10rem]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column */}
            <div
              className="space-y-8"
              style={animationVariants.fadeInLeft(contentVisible, 200)}
            >
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 p-2 bg-ink-800/70 backdrop-blur-sm rounded-2xl border border-cyan-500/15">
                {c.tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex-1 min-w-0 text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                        : 'text-muted hover:text-cyan-400 hover:bg-ink-900/55 hover:scale-105'
                    }`}
                    style={animationVariants.fadeInUp(contentVisible, getStaggerDelay(index, 100))}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[320px]">
                {activeTab === 'background' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-body leading-relaxed text-lg">
                      {about.description}
                    </p>

                    <div className="space-y-4 pt-2">
                      {c.journey.map((step, index) => (
                        <div
                          key={index}
                          className="flex gap-4 bg-ink-900/60 backdrop-blur-sm border border-cyan-500/15 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                          style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 90))}
                        >
                          <div className="text-2xl leading-none pt-1">{step.icon}</div>
                          <div>
                            <h4 className="font-semibold text-fg mb-1">{step.title}</h4>
                            <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-body leading-relaxed">{c.aiIntro}</p>
                    <div className="grid gap-3">
                      {c.capabilities.map((capability, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 transform hover:scale-[1.02] transition-all duration-300"
                          style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 80))}
                        >
                          <CheckCircle size={20} className="text-teal-400 flex-shrink-0 mt-0.5" />
                          <span className="text-body">{capability}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/25 rounded-xl p-5">
                      <p className="text-sm text-cyan-200 leading-relaxed">
                        <span className="font-semibold">{c.inPractice}</span> {c.inPracticeBody}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'approach' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-body leading-relaxed text-lg mb-6">{c.approachIntro}</p>
                    <div className="grid gap-4">
                      {c.approach.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/25 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
                          style={animationVariants.fadeInRight(contentVisible, getStaggerDelay(index, 100))}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-2xl">{item.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-cyan-200 mb-2 text-lg">{item.title}</h4>
                              <p className="text-cyan-200 mb-3 leading-relaxed">{item.desc}</p>
                              <div className="text-xs text-cyan-300 font-medium bg-cyan-500/20 px-3 py-1 rounded-full inline-block">
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

              <div className="flex items-center gap-2 text-cyan-400 transform hover:scale-105 transition-transform duration-300">
                <ArrowRight size={20} />
                <span className="font-medium">{c.openTo}</span>
              </div>
            </div>

            {/* Right Column */}
            <div
              className="space-y-8"
              style={animationVariants.fadeInRight(contentVisible, 300)}
            >
              <div className="space-y-6">
                {/* Profile Header Card */}
                <div className="bg-ink-900/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-cyan-500/15 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-[2px] shadow-lg">
                        <Image
                          src="/profile.jpg"
                          alt={personal.name}
                          width={160}
                          height={160}
                          className="w-full h-full rounded-[14px] object-cover object-center"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-4 border-ink-950"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-fg">{personal.name}</h3>
                      <p className="text-sm text-subtle mt-0.5">{personal.nameAlt}</p>
                      <p className="text-cyan-400 font-medium text-sm">{personal.title}</p>
                      <p className="text-subtle text-sm mt-1">📍 {personal.location}</p>
                    </div>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="grid gap-4">
                  {c.cards.map((item, index) => (
                    <div
                      key={index}
                      className={`${cardTones[index]} p-4 rounded-xl border transform hover:scale-105 transition-all duration-300 hover:shadow-md`}
                      style={animationVariants.fadeInUp(contentVisible, getStaggerDelay(index, 100))}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{item.title}</h4>
                          <p className="text-sm opacity-90">{item.subtitle}</p>
                          <p className="text-xs opacity-75 mt-1">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Card */}
                <a
                  href="#contact"
                  className="block bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white text-center hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Rocket size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
                    <span className="text-lg font-semibold">{c.ctaTitle}</span>
                  </div>
                  <p className="text-cyan-100 text-sm">{c.ctaSub}</p>
                </a>
              </div>
            </div>
          </div>

          {/* Expertise Section */}
          <div
            ref={expertiseRef}
            className="mt-16"
            style={animationVariants.fadeInUp(expertiseVisible)}
          >
            <div className="text-center mb-12">
              <h3 className="relative z-10 text-3xl sm:text-4xl font-bold heading-gradient mb-4">
                {c.expertiseHeading}
              </h3>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                {c.expertiseLede}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertise.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br ${item.bgColor} backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${item.shadowColor} overflow-hidden`}
                    style={animationVariants.slideInUp(expertiseVisible, getStaggerDelay(index, 150))}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                      <div className={`absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} blur-3xl transform rotate-45 group-hover:rotate-90 transition-transform duration-1000`}></div>
                      <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr ${item.color} blur-2xl transform -rotate-45 group-hover:-rotate-90 transition-transform duration-1000`}></div>
                    </div>

                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10`}></div>

                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${item.color} opacity-30 animate-pulse`}
                          style={{
                            top: `${20 + i * 25}%`,
                            right: `${10 + i * 15}%`,
                            animationDelay: `${i * 500}ms`,
                            animationDuration: `${2000 + i * 500}ms`
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700`}>
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-700`}></div>
                          <IconComponent size={28} className="text-white relative z-10" />
                        </div>
                        <div className="text-right">
                          <div className={`relative z-10 text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.level}%</div>
                          <div className="text-xs text-subtle uppercase tracking-wide font-medium">{c.proficiency}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="w-full bg-ink-800/60 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
                          <div
                            className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
                            style={{
                              width: expertiseVisible ? `${item.level}%` : '0%',
                              transitionDelay: `${index * 200}ms`
                            }}
                          >
                            <div className="absolute inset-0 bg-pure/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      <h4 className="relative z-10 text-xl font-bold mb-3 heading-gradient group-hover:from-cyan-700 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-500">
                        {item.title}
                      </h4>
                      <p className="text-muted text-sm leading-relaxed mb-4 group-hover:text-body transition-colors duration-300">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-ink-900/60 backdrop-blur-sm text-body border border-cyan-500/25 group-hover:bg-ink-900/80 group-hover:border-cyan-400/40 group-hover:shadow-md transition-all duration-500 hover:scale-105"
                            style={{ transitionDelay: `${skillIndex * 100}ms` }}
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

export default About
