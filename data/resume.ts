import type { Locale } from '@/lib/locales'

/* ────────────────────────────────────────────────────────────────
   About / background
   ──────────────────────────────────────────────────────────────── */

export const about: Record<Locale, { summary: string; aiSummary: string; approachIntro: string }> = {
  en: {
    summary:
      "I'm a Software & AI Engineer building AI-driven solutions end to end. I graduated with Honors in Software Engineering from Mustaqbal University in 2025 (GPA 4.6/5), and I now engineer scalable backend architectures and lead LLM integration at Kafaat. My work spans the full path from data to product: integrating large language models like Google Gemini and OpenAI, building retrieval-augmented generation pipelines for semantic search, training supervised models for predictive analytics, and architecting the ASP.NET Core and Node.js services that put all of it in front of real users. Before Kafaat I completed a Software Engineering COOP at Clear Vision Co. in Riyadh, where I optimised CI/CD pipelines to cut deployment time by up to 20%, led architecture and technical solution design for enterprise projects, and mentored junior interns on clean-code practices. What I care about is reliability: an AI feature that only works when the model cooperates isn't finished — so I design multi-LLM fallbacks, deterministic defaults, and behaviour I can actually verify.",
    aiSummary:
      'My AI work is applied engineering. I integrate large language models into products people actually use, build RAG pipelines that make retrieval context-aware, train supervised models for prediction on real business data, and surround all of it with deterministic logic — so behaviour stays predictable even when the model does not.',
    approachIntro:
      'I care less about which framework is fashionable and more about whether the system behaves the way I claimed it would — on a bad network, with a missing key, at 2am.',
  },
  ar: {
    summary:
      'أنا مهندس برمجيات وذكاء اصطناعي، أبني حلولاً تعتمد على الذكاء الاصطناعي من الطرف إلى الطرف. تخرّجتُ بمرتبة الشرف في هندسة البرمجيات من جامعة المستقبل عام 2025 بمعدل 4.6 من 5، وأعمل اليوم على بناء معماريات خلفية قابلة للتوسّع وقيادة دمج نماذج اللغة الكبيرة في «كفاءات». يمتد عملي على المسار الكامل من البيانات إلى المنتج: دمج نماذج اللغة الكبيرة مثل Google Gemini و OpenAI، وبناء خطوط التوليد المعزّز بالاسترجاع للبحث الدلالي، وتدريب نماذج مُشرَفة للتحليلات التنبؤية، وتصميم خدمات ASP.NET Core و Node.js التي تضع ذلك كله بين يدي المستخدمين. وقبل «كفاءات» أكملتُ تدريباً تعاونياً في هندسة البرمجيات لدى شركة الرؤية الواضحة بالرياض، حيث حسّنتُ خطوط CI/CD حتى خفّضتُ زمن النشر بنسبة تصل إلى 20%، وقدتُ تصميم المعمارية والحلول التقنية لمشاريع مؤسسية، وأرشدتُ المتدربين الجدد في ممارسات الشيفرة النظيفة. وما يهمّني هو الموثوقية: ميزة ذكاء اصطناعي لا تعمل إلا حين يتعاون النموذج ليست ميزة مكتملة — لذلك أصمّم بدائل متعددة النماذج، وسلوكاً افتراضياً حتمياً، ونتائج أستطيع التحقق منها فعلاً.',
    aiSummary:
      'عملي في الذكاء الاصطناعي هندسة تطبيقية. أدمج نماذج اللغة الكبيرة في منتجات يستخدمها الناس فعلاً، وأبني خطوط RAG تجعل الاسترجاع واعياً بالسياق، وأدرّب نماذج مُشرَفة للتنبؤ على بيانات أعمال حقيقية، وأحيط ذلك كله بمنطق حتمي — فيبقى السلوك متوقعاً حتى حين لا يكون النموذج كذلك.',
    approachIntro:
      'لا يعنيني كثيراً أي إطار عمل هو الرائج، بل يعنيني أن يتصرّف النظام كما وعدتُ — على شبكة ضعيفة، وبمفتاح مفقود، وفي الثانية صباحاً.',
  },
}

export const stats: Record<Locale, { value: string; label: string; gradient: string }[]> = {
  en: [
    { value: '4.6', label: 'GPA / 5.0 — Honors graduate', gradient: 'from-cyan-400 to-sky-500' },
    { value: '13+', label: 'AI & cloud certifications', gradient: 'from-teal-400 to-cyan-500' },
    { value: '5', label: 'Projects shipped', gradient: 'from-sky-400 to-blue-500' },
    { value: '2', label: 'LLM providers integrated', gradient: 'from-blue-400 to-cyan-500' },
  ],
  ar: [
    { value: '4.6', label: 'معدل من 5.0 — بمرتبة الشرف', gradient: 'from-cyan-400 to-sky-500' },
    { value: '+13', label: 'شهادة في الذكاء الاصطناعي والسحابة', gradient: 'from-teal-400 to-cyan-500' },
    { value: '5', label: 'مشاريع منجزة', gradient: 'from-sky-400 to-blue-500' },
    { value: '2', label: 'مزوّدا نماذج لغة مدموجان', gradient: 'from-blue-400 to-cyan-500' },
  ],
}

