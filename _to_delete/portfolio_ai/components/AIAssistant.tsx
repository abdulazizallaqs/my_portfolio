'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, User, Bot, RotateCcw } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'What AI projects has he built?',
  'Tell me about his experience with LLMs',
  'What is his technical stack?',
  'Is he open to new roles?'
]

const AIAssistant = () => {
  const { personal } = portfolioData
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
        body: JSON.stringify({ messages: next })
      })
      const data = await res.json()
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            data.reply ||
            `Sorry, something went wrong. You can reach Abdulaziz directly at ${personal.email}.`
        }
      ])
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: `I couldn't reach the assistant service. You can reach Abdulaziz directly at ${personal.email}.`
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
      className="section-padding bg-gradient-to-br from-ink-950 via-[#07203A] to-ink-950 relative overflow-hidden"
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/30 text-cyan-300 px-5 py-2.5 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              Powered by Google Gemini
            </div>
            <h2 className="relative z-10 text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent mb-4">
              Ask My AI Assistant
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Instead of scrolling, just ask. This assistant knows my projects, experience, and
              stack — and answers in English or Arabic.
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
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Bot size={18} className="text-ink-950" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-ink-900"></span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {personal.name.split(' ')[0]}&apos;s Assistant
                  </p>
                  <p className="text-xs text-slate-500 leading-tight">Ask anything about my work</p>
                </div>
              </div>
              {hasConversation && (
                <button
                  onClick={() => setMessages([])}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors px-3 py-2 rounded-lg hover:bg-cyan-500/10"
                >
                  <RotateCcw size={14} />
                  Reset
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
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                    <Sparkles size={24} className="text-cyan-300" />
                  </div>
                  <p className="text-slate-300 mb-1">
                    Hi — I&apos;m {personal.name.split(' ')[0]}&apos;s AI assistant.
                  </p>
                  <p className="text-sm text-slate-500">
                    Pick a question below, or type your own.
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
                      <User size={15} className="text-slate-300" />
                    ) : (
                      <Bot size={15} className="text-ink-950" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-50 rounded-tr-sm'
                        : 'bg-ink-800/70 border border-cyan-500/10 text-slate-200 rounded-tl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Bot size={15} className="text-ink-950" />
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

            {/* Suggestions */}
            {!hasConversation && (
              <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => send(suggestion)}
                    className="text-xs sm:text-sm px-3.5 py-2 rounded-full bg-ink-800/70 border border-cyan-500/20 text-slate-300 hover:text-cyan-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300"
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
                placeholder="Ask about my projects, stack, or experience…"
                aria-label="Ask the AI assistant a question"
                className="flex-1 bg-ink-800/60 border border-cyan-500/20 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-slate-600 mt-4">
            Answers are generated from my portfolio data — for anything else, email{' '}
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
