'use client'

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { useSite } from '@/lib/site-context'

const Footer = () => {
  const { t, data } = useSite()
  const { personal } = data
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink-950 text-fg">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-xl font-bold text-primary-400 mb-4">{personal.name}</h3>
            <p className="text-body mb-4">{t.footer.blurb}</p>
            <div className="flex gap-4">
              <a href={`mailto:${personal.email}`} className="text-subtle hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {t.nav.items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-body hover:text-primary-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="text-body hover:text-primary-400 transition-colors">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2 text-body">
              {t.footer.serviceList.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cyan-500/15">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-subtle text-sm mb-4 md:mb-0">
            © {currentYear} {personal.name}. {t.footer.rights} {t.footer.builtWith}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-subtle hover:text-primary-400 transition-colors"
            aria-label={t.footer.backToTop}
          >
            <span className="text-sm">{t.footer.backToTop}</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