export type ExpertiseArea = {
  icon: 'brain' | 'cpu' | 'workflow' | 'code' | 'database' | 'shield'
  title: string
  description: string
  skills: string[]
  level: number
  color: string
  bgColor: string
}

export const expertise: Record<Locale, ExpertiseArea[]> = {
  en: [
    {
      icon: 'brain',
      title: 'LLM Application Engineering',
      description: 'Turning Gemini and OpenAI into dependable product features',
      skills: ['Google Gemini', 'OpenAI', 'Multi-LLM Fallback', 'NLP'],
      level: 92,
      color: 'from-cyan-500 via-sky-500 to-blue-600',
      bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5',
    },
    {
      icon: 'cpu',
      title: 'Machine Learning & Predictive Analytics',
      description: 'Supervised models that estimate real business values',
      skills: ['Supervised Learning', 'Feature Engineering', 'Model Evaluation', 'Pandas'],
      level: 87,
      color: 'from-sky-500 via-cyan-500 to-blue-600',
      bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5',
    },
    {
      icon: 'workflow',
      title: 'Data Engineering & RAG Pipelines',
      description: 'Streaming ingestion into lakehouse storage, then semantic retrieval',
      skills: ['Kafka', 'Airflow', 'Delta Lake', 'RAG'],
      level: 85,
      color: 'from-teal-500 via-cyan-500 to-sky-600',
      bgColor: 'from-teal-500/10 via-cyan-500/10 to-sky-500/5',
    },
    {
      icon: 'code',
      title: 'Backend & API Engineering',
      description: 'The scalable services that carry the model calls in production',
      skills: ['ASP.NET Core', 'Node.js', 'EF Core', 'REST & WebSockets'],
      level: 90,
      color: 'from-blue-500 via-sky-500 to-cyan-600',
      bgColor: 'from-blue-500/10 via-sky-500/10 to-cyan-500/5',
    },
    {
      icon: 'database',
      title: 'Databases & Data Modelling',
      description: 'Schemas, query optimisation, and access control at enterprise scale',
      skills: ['SQL Server', 'MySQL', 'Query Optimisation', 'RBAC'],
      level: 88,
      color: 'from-cyan-500 via-sky-500 to-blue-600',
      bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5',
    },
    {
      icon: 'shield',
      title: 'DevOps, QA & Secure Delivery',
      description: 'Pipelines that ship fast without shipping vulnerabilities',
      skills: ['CI/CD', 'Docker', 'Automated Testing', 'Security Review'],
      level: 86,
      color: 'from-sky-500 via-cyan-500 to-blue-600',
      bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5',
    },
  ],
  ar: [
    {
      icon: 'brain',
      title: 'هندسة تطبيقات نماذج اللغة',
      description: 'تحويل Gemini و OpenAI إلى ميزات منتج يُعتمد عليها',
      skills: ['Google Gemini', 'OpenAI', 'تراجع متعدد النماذج', 'معالجة اللغة الطبيعية'],
      level: 92,
      color: 'from-cyan-500 via-sky-500 to-blue-600',
      bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5',
    },
    {
      icon: 'cpu',
      title: 'تعلّم الآلة والتحليلات التنبؤية',
      description: 'نماذج مُشرَفة تُقدّر قيماً تجارية حقيقية',
      skills: ['التعلّم المُشرَف', 'هندسة السمات', 'تقييم النماذج', 'Pandas'],
      level: 87,
      color: 'from-sky-500 via-cyan-500 to-blue-600',
      bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5',
    },
    {
      icon: 'workflow',
      title: 'هندسة البيانات وخطوط RAG',
      description: 'استقبال متدفّق إلى تخزين بحيري، ثم استرجاع دلالي',
      skills: ['Kafka', 'Airflow', 'Delta Lake', 'RAG'],
      level: 85,
      color: 'from-teal-500 via-cyan-500 to-sky-600',
      bgColor: 'from-teal-500/10 via-cyan-500/10 to-sky-500/5',
    },
    {
      icon: 'code',
      title: 'هندسة الواجهات الخلفية وواجهات البرمجة',
      description: 'الخدمات القابلة للتوسّع التي تحمل نداءات النماذج في الإنتاج',
      skills: ['ASP.NET Core', 'Node.js', 'EF Core', 'REST و WebSockets'],
      level: 90,
      color: 'from-blue-500 via-sky-500 to-cyan-600',
      bgColor: 'from-blue-500/10 via-sky-500/10 to-cyan-500/5',
    },
    {
      icon: 'database',
      title: 'قواعد البيانات ونمذجتها',
      description: 'المخططات وتحسين الاستعلامات وضبط الصلاحيات على نطاق مؤسسي',
      skills: ['SQL Server', 'MySQL', 'تحسين الاستعلامات', 'صلاحيات الأدوار'],
      level: 88,
      color: 'from-cyan-500 via-sky-500 to-blue-600',
      bgColor: 'from-cyan-500/10 via-sky-500/10 to-blue-500/5',
    },
    {
      icon: 'shield',
      title: 'DevOps والجودة والتسليم الآمن',
      description: 'خطوط نشر سريعة لا تنشر معها ثغرات',
      skills: ['CI/CD', 'Docker', 'الاختبار الآلي', 'مراجعة الأمان'],
      level: 86,
      color: 'from-sky-500 via-cyan-500 to-blue-600',
      bgColor: 'from-sky-500/10 via-cyan-500/10 to-blue-500/5',
    },
  ],
}

