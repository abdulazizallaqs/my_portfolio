'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Languages } from 'lucide-react'
import { useI18n } from './I18nProvider'
import { localeNames, otherLocale } from '@/lib/locales'

/**
 * Switches locale while staying on the same page:
 * /projects/math-heroes  <->  /ar/projects/math-heroes
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, t } = useI18n()
  const pathname = usePathname() || '/'
  const target = otherLocale(locale)

  const stripped = pathname.replace(/^\/ar(?=\/|$)/, '') || '/'
  const href = target === 'ar' ? (stripped === '/' ? '/ar' : `/ar${stripped}`) : stripped

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={t.nav.switchLanguageLabel}
      title={localeNames[target]}
      className={`inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-ink-900/60 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/60 hover:text-cyan-300 ${className}`}
    >
      <Languages size={16} aria-hidden="true" />
      <span>{t.nav.switchLanguage}</span>
    </Link>
  )
}
