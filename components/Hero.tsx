'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { useSite } from '@/lib/site-context'

const Hero = () => {
  const { t, data } = useSite()
  const { personal } = data
  const [displayedName, setDisplayedName] = useState('')
  const [isNameComplete, setIsNameComplete] = useState(false)
  const [currentRole, setCurrentRole] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number, opacity: number}>>([])
  
  const fullName = personal.name
  const roles = useMemo(() => [...t.hero.roles], [t])

  // Name typing effect
  useEffect(() => {
    if (!fullName) return
    setDisplayedName('')
    setIsNameComplete(false)
    
    let timeout: NodeJS.Timeout
    let currentIndex = 0
    
    const typeCharacter = () => {
      if (currentIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, currentIndex))
        currentIndex++
        
        if (currentIndex <= fullName.length) {
          timeout = setTimeout(typeCharacter, 100)
        } else {
          setTimeout(() => setIsNameComplete(true), 500)
        }
      }
    }
    
    // Start typing after delay
    timeout = setTimeout(typeCharacter, 1000)
    
    return () => clearTimeout(timeout)
  }, [fullName])

  // Role rotation effect
  useEffect(() => {
    if (!isNameComplete) return
    
    let typeTimeout: NodeJS.Timeout
    let eraseTimeout: NodeJS.Timeout
    let cycleTimeout: NodeJS.Timeout
    
    const typeRole = (role: string) => {
      let charIndex = 0
      
      const typeChar = () => {
        if (charIndex <= role.length) {
          setCurrentRole(role.slice(0, charIndex))
          charIndex++
          
          if (charIndex <= role.length) {
            typeTimeout = setTimeout(typeChar, 80)
          }
        }
      }
      
      typeChar()
    }
    
    const eraseRole = (callback: () => void) => {
      const currentText = roles[roleIndex]
      let charIndex = currentText.length
      
      const eraseChar = () => {
        if (charIndex >= 0) {
          setCurrentRole(currentText.slice(0, charIndex))
          charIndex--
          
          if (charIndex >= 0) {
            eraseTimeout = setTimeout(eraseChar, 50)
          } else {
            setTimeout(callback, 200)
          }
        }
      }
      
      eraseChar()
    }
    
    const cycleRoles = () => {
      // Type current role
      typeRole(roles[roleIndex])
      
      // After 3 seconds, erase and move to next
      cycleTimeout = setTimeout(() => {
        eraseRole(() => {
          setRoleIndex(prev => (prev + 1) % roles.length)
        })
      }, 3000)
    }
    
    // Start the cycle
    const initialTimeout = setTimeout(cycleRoles, 500)
    
    return () => {
      clearTimeout(typeTimeout)
      clearTimeout(eraseTimeout)
      clearTimeout(cycleTimeout)
      clearTimeout(initialTimeout)
    }
  }, [isNameComplete, roleIndex, roles])

  // Optimized particles
  useEffect(() => {
    const particleCount = 50
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.6 + 0.2
    }))
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y <= -5 ? 105 : particle.y - particle.speed
      })))
    }

    const interval = setInterval(animateParticles, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-950 via-ink-850 to-ink-950 pt-20 relative overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-cyan-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Circuit grid */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl top-20 left-10"></div>
        <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl bottom-20 right-10"></div>
        <div className="absolute w-72 h-72 bg-sky-500 rounded-full blur-3xl top-1/3 right-1/4"></div>
      </div>

      {/* Content Layer */}
      <div className="container-custom text-center relative z-10 px-4 sm:px-6">
        {/* Professional Profile Image */}
        <div className="mb-12 mt-16 flex justify-center">
          <div className="relative group">
            {/* Subtle glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/40 via-sky-500/40 to-blue-600/40 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-all duration-700"></div>
            
            {/* Main image container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 p-1 shadow-glow">
              <div className="w-full h-full rounded-full overflow-hidden bg-ink-950">
                <Image
                  src="/profile.jpg"
                  alt={`${personal.name} — ${personal.title}`}
                  width={512}
                  height={512}
                  priority
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>

            {/* Subtle ring animation */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/30 group-hover:border-cyan-300/60 transition-all duration-500"></div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-12">
          <p className={`text-xl sm:text-2xl text-body mb-6 font-medium transition-all duration-1000 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {t.hero.greeting}
          </p>
          <h1 className="leading-none mb-8">
            {/*
              The visible name types itself in, so on the server — and for any
              crawler that does not run JavaScript — the H1 would otherwise be
              empty. This carries the real heading text at all times; the
              animated version below is decorative.
            */}
            <span className="sr-only">
              {personal.name} — {personal.title}
            </span>
            <span aria-hidden="true" className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="brand-gradient">
                {displayedName.split(' ')[0]}
              </span>
              {displayedName.split(' ').slice(1).join(' ') && (
                <span className="text-fg font-light ms-3 sm:ms-4">
                  {displayedName.split(' ').slice(1).join(' ')}
                </span>
              )}
              <span className={`text-fg ${isNameComplete ? 'animate-pulse' : 'animate-pulse'}`}>|</span>
            </span>
          </h1>
        </div>
        
        <div className="mb-12">
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl mb-6 font-medium transition-all duration-1000 delay-500 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="brand-gradient">{t.hero.title}</span>
          </h2>
          
          {/*
            The role text types itself out and erases again, so its length — and
            therefore its wrapped line count — changes every frame. Reserving two
            lines of height stops the block collapsing and shunting the rest of
            the hero up and down on narrow screens.
          */}
          <p className="text-lg sm:text-xl text-body max-w-3xl mx-auto leading-relaxed min-h-[3.75rem] sm:min-h-[4.25rem] px-2">
            <span className="brand-gradient">
              {currentRole}
            </span>
            {isNameComplete && (
              <span className="animate-pulse text-cyan-400">|</span>
            )}
          </p>
          
          <p className={`text-base sm:text-lg text-subtle max-w-2xl mx-auto mt-4 leading-relaxed transition-all duration-1000 delay-1000 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {personal.tagline}
          </p>
        </div>

        {/* CTA */}
        <div className={`mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-1500 ${isNameComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a
            href="#assistant"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-cyan-400 hover:via-sky-400 hover:to-blue-500 transition-all duration-500 shadow-glow hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden"
          >
            <Sparkles size={20} className="relative z-10" />
            <span className="relative z-10">{t.hero.askAI}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pure/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-0"></div>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center px-8 py-4 border border-cyan-400/40 text-cyan-200 rounded-2xl font-semibold hover:border-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105"
          >
            {t.hero.viewWork}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
