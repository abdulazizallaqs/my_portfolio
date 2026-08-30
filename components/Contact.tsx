'use client'

import { useRef, useState } from 'react'
import { Mail, Linkedin, Github, MapPin, Send, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useI18n } from './I18nProvider'
import { languagesByLocale, personal, personalByLocale } from '@/data/personal'
import { useScrollAnimation, animationVariants, getStaggerDelay } from '@/hooks/useScrollAnimation'

type Status = 'idle' | 'success' | 'error'

export default function Contact() {
  const { t, locale } = useI18n()
  const p = personalByLocale[locale]
  const formRef = useRef<HTMLFormElement>(null)

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = t.contact.form.required.name
    if (!form.email.trim()) next.email = t.contact.form.required.email
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = t.contact.form.required.emailInvalid
    if (!form.subject.trim()) next.subject = t.contact.form.required.subject
    if (!form.message.trim()) next.message = t.contact.form.required.message
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        // No mail service configured — hand the message to the visitor's mail client
        const subject = encodeURIComponent(form.subject)
        const body = encodeURIComponent(
          `${form.name} <${form.email}>\n\n${form.message}`
        )
        window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
      } else {
        await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
      }

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const methods = [
    {
      icon: Mail,
      label: t.contact.labels.email,
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'text-blue-400',
    },
    {
      icon: Phone,
      label: t.contact.labels.phone,
      value: personal.phone,
      href: personal.whatsapp,
      color: 'text-teal-400',
    },
    {
      icon: MapPin,
      label: t.contact.labels.location,
      value: p.location,
      href: null,
      color: 'text-sky-400',
    },
    {
      icon: Github,
      label: t.contact.labels.github,
      value: personal.githubHandle,
      href: personal.github,
      color: 'text-slate-100',
    },
  ]

  const inputClass = (field: string) =>
    `w-full rounded-2xl border bg-ink-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-600 transition-all focus:border-transparent focus:ring-2 focus:ring-cyan-500 ${
      errors[field] ? 'border-red-400/60' : 'border-cyan-500/20'
    }`

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-gradient-to-br from-ink-950 via-[#06182E] to-ink-950"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 start-20 h-64 w-64 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-3xl" />
        <div className="absolute bottom-20 end-20 h-64 w-64 rounded-full bg-gradient-to-r from-blue-400/20 to-sky-400/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div ref={headerRef} className="mb-14 text-center" style={animationVariants.fadeInUp(headerVisible)}>
            <h2 className="mb-5 text-4xl font-bold text-white sm:text-5xl">{t.contact.heading}</h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              {t.contact.subheading}
            </p>
          </div>

          <div ref={contentRef} className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8" style={animationVariants.fadeInLeft(contentVisible, 150)}>
              <div className="space-y-4">
                <h3 className="mb-2 text-2xl font-bold text-white">{t.contact.getInTouch}</h3>
                {methods.map((method, index) => {
                  const Icon = method.icon
                  const inner = (
                    <>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-950/60">
                        <Icon size={20} className={method.color} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-semibold text-white">{method.label}</span>
                        <span className="block text-sm text-slate-400">
                          <span className="latin">{method.value}</span>
                        </span>
                      </span>
                    </>
                  )
                  const className =
                    'flex items-center gap-4 rounded-2xl border border-cyan-500/20 bg-ink-900/50 p-4 transition-all duration-300'
                  return method.href ? (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`${className} hover:-translate-y-0.5 hover:border-cyan-400/50`}
                      style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 80) + 250)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div
                      key={method.label}
                      className={className}
                      style={animationVariants.fadeInLeft(contentVisible, getStaggerDelay(index, 80) + 250)}
                    >
                      {inner}
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">{t.contact.connect}</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: personal.linkedin, label: t.contact.labels.linkedin },
                    { icon: Github, href: personal.github, label: t.contact.labels.github },
                    { icon: Mail, href: `mailto:${personal.email}`, label: t.contact.labels.email },
                  ].map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-ink-900/70 text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:text-cyan-300"
                      >
                        <Icon size={20} aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-ink-900/55 p-6">
                <h3 className="mb-3 font-bold text-white">{t.contact.quickResponse}</h3>
                <p className="mb-2 text-sm text-slate-400">📧 {t.contact.emailResponse}</p>
                <p className="mb-4 text-sm text-slate-400">💬 {t.contact.whatsappResponse}</p>
                <h4 className="mb-2 font-bold text-white">{t.contact.languages}</h4>
                <div className="flex flex-wrap gap-2">
                  {languagesByLocale[locale].map((lang) => (
                    <span key={lang.name} className="chip">
                      {lang.name} — {lang.level}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl border border-cyan-500/20 bg-ink-900/70 p-6 shadow-xl sm:p-8"
              style={animationVariants.fadeInRight(contentVisible, 250)}
            >
              <h3 className="mb-6 text-2xl font-bold text-white">{t.contact.form.heading}</h3>

              <div aria-live="polite">
                {status === 'success' && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-4">
                    <CheckCircle className="text-teal-400" size={20} aria-hidden="true" />
                    <p className="text-teal-100">{t.contact.form.success}</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4">
                    <AlertCircle className="text-red-400" size={20} aria-hidden="true" />
                    <p className="text-red-100">{t.contact.form.error}</p>
                  </div>
                )}
              </div>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-white">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      aria-invalid={Boolean(errors.name)}
                      className={inputClass('name')}
                      placeholder={t.contact.form.namePlaceholder}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-white">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      dir="ltr"
                      value={form.email}
                      onChange={onChange}
                      aria-invalid={Boolean(errors.email)}
                      className={`${inputClass('email')} text-start`}
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-bold text-white">
                    {t.contact.form.subject} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.subject)}
                    className={inputClass('subject')}
                    placeholder={t.contact.form.subjectPlaceholder}
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-bold text-white">
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.message)}
                    className={`${inputClass('message')} resize-none`}
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send size={20} className="rtl:-scale-x-100" aria-hidden="true" />
                      {t.contact.form.send}
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
