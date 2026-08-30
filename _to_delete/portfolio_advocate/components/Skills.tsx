'use client'

import { useState, useEffect } from 'react'
import { Brain, Code2, Server, Database, Layers, Wrench, type LucideIcon } from 'lucide-react'
import SectionBackground from './SectionBackground'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

const Skills = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ triggerOnce: true })
  
  const [currentSet, setCurrentSet] = useState(0)
  const [autoSlide, setAutoSlide] = useState(true)

  const handleManualNavigation = (index: number) => {
    setCurrentSet(index)
    setAutoSlide(false)
    setTimeout(() => setAutoSlide(true), 10000)
  }

  const skillSets = [
    // AI & Machine Learning
    [
      { name: 'LLM Integration', level: 92, color: '#22D3EE' },
      { name: 'Google Gemini', level: 90, color: '#38BDF8' },
      { name: 'RAG Pipelines', level: 85, color: '#60A5FA' },
      { name: 'NLP', level: 86, color: '#2DD4BF' },
      { name: 'Supervised Learning', level: 85, color: '#0EA5E9' },
      { name: 'Pandas & NumPy', level: 87, color: '#3B82F6' },
      { name: 'Model Evaluation', level: 83, color: '#06B6D4' },
      { name: 'Computer Vision', level: 76, color: '#818CF8' },
    ],

    // Languages
    [
      { name: 'Python', level: 90, color: '#22D3EE' },
      { name: 'C#', level: 87, color: '#38BDF8' },
      { name: 'JavaScript', level: 90, color: '#60A5FA' },
      { name: 'TypeScript', level: 82, color: '#2DD4BF' },
      { name: 'Java', level: 82, color: '#0EA5E9' },
      { name: 'SQL', level: 89, color: '#3B82F6' },
      { name: 'Dart', level: 84, color: '#06B6D4' },
      { name: 'Git', level: 88, color: '#818CF8' },
    ],

    // Backend & APIs
    [
      { name: 'ASP.NET Core', level: 88, color: '#22D3EE' },
      { name: 'Node.js', level: 89, color: '#38BDF8' },
      { name: 'Express.js', level: 87, color: '#60A5FA' },
      { name: 'Entity Framework', level: 85, color: '#2DD4BF' },
      { name: 'REST APIs', level: 90, color: '#0EA5E9' },
      { name: 'WebSockets', level: 84, color: '#3B82F6' },
      { name: 'Microservices', level: 78, color: '#06B6D4' },
      { name: 'RBAC & Auth', level: 85, color: '#818CF8' },
    ],

    // Data Engineering
    [
      { name: 'Apache Kafka', level: 82, color: '#22D3EE' },
      { name: 'Apache Airflow', level: 80, color: '#38BDF8' },
      { name: 'Delta Lake', level: 78, color: '#60A5FA' },
      { name: 'ETL Pipelines', level: 84, color: '#2DD4BF' },
      { name: 'Power BI', level: 80, color: '#0EA5E9' },
      { name: 'Data Modelling', level: 87, color: '#3B82F6' },
      { name: 'JSON Schema', level: 85, color: '#06B6D4' },
      { name: 'Query Optimization', level: 86, color: '#818CF8' },
    ],

    // Databases & Frontend
    [
      { name: 'SQL Server', level: 88, color: '#22D3EE' },
      { name: 'MySQL', level: 87, color: '#38BDF8' },
      { name: 'PostgreSQL', level: 79, color: '#60A5FA' },
      { name: 'Angular', level: 85, color: '#2DD4BF' },
      { name: 'React', level: 84, color: '#0EA5E9' },
      { name: 'Flutter', level: 85, color: '#3B82F6' },
      { name: 'Tailwind CSS', level: 86, color: '#06B6D4' },
      { name: 'Bootstrap', level: 85, color: '#818CF8' },
    ],

    // DevOps, QA & Tooling
    [
      { name: 'CI/CD Pipelines', level: 88, color: '#22D3EE' },
      { name: 'Docker', level: 82, color: '#38BDF8' },
      { name: 'GitHub Actions', level: 85, color: '#60A5FA' },
      { name: 'Azure', level: 75, color: '#2DD4BF' },
      { name: 'Selenium', level: 80, color: '#0EA5E9' },
      { name: 'PyTest & NUnit', level: 82, color: '#3B82F6' },
      { name: 'Postman', level: 88, color: '#06B6D4' },
      { name: 'Jira & Agile', level: 86, color: '#818CF8' },
    ],
  ]

  const categoryIcons: LucideIcon[] = [Brain, Code2, Server, Layers, Database, Wrench]

  const categoryNames = [
    'AI & Machine Learning',
    'Programming Languages',
    'Backend & APIs',
    'Data Engineering',
    'Databases & Frontend',
    'DevOps, QA & Tooling'
  ]

  useEffect(() => {
    if (skillsVisible && autoSlide) {
      const interval = setInterval(() => {
        setCurrentSet((prev) => (prev + 1) % skillSets.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [skillsVisible, skillSets.length, autoSlide])

  return (
    <SectionBackground variant="secondary" className="section-padding" id="skills">
      <div className="container-custom px-4 sm:px-6">
        <div 
          ref={headerRef}
          className="text-center mb-12 sm:mb-16"
          style={animationVariants.fadeInUp(headerVisible)}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4">
            From model integration and data pipelines to the backends, databases, and delivery that carry them
          </p>
        </div>
        
        {/* Manual Navigation Buttons */}
        <div 
          className="flex justify-center mb-6 sm:mb-8 flex-wrap gap-2 sm:gap-3 px-4"
          style={animationVariants.fadeInUp(headerVisible, 200)}
        >
          {categoryNames.map((category, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`px-3 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 min-h-[44px] transform hover:scale-105 ${
                currentSet === index
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-ink-900/55 text-slate-300 hover:bg-ink-900/70'
              }`}
              style={animationVariants.scaleIn(headerVisible, getStaggerDelay(index, 80))}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category Title */}
        <div 
          className="text-center mb-12"
          style={animationVariants.fadeInUp(headerVisible, 400)}
        >
          <div className="inline-block px-8 py-4 bg-ink-900/80 backdrop-blur-sm rounded-2xl border border-cyan-500/20 shadow-lg transform hover:scale-105 transition-all duration-300">
            <h3 className="relative z-10 text-2xl font-bold bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent transition-all duration-700">
              {categoryNames[currentSet]}
            </h3>
          </div>
        </div>
        
        {/* Enhanced Skills Container */}
        <div 
          className="relative overflow-hidden bg-ink-900/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-cyan-500/20 shadow-xl transform hover:shadow-2xl transition-all duration-300"
          style={animationVariants.scaleIn(headerVisible, 600)}
        >
          <div 
            ref={skillsRef}
            className="flex transition-transform duration-1000 ease-out"
            style={{ transform: `translateX(-${currentSet * 100}%)` }}
          >
            {skillSets.map((skillSet, setIndex) => (
              <div key={setIndex} className="w-full flex-shrink-0 px-4 sm:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                  {skillSet.map((skill, index) => (
                    <SkillRing
                      key={`${setIndex}-${skill.name}`}
                      skill={skill}
                      icon={categoryIcons[setIndex]}
                      index={index}
                      inView={skillsVisible && currentSet === setIndex}
                      delay={index * 80}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Progress Indicators */}
        <div 
          className="flex justify-center mt-10 space-x-3"
          style={animationVariants.fadeInUp(skillsVisible, 800)}
        >
          {skillSets.map((_, setIndex) => (
            <div
              key={setIndex}
              className={`h-2 rounded-full transition-all duration-500 transform hover:scale-125 ${
                currentSet === setIndex 
                  ? 'w-12 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg' 
                  : 'w-2 bg-ink-900/55 hover:bg-ink-900/70'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionBackground>
  )
}

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillRingProps {
  skill: Skill
  icon: LucideIcon
  index: number
  inView: boolean
  delay: number
}

function SkillRing({ skill, icon: Icon, index, inView, delay }: SkillRingProps) {
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    if (inView) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        const duration = 1500 // Faster animation - 1.5 seconds
        const steps = 60 // Optimized steps for smooth but fast progress
        const increment = skill.level / steps
        const stepDuration = duration / steps
        
        let currentProgress = 0
        const interval = setInterval(() => {
          currentProgress += increment
          if (currentProgress >= skill.level) {
            currentProgress = skill.level
            setIsAnimating(false)
            clearInterval(interval)
          }
          setProgress(currentProgress)
          setCount(Math.round(currentProgress))
        }, stepDuration)
        
        return () => clearInterval(interval)
      }, delay)
      
      return () => clearTimeout(timer)
    } else {
      setProgress(0)
      setCount(0)
      setIsAnimating(false)
    }
  }, [inView, skill.level, delay])

  const circumference = 2 * Math.PI * 42
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 sm:mb-4 transform transition-all duration-300 group-hover:scale-105">
        <svg className="w-28 h-28 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="rgba(148,163,184,0.18)"
            strokeWidth="5"
            fill="none"
          />
          {/* Progress circle - clean without shadows */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={skill.color}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.1s linear'
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-1 sm:mb-2 transform transition-transform duration-300 group-hover:scale-110">
            <Icon size={22} strokeWidth={1.75} style={{ color: skill.color }} />
          </div>
          <div className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
            isAnimating ? 'text-cyan-300' : 'text-white'
          }`}>
            {count}%
          </div>
        </div>
      </div>
      
      <h3 className="text-xs sm:text-sm font-semibold text-center text-slate-100 group-hover:text-cyan-300 transition-colors duration-300 px-1">
        {skill.name}
      </h3>
    </div>
  )
}

export default Skills
