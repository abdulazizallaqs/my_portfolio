'use client'

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const Footer = () => {
  const { personal } = portfolioData
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-ink-950 text-white">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h3 className="text-xl font-bold text-primary-400 mb-4">{personal.name}</h3>
            <p className="text-slate-300 mb-4">
              Software &amp; AI Engineer building LLM-driven systems end to end — model integration, RAG pipelines, predictive analytics, and the scalable backends underneath.
            </p>
            <div className="flex space-x-4">
              <a href={`mailto:${personal.email}`} className="text-slate-500 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-slate-300 hover:text-primary-400 transition-colors">Background</a></li>
              <li><a href="#skills" className="text-slate-300 hover:text-primary-400 transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-slate-300 hover:text-primary-400 transition-colors">Projects</a></li>
              <li><a href="#experience" className="text-slate-300 hover:text-primary-400 transition-colors">Experience</a></li>
              <li><a href="#certifications" className="text-slate-300 hover:text-primary-400 transition-colors">Certifications</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-300">
              <li>LLM Integration & RAG Pipelines</li>
              <li>Machine Learning & Predictive Analytics</li>
              <li>Backend & API Engineering</li>
              <li>Data Engineering & ETL</li>
              <li>CI/CD & Secure Delivery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cyan-500/15">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {currentYear} {personal.name}. All rights reserved. Built with Next.js & Tailwind CSS.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-500 hover:text-primary-400 transition-colors"
            aria-label="Scroll to top"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
