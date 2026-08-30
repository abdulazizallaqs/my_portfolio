'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, User, RotateCcw, KeyRound } from 'lucide-react'
import { useSite } from '@/lib/site-context'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

type Message = { role: 'user' | 'assistant'; content: string }

/**
 * The assistant's mark: reads "AAA" at rest and expands into
 * "Abdulaziz AI Assistant" on hover / focus.
 */
const WORDS: [string, string][] = [
  ['A', 'bdulaziz'],
  ['A', 'I'],
  ['A', 'ssistant']
]

const AAALogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const scale = {
    sm: 'text-sm',
    md: 'text-xl sm:text-2xl',
    lg: 'text-3xl sm:text-4xl'
  }[size]

  const gap = size === 'sm' ? 'gap-[1px]' : 'gap-0.5'

  return (
    <span
      tabIndex={0}
      role="img"
      aria-label="Abdulaziz AI Assistant"
      className={`group/aaa inline-flex items-baseline ${gap} ${scale} font-bold tracking-tight cursor-default select-none outline-none`}
    >
      {WORDS.map(([initial, rest], index) => (
        <span key={initial + index} className="inline-flex items-baseline" aria-hidden="true">
          <span className="bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            {initial}
          </span>
          <span
            className="inline-block max-w-0 overflow-hidden whitespace-nowrap opacity-0 -translate-x-1 transition-all duration-500 ease-out group-hover/aaa:max-w-[200px] group-hover/aaa:opacity-100 group-hover/aaa:translate-x-0 group-focus/aaa:max-w-[200px] group-focus/aaa:opacity-100 group-focus/aaa:translate-x-0 bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent"
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            {rest}
          </span>
          {index < WORDS.length - 1 && (
            <span
              className="inline-block max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover/aaa:max-w-[12px] group-focus/aaa:max-w-[12px]"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  )
}

/** Compact square badge used as the assistant's avatar. */
const AAABadge = ({ className = '' }: { className?: string }) => (
  <span
    className={`rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-ink-950 leading-none ${className}`}
    aria-hidden="true"
  >
    AAA
  </span>
)

const AIAssistant = () => {
  const { t, data, lang } = useSite()
  const c = t.assistant
  const { personal } = data
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [needsKey, setNeedsKey] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: panelRef, isVisible: panelVisible } = useScrollAnimation({ triggerOnce: true })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const send = async (text: string) => {
    const question = text.trim()
    if (!question || isLoading) return

    const next: Message[] = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang })
      })
      const payload = await res.json()
      if (payload.configured === false) setNeedsKey(true)
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            payload.reply || `${c.errorGeneric} ${personal.email}.`
        }
      ])
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: `${c.errorNetwork} ${personal.email}.`
        }
      ])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const hasConversation = messages.length > 0

  return (
    <section
      id="assistant"
      className="section-padding bg-gradient-to-br from-ink-950 via-ink-850 to-ink-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none"></div>
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      <div className="container-custom px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div
            ref={headerRef}
            className="text-center mb-10"
            style={animationVariants.fadeInUp(headerVisible)}
          >
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-ink-900/60 border border-cyan-500/25 hover:border-cyan-400/50 transition-colors duration-500">
                <AAALogo size="lg" />
              </span>
            </div>
            <h2 className="relative z-10 text-4xl sm:text-5xl font-bold heading-gradient mb-3">
              {c.heading}
            </h2>
            <p className="text-xs sm:text-sm text-subtle mb-4 tracking-wide">
              <span className="text-cyan-400 font-semibold">AAA</span> {c.subtitle}{' '}
              <span className="text-muted" dir="ltr">{c.subtitleName}</span>
            </p>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              {c.lede}
            </p>
          </div>

          {/* Chat panel */}
          <div
            ref={panelRef}
            className="bg-ink-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-glow overflow-hidden"
            style={animationVariants.scaleIn(panelVisible, 200)}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-cyan-500/15 bg-ink-950/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AAABadge className="w-10 h-10 text-[11px]" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-ink-900"></span>
                </div>
                <div>
                  <AAALogo size="sm" />
                  <p className="text-xs text-subtle leading-tight mt-0.5">{c.panelSub}</p>
                </div>
              </div>
              {hasConversation && (
                <button
                  onClick={() => setMessages([])}
                  className="flex items-center gap-1.5 text-xs text-muted hover:text-cyan-300 transition-colors px-3 py-2 rounded-lg hover:bg-cyan-500/10"
                >
                  <RotateCcw size={14} />
                  {c.reset}
                </button>
              )}
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="px-5 sm:px-6 py-6 space-y-5 min-h-[260px] max-h-[440px] overflow-y-auto"
            >
              {!hasConversation && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-lg font-bold bg-gradient-to-br from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                      AAA
                    </span>
                  </div>
                  <p className="text-body mb-1">
                    {c.greetingA} <span className="text-cyan-300 font-medium">AAA</span>, {c.greetingB}
                  </p>
                  <p className="text-sm text-subtle">
                    {c.greetingHint}
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-ink-800 border border-cyan-500/20'
                        : 'bg-gradient-to-br from-cyan-400 to-blue-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User size={15} className="text-body" />
                    ) : (
                      <span className="text-[9px] font-bold text-ink-950 leading-none">AAA</span>
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-50 rounded-tr-sm'
                        : 'bg-ink-800/70 border border-cyan-500/10 text-fg rounded-tl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-ink-950 leading-none">AAA</span>
                  </div>
                  <div className="bg-ink-800/70 border border-cyan-500/10 px-4 py-3.5 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-cyan-400/70 animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Setup notice */}
            {needsKey && (
              <div className="mx-5 sm:mx-6 mb-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
                <div className="flex items-start gap-3">
                  <KeyRound size={18} className="text-sky-300 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-sky-100/90 leading-relaxed">
                    <p className="font-semibold text-sky-200 mb-1">{c.setupTitle}</p>
                    <p className="mb-2">{c.setupBody}</p>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-medium"
                    >
                      {c.setupLink}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {!hasConversation && (
              <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-2 justify-center">
                {c.suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => send(suggestion)}
                    className="text-xs sm:text-sm px-3.5 py-2 rounded-full bg-ink-800/70 border border-cyan-500/20 text-body hover:text-cyan-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300"
                    style={animationVariants.fadeInUp(panelVisible, getStaggerDelay(index, 80) + 400)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-3 px-5 sm:px-6 py-4 border-t border-cyan-500/15 bg-ink-950/40"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={c.placeholder}
                aria-label={c.placeholder}
                className="flex-1 bg-ink-800/60 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm text-fg placeholder:text-subtle focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label={c.send}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-faint mt-4">
            {c.footnote}{' '}
            <a href={`mailto:${personal.email}`} className="text-cyan-500 hover:text-cyan-400">
              {personal.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default AIAssistant
