import type { Metadata } from 'next'
import en from '@/data/portfolio.json'
import ar from '@/data/portfolio.ar.json'
import type { Lang } from '@/lib/ui'

export const SITE_URL = 'https://abdulazizallaqs.com'

/** Every language is a real, crawlable URL. */
export const PATHS: Record<Lang, string> = { en: '/', ar: '/ar' }

const DATA = { en, ar: ar as unknown as typeof en }

/**
 * What the site should rank for.
 *
 * Two audiences search very differently. Someone hiring types a job title;
 * someone who needs software built types the outcome ("build me a website",
 * "مبرمج مواقع"). Each language page carries the terms people actually type in
 * that language — mixing them dilutes both.
 */
const KEYWORDS: Record<Lang, string[]> = {
  en: [
    'web application developer',
    'build a web app',
    'custom software development',
    'hire a software engineer',
    'freelance full stack developer',
    'web app developer Riyadh',
    'software developer Saudi Arabia',
    'AI developer for hire',
    'build an AI chatbot for my website',
    'MVP development',
    'Software Engineer',
    'AI Engineer',
    'Full Stack Engineer',
    'LLM Integration',
    'RAG Pipelines',
    'Machine Learning Engineer',
    'Data Engineer',
    'Next.js',
    'React',
    'Node.js',
    'ASP.NET Core',
    'Python',
    'Flutter',
    'Kafka',
    'Google Gemini',
    'OpenAI API',
    'Abdulaziz Alaqs',
    'Riyadh',
    'Saudi Arabia',
  ],
  ar: [
    'عبدالعزيز العقص',
    'مهندس برمجيات وذكاء اصطناعي',
    'مبرمج مواقع',
    'مطور مواقع',
    'مبرمج تطبيقات ويب',
    'برمجة موقع إلكتروني',
    'تصميم وبرمجة تطبيقات',
    'مطور ويب الرياض',
    'مبرمج مستقل السعودية',
    'مبرمج ذكاء اصطناعي',
    'برمجة نظام إداري',
    'دمج نماذج الذكاء الاصطناعي',
    'مبرمج ASP.NET Core',
    'مطور Flutter',
    'مهندس بيانات',
    'الرياض',
    'السعودية',
    'Abdulaziz Alaqs',
    'Next.js',
    'Node.js',
    'ASP.NET Core',
    'Flutter',
    'Google Gemini',
  ],
}

const TITLES: Record<Lang, string> = {
  en: 'Abdulaziz Alaqs — Software & AI Engineer | Web Apps Built End to End',
  ar: 'عبدالعزيز العقص — مهندس برمجيات وذكاء اصطناعي | أبني موقعك ونظامك كاملاً',
}

const DESCRIPTIONS: Record<Lang, string> = {
  en:
    'Need a web app, an internal system or an AI feature built? Abdulaziz Alaqs is a Software & AI Engineer in Riyadh who designs, builds and ships whole products alone — architecture, backend, database, AI layer and interface. Four systems live on the web right now.',
  ar:
    'تحتاج موقعاً أو نظاماً إدارياً أو ميزة ذكاء اصطناعي داخل منتجك؟ عبدالعزيز العقص مهندس برمجيات وذكاء اصطناعي في الرياض، يصمّم ويبني ويُطلق المنتج كاملاً بمفرده — المعمارية وقاعدة البيانات والواجهة الخلفية وطبقة الذكاء والواجهة فوقها. أربعة أنظمة تعمل الآن على الإنترنت، افتحها وجرّبها.',
}

/** hreflang: tells Google these are the same page in two languages. */
const LANGUAGE_ALTERNATES = {
  en: PATHS.en,
  ar: PATHS.ar,
  'x-default': PATHS.en,
}

