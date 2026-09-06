/**
 * UI copy dictionary.
 *
 * Everything that is *chrome* (headings, labels, buttons, narrative copy that
 * isn't part of the CV data) lives here. CV content itself lives in
 * `data/portfolio.json` and `data/portfolio.ar.json`.
 */

export type Lang = 'en' | 'ar'

export const ui = {
  en: {
    dir: 'ltr' as const,
    langLabel: 'العربية',
    langAria: 'Switch to Arabic',
    themeAria: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },

    nav: {
      items: [
        { href: '#assistant', label: 'Ask My AI' },
        { href: '#about', label: 'Background' },
        { href: '#systems', label: 'What I Build' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#experience', label: 'Experience' },
        { href: '#certifications', label: 'Certifications' },
      ],
      contact: 'Contact Me',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },

    hero: {
      greeting: "Hello, I'm",
      title: 'Software & AI Engineer',
      askAI: 'Ask My AI Assistant',
      viewWork: 'View My Work',
      roles: [
        'LLM Integration — Gemini & OpenAI',
        'Retrieval-Augmented Generation (RAG)',
        'Predictive Analytics & Supervised Learning',
        'Natural Language Processing',
        'ASP.NET Core & Node.js Backends',
        'Data Engineering — Kafka, Airflow, Delta Lake',
        'SQL Server & Database Design',
        'Flutter Cross-Platform Apps',
        'CI/CD, Docker & Secure Delivery',
        'Solution Architecture — End to End',
      ],
    },

    assistant: {
      heading: 'Ask My AI Assistant',
      subtitle: '— short for',
      subtitleName: 'Abdulaziz AI Assistant',
      lede: 'Instead of scrolling, just ask. It knows my projects, experience, and stack — and answers in English or Arabic.',
      panelSub: 'Ask anything about my work',
      greetingA: "Hi — I'm",
      greetingB: "Abdulaziz's AI assistant.",
      greetingHint: 'Pick a question below, or type your own.',
      placeholder: 'Ask about my projects, stack, or experience…',
      send: 'Send',
      reset: 'Reset',
      footnote: 'Answers come from my portfolio data — for anything else, email',
      suggestions: [
        "I'm hiring an AI Engineer — why him?",
        'I need an app built — can he deliver it alone?',
        'What has he shipped with LLMs in production?',
        'How strong is his backend and data engineering?',
      ],
      setupTitle: "The assistant isn't switched on yet",
      setupBody:
        'Open .env.local in the project root, paste your key after GEMINI_API_KEY=, then restart the dev server.',
      setupLink: 'Get a free API key →',
      errorGeneric: 'Sorry, something went wrong. You can reach Abdulaziz directly at',
      errorNetwork: "I couldn't reach the assistant service. You can reach Abdulaziz directly at",
    },

    about: {
      badge: 'Background',
      heading: 'Software & AI Engineer',
      lede: 'Honors Software Engineering graduate — I build the system and the intelligence layer inside it',
      stats: [
        { value: '4.6', label: 'GPA / 5.0 — Honors Graduate' },
        { value: '13+', label: 'AI & Cloud Certifications' },
        { value: '5', label: 'Systems Shipped End to End' },
        { value: '2', label: 'LLM Providers Integrated' },
      ],
      tabs: [
        { id: 'background', label: 'Background' },
        { id: 'ai', label: 'AI Engineering' },
        { id: 'approach', label: 'How I Build' },
      ],
      journey: [
        {
          icon: '🎓',
          title: 'Software Engineering, with Honors',
          desc: 'BSc in Software Engineering from Mustaqbal University, graduated 2025 with Honors and a 4.6/5 GPA — architecture, machine learning, databases, and secure development.',
        },
        {
          icon: '🏢',
          title: 'Enterprise practice at Clear Vision',
          desc: 'A Software Engineering COOP in Riyadh: cut deployment time up to 20% through CI/CD optimization, led solution architecture, ran security reviews, and mentored junior interns.',
        },
        {
          icon: '🧱',
          title: 'Shipping whole systems solo',
          desc: 'Architected, built and deployed complete products on my own — a predictive tender platform in ASP.NET Core, a real-time data pipeline in Python, and a fully offline Flutter app.',
        },
        {
          icon: '🧠',
          title: 'AI engineering at Kafaat',
          desc: 'Now engineering scalable backends and leading LLM integration — model APIs, RAG retrieval, and the deployment paths that keep intelligent features reliable in production.',
        },
      ],
      aiIntro:
        'My AI work is applied engineering. I integrate large language models into products people actually use, build RAG pipelines that make retrieval context-aware, train supervised models for prediction on real business data, and surround all of it with deterministic logic — so behaviour stays predictable even when the model does not.',
      capabilities: [
        'Integrating Gemini & OpenAI into production workflows, with multi-provider fallback',
        'Building RAG pipelines for context-aware semantic search over real data',
        'Training supervised models for predictive analytics on historical business data',
        'NLP features in production — PDF summarization, context-aware assistants',
        'Architecting the ASP.NET Core / Node.js backends and SQL schemas underneath',
        'Streaming data engineering with Kafka, Airflow, and Delta Lake',
      ],
      inPractice: 'In practice:',
      inPracticeBody:
        'the Student Collaboration Portal uses Gemini for NLP-based PDF summarization and semantic search. The tender platform predicts deal values with a supervised model trained on historical bids. Young Heroes falls back across two LLM providers, then to an algorithmic generator. Every one of them is an AI feature that cannot take the product down with it.',
      approachIntro:
        'I care less about which framework is fashionable and more about whether the system behaves the way I claimed it would — on a bad network, with a missing key, at 2am.',
      approach: [
        {
          icon: '🧭',
          title: 'The AI is architecture, not decoration',
          desc: 'I decide where a model belongs before writing the first prompt — and where a deterministic rule or a trained classifier is the better answer.',
          metrics: 'Problem → Model or Rule? → Interface → Fallback',
        },
        {
          icon: '🛡️',
          title: 'Design for the model failing',
          desc: 'Every AI path I ship has defined behaviour for a missing key, a timeout, or a bad response. Young Heroes falls back across two LLM providers, then to an algorithmic generator.',
          metrics: 'Multi-LLM fallback • Timeouts • Schema validation',
        },
        {
          icon: '⚙️',
          title: 'Own the whole stack',
          desc: 'Backend, data model, pipeline, and interface get designed together — and shipped through a CI/CD pipeline with security checks built into it, not bolted on after.',
          metrics: 'API • Schema • Pipeline • UI — one coherent system',
        },
      ],
      openTo: 'Open to building your product — or joining your team',
      cards: [
        {
          icon: '🚀',
          title: 'Availability',
          subtitle: 'Roles & project work',
          detail: 'Riyadh-based • open to relocation',
        },
        {
          icon: '🧠',
          title: 'Focus',
          subtitle: 'LLMs, RAG & Arabic NLP',
          detail: 'Model integration, retrieval, evaluation',
        },
        {
          icon: '🛠️',
          title: 'Stack',
          subtitle: 'Python • C# • JavaScript • Dart',
          detail: 'ASP.NET Core, Node.js, Flutter, SQL Server',
        },
        {
          icon: '🎓',
          title: 'Education',
          subtitle: 'BSc Software Engineering',
          detail: 'Mustaqbal University — Honors, 4.6/5',
        },
      ],
      ctaTitle: "Let's Build Something Intelligent",
      ctaSub: 'Get in touch — I usually reply within a day',
      expertiseHeading: 'Core Expertise',
      expertiseLede: 'The disciplines I combine when building an AI-driven system',
      proficiency: 'Proficiency',
      expertise: [
        {
          title: 'LLM Application Engineering',
          description: 'Turning Gemini and OpenAI into dependable product features',
          skills: ['Google Gemini', 'OpenAI', 'Multi-LLM Fallback', 'NLP'],
        },
        {
          title: 'Machine Learning & Predictive Analytics',
          description: 'Supervised models that estimate real business values',
          skills: ['Supervised Learning', 'Feature Engineering', 'Model Evaluation', 'Pandas'],
        },
        {
          title: 'Data Engineering & RAG Pipelines',
          description: 'Streaming ingestion into lakehouse storage, then semantic retrieval',
          skills: ['Kafka', 'Airflow', 'Delta Lake', 'RAG'],
        },
        {
          title: 'Backend & API Engineering',
          description: 'The scalable services that carry the model calls in production',
          skills: ['ASP.NET Core', 'Node.js', 'EF Core', 'REST & WebSockets'],
        },
        {
          title: 'Databases & Data Modelling',
          description: 'Schemas, query optimization, and access control at enterprise scale',
          skills: ['SQL Server', 'MySQL', 'Query Optimization', 'RBAC'],
        },
        {
          title: 'DevOps, QA & Secure Delivery',
          description: 'Pipelines that ship fast without shipping vulnerabilities',
          skills: ['CI/CD', 'Docker', 'Automated Testing', 'Security Review'],
        },
      ],
    },

    systems: {
      badge: 'End-to-end delivery',
      heading: 'I Build the Whole System',
      lede: 'Not a component of it. From the first architecture sketch to the deployed, monitored product — I have taken every one of these steps alone, on real projects.',
      pipeline: [
        {
          step: '01',
          title: 'Architecture & data model',
          desc: 'Requirements into a system design: service boundaries, the schema, access control, and where intelligence belongs.',
          proof: 'Led solution architecture on enterprise projects at Clear Vision',
        },
        {
          step: '02',
          title: 'Backend & APIs',
          desc: 'ASP.NET Core or Node.js services, REST and WebSocket contracts, authentication, and the query optimization behind them.',
          proof: 'EF Core + SQL Server tender platform, Express + MySQL portal',
        },
        {
          step: '03',
          title: 'Data & AI layer',
          desc: 'Ingestion pipelines, feature engineering, model training or LLM integration, retrieval, and the fallbacks that keep it honest.',
          proof: 'Kafka → Airflow → Delta Lake → RAG, built solo',
        },
        {
          step: '04',
          title: 'Interface',
          desc: 'Angular, React/Next.js or Flutter — responsive, accessible, and bilingual when the audience needs it.',
          proof: 'Web, mobile and desktop interfaces shipped',
        },
        {
          step: '05',
          title: 'Ship & keep it running',
          desc: 'CI/CD with security validation in the pipeline, containerisation, automated tests, backups and disaster recovery.',
          proof: 'Cut deployment time by up to 20% through pipeline work',
        },
      ],
      offerHeading: 'What I can build for you',
      offers: [
        {
          icon: '🤖',
          title: 'AI features inside your product',
          desc: 'An assistant, a summarizer, semantic search over your own documents, or a predictive model on your historical data — designed with fallbacks so it never takes the product down.',
        },
        {
          icon: '🏗️',
          title: 'A complete web platform',
          desc: 'Architecture, database, API, admin panel, role-based access, reporting and deployment. One engineer, one coherent system, no hand-off gaps.',
        },
        {
          icon: '📱',
          title: 'A cross-platform mobile app',
          desc: 'One Flutter codebase for Android and iOS — offline-first when it matters, with proper Arabic typography and RTL from the start.',
        },
        {
          icon: '🔀',
          title: 'Data pipelines & automation',
          desc: 'Streaming or batch ingestion, validation, a lakehouse to store it, orchestration to run it, and dashboards or an API on top.',
        },
      ],
      proofLabel: 'Proof',
      ctaTitle: 'Have something to build?',
      ctaBody:
        'Tell me the problem — I will come back with an architecture, a realistic scope, and a timeline. Or ask my assistant first; it knows what I have shipped.',
      ctaPrimary: 'Start a project',
      ctaSecondary: 'Ask the assistant',
    },

    skills: {
      heading: 'Technical Expertise',
      lede: 'From model integration and data pipelines to the backends, databases, and delivery that carry them',
      categories: [
        'AI & Machine Learning',
        'Programming Languages',
        'Backend & APIs',
        'Data Engineering',
        'Databases & Frontend',
        'DevOps, QA & Tooling',
      ],
    },

    projects: {
      heading: 'Projects',
      lede: 'Systems I designed, built and shipped — where the AI layer and the software around it were engineered together. Four of them are live right now; open one and try it.',
      featured: 'Featured',
      live: 'Live',
      liveAria: 'Open the live site',
      tapHint: 'Tap to see details',
      impact: 'Impact',
      techStack: 'Tech Stack',
      code: 'Code',
      demo: 'Live Demo',
    },

    experience: {
      badge: 'Professional Experience',
      heading: 'Engineering Journey',
      lede: 'From an Honors degree, through enterprise engineering, to leading LLM integration',
      achievements: 'Achievements',
      technologies: 'Technologies',
      keyAchievements: 'Key Achievements',
      technologiesUsed: 'Technologies Used',
      fullTime: 'Full-time',
    },

    certifications: {
      badge: 'Certifications',
      heading: 'Credentials & Continuous Learning',
      ledeA: 'certifications across AI, generative AI, cloud, and software delivery',
      all: 'All',
      interestsHeading: 'Areas of Interest',
      interestsLede: "Where I'm pushing my work next",
    },

    contact: {
      heading: "Let's Build Something Intelligent",
      lede: 'Open to building products and to software & AI engineering roles, based in Riyadh. Tell me what you want to build.',
      getInTouch: 'Get in Touch',
      connect: 'Connect With Me',
      quickTitle: 'Quick Response',
      quickEmail: '📧 Email: usually within 24 hours',
      quickWhats: '💬 WhatsApp: fastest response',
      languagesTitle: 'Languages',
      formTitle: 'Send a Message',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      subjectPlaceholder: 'Project idea / role enquiry',
      messagePlaceholder: 'Tell me what you want to build, or the role you have in mind…',
      sending: 'Sending…',
      send: 'Send Message',
      success: "Message sent successfully! I'll get back to you soon.",
      failure: 'Failed to send message. Please try again or contact me directly.',
      errRequired: 'is required',
      errEmail: 'Email is invalid',
      labels: {
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        github: 'GitHub',
        whatsapp: 'WhatsApp',
      },
    },

    footer: {
      blurb:
        'Software & AI Engineer who designs, builds and ships whole systems — architecture, data, the AI layer, and the interface on top.',
      quickLinks: 'Quick Links',
      services: 'Services',
      serviceList: [
        'AI features & LLM integration',
        'Complete web platforms',
        'Cross-platform mobile apps',
        'Data pipelines & automation',
        'CI/CD & secure delivery',
      ],
      rights: 'All rights reserved.',
      builtWith: 'Built with Next.js & Tailwind CSS.',
      backToTop: 'Back to top',
      contact: 'Contact',
    },
  },

  ar: {
    dir: 'rtl' as const,
    langLabel: 'English',
    langAria: 'التبديل إلى الإنجليزية',
    themeAria: { toLight: 'التبديل إلى الوضع الفاتح', toDark: 'التبديل إلى الوضع الداكن' },

    nav: {
      items: [
        { href: '#assistant', label: 'اسأل مساعدي' },
        { href: '#about', label: 'نبذة' },
        { href: '#systems', label: 'ما الذي أبنيه' },
        { href: '#skills', label: 'المهارات' },
        { href: '#projects', label: 'المشاريع' },
        { href: '#experience', label: 'الخبرة' },
        { href: '#certifications', label: 'الشهادات' },
      ],
      contact: 'تواصل معي',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },

    hero: {
      greeting: 'مرحباً، أنا',
      title: 'مهندس برمجيات وذكاء اصطناعي',
      askAI: 'اسأل مساعدي الذكي',
      viewWork: 'شاهد أعمالي',
      roles: [
        'دمج نماذج اللغة — Gemini و OpenAI',
        'الاسترجاع المعزّز بالتوليد (RAG)',
        'التحليلات التنبؤية والتعلّم المُشرَف',
        'معالجة اللغة الطبيعية',
        'واجهات خلفية بـ ASP.NET Core و Node.js',
        'هندسة البيانات — Kafka و Airflow و Delta Lake',
        'SQL Server وتصميم قواعد البيانات',
        'تطبيقات Flutter متعددة المنصات',
        'CI/CD و Docker والتسليم الآمن',
        'التصميم المعماري — من الفكرة للإطلاق',
      ],
    },

    assistant: {
      heading: 'اسأل مساعدي الذكي',
      subtitle: '— اختصار لـ',
      subtitleName: 'Abdulaziz AI Assistant',
      lede: 'بدل التصفّح، اسأل مباشرة. المساعد يعرف مشاريعي وخبرتي وأدواتي — ويجيب بالعربية أو الإنجليزية.',
      panelSub: 'اسأل عن أي شيء في أعمالي',
      greetingA: 'أهلاً — أنا',
      greetingB: 'مساعد عبدالعزيز الذكي.',
      greetingHint: 'اختر سؤالاً من الأسفل، أو اكتب سؤالك.',
      placeholder: 'اسأل عن مشاريعي أو أدواتي أو خبرتي…',
      send: 'إرسال',
      reset: 'إعادة',
      footnote: 'الإجابات مبنية على بيانات ملفي — لأي شيء آخر راسلني على',
      suggestions: [
        'أبحث عن مهندس ذكاء اصطناعي — لماذا هو؟',
        'أحتاج تطبيقاً — هل يستطيع بناءه بمفرده؟',
        'ماذا أطلق فعلياً باستخدام نماذج اللغة؟',
        'ما مستواه في الواجهات الخلفية وهندسة البيانات؟',
      ],
      setupTitle: 'المساعد غير مُفعّل بعد',
      setupBody:
        'افتح ملف ‎.env.local في جذر المشروع، وألصق مفتاحك بعد ‎GEMINI_API_KEY=‎، ثم أعد تشغيل الخادم.',
      setupLink: 'احصل على مفتاح مجاني ←',
      errorGeneric: 'عذراً، حدث خطأ ما. يمكنك التواصل مع عبدالعزيز مباشرة على',
      errorNetwork: 'تعذّر الوصول إلى خدمة المساعد. يمكنك التواصل مع عبدالعزيز مباشرة على',
    },

    about: {
      badge: 'نبذة',
      heading: 'مهندس برمجيات وذكاء اصطناعي',
      lede: 'خريج هندسة برمجيات بمرتبة الشرف — أبني النظام وطبقة الذكاء بداخله',
      stats: [
        { value: '٤.٦', label: 'المعدل من ٥ — مرتبة الشرف' },
        { value: '+١٣', label: 'شهادة في الذكاء الاصطناعي والسحابة' },
        { value: '٥', label: 'أنظمة أُطلقت من الفكرة للإنتاج' },
        { value: '٢', label: 'مزوّدَي نماذج لغة مدمجَين' },
      ],
      tabs: [
        { id: 'background', label: 'الخلفية' },
        { id: 'ai', label: 'هندسة الذكاء' },
        { id: 'approach', label: 'كيف أبني' },
      ],
      journey: [
        {
          icon: '🎓',
          title: 'هندسة برمجيات بمرتبة الشرف',
          desc: 'بكالوريوس هندسة البرمجيات من جامعة المستقبل، تخرّج ٢٠٢٥ بمرتبة الشرف بمعدل ٤.٦ من ٥ — معمارية وتعلّم آلة وقواعد بيانات وتطوير آمن.',
        },
        {
          icon: '🏢',
          title: 'ممارسة مؤسسية في الرؤية الواضحة',
          desc: 'تدريب تعاوني في الرياض: تقليص زمن النشر حتى ٢٠٪ عبر تحسين CI/CD، وقيادة التصميم المعماري، وإجراء مراجعات أمنية، وإرشاد المتدربين.',
        },
        {
          icon: '🧱',
          title: 'بناء أنظمة كاملة بمفردي',
          desc: 'صمّمت وبنيت ونشرت منتجات كاملة وحدي — منصة مناقصات تنبؤية بـ ASP.NET Core، وخط بيانات لحظي بـ Python، وتطبيق Flutter يعمل دون اتصال.',
        },
        {
          icon: '🧠',
          title: 'هندسة الذكاء الاصطناعي في كفاءات',
          desc: 'أهندس اليوم واجهات خلفية قابلة للتوسّع وأقود دمج نماذج اللغة — واجهات النماذج، والاسترجاع، ومسارات النشر التي تُبقي الميزات الذكية موثوقة في الإنتاج.',
        },
      ],
      aiIntro:
        'عملي في الذكاء الاصطناعي هندسة تطبيقية. أدمج نماذج اللغة الكبيرة في منتجات يستخدمها الناس فعلاً، وأبني خطوط RAG تجعل الاسترجاع واعياً بالسياق، وأدرّب نماذج مُشرَفة للتنبؤ من بيانات أعمال حقيقية، وأحيط ذلك كله بمنطق حتمي — فيبقى السلوك متوقعاً حتى حين لا يتعاون النموذج.',
      capabilities: [
        'دمج Gemini و OpenAI في مسارات الإنتاج مع تحويل تلقائي بين المزوّدين',
        'بناء خطوط RAG لبحث دلالي واعٍ بالسياق فوق بيانات حقيقية',
        'تدريب نماذج مُشرَفة للتحليلات التنبؤية على بيانات الأعمال التاريخية',
        'ميزات معالجة لغة في الإنتاج — تلخيص المستندات ومساعدون واعون بالسياق',
        'هندسة الواجهات الخلفية بـ ASP.NET Core و Node.js ومخططات SQL تحتها',
        'هندسة بيانات لحظية بـ Kafka و Airflow و Delta Lake',
      ],
      inPractice: 'على أرض الواقع:',
      inPracticeBody:
        'منصة تعاون الطلاب تستخدم Gemini لتلخيص ملفات PDF والبحث الدلالي. ومنصة المناقصات تتنبأ بقيم الصفقات عبر نموذج مُشرَف مُدرَّب على عروض تاريخية. و"أبطال صغار" تتحوّل بين مزوّدَي نماذج لغة ثم إلى مولّد خوارزمي. كل واحدة منها ميزة ذكية لا تستطيع أن تُسقط المنتج معها.',
      approachIntro:
        'لا يهمّني أي إطار عمل رائج بقدر ما يهمّني أن يتصرّف النظام كما وعدت — على شبكة سيئة، وبمفتاح مفقود، في الثانية فجراً.',
      approach: [
        {
          icon: '🧭',
          title: 'الذكاء الاصطناعي معمارية لا زينة',
          desc: 'أحدّد موضع النموذج قبل كتابة أول تعليمة — وأين تكون القاعدة الحتمية أو المصنّف المدرَّب هي الإجابة الأفضل.',
          metrics: 'المشكلة ← نموذج أم قاعدة؟ ← الواجهة ← البديل',
        },
        {
          icon: '🛡️',
          title: 'صمّم لاحتمال فشل النموذج',
          desc: 'كل مسار ذكاء أطلقه له سلوك محدّد عند فقد المفتاح أو انتهاء المهلة أو رد غير صالح. "أبطال صغار" تتحوّل بين مزوّدَين ثم إلى مولّد خوارزمي.',
          metrics: 'تحويل متعدد النماذج • مهل زمنية • تحقق من المخطط',
        },
        {
          icon: '⚙️',
          title: 'امتلك الحزمة كاملة',
          desc: 'الواجهة الخلفية ونموذج البيانات وخط المعالجة والواجهة تُصمَّم معاً — وتُطلق عبر خط CI/CD بفحوصات أمنية مدمجة فيه لا مضافة بعده.',
          metrics: 'API • المخطط • الخط • الواجهة — نظام واحد متماسك',
        },
      ],
      openTo: 'مستعد لبناء منتجك — أو الانضمام إلى فريقك',
      cards: [
        {
          icon: '🚀',
          title: 'التوفّر',
          subtitle: 'وظائف ومشاريع',
          detail: 'مقيم في الرياض • مستعد للانتقال',
        },
        {
          icon: '🧠',
          title: 'التركيز',
          subtitle: 'نماذج اللغة و RAG والعربية',
          detail: 'دمج النماذج والاسترجاع والتقييم',
        },
        {
          icon: '🛠️',
          title: 'الأدوات',
          subtitle: 'Python • C# • JavaScript • Dart',
          detail: 'ASP.NET Core و Node.js و Flutter و SQL Server',
        },
        {
          icon: '🎓',
          title: 'التعليم',
          subtitle: 'بكالوريوس هندسة برمجيات',
          detail: 'جامعة المستقبل — مرتبة الشرف، ٤.٦ من ٥',
        },
      ],
      ctaTitle: 'لنبنِ شيئاً ذكياً',
      ctaSub: 'تواصل معي — عادةً أرد خلال يوم',
      expertiseHeading: 'مجالات الإتقان',
      expertiseLede: 'التخصصات التي أجمعها عند بناء نظام يعتمد على الذكاء الاصطناعي',
      proficiency: 'الإتقان',
      expertise: [
        {
          title: 'هندسة تطبيقات نماذج اللغة',
          description: 'تحويل Gemini و OpenAI إلى ميزات منتج يُعتمد عليها',
          skills: ['Google Gemini', 'OpenAI', 'تحويل متعدد النماذج', 'معالجة اللغة'],
        },
        {
          title: 'تعلّم الآلة والتحليلات التنبؤية',
          description: 'نماذج مُشرَفة تقدّر قيماً تجارية حقيقية',
          skills: ['التعلّم المُشرَف', 'هندسة الخصائص', 'تقييم النماذج', 'Pandas'],
        },
        {
          title: 'هندسة البيانات وخطوط RAG',
          description: 'استيعاب لحظي إلى تخزين Lakehouse ثم استرجاع دلالي',
          skills: ['Kafka', 'Airflow', 'Delta Lake', 'RAG'],
        },
        {
          title: 'هندسة الواجهات الخلفية والـ APIs',
          description: 'الخدمات القابلة للتوسّع التي تحمل استدعاءات النماذج في الإنتاج',
          skills: ['ASP.NET Core', 'Node.js', 'EF Core', 'REST و WebSockets'],
        },
        {
          title: 'قواعد البيانات ونمذجة البيانات',
          description: 'المخططات وتحسين الاستعلامات والتحكّم بالصلاحيات على نطاق مؤسسي',
          skills: ['SQL Server', 'MySQL', 'تحسين الاستعلامات', 'RBAC'],
        },
        {
          title: 'DevOps وضمان الجودة والتسليم الآمن',
          description: 'خطوط تُطلق بسرعة دون أن تُطلق ثغرات',
          skills: ['CI/CD', 'Docker', 'الاختبار الآلي', 'المراجعة الأمنية'],
        },
      ],
    },

    systems: {
      badge: 'تسليم متكامل',
      heading: 'أبني النظام كاملاً',
      lede: 'لا جزءاً منه. من أول رسم معماري حتى المنتج المنشور والمراقَب — نفّذت كل خطوة من هذه الخطوات بمفردي، في مشاريع حقيقية.',
      pipeline: [
        {
          step: '٠١',
          title: 'المعمارية ونموذج البيانات',
          desc: 'تحويل المتطلبات إلى تصميم نظام: حدود الخدمات، والمخطط، والتحكم بالصلاحيات، وأين يقع الذكاء.',
          proof: 'قيادة التصميم المعماري لمشاريع مؤسسية في الرؤية الواضحة',
        },
        {
          step: '٠٢',
          title: 'الواجهة الخلفية والـ APIs',
          desc: 'خدمات ASP.NET Core أو Node.js، وعقود REST و WebSocket، والمصادقة، وتحسين الاستعلامات خلفها.',
          proof: 'منصة مناقصات بـ EF Core و SQL Server، ومنصة بـ Express و MySQL',
        },
        {
          step: '٠٣',
          title: 'طبقة البيانات والذكاء',
          desc: 'خطوط الاستيعاب، وهندسة الخصائص، وتدريب النماذج أو دمج نماذج اللغة، والاسترجاع، والبدائل التي تُبقيها صادقة.',
          proof: 'Kafka ← Airflow ← Delta Lake ← RAG، بُني بمفردي',
        },
        {
          step: '٠٤',
          title: 'الواجهة',
          desc: 'Angular أو React/Next.js أو Flutter — متجاوبة وسهلة الوصول وثنائية اللغة حين يحتاجها الجمهور.',
          proof: 'واجهات ويب وجوال وسطح مكتب مُطلقة',
        },
        {
          step: '٠٥',
          title: 'الإطلاق والتشغيل',
          desc: 'CI/CD بتحقق أمني داخل الخط، وحاويات، واختبارات آلية، ونسخ احتياطي وتعافٍ من الكوارث.',
          proof: 'تقليص زمن النشر حتى ٢٠٪ عبر تحسين الخطوط',
        },
      ],
      offerHeading: 'ما الذي يمكنني بناؤه لك',
      offers: [
        {
          icon: '🤖',
          title: 'ميزات ذكاء اصطناعي داخل منتجك',
          desc: 'مساعد، أو ملخّص، أو بحث دلالي في مستنداتك، أو نموذج تنبؤي على بياناتك التاريخية — مصمَّم ببدائل بحيث لا يُسقط المنتج أبداً.',
        },
        {
          icon: '🏗️',
          title: 'منصة ويب متكاملة',
          desc: 'المعمارية وقاعدة البيانات والـ API ولوحة التحكم والصلاحيات والتقارير والنشر. مهندس واحد، نظام واحد متماسك، بلا فجوات تسليم.',
        },
        {
          icon: '📱',
          title: 'تطبيق جوال متعدد المنصات',
          desc: 'قاعدة كود Flutter واحدة لأندرويد و iOS — يعمل دون اتصال حين يلزم، مع خطوط عربية صحيحة ودعم RTL من البداية.',
        },
        {
          icon: '🔀',
          title: 'خطوط بيانات وأتمتة',
          desc: 'استيعاب لحظي أو دفعي، وتحقق، ومستودع Lakehouse للتخزين، وتنسيق للتشغيل، ولوحات أو API فوقه.',
        },
      ],
      proofLabel: 'الدليل',
      ctaTitle: 'عندك فكرة تريد بناءها؟',
      ctaBody:
        'اشرح لي المشكلة — وسأعود إليك بمعمارية ونطاق واقعي وجدول زمني. أو اسأل مساعدي أولاً؛ فهو يعرف ما أطلقته.',
      ctaPrimary: 'ابدأ مشروعاً',
      ctaSecondary: 'اسأل المساعد',
    },

    skills: {
      heading: 'الإتقان التقني',
      lede: 'من دمج النماذج وخطوط البيانات إلى الواجهات الخلفية وقواعد البيانات والتسليم الذي يحملها',
      categories: [
        'الذكاء الاصطناعي وتعلّم الآلة',
        'لغات البرمجة',
        'الواجهات الخلفية والـ APIs',
        'هندسة البيانات',
        'قواعد البيانات والواجهات',
        'DevOps والجودة والأدوات',
      ],
    },

    projects: {
      heading: 'المشاريع',
      lede: 'أنظمة صمّمتها وبنيتها وأطلقتها — حيث هُندست طبقة الذكاء والبرمجيات حولها معاً. أربعة منها تعمل الآن على الإنترنت؛ افتح أيّاً منها وجرّبه.',
      featured: 'مميّز',
      live: 'مباشر',
      liveAria: 'افتح الموقع المباشر',
      tapHint: 'اضغط لعرض التفاصيل',
      impact: 'الأثر',
      techStack: 'التقنيات',
      code: 'الكود',
      demo: 'عرض مباشر',
    },

    experience: {
      badge: 'الخبرة المهنية',
      heading: 'المسار الهندسي',
      lede: 'من درجة بمرتبة الشرف، مروراً بالهندسة المؤسسية، إلى قيادة دمج نماذج اللغة',
      achievements: 'إنجازات',
      technologies: 'تقنيات',
      keyAchievements: 'أبرز الإنجازات',
      technologiesUsed: 'التقنيات المستخدمة',
      fullTime: 'دوام كامل',
    },

    certifications: {
      badge: 'الشهادات',
      heading: 'المؤهلات والتعلّم المستمر',
      ledeA: 'شهادة في الذكاء الاصطناعي والذكاء التوليدي والحوسبة السحابية وتسليم البرمجيات',
      all: 'الكل',
      interestsHeading: 'مجالات الاهتمام',
      interestsLede: 'حيث أدفع عملي في المرحلة القادمة',
    },

    contact: {
      heading: 'لنبنِ شيئاً ذكياً',
      lede: 'مستعد لبناء المنتجات وللانضمام إلى فرق هندسة البرمجيات والذكاء الاصطناعي، من الرياض. أخبرني بما تريد بناءه.',
      getInTouch: 'تواصل معي',
      connect: 'تابعني',
      quickTitle: 'سرعة الرد',
      quickEmail: '📧 البريد: عادةً خلال ٢٤ ساعة',
      quickWhats: '💬 واتساب: الأسرع للرد',
      languagesTitle: 'اللغات',
      formTitle: 'أرسل رسالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      namePlaceholder: 'اسمك',
      emailPlaceholder: 'your@email.com',
      subjectPlaceholder: 'فكرة مشروع / استفسار وظيفي',
      messagePlaceholder: 'أخبرني بما تريد بناءه، أو بالدور الذي تفكّر فيه…',
      sending: 'جارٍ الإرسال…',
      send: 'إرسال الرسالة',
      success: 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.',
      failure: 'تعذّر إرسال الرسالة. حاول مرة أخرى أو تواصل معي مباشرة.',
      errRequired: 'مطلوب',
      errEmail: 'البريد الإلكتروني غير صالح',
      labels: {
        email: 'البريد',
        phone: 'الجوال',
        location: 'الموقع',
        github: 'GitHub',
        whatsapp: 'واتساب',
      },
    },

    footer: {
      blurb:
        'مهندس برمجيات وذكاء اصطناعي يصمّم ويبني ويُطلق أنظمة كاملة — المعمارية والبيانات وطبقة الذكاء والواجهة فوقها.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      serviceList: [
        'ميزات الذكاء ودمج نماذج اللغة',
        'منصات ويب متكاملة',
        'تطبيقات جوال متعددة المنصات',
        'خطوط بيانات وأتمتة',
        'CI/CD والتسليم الآمن',
      ],
      rights: 'جميع الحقوق محفوظة.',
      builtWith: 'بُني بـ Next.js و Tailwind CSS.',
      backToTop: 'العودة للأعلى',
      contact: 'تواصل',
    },
  },
} as const

export type UI = (typeof ui)['en']
