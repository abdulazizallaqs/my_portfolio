import Hero from '@/components/Hero'
import AIAssistant from '@/components/AIAssistant'
import About from '@/components/About'
import Systems from '@/components/Systems'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

/**
 * The page itself, identical in both languages. Which language it renders in
 * is decided by the route that mounts it — `/` for English, `/ar` for Arabic —
 * so both are fully server-rendered and indexable.
 */
export default function SitePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <AIAssistant />
        <About />
        <Systems />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
