'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Mail } from 'lucide-react'
import { useI18n } from './I18nProvider'
import LanguageSwitcher from './LanguageSwitcher'
import { personalByLocale } from '@/data/personal'

export default function Navigation() {
  const { t, locale, href } = useI18n()
  const pathname = usePathname() || '/'
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const home = href('/')
  const isHome = pathname === home

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes
  useEffect(() => setIsOpen(false), [pathname])

  /** On the home page anchors stay local; elsewhere they point back home. */
  const anchor = (hash: string) => (isHome ? `#${hash}` : `${home}#${hash}`)

  const navItems = [
    { hash: 'assistant', label: t.nav.assistant },
    { hash: 'about', label: t.nav.about },
    { hash: 'skills', label: t.nav.skills },
    { hash: 'projects', label: t.nav.projects },
    { hash: 'experience', label: t.nav.experience },
    { hash: 'certifications', label: t.nav.certifications },
  ]

  const firstName = personalByLocale[locale].name.split(' ')[0]
  const lastName = personalByLocale[locale].name.split(' ').slice(1).join(' ')

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-ink-950/85 backdrop-blur-md shadow-lg border-b border-cyan-500/20 py-3'
          : 'bg-ink-950/60 backdrop-blur-sm py-4'
      }`}
      aria-label={t.nav.home}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4">
          <Link href={home} className="group flex-shrink-0">
            <span className="relative inline-block">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                {firstName}
              </span>
              <span className="text-xl sm:text-2xl font-light text-slate-300 ms-1.5">{lastName}</span>
              <span className="absolute -bottom-1 start-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.hash}
                  href={anchor(item.hash)}
                  className="relative group whitespace-nowrap py-2 text-sm xl:text-[0.95rem] font-medium text-slate-300 transition-colors hover:text-cyan-400"
                >
                  {item.label}
                  <span className="absolute -bottom-1 start-0 h-0.5 w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href={anchor('contact')}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-glow"
              >
                <Mail size={16} aria-hidden="true" />
                {t.nav.contact}
              </a>
            </div>

            <LanguageSwitcher />

            <button
              type="button"
              className="lg:hidden rounded-full p-2 text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden mt-4 rounded-2xl border-t border-cyan-500/20 bg-ink-950/95 py-3 backdrop-blur-md"
          >
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={anchor(item.hash)}
                className="block rounded-lg px-4 py-3 font-medium text-slate-300 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={anchor('contact')}
              className="mx-4 mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              <Mail size={16} aria-hidden="true" />
              {t.nav.contact}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
