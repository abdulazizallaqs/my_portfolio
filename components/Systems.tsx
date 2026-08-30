'use client'

import { Layers, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import SectionBackground from './SectionBackground'
import { useSite } from '@/lib/site-context'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

/**
 * Positions Abdulaziz as someone who ships whole systems on his own —
 * the delivery pipeline he has personally run end to end, and what that
 * means someone can commission from him.
 */
const Systems = () => {
  const { t } = useSite()
  const c = t.systems

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: pipeRef, isVisible: pipeVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: offerRef, isVisible: offerVisible } = useScrollAnimation({ triggerOnce: true })

  const stepTones = [
    'from-cyan-500 to-sky-600',
    'from-sky-500 to-blue-600',
    'from-teal-500 to-cyan-600',
    'from-blue-500 to-cyan-600',
    'from-cyan-600 to-blue-700',
  ]

  return (
    <SectionBackground variant="primary" className="section-padding" id="systems">
      <div className="container-custom px-4 sm:px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-14"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-300 px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Layers size={18} />
            {c.badge}
          </div>
          <h2 className="relative z-10 text-4xl sm:text-5xl font-bold heading-gradient mb-5">
            {c.heading}
          </h2>
          <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">{c.lede}</p>
        </div>

        {/* Delivery pipeline */}
        <div ref={pipeRef} className="max-w-5xl mx-auto mb-20">
          <div className="relative">
            {/* Spine */}
            <div
              className="absolute start-[26px] md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500/60 via-sky-500/40 to-blue-600/10"
              aria-hidden="true"
            />

            <ol className="space-y-5">
              {c.pipeline.map((stage, index) => (
                <li
                  key={stage.step}
                  className="relative ps-16 md:ps-0"
                  style={animationVariants.fadeInUp(pipeVisible, getStaggerDelay(index, 110))}
                >
                  {/* Step marker */}
                  <div
                    className={`absolute start-0 md:start-1/2 md:-translate-x-1/2 rtl:md:translate-x-1/2 top-4 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${stepTones[index]} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-ink-950 z-10`}
                  >
                    {stage.step}
                  </div>

                  {/* Card — alternating sides on desktop */}
                  <div
                    className={`md:w-[calc(50%-52px)] ${
                      index % 2 === 0 ? 'md:me-auto' : 'md:ms-auto'
                    }`}
                  >
                    <div className="bg-ink-900/70 backdrop-blur-xl border border-cyan-500/15 rounded-2xl p-5 sm:p-6 hover:border-cyan-400/40 hover:shadow-glow transition-all duration-300">
                      <h3 className="text-lg font-bold text-fg mb-2">{stage.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-4">{stage.desc}</p>
                      <div className="inline-flex items-start gap-2 text-xs text-teal-300 bg-teal-500/10 border border-teal-500/25 rounded-lg px-3 py-2">
                        <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                        <span>
                          <span className="font-semibold">{c.proofLabel}:</span> {stage.proof}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* What I can build for you */}
        <div ref={offerRef} className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-fg text-center mb-10">
            {c.offerHeading}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-14">
            {c.offers.map((offer, index) => (
              <div
                key={offer.title}
                className="group bg-gradient-to-br from-cyan-500/10 via-ink-900/60 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/45 hover:shadow-glow transition-all duration-300"
                style={animationVariants.slideInUp(offerVisible, getStaggerDelay(index, 90))}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl leading-none">{offer.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-fg mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {offer.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">{offer.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div
            className="bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-blue-600/15 border border-cyan-500/25 rounded-3xl p-8 sm:p-10 text-center"
            style={animationVariants.scaleIn(offerVisible, 400)}
          >
            <h4 className="text-2xl sm:text-3xl font-bold text-fg mb-3">{c.ctaTitle}</h4>
            <p className="text-muted max-w-2xl mx-auto mb-7 leading-relaxed">{c.ctaBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-glow transform hover:scale-105"
              >
                {c.ctaPrimary}
                <ArrowRight size={18} className="rtl:rotate-180" />
              </a>
              <a
                href="#assistant"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-cyan-400/40 text-cyan-200 rounded-2xl font-semibold hover:border-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles size={18} />
                {c.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionBackground>
  )
}

export default Systems