export const capabilities: Record<Locale, string[]> = {
  en: [
    'Integrating Gemini and OpenAI into production workflows, with multi-provider fallback',
    'Building RAG pipelines for context-aware semantic search over real data',
    'Training supervised models for predictive analytics on historical business data',
    'NLP features in production — PDF summarisation, context-aware assistants',
    'Architecting the ASP.NET Core and Node.js backends and SQL schemas underneath',
    'Streaming data engineering with Kafka, Airflow, and Delta Lake',
  ],
  ar: [
    'دمج Gemini و OpenAI في سير عمل إنتاجي مع تراجع بين أكثر من مزوّد',
    'بناء خطوط RAG لبحث دلالي واعٍ بالسياق فوق بيانات حقيقية',
    'تدريب نماذج مُشرَفة للتحليلات التنبؤية على بيانات أعمال تاريخية',
    'ميزات معالجة لغة طبيعية في الإنتاج — تلخيص ملفات PDF ومساعدون يفهمون السياق',
    'تصميم واجهات ASP.NET Core و Node.js الخلفية ومخططات SQL تحتها',
    'هندسة بيانات متدفّقة باستخدام Kafka و Airflow و Delta Lake',
  ],
}

export const journey: Record<Locale, { icon: string; title: string; desc: string }[]> = {
  en: [
    {
      icon: '🎓',
      title: 'Software Engineering, with Honors',
      desc: 'BSc in Software Engineering from Mustaqbal University, graduated 2025 with Honors and a 4.6/5 GPA — architecture, machine learning, databases, and secure development.',
    },
    {
      icon: '🏢',
      title: 'Enterprise practice at Clear Vision',
      desc: 'A Software Engineering COOP in Riyadh: cut deployment time by up to 20% through CI/CD optimisation, led solution architecture, ran security reviews, and mentored junior interns.',
    },
    {
      icon: '🧱',
      title: 'Building across the stack',
      desc: 'Shipped in ASP.NET Core, Node.js, and Flutter — a predictive tender-management platform, a team-led collaboration portal, and a fully offline mobile app.',
    },
    {
      icon: '🧠',
      title: 'AI engineering at Kafaat',
      desc: 'Now engineering scalable backends and leading LLM integration — model APIs, RAG retrieval, and the deployment paths that keep intelligent features reliable in production.',
    },
  ],
  ar: [
    {
      icon: '🎓',
      title: 'هندسة برمجيات بمرتبة الشرف',
      desc: 'بكالوريوس هندسة برمجيات من جامعة المستقبل، تخرّجتُ عام 2025 بمرتبة الشرف ومعدل 4.6 من 5 — معمارية البرمجيات، وتعلّم الآلة، وقواعد البيانات، والتطوير الآمن.',
    },
    {
      icon: '🏢',
      title: 'ممارسة مؤسسية في الرؤية الواضحة',
      desc: 'تدريب تعاوني في هندسة البرمجيات بالرياض: خفض زمن النشر حتى 20% عبر تحسين خطوط CI/CD، وقيادة تصميم الحلول، وإجراء مراجعات أمنية، وإرشاد المتدربين الجدد.',
    },
    {
      icon: '🧱',
      title: 'بناء عبر الطبقات كلها',
      desc: 'أنجزتُ مشاريع بـ ASP.NET Core و Node.js و Flutter — منصة مناقصات تنبؤية، ومنصة تعاون قدتُ فريقها، وتطبيق جوال يعمل دون إنترنت بالكامل.',
    },
    {
      icon: '🧠',
      title: 'هندسة الذكاء الاصطناعي في كفاءات',
      desc: 'أعمل اليوم على بناء واجهات خلفية قابلة للتوسّع وقيادة دمج نماذج اللغة — واجهات النماذج، والاسترجاع بـ RAG، ومسارات النشر التي تُبقي الميزات الذكية موثوقة في الإنتاج.',
    },
  ],
}

