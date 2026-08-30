/**
 * Canonical origin of the site.
 *
 * Set NEXT_PUBLIC_SITE_URL to the real domain (Vercel → Settings → Environment
 * Variables). Sitemap, robots.txt, canonical links, hreflang tags and Open Graph
 * URLs are all derived from it, so this is the only place a domain is written down.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '') ||
  'http://localhost:3000'
).replace(/\/+$/, '')

export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`}`