export function metadataFor(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLES[lang],
    description: DESCRIPTIONS[lang],
    keywords: KEYWORDS[lang],
    authors: [{ name: DATA[lang].personal.name, url: SITE_URL }],
    creator: DATA[lang].personal.name,
    publisher: DATA[lang].personal.name,
    applicationName: TITLES[lang],
    category: 'technology',
    alternates: {
      canonical: PATHS[lang],
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      title: TITLES[lang],
      description: DESCRIPTIONS[lang],
      url: `${SITE_URL}${PATHS[lang]}`,
      siteName: DATA[lang].personal.name,
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_SA'],
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: TITLES[lang],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLES[lang],
      description: DESCRIPTIONS[lang],
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

/**
 * Structured data, generated from the same portfolio JSON the page renders, so
 * the two can never drift apart. Person + the services he offers + the shipped
 * software, which is what search engines use to answer "who can build me X".
 *
 * The `name` is whichever language this page is in, and the other spelling goes
 * in `alternateName`, so each page states plainly which name it answers to.
 */
export function buildJsonLd(lang: Lang) {
  const d = DATA[lang]
  const { personal, projects, experience, certifications, skills } = d as any

  const otherNames = Array.from(
    new Set(
      [personal.nameAlt, personal.nameArabic, DATA.en.personal.name].filter(
        (n: string) => n && n !== personal.name
      )
    )
  )

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: personal.name,
    alternateName: otherNames,
    jobTitle: personal.title,
    description: personal.tagline,
    email: `mailto:${personal.email}`,
    telephone: personal.phone,
    url: `${SITE_URL}${PATHS[lang]}`,
    image: `${SITE_URL}/profile.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: lang === 'ar' ? 'الرياض' : 'Riyadh',
      addressCountry: 'SA',
    },
    sameAs: [personal.github, personal.linkedin].filter(Boolean),
    knowsLanguage: ['ar', 'en'],
    knowsAbout: [
      ...skills.ai_ml.slice(0, 10),
      ...skills.programming.slice(0, 10),
      ...skills.tools.slice(0, 8),
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: experience.find((e: any) => /university|جامعة/i.test(e.company))?.company ??
        'Mustaqbal University',
    },
    worksFor: experience[0]?.company
      ? { '@type': 'Organization', name: experience[0].company }
      : undefined,
    hasCredential: certifications.map((c: any) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
    })),
  }

  const offers =
    lang === 'ar'
      ? [
          'برمجة تطبيقات ويب',
          'أنظمة إدارية ولوحات تحكم مخصّصة',
          'ميزات ذكاء اصطناعي: مساعدات، بحث دلالي، تلخيص، RAG',
          'خطوط بيانات ومنصات تحليلات',
          'تطبيقات جوال متعددة المنصات بـ Flutter',
          'تصميم واجهات برمجية وهندسة الواجهة الخلفية',
        ]
      : [
          'Web application development',
          'Custom business and admin systems',
          'AI features: chatbots, semantic search, summarisation, RAG',
          'Data pipelines and analytics platforms',
          'Cross-platform mobile apps with Flutter',
          'API design and backend engineering',
        ]

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: `${personal.name} — ${personal.title}`,
    description:
      lang === 'ar'
        ? 'تصميم وتنفيذ كامل لتطبيقات الويب والأنظمة الإدارية وخطوط البيانات وميزات الذكاء الاصطناعي — المعمارية والواجهة الخلفية وقاعدة البيانات وطبقة الذكاء والواجهة والنشر، بمهندس واحد.'
        : 'End-to-end design and delivery of web applications, internal business systems, data pipelines and AI features — architecture, backend, database, AI layer, interface and deployment, by one engineer.',
    provider: { '@id': `${SITE_URL}/#person` },
    url: `${SITE_URL}${PATHS[lang]}`,
    areaServed: [
      { '@type': 'Country', name: lang === 'ar' ? 'السعودية' : 'Saudi Arabia' },
      { '@type': 'Place', name: lang === 'ar' ? 'عن بُعد — عالمياً' : 'Remote — worldwide' },
    ],
    availableLanguage: ['ar', 'en'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'ar' ? 'ما الذي أبنيه' : 'What I build',
      itemListElement: offers.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  }

  const software = projects
    .filter((p: any) => p.demo)
    .map((p: any) => ({
      '@type': 'SoftwareApplication',
      name: p.title,
      description: p.description,
      url: p.demo,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      inLanguage: lang,
      author: { '@id': `${SITE_URL}/#person` },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'SAR' },
    }))

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${personal.name} — ${personal.title}`,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': `${SITE_URL}/#person` },
  }

  return { '@context': 'https://schema.org', '@graph': [person, service, website, ...software] }
}