export const approach: Record<Locale, { icon: string; title: string; desc: string; metrics: string }[]> = {
  en: [
    {
      icon: '🧭',
      title: 'The AI is architecture, not decoration',
      desc: 'I decide where a model belongs before writing the first prompt — and where a deterministic rule or a trained classifier is the better answer.',
      metrics: 'Problem → Model or rule? → Interface → Fallback',
    },
    {
      icon: '🛡️',
      title: 'Design for the model failing',
      desc: 'Every AI path I ship has defined behaviour for a missing key, a timeout, or a bad response. Math Heroes falls back across two LLM providers, then to an algorithmic generator.',
      metrics: 'Multi-LLM fallback • Timeouts • Schema validation',
    },
    {
      icon: '⚙️',
      title: 'Own the whole stack',
      desc: 'Backend, data model, pipeline, and interface get designed together — and shipped through a CI/CD pipeline with security checks built into it, not bolted on after.',
      metrics: 'API • Schema • Pipeline • UI — one coherent system',
    },
  ],
  ar: [
    {
      icon: '🧭',
      title: 'الذكاء الاصطناعي معمارية لا زينة',
      desc: 'أحدّد أين يكون مكان النموذج قبل كتابة أول موجّه — وأين تكون قاعدة حتمية أو مصنّف مدرَّب هو الجواب الأفضل.',
      metrics: 'المشكلة ← نموذج أم قاعدة؟ ← الواجهة ← البديل',
    },
    {
      icon: '🛡️',
      title: 'صمّم لأن النموذج سيفشل',
      desc: 'كل مسار ذكاء اصطناعي أنشره له سلوك محدّد عند غياب المفتاح أو انتهاء المهلة أو ورود رد سيئ. Math Heroes يتراجع عبر مزوّدَين ثم إلى مولّد خوارزمي.',
      metrics: 'تراجع متعدد النماذج • مهل زمنية • تحقق من المخطط',
    },
    {
      icon: '⚙️',
      title: 'امتلك الطبقات كلها',
      desc: 'الواجهة الخلفية ونموذج البيانات وخط المعالجة والواجهة تُصمَّم معاً — وتُنشَر عبر خط CI/CD بفحوص أمنية مدمجة فيه لا مضافة بعده.',
      metrics: 'واجهة برمجية • مخطط • خط معالجة • واجهة — نظام واحد متماسك',
    },
  ],
}

/* ────────────────────────────────────────────────────────────────
   Skills — technology names stay in Latin, category labels localise
   ──────────────────────────────────────────────────────────────── */

