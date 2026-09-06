import portfolio from '@/data/portfolio.json'

export const SITE_URL = 'https://abdulazizallaqs.com'

const { personal, projects, experience, certifications, skills } = portfolio as any

/**
 * What the site should rank for.
 *
 * Two audiences search very differently. Someone hiring types a job title;
 * someone who needs software built types the outcome ("build me a website",
 * "مبرمج مواقع"). Both sets are here, in both languages, because the site
 * serves both and the assistant is written to detect which one arrived.
 */
export const KEYWORDS = [
  // Intent: I need something built (English)
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
  // Intent: I need something built (Arabic)
  'مبرمج مواقع',
  'مطور مواقع',
  'مبرمج تطبيقات ويب',
  'برمجة موقع إلكتروني',
  'تصميم وبرمجة تطبيقات',
  'مطور ويب الرياض',
  'مبرمج مستقل السعودية',
  'شركة برمجة تطبيقات',
  'مبرمج ذكاء اصطناعي',
  'برمجة نظام إداري',
  // Intent: I am hiring
  'Software Engineer',
  'AI Engineer',
  'Full Stack Engineer',
  'LLM Integration',
  'RAG Pipelines',
  'Machine Learning Engineer',
  'Data Engineer',
  // Stack
  'Next.js',
  'React',
  'Node.js',
  'ASP.NET Core',
  'Python',
  'Flutter',
  'Kafka',
  'Google Gemini',
  'OpenAI API',
  // Identity
  'Abdulaziz Alaqs',
  'عبدالعزيز العقص',
  'مهندس برمجيات وذكاء اصطناعي',
  'Riyadh',
  'Saudi Arabia',
]

export const TITLE = 'Abdulaziz Alaqs — Software & AI Engineer | Web Apps Built End to End'

export const DESCRIPTION =
  'Need a web app, an internal system or an AI feature built? Abdulaziz Alaqs is a Software & AI Engineer in Riyadh who designs, builds and ships whole products alone — architecture, backend, database, AI layer and interface. Four systems live on the web right now. مهندس برمجيات وذكاء اصطناعي لبناء المواقع والتطبيقات من الفكرة حتى الإطلاق.'

/**
 * Structured data, generated from the same portfolio.json the page renders, so
 * the two can never drift apart. Person + the services he offers + the shipped
 * software, which is what search engines use to answer "who can build me X".
 */
export function buildJsonLd() {
  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: personal.name,
    alternateName: [personal.nameArabic, personal.nameAlt].filter(Boolean),
    jobTitle: personal.title,
    description: personal.tagline,
    email: `mailto:${personal.email}`,
    telephone: personal.phone,
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
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
      name: 'Mustaqbal University',
    },
    worksFor: experience[0]?.company
      ? { '@type': 'Organization', name: experience[0].company }
      : undefined,
    hasCredential: certifications.slice(0, 13).map((c: any) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
    })),
  }

  const service = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Abdulaziz Alaqs — Software & AI Engineering',
    description:
      'End-to-end design and delivery of web applications, internal business systems, data pipelines and AI features — architecture, backend, database, AI layer, interface and deployment, by one engineer.',
    provider: { '@id': `${SITE_URL}/#person` },
    url: SITE_URL,
    areaServed: [
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Place', name: 'Remote — worldwide' },
    ],
    availableLanguage: ['ar', 'en'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'What I build',
      itemListElement: [
        'Web application development',
        'Custom business and admin systems',
        'AI features: chatbots, semantic search, summarisation, RAG',
        'Data pipelines and analytics platforms',
        'Cross-platform mobile apps with Flutter',
        'API design and backend engineering',
      ].map((name) => ({
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
