'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Reveals content as it scrolls into view.
 * Starts visible when IntersectionObserver is unavailable or the visitor
 * prefers reduced motion, so nothing is ever stuck invisible.
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (typeof IntersectionObserver === 'undefined' || prefersReduced) {
      setIsVisible(true)
      return
    }

    const node = ref.current
    if (!node) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(entry.target)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    // Safety net: never leave content stuck at opacity 0 if the observer
    // does not fire (odd scroll containers, print, headless capture).
    const failsafe = setTimeout(() => setIsVisible(true), 2500)

    return () => {
      clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export const getStaggerDelay = (index: number, baseDelay = 100) => index * baseDelay

type Style = { opacity: number; transform: string; transition: string }

const build = (isVisible: boolean, hidden: string, delay: number, duration = 0.6): Style => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'none' : hidden,
  transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
})

export const animationVariants = {
  fadeInUp: (v: boolean, d = 0) => build(v, 'translateY(30px)', d),
  fadeInLeft: (v: boolean, d = 0) => build(v, 'translateX(-30px)', d),
  fadeInRight: (v: boolean, d = 0) => build(v, 'translateX(30px)', d),
  scaleIn: (v: boolean, d = 0) => build(v, 'scale(0.94)', d),
  slideInUp: (v: boolean, d = 0) => build(v, 'translateY(50px)', d, 0.8),
}
