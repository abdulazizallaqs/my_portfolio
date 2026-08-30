import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { absoluteUrl } from '@/lib/site'
import { localeHref, locales } from '@/lib/locales'

/**
 * One entry per page per locale, each declaring the other locale as an
 * alternate so search engines pair them instead of treating them as duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`)]
  const lastModified = new Date()

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localeHref(locale, path)),
      lastModified,
      changeFrequency: (path === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: path === '/' ? 1 : path === '/projects' ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: absoluteUrl(localeHref('en', path)),
          ar: absoluteUrl(localeHref('ar', path)),
        },
      },
    }))
  )
}