export type SkillGroup = {
  icon: 'brain' | 'code' | 'server' | 'layers' | 'database' | 'wrench'
  label: Record<Locale, string>
  skills: { name: string; level: number; color: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    icon: 'brain',
    label: { en: 'AI & Machine Learning', ar: 'الذكاء الاصطناعي وتعلّم الآلة' },
    skills: [
      { name: 'LLM Integration', level: 92, color: '#22D3EE' },
      { name: 'Google Gemini', level: 90, color: '#38BDF8' },
      { name: 'RAG Pipelines', level: 85, color: '#60A5FA' },
      { name: 'NLP', level: 86, color: '#2DD4BF' },
      { name: 'Supervised Learning', level: 85, color: '#0EA5E9' },
      { name: 'Pandas & NumPy', level: 87, color: '#3B82F6' },
      { name: 'Model Evaluation', level: 83, color: '#06B6D4' },
      { name: 'Computer Vision', level: 76, color: '#818CF8' },
    ],
  },
  {
    icon: 'code',
    label: { en: 'Programming Languages', ar: 'لغات البرمجة' },
    skills: [
      { name: 'Python', level: 90, color: '#22D3EE' },
      { name: 'C#', level: 87, color: '#38BDF8' },
      { name: 'JavaScript', level: 90, color: '#60A5FA' },
      { name: 'TypeScript', level: 82, color: '#2DD4BF' },
      { name: 'Java', level: 82, color: '#0EA5E9' },
      { name: 'SQL', level: 89, color: '#3B82F6' },
      { name: 'Dart', level: 84, color: '#06B6D4' },
      { name: 'Git', level: 88, color: '#818CF8' },
    ],
  },
  {
    icon: 'server',
    label: { en: 'Backend & APIs', ar: 'الواجهات الخلفية وواجهات البرمجة' },
    skills: [
      { name: 'ASP.NET Core', level: 88, color: '#22D3EE' },
      { name: 'Node.js', level: 89, color: '#38BDF8' },
      { name: 'Express.js', level: 87, color: '#60A5FA' },
      { name: 'Entity Framework', level: 85, color: '#2DD4BF' },
      { name: 'REST APIs', level: 90, color: '#0EA5E9' },
      { name: 'WebSockets', level: 84, color: '#3B82F6' },
      { name: 'Microservices', level: 78, color: '#06B6D4' },
      { name: 'RBAC & Auth', level: 85, color: '#818CF8' },
    ],
  },
  {
    icon: 'layers',
    label: { en: 'Data Engineering', ar: 'هندسة البيانات' },
    skills: [
      { name: 'Apache Kafka', level: 82, color: '#22D3EE' },
      { name: 'Apache Airflow', level: 80, color: '#38BDF8' },
      { name: 'Delta Lake', level: 78, color: '#60A5FA' },
      { name: 'ETL Pipelines', level: 84, color: '#2DD4BF' },
      { name: 'Power BI', level: 80, color: '#0EA5E9' },
      { name: 'Data Modelling', level: 87, color: '#3B82F6' },
      { name: 'JSON Schema', level: 85, color: '#06B6D4' },
      { name: 'Query Optimization', level: 86, color: '#818CF8' },
    ],
  },
  {
    icon: 'database',
    label: { en: 'Databases & Frontend', ar: 'قواعد البيانات والواجهات' },
    skills: [
      { name: 'SQL Server', level: 88, color: '#22D3EE' },
      { name: 'MySQL', level: 87, color: '#38BDF8' },
      { name: 'PostgreSQL', level: 79, color: '#60A5FA' },
      { name: 'Angular', level: 85, color: '#2DD4BF' },
      { name: 'React', level: 84, color: '#0EA5E9' },
      { name: 'Flutter', level: 85, color: '#3B82F6' },
      { name: 'Tailwind CSS', level: 86, color: '#06B6D4' },
      { name: 'Next.js', level: 84, color: '#818CF8' },
    ],
  },
  {
    icon: 'wrench',
    label: { en: 'DevOps, QA & Tooling', ar: 'DevOps والجودة والأدوات' },
    skills: [
      { name: 'CI/CD Pipelines', level: 88, color: '#22D3EE' },
      { name: 'Docker', level: 82, color: '#38BDF8' },
      { name: 'GitHub Actions', level: 85, color: '#60A5FA' },
      { name: 'Azure', level: 75, color: '#2DD4BF' },
      { name: 'Selenium', level: 80, color: '#0EA5E9' },
      { name: 'PyTest & NUnit', level: 82, color: '#3B82F6' },
      { name: 'Postman', level: 88, color: '#06B6D4' },
      { name: 'Jira & Agile', level: 86, color: '#818CF8' },
    ],
  },
]

/* ────────────────────────────────────────────────────────────────
   Experience
   ──────────────────────────────────────────────────────────────── */

export type ExperienceEntry = {
  duration: Record<Locale, string>
  technologies: string[]
} & Record<
  Locale,
  {
    title: string
    company: string
    location: string
    type: string
    description: string
    achievements: string[]
  }
>

