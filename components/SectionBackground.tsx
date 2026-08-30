import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

const backgrounds: Record<Variant, string> = {
  primary: 'bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950',
  secondary: 'bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900',
  tertiary: 'bg-gradient-to-br from-ink-950 via-[#071A2E] to-ink-950',
  quaternary: 'bg-gradient-to-br from-ink-900 via-[#06182B] to-ink-950',
}

export default function SectionBackground({
  variant,
  children,
  className = '',
  id,
}: {
  variant: Variant
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`${backgrounds[variant]} relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-overlay opacity-[0.35]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-sky-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
