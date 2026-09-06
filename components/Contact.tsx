'use client'

import { useState, useRef } from 'react'
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { useSite } from '@/lib/site-context'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const { t, data } = useSite()
  const { personal } = data
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ triggerOnce: true })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ triggerOnce: true })
  const formRef = useRef<HTMLFormElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = `${t.contact.name} ${t.contact.errRequired}`
    if (!formData.email.trim()) newErrors.email = `${t.contact.email} ${t.contact.errRequired}`
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.contact.errEmail
    if (!formData.subject.trim()) newErrors.subject = `${t.contact.subject} ${t.contact.errRequired}`
    if (!formData.message.trim()) newErrors.message = `${t.contact.message} ${t.contact.errRequired}`
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Check if EmailJS is configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        // Fallback: Create mailto link if EmailJS not configured
        const subject = encodeURIComponent(formData.subject)
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`)
        
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus('idle'), 5000)
        return
      }

      // Send email using EmailJS
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current!,
        publicKey
      )
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Email send error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Dialling the number and opening a WhatsApp chat are two different intents,
  // so they get two cards rather than one ambiguous "Phone / WhatsApp" row.
  const telHref = `tel:${personal.phone.replace(/[^\d+]/g, '')}`

  const contactMethods = [
    {
      icon: Mail,
      label: t.contact.labels.email,
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Phone,
      label: t.contact.labels.phone,
      value: personal.phone,
      href: telHref,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10'
    },
    {
      icon: MapPin,
      label: t.contact.labels.location,
      value: personal.location,
      href: '#',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Github,
      label: t.contact.labels.github,
      value: '@abdulazizallaqs',
      href: personal.github,
      color: 'text-fg',
      bgColor: 'bg-ink-900'
    },
    {
      icon: MessageCircle,
      label: t.contact.labels.whatsapp,
      value: personal.phone,
      href: personal.whatsapp,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personal.linkedin,
      color: 'text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: personal.github,
      color: 'text-fg'
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${personal.email}`,
      color: 'text-cyan-400'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-ink-950 via-ink-850 to-ink-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div 
            ref={headerRef}
            className="text-center mb-16"
            style={animationVariants.fadeInUp(headerVisible)}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-fg mb-6">{t.contact.heading}</h2>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              {t.contact.lede}
            </p>
          </div>

          <div ref={contentRef} className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div 
                className="space-y-6"
                style={animationVariants.fadeInLeft(contentVisible, 200)}
              >
                <h3 className="text-2xl font-bold text-fg mb-6">{t.contact.getInTouch}</h3>
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon
                  return (
                    <a
                      key={index}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-center p-4 ${method.bgColor} rounded-2xl border border-cyan-500/20 hover:shadow-lg transition-all duration-300 group transform hover:scale-105 hover:-translate-y-1`}
                      style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 100) + 300)}
                    >
                      <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center me-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent size={20} className={method.color} />
                      </div>
                      <div>
                        <p className="font-semibold text-fg">{method.label}</p>
                        <p className="text-muted text-sm">{method.value}</p>
                      </div>
                    </a>
                  )
                })}
              </div>

              {/* Social Links */}
              <div 
                className="space-y-6"
                style={animationVariants.fadeInLeft(contentVisible, 600)}
              >
                <h3 className="text-xl font-bold text-fg">{t.contact.connect}</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-ink-900/70 backdrop-blur-sm rounded-xl border border-cyan-500/20 flex items-center justify-center hover:shadow-lg transition-all duration-300 group transform hover:scale-110 hover:-translate-y-1"
                        style={animationVariants.scaleIn(contentVisible, getStaggerDelay(index, 100) + 700)}
                      >
                        <IconComponent size={20} className={`${social.color} group-hover:scale-110 transition-transform`} />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Quick Contact Info */}
              <div 
                className="bg-ink-900/55 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20"
                style={animationVariants.fadeInLeft(contentVisible, 800)}
              >
                <h4 className="font-bold text-fg mb-3">{t.contact.quickTitle}</h4>
                <p className="text-muted text-sm mb-2">{t.contact.quickEmail}</p>
                <p className="text-muted text-sm mb-4">{t.contact.quickWhats}</p>
                <h4 className="font-bold text-fg mb-2">{t.contact.languagesTitle}</h4>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((lang) => (
                    <span key={lang.name} className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full">
                      {lang.name} — {lang.level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div 
              className="bg-ink-900/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-cyan-500/20 transform hover:shadow-2xl transition-all duration-300"
              style={animationVariants.fadeInRight(contentVisible, 400)}
            >
              <h3 className="text-2xl font-bold text-fg mb-6">{t.contact.formTitle}</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex items-center gap-3 transform animate-pulse">
                  <CheckCircle className="text-teal-400" size={20} />
                  <p className="text-teal-200">{t.contact.success}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="text-red-400" size={20} />
                  <p className="text-red-300">{t.contact.failure}</p>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div style={animationVariants.fadeInUp(contentVisible, 600)}>
                    <label htmlFor="name" className="block text-sm font-bold text-fg mb-2">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-ink-900/55 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                        errors.name ? 'border-red-500/50' : 'border-cyan-500/20'
                      }`}
                      placeholder={t.contact.namePlaceholder}
                    />
                    {errors.name && <p role="alert" className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div style={animationVariants.fadeInUp(contentVisible, 700)}>
                    <label htmlFor="email" className="block text-sm font-bold text-fg mb-2">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-ink-900/55 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500/50' : 'border-cyan-500/20'
                      }`}
                      placeholder={t.contact.emailPlaceholder}
                    />
                    {errors.email && <p role="alert" className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div style={animationVariants.fadeInUp(contentVisible, 800)}>
                  <label htmlFor="subject" className="block text-sm font-bold text-fg mb-2">
                    {t.contact.subject} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-ink-900/55 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                      errors.subject ? 'border-red-500/50' : 'border-cyan-500/20'
                    }`}
                    placeholder={t.contact.subjectPlaceholder}
                  />
                  {errors.subject && <p role="alert" className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>
                
                <div style={animationVariants.fadeInUp(contentVisible, 900)}>
                  <label htmlFor="message" className="block text-sm font-bold text-fg mb-2">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-ink-900/55 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-cyan-500/20'
                    }`}
                    placeholder={t.contact.messagePlaceholder}
                  ></textarea>
                  {errors.message && <p role="alert" className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={animationVariants.scaleIn(contentVisible, 1000)}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cyan-500/20 border-t-pure rounded-full animate-spin"></div>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t.contact.send}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