export const experience: ExperienceEntry[] = [
  {
    duration: { en: '2026 — Present', ar: '2026 — حتى الآن' },
    technologies: ['Node.js', 'ASP.NET Core', 'LLM APIs', 'SQL', 'REST APIs', 'Docker'],
    en: {
      title: 'Backend Developer & AI Integration Specialist',
      company: 'Kafaat',
      location: 'Saudi Arabia',
      type: 'Full-time',
      description:
        'Engineering scalable backend architectures and leading the integration of AI models and LLMs to drive intelligent product features.',
      achievements: [
        'Engineer scalable backend architectures that support AI-driven product features in production.',
        'Lead the integration of AI models and large language models into core product workflows.',
        'Optimise server-side logic and manage database workflows for performance and reliability.',
        'Design and deploy robust APIs that expose AI capabilities to client applications.',
        'Apply multi-provider fallback and evaluation practices so AI features degrade gracefully instead of failing.',
      ],
    },
    ar: {
      title: 'مطوّر واجهات خلفية وأخصائي دمج ذكاء اصطناعي',
      company: 'كفاءات',
      location: 'المملكة العربية السعودية',
      type: 'دوام كامل',
      description:
        'بناء معماريات خلفية قابلة للتوسّع وقيادة دمج نماذج الذكاء الاصطناعي ونماذج اللغة الكبيرة لتشغيل ميزات منتج ذكية.',
      achievements: [
        'بناء معماريات خلفية قابلة للتوسّع تدعم ميزات المنتج المعتمدة على الذكاء الاصطناعي في الإنتاج.',
        'قيادة دمج نماذج الذكاء الاصطناعي ونماذج اللغة الكبيرة في مسارات العمل الأساسية للمنتج.',
        'تحسين منطق الخادم وإدارة تدفقات قواعد البيانات من أجل الأداء والموثوقية.',
        'تصميم ونشر واجهات برمجية متينة تُتيح قدرات الذكاء الاصطناعي لتطبيقات العملاء.',
        'تطبيق ممارسات التراجع بين المزوّدين والتقييم بحيث تتدهور ميزات الذكاء الاصطناعي بسلاسة بدل أن تفشل.',
      ],
    },
  },
  {
    duration: { en: 'Jan 2025 — Jun 2025', ar: 'يناير 2025 — يونيو 2025' },
    technologies: ['CI/CD', 'REST APIs', 'SQL Server', 'Security Review', 'Agile / Scrum', 'QA'],
    en: {
      title: 'Software Engineering Cooperative Trainee (COOP)',
      company: 'Clear Vision Co.',
      location: 'Riyadh, Saudi Arabia',
      type: 'Cooperative training',
      description:
        'Full-cycle software engineering across CI/CD, backend development, solution architecture, QA, and application security on enterprise projects.',
      achievements: [
        'Optimised CI/CD pipelines to automate deployments, reducing deployment time by up to 20%, and integrated security validation into the pipeline.',
        'Integrated RESTful APIs and improved backend logic to eliminate system bottlenecks across multiple projects.',
        'Led architecture and technical solution design for enterprise-level work; drafted statements of requirements and compliance reports for executive review.',
        'Conducted application security reviews and code-level vulnerability checks, applying secure-development best practices.',
        'Executed database backup, synchronisation, and disaster-recovery planning; provided level 2 technical support.',
        'Developed and executed manual and automated test cases, improving CI/CD reliability.',
        'Mentored junior interns on coding best practices and ran code reviews against clean-code and system-design standards.',
        'Participated in Agile ceremonies — sprint planning, backlog grooming, daily stand-ups — and maintained risk and issue logs.',
      ],
    },
    ar: {
      title: 'متدرّب تعاوني في هندسة البرمجيات',
      company: 'شركة الرؤية الواضحة',
      location: 'الرياض، المملكة العربية السعودية',
      type: 'تدريب تعاوني',
      description:
        'هندسة برمجيات بدورة كاملة تشمل CI/CD وتطوير الواجهات الخلفية وتصميم الحلول وضمان الجودة وأمن التطبيقات في مشاريع مؤسسية.',
      achievements: [
        'تحسين خطوط CI/CD لأتمتة النشر، ما خفّض زمن النشر بنسبة تصل إلى 20%، مع دمج خطوات تحقق أمني في الخط.',
        'دمج واجهات RESTful وتحسين منطق الواجهة الخلفية لإزالة الاختناقات في عدة مشاريع.',
        'قيادة تصميم المعمارية والحلول التقنية للأعمال المؤسسية، وصياغة وثائق المتطلبات وتقارير الامتثال لمراجعة الإدارة.',
        'إجراء مراجعات أمنية للتطبيقات وفحوص ثغرات على مستوى الشيفرة، مع تطبيق ممارسات التطوير الآمن.',
        'تنفيذ النسخ الاحتياطي لقواعد البيانات ومزامنتها والتخطيط للتعافي من الكوارث، وتقديم دعم تقني من المستوى الثاني.',
        'تطوير وتنفيذ حالات اختبار يدوية وآلية، ما رفع موثوقية خطوط CI/CD.',
        'إرشاد المتدربين الجدد في أفضل ممارسات البرمجة وإجراء مراجعات شيفرة وفق معايير الشيفرة النظيفة وتصميم الأنظمة.',
        'المشاركة في مراسم أجايل — تخطيط السباقات وتهذيب قائمة الأعمال والاجتماعات اليومية — ومتابعة سجلات المخاطر والمشكلات.',
      ],
    },
  },
  {
    duration: { en: 'Graduated 2025', ar: 'تخرّج 2025' },
    technologies: [
      'Software Architecture',
      'Machine Learning',
      'Databases',
      'Networking',
      'Secure Development',
    ],
    en: {
      title: 'BSc in Software Engineering',
      company: 'Mustaqbal University',
      location: 'Saudi Arabia',
      type: 'Education',
      description: 'Graduated with Honors, GPA 4.6/5.0.',
      achievements: [
        'Graduated with Honors — GPA 4.6 out of 5.0.',
        'Coursework across software architecture, machine learning, databases, networking, and secure development.',
        'Built the AI-Powered Tender Management System with a supervised-learning predictive module as major project work.',
        'Led a four-member team on the Student Collaboration Portal, integrating Google Gemini for NLP-based summarisation and semantic search.',
        'Complemented the degree with 13+ certifications in AI, generative AI, cloud, and software delivery.',
      ],
    },
    ar: {
      title: 'بكالوريوس هندسة البرمجيات',
      company: 'جامعة المستقبل',
      location: 'المملكة العربية السعودية',
      type: 'تعليم',
      description: 'تخرّج بمرتبة الشرف بمعدل 4.6 من 5.0.',
      achievements: [
        'التخرّج بمرتبة الشرف — بمعدل 4.6 من 5.0.',
        'مقررات في معمارية البرمجيات وتعلّم الآلة وقواعد البيانات والشبكات والتطوير الآمن.',
        'بناء نظام إدارة المناقصات المدعوم بالذكاء الاصطناعي مع وحدة تنبؤ بالتعلّم المُشرَف كمشروع تخرّج.',
        'قيادة فريق من أربعة أفراد في منصة تعاون الطلاب، مع دمج Google Gemini للتلخيص والبحث الدلالي.',
        'استكمال الدرجة بأكثر من 13 شهادة في الذكاء الاصطناعي والذكاء التوليدي والسحابة وتسليم البرمجيات.',
      ],
    },
  },
]

