'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Brain, Cpu, Code2, Database, Workflow, ShieldCheck, Users, ArrowRight, CheckCircle, Rocket } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const About = () => {
  const { about, personal } = portfolioData
  const [activeTab, setActiveTab] = useState('background')

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: expertiseRef, isVisible: expertiseVisible } = useScrollAnimation({ triggerOnce: true })

  const expertise = [
    {
      icon: Brain,
      title: 'LLM Application Engineering',
      description: 'Turning Gemini and OpenAI into dependable product features',
      skills: ['Google Gemini', 'OpenAI', 'Multi-LLM Fallback', 'NLP'],
      level: 92,
      color: 'from-cyan-500 via-sky-500 to-blue-600',
      bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5',
      shadowColor: 'shadow-cyan-500/20'
    },
    {
      icon: Cpu,
      title: 'Machine Learning & Predictive Analytics',
      description: 'Supervised models that estimate real business values',
      skills: ['Supervised Learning', 'Feature Engineering', 'Model Evaluation', 'Pandas'],
      level: 87,
      color: 'from-sky-500 via-cyan-500 to-blue-600',
      bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5',
      shadowColor: 'shadow-sky-500/20'
    },
    {
      icon: Workflow,
      title: 'Data Engineering & RAG Pipelines',
      description: 'Streaming ingestion into lakehouse storage, then semantic retrieval',
      skills: ['Kafka', 'Airflow', 'Delta Lake', 'RAG'],
      level: 85,
      color: 'from-teal-500 via-cyan-500 to-sky-600',
      bgColor: 'from-teal-500/10 via-cyan-500/10 to-sky-500/5',
      shadowColor: 'shadow-teal-500/20'
    },
    {
      icon: Code2,
      title: 'Backend & API Engineering',
      description: 'The scalable services that carry the model calls in production',
      skills: ['ASP.NET Core', 'Node.js', 'EF Core', 'REST & WebSockets'],
      level: 90,
      color: 'from-blue-500 via-sky-500 to-cyan-600',
      bgColor: 'from-blue-500/10 via-sky-500/10 to-cyan-500/5',
      shadowColor: 'shadow-blue-500/20'
    },
    {
      icon: Database,
      title: 'Databases & Data Modelling',
      description: 'Schemas, query optimization, and access control at enterprise scale',
      skills: ['SQL Server', 'MySQL', 'Query Optimization', 'RBAC'],
      level: 88,
      color: 'from-cyan-500 via-sky-500 to-blue-600',
      bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5',
      shadowColor: 'shadow-cyan-500/20'
    },
    {
      icon: ShieldCheck,
      title: 'DevOps, QA & Secure Delivery',
      description: 'Pipelines that ship fast without shipping vulnerabilities',
      skills: ['CI/CD', 'Docker', 'Automated Testing', 'Security Review'],
      level: 86,
      color: 'from-sky-500 via-cyan-500 to-blue-600',
      bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5',
      shadowColor: 'shadow-sky-500/20'
    }
  ]

  const capabilities = [
    'Integrating Gemini & OpenAI into production workflows, with multi-provider fallback',
    'Building RAG pipelines for context-aware semantic search over real data',
    'Training supervised models for predictive analytics on historical business data',
    'NLP features in production — PDF summarization, context-aware assistants',
    'Architecting the ASP.NET Core / Node.js backends and SQL schemas underneath',
    'Streaming data engineering with Kafka, Airflow, and Delta Lake'
  ]

  const stats = [
    { value: '4.6', label: 'GPA / 5.0 — Honors Graduate', gradient: 'from-cyan-400 to-sky-500' },
    { value: '13+', label: 'AI & Cloud Certifications', gradient: 'from-teal-400 to-cyan-500' },
    { value: '5', label: 'Projects Shipped', gradient: 'from-sky-400 to-blue-500' },
    { value: '2', label: 'LLM Providers Integrated', gradient: 'from-blue-400 to-cyan-500' }
  ]

  const tabs = [
    { id: 'background', label: 'Background' },
    { id: 'ai', label: 'AI Engineering' },
    { id: 'approach', label: 'How I Build' }
  ]

  const journey = [
    {
      title: 'Software Engineering, with Honors',
      desc: 'BSc in Software Engineering from Mustaqbal University, graduated 2025 with Honors and a 4.6/5 GPA — architecture, machine learning, databases, and secure development.',
      icon: '🎓'
    },
    {
      title: 'Enterprise practice at Clear Vision',
      desc: 'A Software Engineering COOP in Riyadh: cut deployment time up to 20% through CI/CD optimization, led solution architecture, ran security reviews, and mentored junior interns.',
      icon: '🏢'
    },
    {
      title: 'Building across the stack',
      desc: 'Shipped in ASP.NET Core, Node.js, and Flutter — a predictive tender-management platform, a team-led collaboration portal, and a fully offline mobile app.',
      icon: '🧱'
    },
    {
      title: 'AI engineering at Kafaat',
      desc: 'Now engineering scalable backends and leading LLM integration — model APIs, RAG retrieval, and the deployment paths that keep intelligent features reliable in production.',
      icon: '🧠'
    }
  ]

  const approach = [
    {
      title: 'The AI is architecture, not decoration',
      desc: 'I decide where a model belongs before writing the first prompt — and where a deterministic rule or a trained classifier is the better answer.',
      icon: '🧭',
      metrics: 'Problem → Model or Rule? → Interface → Fallback'
    },
    {
      title: 'Design for the model failing',
      desc: 'Every AI path I ship has defined behaviour for a missing key, a timeout, or a bad response. Math Heroes falls back across two LLM providers, then to an algorithmic generator.',
      icon: '🛡️',
      metrics: 'Multi-LLM fallback • Timeouts • Schema validation'
    },
    {
      title: 'Own the whole stack',
      desc: 'Backend, data model, pipeline, and interface get designed together — and shipped through a CI/CD pipeline with security checks built into it, not bolted on after.',
      icon: '⚙️',
      metrics: 'API • Schema • Pipeline • UI — one coherent system'
    }
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
              Background
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold mb-6 relative isolate">
              <span className="absolute -inset-2 -z-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl rounded-2xl" aria-hidden="true"></span>
              <span className="relative bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
                Software &amp; AI Engineer
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Honors Software Engineering graduate — I build the system and the intelligence layer inside it
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`relative z-10 text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 font-medium max-w-[10rem]">{stat.label}</div>
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
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex-1 min-w-0 text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                        : 'text-slate-400 hover:text-cyan-400 hover:bg-ink-900/55 hover:scale-105'
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
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {about.description}
                    </p>

                    <div className="space-y-4 pt-2">
                      {journey.map((step, index) => (
                        <div
                          key={index}
                          className="flex gap-4 bg-ink-900/60 backdrop-blur-sm border border-cyan-500/15 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                          style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 90))}
                        >
                          <div className="text-2xl leading-none pt-1">{step.icon}</div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-slate-300 leading-relaxed">
                      My AI work is applied engineering. I integrate large language models into products
                      people actually use, build RAG pipelines that make retrieval context-aware, train
                      supervised models for prediction on real business data, and surround all of it with
                      deterministic logic — so behaviour stays predictable even when the model does not.
                    </p>
                    <div className="grid gap-3">
                      {capabilities.map((capability, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 transform hover:scale-[1.02] transition-all duration-300"
                          style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 80))}
                        >
                          <CheckCircle size={20} className="text-teal-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{capability}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/25 rounded-xl p-5">
                      <p className="text-sm text-cyan-200 leading-relaxed">
                        <span className="font-semibold">In practice:</span> the Student Collaboration Portal
                        uses Gemini for NLP-based PDF summarization and semantic search. The tender platform
                        predicts deal values with a supervised model trained on historical bids. Math Heroes
                        falls back across two LLM providers, then to an algorithmic generator. Every one of
                        them is an AI feature that cannot take the product down with it.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'approach' && (
                  <div className="space-y-6" style={animationVariants.fadeInUp(contentVisible, 400)}>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                      I care less about which framework is fashionable and more about whether the system
                      behaves the way I claimed it would — on a bad network, with a missing key, at 2am.
                    </p>
                    <div className="grid gap-4">
                      {approach.map((item, index) => (
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
                <span className="font-medium">Open to software &amp; AI engineering roles</span>
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
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-500 rounded-full border-4 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{personal.name}</h3>
                      <p className="text-sm text-slate-500 text-left mt-0.5" dir="rtl">{personal.nameArabic}</p>
                      <p className="text-cyan-400 font-medium text-sm">{personal.title}</p>
                      <p className="text-slate-500 text-sm mt-1">📍 {personal.location}</p>
                    </div>
                  </div>
                </div>

                {/* Status Cards */}
                <div className="grid gap-4">
                  {[
                    {
                      icon: '🚀',
                      title: 'Availability',
                      subtitle: 'Open to software & AI roles',
                      detail: 'Riyadh-based • open to relocation',
                      color: 'bg-gradient-to-r from-teal-500/10 to-teal-500/10 border-teal-500/30 text-teal-200'
                    },
                    {
                      icon: '🧠',
                      title: 'Focus',
                      subtitle: 'LLMs, RAG & Arabic NLP',
                      detail: 'Model integration, retrieval, evaluation',
                      color: 'bg-gradient-to-r from-blue-500/10 to-sky-500/10 border-blue-500/30 text-blue-200'
                    },
                    {
                      icon: '🛠️',
                      title: 'Stack',
                      subtitle: 'Python • C# • JavaScript • Dart',
                      detail: 'ASP.NET Core, Node.js, Flutter, SQL Server',
                      color: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 text-blue-200'
                    },
                    {
                      icon: '🎓',
                      title: 'Education',
                      subtitle: 'BSc Software Engineering',
                      detail: 'Mustaqbal University — Honors, 4.6/5',
                      color: 'bg-gradient-to-r from-sky-500/10 to-sky-500/10 border-sky-500/30 text-sky-200'
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`${item.color} p-4 rounded-xl border transform hover:scale-105 transition-all duration-300 hover:shadow-md`}
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
                    <span className="text-lg font-semibold">Let&apos;s Build Something Intelligent</span>
                  </div>
                  <p className="text-cyan-100 text-sm">Get in touch — I usually reply within a day</p>
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
              <h3 className="relative z-10 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent mb-4">
                Core Expertise
              </h3>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                The disciplines I combine when building an AI-driven system
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
                          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Proficiency</div>
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
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      <h4 className="relative z-10 text-xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent group-hover:from-cyan-700 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-500">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-ink-900/60 backdrop-blur-sm text-slate-300 border border-cyan-500/25 group-hover:bg-ink-900/80 group-hover:border-cyan-400/40 group-hover:shadow-md transition-all duration-500 hover:scale-105"
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
