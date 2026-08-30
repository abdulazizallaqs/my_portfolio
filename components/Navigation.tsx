'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Mail, Sun, Moon, Languages } from 'lucide-react'
import { useSite } from '@/lib/site-context'

/** Language + theme switches, shared by the desktop bar and the mobile sheet. */
function Switches() {
  const { t, lang, theme, toggleLang, toggleTheme } = useSite()

  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-full border border-cyan-500/25 bg-ink-800/70 text-body hover:text-cyan-300 hover:border-cyan-400/50 transition-all duration-300'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLang}
        aria-label={t.langAria}
        title={t.langAria}
        className={`${base} px-3 h-10 text-xs font-semibold`}
      >
        <Languages size={15} />
        <span className={lang === 'en' ? 'font-arabic' : ''}>{t.langLabel}</span>
      </button>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t.themeAria.toLight : t.themeAria.toDark}
        title={theme === 'dark' ? t.themeAria.toLight : t.themeAria.toDark}
        className={`${base} w-10 h-10`}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  )
}

const Navigation = () => {
  const { t, data } = useSite()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [first, ...rest] = data.personal.name.split(' ')

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-ink-900/70 backdrop-blur-md shadow-lg border-b border-cyan-500/20 py-3'
          : 'bg-ink-900/60 backdrop-blur-sm py-4'
      }`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full gap-4 2xl:gap-8">
          {/* Wordmark */}
          <div className="flex-shrink-0">
            <a href="#" className="group flex items-center">
              <div className="relative">
                <span className="text-2xl font-bold brand-gradient tracking-tight">{first}</span>
                <span className="text-2xl font-light text-body ms-1">{rest.join(' ')}</span>
                <div className="absolute -bottom-1 start-0 w-0 h-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop */}
            <div className="hidden xl:flex items-center gap-4 2xl:gap-6 flex-nowrap">
              {t.nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-body hover:text-cyan-400 font-medium transition-all duration-300 relative group py-2 whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}

              <Switches />

              <a
                href="#contact"
                className="px-4 2xl:px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-lg hover:shadow-glow transform hover:scale-105"
              >
                <Mail size={16} />
                {t.nav.contact}
              </a>
            </div>

            {/* Mobile */}
            <div className="xl:hidden flex items-center gap-2">
              <Switches />
              <button
                className="p-2 rounded-full hover:bg-cyan-500/10 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X size={24} className="text-body" />
                ) : (
                  <Menu size={24} className="text-body" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        {isOpen && (
          <div className="xl:hidden mt-4 py-4 border-t border-cyan-500/20 bg-ink-900/80 backdrop-blur-md rounded-2xl">
            {t.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-body hover:text-cyan-400 font-medium transition-colors rounded-lg hover:bg-cyan-500/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 mt-4 mx-4 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
            >
              <Mail size={16} />
              {t.nav.contact}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
