'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { useI18n } from './I18nProvider'
import { personal, personalByLocale } from '@/data/personal'

/** Types a list of strings out one character at a time, then erases and moves on. */
function useTypedRotation(items: readonly string[], enabled: boolean) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled || items.length === 0) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setText(items[index])
      const hold = setTimeout(() => setIndex((i) => (i + 1) % items.length), 3500)
      return () => clearTimeout(hold)
    }

    const full = items[index]
    let char = 0
    let erasing = false
    let timer: ReturnType<typeof setTimeout>

    const step = () => {
      if (!erasing) {
        char += 1
        setText(full.slice(0, char))
        if (char >= full.length) {
          erasing = true
          timer = setTimeout(step, 2600)
          return
        }
        timer = setTimeout(step, 55)
      } else {
        char -= 1
        setText(full.slice(0, char))
        if (char <= 0) {
          setIndex((i) => (i + 1) % items.length)
          return
        }
        timer = setTimeout(step, 28)
      }
    }

    timer = setTimeout(step, 220)
    return () => clearTimeout(timer)
  }, [items, index, enabled])

  return text
}

export default function Hero() {
  const { t, locale } = useI18n()
  const p = personalByLocale[locale]
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const role = useTypedRotation(t.hero.roles, mounted)
  const [firstName, ...rest] = p.name.split(' ')

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-gradient-to-br from-ink-950 via-[#06182E] to-black pt-24">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
        <div className="absolute top-20 start-10 h-96 w-96 rounded-full bg-cyan-500 blur-3xl" />
        <div className="absolute bottom-20 end-10 h-96 w-96 rounded-full bg-blue-600 blur-3xl" />
        <div className="absolute top-1/3 end-1/4 h-72 w-72 rounded-full bg-sky-500 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 px-4 text-center sm:px-6">
        <div className="mb-10 flex justify-center">
          <div className="group relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400/40 via-sky-500/40 to-blue-600/40 opacity-60 blur-lg transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative h-44 w-44 overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-1 shadow-glow sm:h-52 sm:w-52 lg:h-60 lg:w-60">
              <div className="h-full w-full overflow-hidden rounded-full bg-ink-950">
                <Image
                  src="/profile.jpg"
                  alt={`${p.name} — ${p.role}`}
                  width={512}
                  height={512}
                  priority
                  sizes="(max-width: 640px) 11rem, 15rem"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mb-4 text-lg font-medium text-slate-400 sm:text-xl">{t.hero.greeting}</p>

        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
            {firstName}
          </span>
          {rest.length > 0 && <span className="ms-3 font-light text-white">{rest.join(' ')}</span>}
        </h1>

        <h2 className="mb-5 text-2xl font-medium sm:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            {p.role}
          </span>
        </h2>

        <p
          className="mx-auto min-h-[3.5rem] max-w-3xl text-lg leading-relaxed sm:text-xl"
          aria-live="polite"
        >
          <bdi className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent">
            {role || t.hero.roles[0]}
          </bdi>
          <span className="animate-pulse text-cyan-400" aria-hidden="true">
            |
          </span>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {p.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#assistant"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-glow transition-all duration-300 hover:from-cyan-400 hover:via-sky-400 hover:to-blue-500 hover:shadow-2xl"
          >
            <Sparkles size={20} aria-hidden="true" />
            {t.hero.askAssistant}
          </a>
          <a
            href="#projects"
            className="inline-flex items-center rounded-2xl border border-cyan-400/40 px-8 py-4 font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-500/10"
          >
            {t.hero.viewWork}
          </a>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          <span className="latin">{personal.email}</span>
        </p>
      </div>
    </section>
  )
}