/* ────────────────────────────────────────────────────────────────
   Certifications
   ──────────────────────────────────────────────────────────────── */

export type CertCategory = 'ai' | 'cloud' | 'delivery'

export const certCategoryLabels: Record<CertCategory | 'all', Record<Locale, string>> = {
  all: { en: 'All', ar: 'الكل' },
  ai: { en: 'AI & Machine Learning', ar: 'الذكاء الاصطناعي وتعلّم الآلة' },
  cloud: { en: 'Cloud & DevOps', ar: 'السحابة و DevOps' },
  delivery: { en: 'Software Delivery', ar: 'تسليم البرمجيات' },
}

export type Certification = {
  category: CertCategory
  issuer: string
} & Record<Locale, { title: string; issuer: string; description: string }>

export const certifications: Certification[] = [
  {
    category: 'ai',
    issuer: 'Google Cloud',
    en: {
      title: 'Professional Machine Learning Engineer',
      issuer: 'Google Cloud',
      description:
        'Professional-level certification covering ML system design, model training and deployment, and production ML pipelines.',
    },
    ar: {
      title: 'مهندس تعلّم آلة محترف',
      issuer: 'Google Cloud',
      description:
        'شهادة بمستوى احترافي تغطي تصميم أنظمة تعلّم الآلة وتدريب النماذج ونشرها وخطوط الإنتاج.',
    },
  },
  {
    category: 'ai',
    issuer: 'Google Cloud',
    en: {
      title: 'Generative AI Fundamentals',
      issuer: 'Google Cloud',
      description: 'Foundations of generative AI, large language models, and responsible AI practice.',
    },
    ar: {
      title: 'أساسيات الذكاء الاصطناعي التوليدي',
      issuer: 'Google Cloud',
      description: 'أسس الذكاء التوليدي ونماذج اللغة الكبيرة وممارسات الذكاء الاصطناعي المسؤول.',
    },
  },
  {
    category: 'ai',
    issuer: 'SDAIA',
    en: {
      title: 'Developing Generative AI Solutions — Modern Data Engineering',
      issuer: 'SDAIA',
      description:
        'Building generative AI solutions on modern data engineering foundations, from the Saudi Data & AI Authority.',
    },
    ar: {
      title: 'تطوير حلول الذكاء التوليدي — هندسة البيانات الحديثة',
      issuer: 'سدايا',
      description:
        'بناء حلول الذكاء التوليدي على أسس هندسة بيانات حديثة، من الهيئة السعودية للبيانات والذكاء الاصطناعي.',
    },
  },
  {
    category: 'ai',
    issuer: 'University of Helsinki',
    en: {
      title: 'Building AI',
      issuer: 'University of Helsinki',
      description: 'Advanced course on AI algorithms, machine learning methods, and neural networks.',
    },
    ar: {
      title: 'Building AI',
      issuer: 'جامعة هلسنكي',
      description: 'مقرر متقدم في خوارزميات الذكاء الاصطناعي وطرق تعلّم الآلة والشبكات العصبية.',
    },
  },
  {
    category: 'ai',
    issuer: 'University of Helsinki',
    en: {
      title: 'Elements of AI',
      issuer: 'University of Helsinki',
      description: 'Core concepts of artificial intelligence, machine learning, and their real-world implications.',
    },
    ar: {
      title: 'Elements of AI',
      issuer: 'جامعة هلسنكي',
      description: 'المفاهيم الأساسية للذكاء الاصطناعي وتعلّم الآلة وأثرهما في الواقع.',
    },
  },
  {
    category: 'ai',
    issuer: 'MinnaLearn & University of Helsinki',
    en: {
      title: 'Elements of AI for Business',
      issuer: 'MinnaLearn & University of Helsinki',
      description: 'Applying AI strategically in organisations, from use-case selection to adoption.',
    },
    ar: {
      title: 'Elements of AI for Business',
      issuer: 'MinnaLearn وجامعة هلسنكي',
      description: 'التطبيق الاستراتيجي للذكاء الاصطناعي في المنظمات، من اختيار حالة الاستخدام إلى التبنّي.',
    },
  },
  {
    category: 'ai',
    issuer: 'Satr Platform',
    en: {
      title: 'Data Science & AI Path',
      issuer: 'Satr Platform',
      description: 'Applied data science and AI track covering analysis, modelling, and deployment.',
    },
    ar: {
      title: 'مسار علوم البيانات والذكاء الاصطناعي',
      issuer: 'منصة سطر',
      description: 'مسار تطبيقي في علوم البيانات والذكاء الاصطناعي يغطي التحليل والنمذجة والنشر.',
    },
  },
  {
    category: 'cloud',
    issuer: 'Tuwaiq Academy',
    en: {
      title: 'Cloud Computing and Artificial Intelligence',
      issuer: 'Tuwaiq Academy',
      description: 'Combined cloud infrastructure and applied AI programme.',
    },
    ar: {
      title: 'الحوسبة السحابية والذكاء الاصطناعي',
      issuer: 'أكاديمية طويق',
      description: 'برنامج يجمع البنية التحتية السحابية والذكاء الاصطناعي التطبيقي.',
    },
  },
  {
    category: 'cloud',
    issuer: 'Alibaba Cloud',
    en: {
      title: 'Cloud Computing Engineer',
      issuer: 'Alibaba Cloud',
      description: 'Cloud architecture, deployment, and operations.',
    },
    ar: {
      title: 'مهندس حوسبة سحابية',
      issuer: 'Alibaba Cloud',
      description: 'معمارية السحابة والنشر والتشغيل.',
    },
  },
  {
    category: 'ai',
    issuer: 'Alibaba Cloud',
    en: {
      title: 'Dive into Generative AI',
      issuer: 'Alibaba Cloud',
      description: 'Certified programme on generative AI models, capabilities, and implementation.',
    },
    ar: {
      title: 'الغوص في الذكاء التوليدي',
      issuer: 'Alibaba Cloud',
      description: 'برنامج معتمد في نماذج الذكاء التوليدي وقدراتها وتطبيقها.',
    },
  },
  {
    category: 'ai',
    issuer: 'Alibaba Cloud',
    en: {
      title: 'Using Generative AI Ethically and Responsibly',
      issuer: 'Alibaba Cloud',
      description: 'Responsible AI practice: bias, transparency, safety, and governance.',
    },
    ar: {
      title: 'الاستخدام الأخلاقي والمسؤول للذكاء التوليدي',
      issuer: 'Alibaba Cloud',
      description: 'ممارسات الذكاء الاصطناعي المسؤول: التحيّز والشفافية والسلامة والحوكمة.',
    },
  },
  {
    category: 'ai',
    issuer: 'Amazon Web Services',
    en: {
      title: 'AWS Agentic AI Demonstration',
      issuer: 'Amazon Web Services',
      description: 'Agentic AI systems and tool-using autonomous agents on AWS.',
    },
    ar: {
      title: 'الذكاء الاصطناعي الوكيل على AWS',
      issuer: 'Amazon Web Services',
      description: 'أنظمة الذكاء الاصطناعي الوكيلة والوكلاء المستقلون المستخدمون للأدوات على AWS.',
    },
  },
  {
    category: 'delivery',
    issuer: 'ScrumStudy',
    en: {
      title: 'Scrum Fundamentals Certified (SFC)',
      issuer: 'ScrumStudy',
      description: 'Scrum framework, roles, ceremonies, and artefacts for Agile delivery.',
    },
    ar: {
      title: 'أساسيات سكرم المعتمدة (SFC)',
      issuer: 'ScrumStudy',
      description: 'إطار سكرم وأدواره ومراسمه ومخرجاته في التسليم الرشيق.',
    },
  },
]

