'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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
      { name: 'LLM Integration', level: 92, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: '#10a37f' },
      { name: 'Google Gemini', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', color: '#4285f4' },
      { name: 'RAG Pipelines', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg', color: '#f59e0b' },
      { name: 'NLP', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#7c3aed' },
      { name: 'Supervised Learning', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', color: '#ff9d00' },
      { name: 'Pandas & NumPy', level: 87, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', color: '#150458' },
      { name: 'Model Evaluation', level: 83, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', color: '#4dabcf' },
      { name: 'Computer Vision', level: 76, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', color: '#5c3ee8' },
    ],

    // Languages
    [
      { name: 'Python', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#ffd93d' },
      { name: 'C#', level: 87, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', color: '#68217a' },
      { name: 'JavaScript', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#f7df1e' },
      { name: 'TypeScript', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178c6' },
      { name: 'Java', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#f89820' },
      { name: 'SQL', level: 89, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479a1' },
      { name: 'Dart', level: 84, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', color: '#0175c2' },
      { name: 'Git', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#f05033' },
    ],

    // Backend & APIs
    [
      { name: 'ASP.NET Core', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg', color: '#512bd4' },
      { name: 'Node.js', level: 89, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#68d391' },
      { name: 'Express.js', level: 87, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg', color: '#000000' },
      { name: 'Entity Framework', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', color: '#8e44ad' },
      { name: 'REST APIs', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg', color: '#85ea2d' },
      { name: 'WebSockets', level: 84, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg', color: '#4a90e2' },
      { name: 'Microservices', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#ff9500' },
      { name: 'RBAC & Auth', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#d63aff' },
    ],

    // Data Engineering
    [
      { name: 'Apache Kafka', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', color: '#231f20' },
      { name: 'Apache Airflow', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg', color: '#017cee' },
      { name: 'Delta Lake', level: 78, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg', color: '#00add4' },
      { name: 'ETL Pipelines', level: 84, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#0ea5e9' },
      { name: 'Power BI', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg', color: '#f2c811' },
      { name: 'Data Modelling', level: 87, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
      { name: 'JSON Schema', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg', color: '#292929' },
      { name: 'Query Optimization', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#00758f' },
    ],

    // Databases & Frontend
    [
      { name: 'SQL Server', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg', color: '#cc2927' },
      { name: 'MySQL', level: 87, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479a1' },
      { name: 'PostgreSQL', level: 79, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791' },
      { name: 'Angular', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', color: '#dd0031' },
      { name: 'React', level: 84, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
      { name: 'Flutter', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: '#02569b' },
      { name: 'Tailwind CSS', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06b6d4' },
      { name: 'Bootstrap', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', color: '#7952b3' },
    ],

    // DevOps, QA & Tooling
    [
      { name: 'CI/CD Pipelines', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg', color: '#2088ff' },
      { name: 'Docker', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed' },
      { name: 'GitHub Actions', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#181717' },
      { name: 'Azure', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: '#0089d6' },
      { name: 'Selenium', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg', color: '#43b02a' },
      { name: 'PyTest & NUnit', level: 82, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg', color: '#0a9edc' },
      { name: 'Postman', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#ff6c37' },
      { name: 'Jira & Agile', level: 86, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', color: '#0052cc' },
    ],
  ]

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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
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
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/60 text-gray-700 hover:bg-white/80'
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
          <div className="inline-block px-8 py-4 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700">
              {categoryNames[currentSet]}
            </h3>
          </div>
        </div>
        
        {/* Enhanced Skills Container */}
        <div 
          className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/30 shadow-xl transform hover:shadow-2xl transition-all duration-300"
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
                  ? 'w-12 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg' 
                  : 'w-2 bg-white/60 hover:bg-white/80'
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
  icon: string
  color: string
}

interface SkillRingProps {
  skill: Skill
  index: number
  inView: boolean
  delay: number
}

function SkillRing({ skill, index, inView, delay }: SkillRingProps) {
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
            stroke="rgba(0,0,0,0.08)"
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
          <div className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 transform transition-transform duration-300 group-hover:scale-110">
            <Image 
              src={skill.icon} 
              alt={skill.name}
              width={32}
              height={32}
              className="w-full h-full object-contain"
              style={{ filter: skill.color === '#000000' ? 'invert(1)' : 'none' }}
            />
          </div>
          <div className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
            isAnimating ? 'text-indigo-600' : 'text-gray-800'
          }`}>
            {count}%
          </div>
        </div>
      </div>
      
      <h3 className="text-xs sm:text-sm font-semibold text-center text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 px-1">
        {skill.name}
      </h3>
    </div>
  )
}

export default Skills
