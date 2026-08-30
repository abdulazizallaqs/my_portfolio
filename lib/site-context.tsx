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

export const LANG_KEY = 'aa.lang'
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
  setLang: (lang: Lang) => void
  toggleLang: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  /** False during the first client render, before storage has been read. */
  ready: boolean
}

const SiteContext = createContext<SiteContextValue | null>(null)

function applyDocument(lang: Lang, theme: Theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.lang = lang
  root.dir = lang === 'ar' ? 'rtl' : 'ltr'
  root.classList.toggle('light', theme === 'light')
}

export function SiteProvider({ children }: { children: ReactNode }) {
  // Server render and first client render must agree, so start from the
  // defaults and reconcile with localStorage in an effect. The inline script
  // in `app/layout.tsx` has already painted the correct theme by then, so
  // there is no flash.
  const [lang, setLangState] = useState<Lang>('en')
  const [theme, setThemeState] = useState<Theme>('dark')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const storedLang = window.localStorage.getItem(LANG_KEY)
      const storedTheme = window.localStorage.getItem(THEME_KEY)
      const nextLang: Lang = storedLang === 'ar' ? 'ar' : 'en'
      const nextTheme: Theme = storedTheme === 'light' ? 'light' : 'dark'
      setLangState(nextLang)
      setThemeState(nextTheme)
      applyDocument(nextLang, nextTheme)
    } catch {
      applyDocument('en', 'dark')
    } finally {
      setReady(true)
    }
  }, [])

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next)
      applyDocument(next, theme)
      try {
        window.localStorage.setItem(LANG_KEY, next)
      } catch {
        /* storage unavailable — the choice just won't persist */
      }
    },
    [theme]
  )

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next)
      applyDocument(lang, next)
      try {
        window.localStorage.setItem(THEME_KEY, next)
      } catch {
        /* storage unavailable — the choice just won't persist */
      }
    },
    [lang]
  )

  const toggleLang = useCallback(() => setLang(lang === 'en' ? 'ar' : 'en'), [lang, setLang])
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
      setLang,
      toggleLang,
      setTheme,
      toggleTheme,
      ready,
    }),
    [lang, theme, setLang, toggleLang, setTheme, toggleTheme, ready]
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>')
  return ctx
}