export const interests: Record<Locale, { title: string; description: string }[]> = {
  en: [
    {
      title: 'Arabic Natural Language Processing',
      description:
        'Advancing Arabic NLP — models and tooling that handle Arabic morphology, dialects, and script properly rather than as an afterthought.',
    },
    {
      title: 'Data Engineering & Analytics',
      description:
        'Designing scalable data pipelines and predictive modelling that turn raw operational data into business intelligence.',
    },
    {
      title: 'MLOps & AI Deployment',
      description:
        'Streamlining the lifecycle of machine learning models from development through to reliable production operation.',
    },
  ],
  ar: [
    {
      title: 'معالجة اللغة العربية طبيعياً',
      description:
        'تطوير معالجة اللغة العربية — نماذج وأدوات تتعامل مع الصرف العربي واللهجات والرسم الإملائي كما ينبغي لا كإضافة لاحقة.',
    },
    {
      title: 'هندسة البيانات والتحليلات',
      description:
        'تصميم خطوط بيانات قابلة للتوسّع ونمذجة تنبؤية تحوّل البيانات التشغيلية الخام إلى ذكاء أعمال.',
    },
    {
      title: 'MLOps ونشر الذكاء الاصطناعي',
      description:
        'تبسيط دورة حياة نماذج تعلّم الآلة من التطوير حتى التشغيل الإنتاجي الموثوق.',
    },
  ],
}
