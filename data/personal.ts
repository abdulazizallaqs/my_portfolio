import type { Locale } from '@/lib/locales'

/** Locale-independent contact details. */
export const personal = {
  name: 'Abdulaziz Alaqs',
  nameArabic: 'عبدالعزيز العقص',
  nameNote: 'Family name is Alaqs (العقص). It is NOT Al-Aqees / العقيص.',
  email: 'abdulazizallaqs@gmail.com',
  phone: '+966 55 787 9934',
  linkedin: 'https://www.linkedin.com/in/abdulaziz-aqs',
  github: 'https://github.com/abdulazizallaqs',
  githubHandle: '@abdulazizallaqs',
  whatsapp: 'https://wa.me/966557879934',
}

type LocalizedPersonal = {
  name: string
  role: string
  title: string
  tagline: string
  location: string
  availability: string
}

export const personalByLocale: Record<Locale, LocalizedPersonal> = {
  en: {
    name: 'Abdulaziz Alaqs',
    role: 'Software & AI Engineer',
    title: 'Software & AI Engineer — LLM Integration, Machine Learning, Full Stack',
    tagline:
      'I build AI-driven systems end to end — LLM integration, predictive models, and the scalable backends that carry them.',
    location: 'Riyadh, Saudi Arabia',
    availability: 'Open to software & AI engineering roles',
  },
  ar: {
    name: 'عبدالعزيز العقص',
    role: 'مهندس برمجيات وذكاء اصطناعي',
    title: 'مهندس برمجيات وذكاء اصطناعي — دمج نماذج اللغة، وتعلّم الآلة، والتطوير المتكامل',
    tagline:
      'أبني أنظمة تعتمد على الذكاء الاصطناعي من الطرف إلى الطرف — دمج نماذج اللغة الكبيرة، ونماذج تنبؤية، والخوادم القابلة للتوسّع التي تحملها.',
    location: 'الرياض، المملكة العربية السعودية',
    availability: 'متاح لفرص في هندسة البرمجيات والذكاء الاصطناعي',
  },
}

export const languagesByLocale: Record<Locale, { name: string; level: string }[]> = {
  en: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Professional (IELTS 6.5)' },
  ],
  ar: [
    { name: 'العربية', level: 'اللغة الأم' },
    { name: 'الإنجليزية', level: 'مستوى مهني (آيلتس 6.5)' },
  ],
}
