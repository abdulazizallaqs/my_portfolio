import React from 'react'

interface SectionBackgroundProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'hero'
  children: React.ReactNode
  className?: string
  id?: string
}

const SectionBackground = ({ variant, children, className = '', id }: SectionBackgroundProps) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950'
      case 'primary':
        return 'bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950'
      case 'secondary':
        return 'bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900'
      case 'tertiary':
        return 'bg-gradient-to-br from-ink-950 via-ink-850 to-ink-950'
      case 'quaternary':
        return 'bg-gradient-to-br from-ink-900 via-ink-850 to-ink-950'
      default:
        return 'bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950'
    }
  }

  return (
    <section id={id} className={`${getBackgroundClasses()} relative overflow-hidden ${className}`}>
      {/* Ambient glow + circuit grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-overlay opacity-[0.35]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 left-16 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-48 right-32 w-2 h-2 bg-sky-400/50 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-48 right-16 w-2 h-2 bg-teal-400/50 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export default SectionBackground
