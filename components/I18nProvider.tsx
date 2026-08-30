'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/locales'
import { localeHref } from '@/lib/locales'

type I18nValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  isRtl: boolean
  t: Dictionary
  /** Build an href inside the current locale. */
  href: (path?: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: ReactNode
}) {
  const isRtl = locale === 'ar'
  const value: I18nValue = {
    locale,
    dir: isRtl ? 'rtl' : 'ltr',
    isRtl,
    t: dictionary,
    href: (path = '/') => localeHref(locale, path),
  }
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside an I18nProvider')
  return ctx
}
