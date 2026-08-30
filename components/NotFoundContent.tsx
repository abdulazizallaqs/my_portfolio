'use client'

import Link from 'next/link'
import { Home, FolderKanban } from 'lucide-react'
import { useI18n } from './I18nProvider'

export default function NotFoundContent() {
  const { t, href } = useI18n()

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950 px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="latin text-7xl font-bold text-cyan-500/30">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{t.notFound.heading}</h1>
        <p className="mt-4 leading-relaxed text-slate-400">{t.notFound.body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={href('/')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500"
          >
            <Home size={18} aria-hidden="true" />
            {t.notFound.home}
          </Link>
          <Link
            href={href('/projects')}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 px-6 py-3 font-semibold text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-500/10"
          >
            <FolderKanban size={18} aria-hidden="true" />
            {t.notFound.projects}
          </Link>
        </div>
      </div>
    </div>
  )
}
