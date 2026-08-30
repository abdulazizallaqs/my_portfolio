export const locales = ['en', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
}

export const dirFor = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr')

/** URL prefix for a locale: '' for English, '/ar' for Arabic. */
export const localePrefix = (locale: Locale) => (locale === 'ar' ? '/ar' : '')

/**
 * Build a locale-aware href.
 *   localeHref('ar', '/projects/math-heroes') -> '/ar/projects/math-heroes'
 *   localeHref('en', '/')                     -> '/'
 */
export function localeHref(locale: Locale, path = '/') {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `${localePrefix(locale)}${clean}` || '/'
}

export const otherLocale = (locale: Locale): Locale => (locale === 'ar' ? 'en' : 'ar')
