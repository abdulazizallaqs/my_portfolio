'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ExternalLink, Github, Check, Layers, Sparkles } from 'lucide-react'
import { useI18n } from './I18nProvider'
import { projects, type Project } from '@/data/projects'

export default function ProjectDetail({ project }: { project: Project }) {
  const { t, locale, href } = useI18n()
  const content = project[locale]

  const index = projects.findIndex((p) => p.slug === project.slug)
  const previous = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  return (
    <article>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-cyan-500/15 bg-gradient-to-br from-ink-950 via-[#06182E] to-ink-950 pb-14 pt-32">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" aria-hidden="true" />
        <div
          className={`pointer-events-none absolute -top-24 end-0 h-80 w-80 rounded-full bg-gradient-to-br ${project.accent} opacity-20 blur-3xl`}
          aria-hidden="true"
        />

        <div className="container-custom relative z-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href={href('/projects')}
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              <ArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" />
              {t.projects.backToProjects}
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{t.projects.status[project.status]}</span>
            <span className="chip">
              <span className="latin">{project.year}</span>
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-cyan-200/90 sm:text-xl">{content.tagline}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-400">{content.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-ink-900/70 px-5 py-3 font-semibold text-slate-100 transition-all hover:border-cyan-400/60 hover:text-cyan-200"
              >
                <Github size={18} aria-hidden="true" />
                {t.projects.code}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-500"
              >
                <ExternalLink size={18} aria-hidden="true" />
                {t.projects.demo}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950">
        <div className="container-custom py-14">
          {/* ── Meta strip ─────────────────────────────────────── */}
          <dl className="mb-14 grid gap-4 rounded-2xl border border-cyan-500/15 bg-ink-900/60 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {t.projects.meta.year}
              </dt>
              <dd className="mt-1 font-semibold text-white">
                <span className="latin">{project.year}</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {t.projects.meta.status}
              </dt>
              <dd className="mt-1 font-semibold text-white">{t.projects.status[project.status]}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {t.projects.meta.role}
              </dt>
              <dd className="mt-1 font-semibold text-white">{content.role}</dd>
            </div>
          </dl>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="min-w-0 space-y-14">
              <Section id="overview" title={t.projects.sections.overview}>
                <p className="text-lg leading-relaxed text-slate-300">{content.overview}</p>
              </Section>

              <Section id="problem" title={t.projects.sections.problem}>
                <p className="leading-relaxed text-slate-300">{content.problem}</p>
              </Section>

              <Section id="solution" title={t.projects.sections.solution}>
                <p className="leading-relaxed text-slate-300">{content.solution}</p>
              </Section>

              <Section id="features" title={t.projects.sections.features}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {content.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-cyan-500/15 bg-ink-900/60 p-5 transition-colors hover:border-cyan-400/35"
                    >
                      <h3 className="mb-2 flex items-start gap-2 text-base font-semibold text-white">
                        <Sparkles size={16} className="mt-1 flex-shrink-0 text-cyan-400" aria-hidden="true" />
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="architecture" title={t.projects.sections.architecture}>
                <ol className="space-y-3">
                  {content.architecture.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-start gap-4 rounded-xl border border-cyan-500/10 bg-ink-900/40 p-4"
                    >
                      <span className="latin flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-sm font-bold text-cyan-300">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section id="highlights" title={t.projects.sections.highlights}>
                <ul className="space-y-3">
                  {content.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={18} className="mt-1 flex-shrink-0 text-teal-400" aria-hidden="true" />
                      <span className="leading-relaxed text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {project.images.length > 0 && (
                <Section id="gallery" title={t.projects.sections.gallery}>
                  <div
                    className={`grid gap-5 ${
                      project.images[0].height > project.images[0].width
                        ? 'grid-cols-2 sm:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {project.images.map((image) => (
                      <figure
                        key={image.src}
                        className="overflow-hidden rounded-2xl border border-cyan-500/15 bg-ink-900/60"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt[locale]}
                          width={image.width}
                          height={image.height}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                          className="h-auto w-full"
                        />
                        <figcaption className="px-4 py-3 text-xs leading-relaxed text-slate-500">
                          {image.alt[locale]}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-cyan-500/15 bg-ink-900/60 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  <Layers size={16} aria-hidden="true" />
                  {t.projects.sections.stack}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech} className="chip">
                      <span className="latin">{tech}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {t.projects.onThisPage}
                </h2>
                <nav>
                  <ul className="space-y-2 text-sm">
                    {[
                      ['overview', t.projects.sections.overview],
                      ['problem', t.projects.sections.problem],
                      ['solution', t.projects.sections.solution],
                      ['features', t.projects.sections.features],
                      ['architecture', t.projects.sections.architecture],
                      ['highlights', t.projects.sections.highlights],
                      ...(project.images.length > 0
                        ? ([['gallery', t.projects.sections.gallery]] as [string, string][])
                        : []),
                    ].map(([id, label]) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="text-slate-400 transition-colors hover:text-cyan-300"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>

          {/* ── Prev / next ────────────────────────────────────── */}
          <nav className="mt-16 grid gap-4 border-t border-cyan-500/15 pt-8 sm:grid-cols-2">
            {previous ? (
              <Link
                href={href(`/projects/${previous.slug}`)}
                className="group rounded-2xl border border-cyan-500/15 bg-ink-900/60 p-5 transition-all hover:border-cyan-400/40"
              >
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <ArrowLeft size={14} className="rtl:rotate-180" aria-hidden="true" />
                  {t.projects.previous}
                </span>
                <span className="mt-2 block font-semibold text-white group-hover:text-cyan-300">
                  {previous[locale].title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={href(`/projects/${next.slug}`)}
                className="group rounded-2xl border border-cyan-500/15 bg-ink-900/60 p-5 text-end transition-all hover:border-cyan-400/40"
              >
                <span className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {t.projects.next}
                  <ArrowRight size={14} className="rtl:rotate-180" aria-hidden="true" />
                </span>
                <span className="mt-2 block font-semibold text-white group-hover:text-cyan-300">
                  {next[locale].title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
        <span className="bg-gradient-to-r from-white via-cyan-200 to-sky-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {children}
    </section>
  )
}
