import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Reveals an element when it scrolls into view.
 *
 * An IntersectionObserver alone is not enough here: fast programmatic
 * scrolling, an anchor jump straight to a section, or a layout shift after the
 * language switches can all move an element past the viewport between two
 * frames, so the observer never reports it as intersecting and the content
 * stays permanently invisible. A geometry check on scroll/resize backs the
 * observer up, and both are torn down as soon as the element has been revealed.
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.05, rootMargin = '0px 0px -40px 0px', triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No observer support, or reduced motion: show everything immediately.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || prefersReduced) {
      setIsVisible(true)
      return
    }

    let done = false
    const cleanups: Array<() => void> = []

    const reveal = () => {
      setIsVisible(true)
      if (!triggerOnce) return
      done = true
      cleanups.forEach((fn) => fn())
      cleanups.length = 0
    }

    const inView = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      // Intersecting, or already scrolled past.
      return r.top < vh && r.bottom > 0
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (done) return
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          reveal()
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    cleanups.push(() => observer.disconnect())

    const check = () => {
      if (done) return
      if (inView()) reveal()
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    cleanups.push(() => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    })

    // Catch the case where the element is already on screen at mount, and
    // re-check once after layout has settled.
    check()
    const settle = window.setTimeout(check, 350)
    cleanups.push(() => window.clearTimeout(settle))

    return () => {
      cleanups.forEach((fn) => fn())
      cleanups.length = 0
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export const getStaggerDelay = (index: number, baseDelay: number = 100) => {
  return index * baseDelay
}

export const animationVariants = {
  fadeInUp: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  fadeInLeft: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  fadeInRight: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  scaleIn: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  }),
  
  slideInUp: (isVisible: boolean, delay: number = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
  })
}
