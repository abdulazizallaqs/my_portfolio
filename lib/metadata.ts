import type { Metadata } from 'next'
import { SITE_URL, absoluteUrl } from './site'
import { getDictionary } from './dictionary'
import { localeHref, type Locale } from './locales'
import { personalByLocale } from '@/data/personal'

/**
 * Builds page metadata with canonical + hreflang alternates for both locales.
 * `path` is the locale-independent path, e.g. '/' or '/projects/math-heroes'.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  images,
}: {
  locale: Locale
  path: string
  title: string
  description: string
  images?: string[]
}): Metadata {
  const canonical = localeHref(locale, path)
  const ogImages = images?.length ? images : ['/og-image.svg']

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: personalByLocale[locale].name, url: SITE_URL }],
    alternates: {
      canonical,
      languages: {
        en: localeHref('en', path),
        ar: localeHref('ar', path),
        'x-default': localeHref('en', path),
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: absoluteUrl(canonical),
      siteName: personalByLocale[locale].name,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages,
    },
    robots: { index: true, follow: true },
  }
}

/** JSON-LD describing the person, attached to the home page. */
export function personSchema(locale: Locale) {
  const p = personalByLocale[locale]
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    alternateName: locale === 'ar' ? 'Abdulaziz Alaqs' : 'عبدالعزيز العقص',
    jobTitle: p.role,
    description: getDictionary(locale).meta.homeDescription,
    url: absoluteUrl(localeHref(locale, '/')),
    image: absoluteUrl('/profile.jpg'),
    email: 'mailto:abdulazizallaqs@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: locale === 'ar' ? 'الرياض' : 'Riyadh',
      addressCountry: 'SA',
    },
    sameAs: [
      'https://www.linkedin.com/in/abdulaziz-aqs',
      'https://github.com/abdulazizallaqs',
    ],
  }
}

/** JSON-LD for a single project page. */
export function projectSchema({
  locale,
  name,
  description,
  path,
  keywords,
}: {
  locale: Locale
  name: string
  description: string
  path: string
  keywords: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: absoluteUrl(localeHref(locale, path)),
    inLanguage: locale,
    keywords: keywords.join(', '),
    author: {
      '@type': 'Person',
      name: personalByLocale[locale].name,
      url: SITE_URL,
    },
  }
}
