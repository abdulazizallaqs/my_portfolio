'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import enData from '@/data/portfolio.json'
import arData from '@/data/portfolio.ar.json'
import { ui, type Lang, type UI } from '@/lib/ui'

export type Theme = 'dark' | 'light'

/** The English file is the schema of record; the Arabic file mirrors it. */
export type PortfolioData = typeof enData

const DATA: Record<Lang, PortfolioData> = {
  en: enData as PortfolioData,
  ar: arData as unknown as PortfolioData,
}

/** Each language is a real URL, so a search engine can index both. */
export const PATH_FOR: Record<Lang, string> = { en: '/', ar: '/ar' }

export const THEME_KEY = 'aa.theme'

interface SiteContextValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  isRTL: boolean
  t: UI
  data: PortfolioData
  /** Always the English record — for stable keys, URLs and analytics. */
  base: PortfolioData
  theme: Theme
  /** The URL of this page in the other language. */
  otherLangHref: string
  toggleLang: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  /** False during the first client render, before storage has been read. */
  ready: boolean
}

const SiteContext = createContext<SiteContextValue | null>(null)

/**
 * Language now comes from the route, not from storage: `/` is English and
 * `/ar` is Arabic, each server-rendered in full so both are indexable. The
 * provider is told which one it is rendering; only the theme is a stored,
 * per-visitor preference.
 */
export function SiteProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_KEY)
      const next: Theme = stored === 'light' ? 'light' : 'dark'
      setThemeState(next)
      document.documentElement.classList.toggle('light', next === 'light')
    } catch {
      /* storage unavailable — dark stays */
    } finally {
      setReady(true)
    }
  }, [])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('light', next === 'light')
    }
    try {
      window.localStorage.setItem(THEME_KEY, next)
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  }, [])

  const otherLangHref = PATH_FOR[lang === 'en' ? 'ar' : 'en']

  // The two languages sit under different root layouts, so switching is a real
  // navigation rather than a client-side transition. The theme survives it
  // because it lives in localStorage.
  const toggleLang = useCallback(() => {
    if (typeof window !== 'undefined') window.location.assign(otherLangHref)
  }, [otherLangHref])

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme]
  )

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isRTL: lang === 'ar',
      t: ui[lang] as unknown as UI,
      data: DATA[lang],
      base: DATA.en,
      theme,
      otherLangHref,
      toggleLang,
      setTheme,
      toggleTheme,
      ready,
    }),
    [lang, theme, otherLangHref, toggleLang, setTheme, toggleTheme, ready]
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}
