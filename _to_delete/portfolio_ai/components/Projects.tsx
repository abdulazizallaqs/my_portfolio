'use client'

import { useState } from 'react'
import { ExternalLink, Github, Star, Calendar, TrendingUp } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Projects = () => {
  const { projects } = portfolioData
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation({ triggerOnce: true })

  return (
    <SectionBackground variant="tertiary" className="section-padding" id="projects">
      <div className="container-custom">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Shipped work where the AI layer and the system around it were designed together
          </p>
        </div>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={animationVariants.slideInUp(projectsVisible, getStaggerDelay(index, 150))}
            >
              <ProjectCard3D project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </SectionBackground>
  )
}

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  impact: string
  github: string
  demo: string
  featured: boolean
}

interface ProjectCard3DProps {
  project: Project
  index: number
}

function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const isRealLink = (url: string) => Boolean(url) && url !== '#'
  const hasGithub = isRealLink(project.github)
  const hasDemo = isRealLink(project.demo)

  return (
    <div 
      className="relative h-[320px] sm:h-[380px] md:h-[420px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsFlipped(false)
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        } ${isHovered ? 'scale-105' : ''}`}
        style={{
          transform: `${isFlipped ? 'rotateY(180deg)' : ''} ${isHovered ? 'scale(1.05) translateY(-10px)' : ''}`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-ink-900/70 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-500/20 overflow-hidden">
          {/* Project Image/Gradient */}
          <div className={`h-32 sm:h-40 md:h-48 bg-gradient-to-br ${getProjectGradient(index)} relative`}>
            {project.featured && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1">
                <Star size={14} fill="currentColor" />
                Featured
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Front Content */}
          <div className="p-3 sm:p-4 md:p-6 flex flex-col h-[calc(100%-8rem)] sm:h-[calc(100%-10rem)] md:h-[calc(100%-12rem)]">
            <p className="text-slate-400 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed flex-grow">
              {project.description.length > 150 ? project.description.substring(0, 150) + '…' : project.description}
            </p>
            
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {project.tech.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 sm:px-3 py-1 bg-blue-500/15 text-blue-200 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 sm:px-3 py-1 bg-ink-800 text-slate-400 text-xs font-medium rounded-full">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            <div className="text-center mt-auto">
              <p className="text-xs text-slate-500 mb-2">Tap to see details</p>
              <div className="w-8 h-1 bg-blue-500 rounded mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-ink-900 via-[#0A2540] to-ink-950 border border-cyan-500/25 rounded-2xl shadow-glow text-white overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
              <Calendar size={18} className="text-cyan-300" />
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <TrendingUp size={14} className="text-teal-300" />
                <span className="text-xs sm:text-sm font-medium">Impact</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.impact}
              </p>
            </div>

            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-cyan-300">Tech Stack</h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-cyan-500/15 backdrop-blur-sm text-cyan-100 text-xs rounded border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-2 sm:gap-3">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/15 backdrop-blur-sm hover:bg-cyan-500/25 transition-colors py-3 sm:py-3 rounded-lg border border-cyan-500/20 min-h-[44px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} />
                  <span className="text-xs sm:text-sm font-medium">Code</span>
                </a>
              )}
              {hasDemo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 text-ink-950 hover:bg-cyan-400 transition-colors py-3 sm:py-3 rounded-lg font-semibold min-h-[44px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                  <span className="text-xs sm:text-sm">Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getProjectGradient(index: number) {
  const gradients = [
    'from-cyan-500 to-blue-700',
    'from-sky-500 to-indigo-700',
    'from-teal-500 to-cyan-700',
    'from-blue-500 to-cyan-700',
    'from-cyan-600 to-sky-800',
    'from-sky-600 to-blue-800'
  ]
  return gradients[index % gradients.length]
}

export default Projects
