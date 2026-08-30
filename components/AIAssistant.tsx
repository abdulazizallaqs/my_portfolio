'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, User, RotateCcw, KeyRound } from 'lucide-react'
import { useI18n } from './I18nProvider'
import { personal } from '@/data/personal'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

type Message = { role: 'user' | 'assistant'; content: string }

/** The mark reads "AAA" at rest and expands into "Abdulaziz AI Assistant" on hover. */
const WORDS: [string, string][] = [
  ['A', 'bdulaziz'],
  ['A', 'I'],
  ['A', 'ssistant'],
]

function AAALogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scale = { sm: 'text-sm', md: 'text-xl sm:text-2xl', lg: 'text-3xl sm:text-4xl' }[size]
  return (
    <span
      dir="ltr"
      tabIndex={0}
      role="img"
      aria-label="Abdulaziz AI Assistant"
      className={`group/aaa inline-flex cursor-default select-none items-baseline gap-0.5 font-bold tracking-tight outline-none ${scale}`}
    >
      {WORDS.map(([initial, rest], index) => (
        <span key={initial + index} className="inline-flex items-baseline">
          <span className="bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            {initial}
          </span>
          <span
            className="inline-block max-w-0 -translate-x-1 overflow-hidden whitespace-nowrap bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent opacity-0 transition-all duration-500 ease-out group-hover/aaa:max-w-[200px] group-hover/aaa:translate-x-0 group-hover/aaa:opacity-100 group-focus/aaa:max-w-[200px] group-focus/aaa:translate-x-0 group-focus/aaa:opacity-100"
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

export default function AIAssistant() {
  const { t, locale } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [needsKey, setNeedsKey] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: panelRef, isVisible: panelVisible } = useScrollAnimation()

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  // Clearing the thread on a language switch avoids a half-English, half-Arabic transcript
  useEffect(() => {
    setMessages([])
  }, [locale])

  const send = async (text: string) => {
    const question = text.trim()
    if (!question || loading) return

    const next: Message[] = [...messages, { role: 'user', content: question }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, locale }),
      })
      const data = await res.json()
      if (data.configured === false) setNeedsKey(true)
      setMessages([
        ...next,
        { role: 'assistant', content: data.reply || `${t.assistant.error} ${personal.email}` },
      ])
    } catch {
      setMessages([
        ...next,
        { role: 'assistant', content: `${t.assistant.unreachable} ${personal.email}` },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const hasConversation = messages.length > 0

  return (
    <section
      id="assistant"
      className="section-padding relative overflow-hidden bg-gradient-to-br from-ink-950 via-[#07203A] to-ink-950"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div ref={headerRef} className="mb-10 text-center" style={animationVariants.fadeInUp(headerVisible)}>
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-3 rounded-2xl border border-cyan-500/25 bg-ink-900/60 px-6 py-3 transition-colors duration-500 hover:border-cyan-400/50">
                <AAALogo size="lg" />
              </span>
            </div>
            <h2 className="mb-3 text-4xl font-bold sm:text-5xl">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
                {t.assistant.heading}
              </span>
            </h2>
            <p className="mb-4 text-xs tracking-wide text-slate-500 sm:text-sm">
              <span className="font-semibold text-cyan-400">AAA</span> — {t.assistant.shortFor}{' '}
              <span className="latin text-slate-400">{t.assistant.expansion}</span>
            </p>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
              {t.assistant.subheading}
            </p>
          </div>

          <div
            ref={panelRef}
            className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-ink-900/70 shadow-glow backdrop-blur-xl"
            style={animationVariants.scaleIn(panelVisible, 150)}
          >
            <div className="flex items-center justify-between gap-3 border-b border-cyan-500/15 bg-ink-950/40 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="relative">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-[11px] font-bold leading-none text-ink-950"
                    aria-hidden="true"
                  >
                    AAA
                  </span>
                  <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-teal-400" />
                </span>
                <span>
                  <AAALogo size="sm" />
                  <span className="mt-0.5 block text-xs leading-tight text-slate-500">
                    {t.assistant.panelSubtitle}
                  </span>
                </span>
              </div>
              {hasConversation && (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  {t.assistant.reset}
                </button>
              )}
            </div>

            <div
              ref={scrollRef}
              className="max-h-[440px] min-h-[260px] space-y-5 overflow-y-auto px-5 py-6 sm:px-6"
              aria-live="polite"
            >
              {!hasConversation && (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                    <span
                      className="bg-gradient-to-br from-cyan-300 to-blue-400 bg-clip-text text-lg font-bold text-transparent"
                      aria-hidden="true"
                    >
                      AAA
                    </span>
                  </div>
                  <p className="mb-1 text-slate-300">{t.assistant.emptyGreeting}</p>
                  <p className="text-sm text-slate-500">{t.assistant.emptyHint}</p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                      message.role === 'user'
                        ? 'border border-cyan-500/20 bg-ink-800'
                        : 'bg-gradient-to-br from-cyan-400 to-blue-600'
                    }`}
                    aria-hidden="true"
                  >
                    {message.role === 'user' ? (
                      <User size={15} className="text-slate-300" />
                    ) : (
                      <span className="text-[9px] font-bold leading-none text-ink-950">AAA</span>
                    )}
                  </span>
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'border border-cyan-500/25 bg-cyan-500/15 text-cyan-50'
                        : 'border border-cyan-500/10 bg-ink-800/70 text-slate-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-[9px] font-bold leading-none text-ink-950"
                    aria-hidden="true"
                  >
                    AAA
                  </span>
                  <div className="rounded-2xl border border-cyan-500/10 bg-ink-800/70 px-4 py-3.5">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-2 w-2 animate-bounce rounded-full bg-cyan-400/70"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {needsKey && (
              <div className="mx-5 mb-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4 sm:mx-6">
                <div className="flex items-start gap-3">
                  <KeyRound size={18} className="mt-0.5 flex-shrink-0 text-sky-300" aria-hidden="true" />
                  <div className="text-sm leading-relaxed text-sky-100/90">
                    <p className="mb-1 font-semibold text-sky-200">{t.assistant.notConfiguredTitle}</p>
                    <p className="mb-2">{t.assistant.notConfiguredBody}</p>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-cyan-300 hover:text-cyan-200"
                    >
                      {t.assistant.getKey} →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {!hasConversation && (
              <div className="flex flex-wrap justify-center gap-2 px-5 pb-4 sm:px-6">
                {t.assistant.suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="rounded-full border border-cyan-500/20 bg-ink-800/70 px-3.5 py-2 text-xs text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200 sm:text-sm"
                    style={animationVariants.fadeInUp(panelVisible, getStaggerDelay(index, 70) + 300)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault()
                send(input)
              }}
              className="flex items-center gap-3 border-t border-cyan-500/15 bg-ink-950/40 px-5 py-4 sm:px-6"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t.assistant.placeholder}
                aria-label={t.assistant.inputLabel}
                className="flex-1 rounded-xl border border-cyan-500/20 bg-ink-800/60 px-4 py-3 text-sm text-slate-100 transition-all placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label={t.assistant.send}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={18} className="rtl:-scale-x-100" aria-hidden="true" />
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-600">
            {t.assistant.footnote}{' '}
            <a href={`mailto:${personal.email}`} className="latin text-cyan-500 hover:text-cyan-400">
              {personal.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
