'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { useI18n } from './I18nProvider'
import { personal, personalByLocale } from '@/data/personal'

export default function Footer() {
  const { t, locale, href } = useI18n()
  const p = personalByLocale[locale]
  const year = new Date().getFullYear()

  const links = [
    { hash: 'assistant', label: t.nav.assistant },
    { hash: 'about', label: t.nav.about },
    { hash: 'skills', label: t.nav.skills },
    { hash: 'projects', label: t.nav.projects },
    { hash: 'experience', label: t.nav.experience },
    { hash: 'certifications', label: t.nav.certifications },
    { hash: 'contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-ink-950 text-white">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-xl font-bold text-primary-400">{p.name}</h2>
            <p className="mb-4 text-slate-400">{t.footer.blurb}</p>
            <div className="flex gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="text-slate-500 transition-colors hover:text-primary-400"
                aria-label={t.contact.labels.email}
              >
                <Mail size={20} aria-hidden="true" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-primary-400"
                aria-label={t.contact.labels.linkedin}
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-primary-400"
                aria-label={t.contact.labels.github}
              >
                <Github size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={href('/projects')} className="text-slate-400 transition-colors hover:text-primary-400">
                  {t.projects.allHeading}
                </Link>
              </li>
              {links.map((link) => (
                <li key={link.hash}>
                  <a
                    href={`${href('/')}#${link.hash}`}
                    className="text-slate-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold">{t.footer.services}</h3>
            <ul className="space-y-2 text-slate-400">
              {t.footer.servicesList.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/15">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-slate-500">
            © <span className="latin">{year}</span> {p.name}. {t.footer.rights} {t.footer.builtWith}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-slate-500 transition-colors hover:text-primary-400"
          >
            <span className="text-sm">{t.footer.backToTop}</span>
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
