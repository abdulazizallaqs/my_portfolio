import { notFound } from 'next/navigation'

/**
 * Catch-all so unmatched URLs render the styled 404 inside the site shell
 * (navigation + footer) instead of Next's bare fallback page.
 */
export default function CatchAll(): never {
  notFound()
}
