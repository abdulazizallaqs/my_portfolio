import type { Locale } from '@/lib/locales'

export type ProjectStatus = 'production' | 'academic' | 'open-source'

export type ProjectImage = {
  src: string
  width: number
  height: number
  alt: Record<Locale, string>
}

export type LocalizedProject = {
  title: string
  tagline: string
  summary: string
  overview: string
  problem: string
  solution: string
  role: string
  features: { title: string; desc: string }[]
  architecture: string[]
  highlights: string[]
  impact: string
}

export type Project = {
  slug: string
  year: string
  status: ProjectStatus
  featured: boolean
  tech: string[]
  github?: string
  demo?: string
  /** Tailwind gradient used for the card header and the project page hero. */
  accent: string
  images: ProjectImage[]
} & Record<Locale, LocalizedProject>

export const projects: Project[] = [
  {
    slug: 'tender-management-system',
    year: '2025',
    status: 'academic',
    featured: true,
    tech: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'Machine Learning', 'JavaScript'],
    accent: 'from-cyan-500 to-blue-700',
    images: [],
    en: {
      title: 'AI-Powered Tender Management System',
      tagline: 'Bid management with a supervised model that predicts deal value',
      summary:
        'A secure tender and bid-management platform with role-based access control, automated document routing, and a supervised-learning module that estimates deal values from historical tenders.',
      overview:
        'Organisations that run tenders sit on years of historical bid data and almost never use it. This platform manages the full tender lifecycle — publishing, bidding, evaluation, award — and layers a predictive module on top that estimates the likely value and budget range of a new tender from the ones that came before it.',
      problem:
        'Tender evaluation was manual, inconsistent, and slow. Budget estimates depended on whoever happened to be in the room, documents were retrieved by hand, and there was no audit trail an executive could sign off on.',
      solution:
        'I built the platform around a clean domain model in Entity Framework Core with role-based access control at its centre, then trained a supervised regression model on historical tender records to produce budget estimates evaluators can sanity-check rather than guess at. Compliance reporting is generated from the same data, so the numbers in the report are the numbers in the system.',
      role: 'End to end: data preprocessing pipeline, ML module, backend architecture, and reporting',
      features: [
        {
          title: 'Predictive budget estimation',
          desc: 'A supervised model trained on historical tenders estimates deal values and budget ranges for new submissions.',
        },
        {
          title: 'Role-based access control',
          desc: 'Identity and permissions managed through EF Core, so buyers, bidders, and evaluators each see exactly their slice of the system.',
        },
        {
          title: 'Automated document retrieval',
          desc: 'ID-based routing pulls the right attachment for the right tender without manual lookup.',
        },
        {
          title: 'Audit-ready compliance reports',
          desc: 'Stakeholder-specific PDF reports generated straight from the live data for executive review.',
        },
      ],
      architecture: [
        'ASP.NET Core application with a layered service and repository structure',
        'Entity Framework Core over SQL Server, with LINQ queries tuned for the reporting workload',
        'Preprocessing pipeline that cleans and encodes historical tender records for training',
        'Supervised regression model exposed to the app as a prediction endpoint',
        'Server-side PDF generation for compliance and audit reports',
      ],
      highlights: [
        'Prediction module turns years of dormant historical tenders into a usable budget estimate',
        'LINQ and EF Core queries optimised for high-performance SQL Server interaction',
        'RBAC and identity handled at the data layer rather than bolted onto the UI',
        'Compliance reports generated automatically instead of assembled by hand',
      ],
      impact:
        'A supervised-learning module that predicts deal values and budget ranges from historical tenders, wrapped in an RBAC-secured system that produces audit-ready compliance reports automatically.',
    },
    ar: {
      title: 'نظام إدارة المناقصات المدعوم بالذكاء الاصطناعي',
      tagline: 'إدارة العطاءات مع نموذج تعلّم آلي يتنبأ بقيمة الصفقة',
      summary:
        'منصة آمنة لإدارة المناقصات والعطاءات، بصلاحيات مبنية على الأدوار، وتوجيه آلي للمستندات، ووحدة تعلّم آلي مُشرَف تُقدّر قيم الصفقات اعتماداً على المناقصات السابقة.',
      overview:
        'الجهات التي تدير المناقصات تملك سنوات من بيانات العطاءات ونادراً ما تستفيد منها. تدير هذه المنصة دورة حياة المناقصة كاملة — الطرح، وتقديم العطاءات، والتقييم، والترسية — وتضيف فوقها وحدة تنبؤية تُقدّر القيمة المتوقعة والنطاق المالي لأي مناقصة جديدة استناداً إلى ما سبقها.',
      problem:
        'كان تقييم المناقصات يدوياً وغير متسق وبطيئاً. التقديرات المالية تعتمد على اجتهاد الأشخاص، واسترجاع المستندات يتم يدوياً، ولا يوجد سجل تدقيق يصلح لاعتماد الإدارة التنفيذية.',
      solution:
        'بنيتُ المنصة حول نموذج بيانات نظيف في Entity Framework Core مع صلاحيات مبنية على الأدوار في صميمه، ثم دربتُ نموذج انحدار مُشرَف على سجلات المناقصات التاريخية لإنتاج تقديرات مالية يستطيع المُقيّم التحقق منها بدل التخمين. وتُولَّد تقارير الامتثال من البيانات نفسها، فالأرقام في التقرير هي الأرقام في النظام.',
      role: 'العمل كاملاً: خط معالجة البيانات، ووحدة التعلّم الآلي، ومعمارية الواجهة الخلفية، والتقارير',
      features: [
        {
          title: 'تقدير تنبؤي للميزانية',
          desc: 'نموذج مُشرَف مدرَّب على المناقصات السابقة يُقدّر قيم الصفقات والنطاقات المالية للعروض الجديدة.',
        },
        {
          title: 'صلاحيات مبنية على الأدوار',
          desc: 'إدارة الهوية والصلاحيات عبر EF Core، فيرى المشتري ومقدّم العطاء والمُقيّم كلٌّ نطاقه فقط.',
        },
        {
          title: 'استرجاع آلي للمستندات',
          desc: 'توجيه قائم على المعرّفات يجلب المرفق الصحيح للمناقصة الصحيحة دون بحث يدوي.',
        },
        {
          title: 'تقارير امتثال جاهزة للتدقيق',
          desc: 'تقارير PDF مخصّصة لكل جهة معنية تُولَّد مباشرة من البيانات الحيّة لمراجعة الإدارة.',
        },
      ],
      architecture: [
        'تطبيق ASP.NET Core ببنية طبقية للخدمات والمستودعات',
        'Entity Framework Core فوق SQL Server، مع استعلامات LINQ محسّنة لأحمال التقارير',
        'خط معالجة ينظّف ويرمّز سجلات المناقصات التاريخية للتدريب',
        'نموذج انحدار مُشرَف مُتاح للتطبيق عبر نقطة نهاية للتنبؤ',
        'توليد ملفات PDF من الخادم لتقارير الامتثال والتدقيق',
      ],
      highlights: [
        'الوحدة التنبؤية تحوّل سنوات من المناقصات الراكدة إلى تقدير مالي قابل للاستخدام',
        'تحسين استعلامات LINQ و EF Core لأداء عالٍ مع SQL Server',
        'الصلاحيات والهوية تُدار في طبقة البيانات لا في الواجهة',
        'تقارير الامتثال تُولَّد آلياً بدل تجميعها يدوياً',
      ],
      impact:
        'وحدة تعلّم مُشرَف تتنبأ بقيم الصفقات والنطاقات المالية من المناقصات السابقة، داخل نظام محمي بالصلاحيات ينتج تقارير امتثال جاهزة للتدقيق آلياً.',
    },
  },
  {
    slug: 'student-helper',
    year: '2025',
    status: 'open-source',
    featured: true,
    tech: ['Node.js', 'Express.js', 'MySQL', 'Google Gemini', 'WebSockets', 'EJS', 'Tailwind CSS'],
    github: 'https://github.com/abdulazizallaqs/student-helper-app',
    accent: 'from-sky-500 to-indigo-700',
    images: [
      {
        src: '/projects/student-helper/ai-study-buddy.webp',
        width: 1600,
        height: 942,
        alt: {
          en: 'The AI Study Buddy answering a question about an uploaded PDF',
          ar: 'مساعد المذاكرة الذكي يجيب عن سؤال حول ملف PDF مرفوع',
        },
      },
      {
        src: '/projects/student-helper/upload.webp',
        width: 1600,
        height: 931,
        alt: {
          en: 'The upload screen where students add and categorise study material',
          ar: 'شاشة الرفع حيث يضيف الطلاب المواد الدراسية ويصنّفونها',
        },
      },
      {
        src: '/projects/student-helper/my-files.webp',
        width: 1600,
        height: 939,
        alt: {
          en: 'A student’s personal library of shared and saved files',
          ar: 'مكتبة الطالب الشخصية من الملفات المشاركة والمحفوظة',
        },
      },
      {
        src: '/projects/student-helper/admin.webp',
        width: 1600,
        height: 935,
        alt: {
          en: 'The admin dashboard for managing users and content',
          ar: 'لوحة تحكم المشرف لإدارة المستخدمين والمحتوى',
        },
      },
    ],
    en: {
      title: 'Student Collaboration Portal — AI Study Buddy',
      tagline: 'A shared study library with a Gemini-powered assistant on top of it',
      summary:
        'A file-sharing and collaboration platform for students, with a context-aware AI Study Buddy that summarises uploaded PDFs and answers questions about them. Built as team lead of four developers.',
      overview:
        'Students already share notes — over WhatsApp, in scattered folders, with no structure and no way to search. This portal gives them one place to upload, categorise, and discuss study material, and puts a Gemini-backed assistant on top that reads the uploaded PDFs and answers questions about them.',
      problem:
        'Course material lived in group chats. Nothing was categorised, nothing was searchable, and a 200-page PDF was a wall you either read or skipped.',
      solution:
        'A Node.js and Express backend over MySQL handles accounts, uploads, categories, favourites, and per-file chat rooms. On top of that, I integrated Google Gemini for NLP-based PDF summarisation and semantic search, so a student can ask what chapter four actually says instead of scrolling. Real-time chat and live updates run over WebSockets.',
      role: 'Team lead of 4 developers — AI integration, backend architecture, and delivery',
      features: [
        {
          title: 'AI Study Buddy',
          desc: 'Google Gemini reads uploaded PDFs and answers questions in context, with NLP-based summarisation for long documents.',
        },
        {
          title: 'Semantic search',
          desc: 'Search across the shared library by meaning rather than exact filename matching.',
        },
        {
          title: 'File-based chat rooms',
          desc: 'Every uploaded resource gets its own discussion thread, plus direct messaging between students.',
        },
        {
          title: 'Favourites and personal library',
          desc: 'Save the material that matters and get back to it in one click.',
        },
        {
          title: 'Admin dashboard',
          desc: 'User and content management, with moderation over what gets shared.',
        },
        {
          title: 'Hardened by default',
          desc: 'Helmet, CSRF protection, rate limiting, bcrypt password hashing, request validation, and Google OAuth sign-in.',
        },
      ],
      architecture: [
        'Express.js API with controller, model, and route separation, and EJS-rendered views',
        'MySQL for users, files, categories, chats, messages, and favourites',
        'Google Gemini for summarisation and question answering over parsed PDFs',
        'pdf-parse for text extraction before content reaches the model',
        'WebSockets for live chat and real-time database synchronisation',
        'Session auth with Passport and Google OAuth 2.0, plus bcrypt-hashed local accounts',
        'Security middleware layer: Helmet, CSRF tokens, per-route rate limiters, input validation',
        'Vitest unit and integration test suites',
      ],
      highlights: [
        '40% improvement in file-sharing efficiency after backend optimisation',
        'Led a four-person team from architecture through delivery',
        'LLM features designed so a failed model call never blocks core file sharing',
        'Full REST API documented endpoint by endpoint',
      ],
      impact:
        '40% improvement in file-sharing efficiency; an LLM-powered study assistant with PDF summarisation and semantic search, delivered as team lead of 4 developers.',
    },
    ar: {
      title: 'منصة تعاون الطلاب — مساعد المذاكرة الذكي',
      tagline: 'مكتبة دراسية مشتركة يعلوها مساعد ذكي مبني على Gemini',
      summary:
        'منصة لمشاركة الملفات والتعاون بين الطلاب، مع مساعد ذكي يفهم السياق يلخّص ملفات PDF المرفوعة ويجيب عن الأسئلة حولها. نُفِّذت بقيادتي لفريق من أربعة مطورين.',
      overview:
        'الطلاب يتشاركون الملخصات أصلاً — عبر واتساب، وفي مجلدات متفرقة، بلا تنظيم ولا إمكانية بحث. تمنحهم هذه المنصة مكاناً واحداً لرفع المواد الدراسية وتصنيفها ومناقشتها، وتضع فوقها مساعداً مبنياً على Gemini يقرأ ملفات PDF المرفوعة ويجيب عن الأسئلة حولها.',
      problem:
        'كانت المواد الدراسية تعيش داخل مجموعات الدردشة: لا تصنيف، ولا بحث، وملف من مئتي صفحة إما أن تقرأه كاملاً أو تتجاوزه.',
      solution:
        'واجهة خلفية بـ Node.js و Express فوق MySQL تدير الحسابات والرفع والتصنيفات والمفضلة وغرف الدردشة لكل ملف. وفوق ذلك دمجتُ Google Gemini للتلخيص والبحث الدلالي المعتمد على معالجة اللغة الطبيعية، فيسأل الطالب عمّا يقوله الفصل الرابع فعلاً بدل التمرير الطويل. والدردشة الحيّة والتحديثات الفورية تعمل عبر WebSockets.',
      role: 'قيادة فريق من 4 مطورين — دمج الذكاء الاصطناعي، ومعمارية الواجهة الخلفية، والتسليم',
      features: [
        {
          title: 'مساعد المذاكرة الذكي',
          desc: 'يقرأ Google Gemini ملفات PDF المرفوعة ويجيب ضمن السياق، مع تلخيص للمستندات الطويلة.',
        },
        {
          title: 'بحث دلالي',
          desc: 'بحث في المكتبة المشتركة بالمعنى لا بمطابقة اسم الملف حرفياً.',
        },
        {
          title: 'غرف نقاش لكل ملف',
          desc: 'لكل مادة مرفوعة نقاش خاص بها، إضافة إلى الرسائل المباشرة بين الطلاب.',
        },
        {
          title: 'المفضلة والمكتبة الشخصية',
          desc: 'حفظ المواد المهمة والعودة إليها بنقرة واحدة.',
        },
        {
          title: 'لوحة تحكم المشرف',
          desc: 'إدارة المستخدمين والمحتوى مع الإشراف على ما يُشارَك.',
        },
        {
          title: 'حماية مدمجة',
          desc: 'Helmet، وحماية من CSRF، وتحديد معدل الطلبات، وتشفير كلمات المرور بـ bcrypt، والتحقق من المدخلات، وتسجيل دخول عبر Google.',
        },
      ],
      architecture: [
        'واجهة Express.js بفصل بين المتحكمات والنماذج والمسارات مع واجهات EJS',
        'قاعدة MySQL للمستخدمين والملفات والتصنيفات والمحادثات والرسائل والمفضلة',
        'Google Gemini للتلخيص والإجابة عن الأسئلة فوق نصوص PDF المستخرجة',
        'استخراج النصوص عبر pdf-parse قبل وصول المحتوى إلى النموذج',
        'WebSockets للدردشة الحيّة ومزامنة قاعدة البيانات لحظياً',
        'مصادقة بالجلسات عبر Passport و Google OAuth 2.0 مع حسابات محلية مشفّرة بـ bcrypt',
        'طبقة حماية وسيطة: Helmet، ورموز CSRF، ومحددات معدل لكل مسار، والتحقق من المدخلات',
        'اختبارات وحدة وتكامل باستخدام Vitest',
      ],
      highlights: [
        'تحسّن بنسبة 40% في كفاءة مشاركة الملفات بعد تحسين الواجهة الخلفية',
        'قيادة فريق من أربعة أفراد من المعمارية حتى التسليم',
        'صُمّمت ميزات الذكاء الاصطناعي بحيث لا يعطّل فشل النموذج مشاركة الملفات الأساسية',
        'واجهة REST كاملة موثّقة نقطة نهاية بنقطة نهاية',
      ],
      impact:
        'تحسّن بنسبة 40% في كفاءة مشاركة الملفات؛ ومساعد دراسي مبني على نماذج اللغة يلخّص ملفات PDF ويبحث دلالياً، بقيادة فريق من 4 مطورين.',
    },
  },
  {
    slug: 'ecommerce-data-pipeline',
    year: '2026',
    status: 'academic',
    featured: true,
    tech: ['Python', 'Apache Kafka', 'Apache Airflow', 'Delta Lake', 'RAG', 'JSON Schema'],
    accent: 'from-teal-500 to-cyan-700',
    images: [],
    en: {
      title: 'E-Commerce Real-Time Product Pipeline',
      tagline: 'Streaming ingestion into a lakehouse, with semantic search on the other end',
      summary:
        'A real-time ingestion pipeline for e-commerce product updates: Kafka producers and consumers, JSON Schema validation, a bronze/gold Delta Lake architecture, Airflow orchestration, and a RAG layer for context-aware product search.',
      overview:
        'Product catalogues change constantly — price, stock, description, images — and the systems that consume them usually get a nightly dump. This pipeline treats product updates as a stream, validates them at the edge, lands them in a lakehouse, and exposes the result to a retrieval-augmented search layer.',
      problem:
        'Batch product feeds are stale by the time they land, and malformed records poison downstream tables. On top of that, keyword search over product data misses most of what a shopper actually means.',
      solution:
        'Kafka carries product updates as they happen. Every message is validated against a JSON Schema before it is accepted, so bad records are rejected at the boundary rather than discovered three tables later. Accepted events land in a bronze Delta Lake layer as raw history, then get cleaned and conformed into gold tables. Airflow orchestrates the whole thing on a schedule, and a RAG pipeline over the gold layer turns product data into semantic search.',
      role: 'End-to-end data engineering: streaming, storage architecture, orchestration, retrieval',
      features: [
        {
          title: 'Streaming ingestion',
          desc: 'A Kafka producer and consumer architecture that handles product updates as a continuous stream rather than a nightly batch.',
        },
        {
          title: 'Schema validation at the edge',
          desc: 'JSON Schema validation on every message, so malformed records never reach storage.',
        },
        {
          title: 'Bronze and gold lakehouse',
          desc: 'Delta Lake layering that keeps raw history immutable while serving clean, conformed tables downstream.',
        },
        {
          title: 'Orchestrated workflows',
          desc: 'Apache Airflow DAGs coordinating ingestion, transformation, and quality checks with retries and visibility.',
        },
        {
          title: 'RAG product search',
          desc: 'A retrieval-augmented layer over the gold tables that answers product questions in context instead of matching keywords.',
        },
      ],
      architecture: [
        'Kafka topics for product create, update, and delete events',
        'A JSON Schema contract enforced by the consumer before any write',
        'Delta Lake bronze layer — append-only raw event history',
        'Delta Lake gold layer — deduplicated, typed, query-ready product tables',
        'Airflow DAGs for scheduling, dependency management, and retries',
        'An embedding and retrieval layer feeding an LLM for context-aware product answers',
      ],
      highlights: [
        'Schema-first design: invalid data is rejected at ingest, not debugged in the warehouse',
        'Lakehouse layering keeps raw history replayable when transformation logic changes',
        'Orchestration gives the pipeline retries and observability instead of silent failure',
        'The retrieval layer turns a product catalogue into something you can ask questions of',
      ],
      impact:
        'End-to-end data engineering: streaming ingestion, schema-validated lakehouse storage, orchestrated workflows, and a RAG layer that turns raw product data into semantic search.',
    },
    ar: {
      title: 'خط بيانات لحظي لمنتجات التجارة الإلكترونية',
      tagline: 'استقبال متدفّق داخل مستودع بحيري، وبحث دلالي في الطرف الآخر',
      summary:
        'خط استقبال لحظي لتحديثات منتجات التجارة الإلكترونية: منتجون ومستهلكون على Kafka، وتحقق عبر JSON Schema، ومعمارية Delta Lake بطبقتَي bronze و gold، وتنسيق عبر Airflow، وطبقة RAG لبحث يفهم السياق.',
      overview:
        'كتالوجات المنتجات تتغير باستمرار — السعر والمخزون والوصف والصور — والأنظمة التي تستهلكها تحصل عادة على نسخة ليلية واحدة. يعامل هذا الخط تحديثات المنتجات كتدفّق، ويتحقق منها عند الحدود، ويخزّنها في مستودع بحيري، ثم يتيح النتيجة لطبقة بحث معزّزة بالاسترجاع.',
      problem:
        'التغذية الدفعية للمنتجات تصل قديمة أصلاً، والسجلات المشوّهة تفسد الجداول اللاحقة. وفوق ذلك، البحث بالكلمات المفتاحية يفوّت أغلب ما يقصده المتسوّق فعلاً.',
      solution:
        'ينقل Kafka تحديثات المنتجات لحظة حدوثها. وكل رسالة يتم التحقق منها مقابل JSON Schema قبل قبولها، فتُرفض السجلات الخاطئة عند الحدود بدل اكتشافها بعد ثلاثة جداول. تهبط الأحداث المقبولة في طبقة bronze داخل Delta Lake كتاريخ خام، ثم تُنظَّف وتُوحَّد في جداول gold. وينسّق Airflow المنظومة كاملة وفق جدول زمني، ويحوّل خط RAG فوق طبقة gold بيانات المنتجات إلى بحث دلالي.',
      role: 'هندسة بيانات متكاملة: التدفّق، ومعمارية التخزين، والتنسيق، والاسترجاع',
      features: [
        {
          title: 'استقبال متدفّق',
          desc: 'معمارية منتِج ومستهلك على Kafka تتعامل مع تحديثات المنتجات كتدفّق مستمر لا كدفعة ليلية.',
        },
        {
          title: 'تحقق من المخطط عند الحدود',
          desc: 'تحقق بـ JSON Schema على كل رسالة، فلا تصل السجلات المشوّهة إلى التخزين إطلاقاً.',
        },
        {
          title: 'مستودع بحيري bronze و gold',
          desc: 'طبقات Delta Lake تحفظ التاريخ الخام غير قابل للتغيير وتقدّم جداول نظيفة وموحّدة للاستهلاك.',
        },
        {
          title: 'سير عمل منسَّق',
          desc: 'مخططات Airflow تنسّق الاستقبال والتحويل وفحوص الجودة مع إعادة المحاولة ووضوح الحالة.',
        },
        {
          title: 'بحث منتجات بـ RAG',
          desc: 'طبقة معزّزة بالاسترجاع فوق جداول gold تجيب عن أسئلة المنتجات ضمن السياق بدل مطابقة الكلمات.',
        },
      ],
      architecture: [
        'مواضيع Kafka لأحداث إنشاء المنتجات وتحديثها وحذفها',
        'عقد JSON Schema يفرضه المستهلك قبل أي عملية كتابة',
        'طبقة bronze في Delta Lake — تاريخ أحداث خام بالإضافة فقط',
        'طبقة gold في Delta Lake — جداول منتجات منقّاة ومصنّفة وجاهزة للاستعلام',
        'مخططات Airflow للجدولة وإدارة التبعيات وإعادة المحاولة',
        'طبقة تضمين واسترجاع تغذّي نموذج لغة لإجابات منتجات ضمن السياق',
      ],
      highlights: [
        'تصميم يبدأ من المخطط: البيانات غير الصالحة تُرفض عند الاستقبال لا تُصحَّح في المستودع',
        'طبقية المستودع البحيري تُبقي التاريخ الخام قابلاً لإعادة التشغيل عند تغيّر منطق التحويل',
        'التنسيق يمنح الخط إعادة محاولة وقابلية مراقبة بدل الفشل الصامت',
        'طبقة الاسترجاع تحوّل كتالوج المنتجات إلى شيء يمكن سؤاله',
      ],
      impact:
        'هندسة بيانات متكاملة: استقبال متدفّق، وتخزين بحيري متحقَّق من مخططه، وسير عمل منسَّق، وطبقة RAG تحوّل بيانات المنتجات الخام إلى بحث دلالي.',
    },
  },
  {
    slug: 'math-heroes',
    year: '2025',
    status: 'open-source',
    featured: true,
    tech: ['JavaScript', 'Node.js', 'Express.js', 'OpenAI API', 'Google Gemini'],
    github: 'https://github.com/abdulazizallaqs/Math-Heroes',
    accent: 'from-blue-500 to-cyan-700',
    images: [
      {
        src: '/projects/math-heroes/home.webp',
        width: 1600,
        height: 834,
        alt: {
          en: 'The Math Heroes home screen with the three game modes',
          ar: 'الشاشة الرئيسية لـ Math Heroes وأنماط اللعب الثلاثة',
        },
      },
      {
        src: '/projects/math-heroes/addition.webp',
        width: 1600,
        height: 933,
        alt: {
          en: 'The addition mode with a generated question and answer choices',
          ar: 'نمط الجمع مع سؤال مُولَّد وخيارات للإجابة',
        },
      },
      {
        src: '/projects/math-heroes/subtraction.webp',
        width: 1600,
        height: 927,
        alt: {
          en: 'The subtraction mode with adaptive difficulty in progress',
          ar: 'نمط الطرح مع الصعوبة المتكيّفة أثناء اللعب',
        },
      },
    ],
    en: {
      title: 'Math Heroes — AI Educational Game',
      tagline: 'An AI question generator that cannot take the game down with it',
      summary:
        'A full-stack educational math game for children with adaptive difficulty and a multi-LLM question generator that falls back across OpenAI, Gemini, and a deterministic algorithmic generator underneath.',
      overview:
        'Math Heroes is a browser game that teaches addition, subtraction, and number guessing to children roughly 6 to 10 years old. The interesting part is not the game loop — it is what happens when the AI behind it is unavailable, rate-limited, or simply not configured. The answer is: nothing visible. The game keeps working.',
      problem:
        'Practice questions from a fixed question bank get memorised fast. Generating them with an LLM fixes that — and introduces a single point of failure into a children’s game that has to work on a school laptop with a flaky connection.',
      solution:
        'The backend asks OpenAI first, falls back to Google Gemini, and if neither is configured or both fail, drops to a deterministic algorithmic generator that produces valid questions offline. Every AI response is parsed against a fixed JSON schema — question, answer, four choices, hint — so a malformed reply is treated as a failure and the fallback takes over. Difficulty adapts in real time to how the player is doing.',
      role: 'Full-stack: backend architecture, fallback design, frontend, and game logic',
      features: [
        {
          title: 'Multi-LLM fallback chain',
          desc: 'OpenAI, then Google Gemini, then a deterministic algorithmic generator. The player never sees which one answered.',
        },
        {
          title: 'Adaptive difficulty',
          desc: 'Real-time analysis of player performance raises and lowers the level as the session goes on.',
        },
        {
          title: 'Schema-validated generation',
          desc: 'Every generated question must match a strict JSON shape — question, answer, four distinct choices, and a hint — or it is discarded.',
        },
        {
          title: 'Three game modes',
          desc: 'Addition, subtraction, and guess-the-number, each with its own pacing.',
        },
        {
          title: 'Built for kids',
          desc: 'Sound effects, animations, fireworks on a streak, and immediate feedback on every answer.',
        },
      ],
      architecture: [
        'An Express.js server exposing a single question-generation endpoint',
        'A provider chain in the route handler: OpenAI first, Gemini second, algorithmic generator last',
        'A strict JSON contract between the model and the client, validated server-side',
        'A vanilla JavaScript frontend with anime.js for animation — no framework, fast on old hardware',
        'Static assets and sounds served by the same Node process for one-command local running',
      ],
      highlights: [
        'The AI enhances the game but can never break it — a missing API key is a non-event',
        'Runs fully offline with the algorithmic generator when no provider is configured',
        'Schema validation turns a bad model response into a graceful fallback rather than a crash',
        'Adaptive difficulty keeps the challenge matched to the child instead of fixed per level',
      ],
      impact:
        'A multi-LLM fallback architecture with a deterministic generator underneath — the AI enhances the game but can never break it.',
    },
    ar: {
      title: 'Math Heroes — لعبة تعليمية بالذكاء الاصطناعي',
      tagline: 'مولّد أسئلة بالذكاء الاصطناعي لا يستطيع إسقاط اللعبة معه',
      summary:
        'لعبة رياضيات تعليمية متكاملة للأطفال بصعوبة متكيّفة ومولّد أسئلة متعدد النماذج يتراجع من OpenAI إلى Gemini ثم إلى مولّد خوارزمي حتمي تحتهما.',
      overview:
        'Math Heroes لعبة في المتصفح تعلّم الجمع والطرح وتخمين الأرقام لأطفال بين ست وعشر سنوات تقريباً. والجزء المثير ليس حلقة اللعب، بل ما يحدث حين يكون الذكاء الاصطناعي خلفها غير متاح أو محدود الطلبات أو غير مُهيّأ أصلاً. والجواب: لا شيء يظهر للاعب. اللعبة تستمر.',
      problem:
        'أسئلة التمرين من بنك ثابت يحفظها الطفل بسرعة. وتوليدها بنموذج لغة يحل ذلك — لكنه يُدخِل نقطة فشل وحيدة في لعبة أطفال يُفترض أن تعمل على حاسب مدرسي باتصال ضعيف.',
      solution:
        'تسأل الواجهة الخلفية OpenAI أولاً، ثم تتراجع إلى Google Gemini، وإن لم يُهيّأ أيٌّ منهما أو فشلا معاً تنتقل إلى مولّد خوارزمي حتمي ينتج أسئلة صحيحة دون إنترنت. وكل استجابة تُحلَّل مقابل مخطط JSON ثابت — سؤال وإجابة وأربعة خيارات وتلميح — فأي رد مشوّه يُعامَل كفشل ويتولى البديل. وتتكيّف الصعوبة لحظياً مع أداء اللاعب.',
      role: 'تطوير متكامل: معمارية الخادم، وتصميم التراجع، والواجهة، ومنطق اللعبة',
      features: [
        {
          title: 'سلسلة تراجع متعددة النماذج',
          desc: 'OpenAI ثم Google Gemini ثم مولّد خوارزمي حتمي. ولا يرى اللاعب أيّها أجاب.',
        },
        {
          title: 'صعوبة متكيّفة',
          desc: 'تحليل لحظي لأداء اللاعب يرفع المستوى ويخفضه أثناء الجلسة.',
        },
        {
          title: 'توليد متحقَّق من مخططه',
          desc: 'كل سؤال مُولَّد يجب أن يطابق شكل JSON صارم — سؤال وإجابة وأربعة خيارات متمايزة وتلميح — وإلا استُبعد.',
        },
        {
          title: 'ثلاثة أنماط لعب',
          desc: 'الجمع والطرح وتخمين الرقم، لكل منها إيقاعه.',
        },
        {
          title: 'مصمَّمة للأطفال',
          desc: 'مؤثرات صوتية وحركات وألعاب نارية عند التتابع وتغذية راجعة فورية لكل إجابة.',
        },
      ],
      architecture: [
        'خادم Express.js يعرض نقطة نهاية واحدة لتوليد الأسئلة',
        'سلسلة مزوّدين داخل معالج المسار: OpenAI أولاً، ثم Gemini، ثم المولّد الخوارزمي',
        'عقد JSON صارم بين النموذج والعميل يُتحقق منه في الخادم',
        'واجهة بجافاسكربت خالصة مع anime.js للحركة — بلا إطار عمل، وسريعة على الأجهزة القديمة',
        'الملفات الثابتة والأصوات يخدمها نفس عملية Node لتشغيل محلي بأمر واحد',
      ],
      highlights: [
        'الذكاء الاصطناعي يُثري اللعبة ولا يستطيع كسرها — وغياب المفتاح حدث غير مرئي',
        'تعمل كاملة دون إنترنت بالمولّد الخوارزمي حين لا يُهيّأ أي مزوّد',
        'التحقق من المخطط يحوّل الرد السيئ إلى تراجع سلس بدل انهيار',
        'الصعوبة المتكيّفة تُبقي التحدي مناسباً للطفل بدل مستويات ثابتة',
      ],
      impact:
        'معمارية تراجع متعددة النماذج مع مولّد حتمي تحتها — الذكاء الاصطناعي يُثري اللعبة ولا يمكنه كسرها.',
    },
  },
  {
    slug: 'quran-app',
    year: '2025',
    status: 'open-source',
    featured: true,
    tech: ['Flutter', 'Dart', 'Provider', 'Android & iOS', 'Local Storage', 'Rule-Based AI'],
    github: 'https://github.com/abdulazizallaqs/The-Noble-Quran',
    accent: 'from-cyan-600 to-sky-800',
    images: [
      {
        src: '/projects/quran-app/home.webp',
        width: 612,
        height: 1350,
        alt: {
          en: 'The home screen with the surah list and search',
          ar: 'الشاشة الرئيسية مع قائمة السور والبحث',
        },
      },
      {
        src: '/projects/quran-app/mood.webp',
        width: 612,
        height: 1350,
        alt: {
          en: 'The Smart Mood Verse screen suggesting verses for the selected emotion',
          ar: 'شاشة «آية حسب حالتك» تقترح آيات مناسبة للشعور المختار',
        },
      },
      {
        src: '/projects/quran-app/plan.webp',
        width: 612,
        height: 1350,
        alt: {
          en: 'A custom reading and memorisation plan with progress tracking',
          ar: 'خطة قراءة وحفظ مخصّصة مع تتبع التقدّم',
        },
      },
    ],
    en: {
      title: 'The Noble Quran — Smart Offline App',
      tagline: '100% offline, including the intelligence',
      summary:
        'A cross-platform Flutter app for reading and memorising the Quran. Every feature — including the rule-based Smart Mood Verse recommender — runs on-device with no network and no data leaving the phone.',
      overview:
        'Most Quran apps need a connection for something: audio, search, recommendations, sync. This one does not. Reading, memorisation plans, bookmarks, notifications, and the verse recommender all run locally, which means it works on a plane, in a basement, and on a prepaid SIM with no data left.',
      problem:
        'Offline-first is easy to claim and hard to hold to. The moment you add a smart feature, the usual answer is an API call — which breaks the promise, adds latency, and sends the user’s emotional state to a server.',
      solution:
        'The Smart Mood Verse feature is a rule-based inference engine, not a model call: it maps an emotional state — sadness, anxiety, gratitude, joy — onto contextually relevant verses using local logic. Reading plans, bookmarks, and preferences persist on-device through a Provider-based state layer. Notifications are scheduled locally with proper Android 13+ permission and time-zone handling.',
      role: 'Solo developer — architecture, Arabic typography, native integrations, and release builds',
      features: [
        {
          title: 'Smart Mood Verse',
          desc: 'A rule-based recommender that suggests comforting verses for the reader’s current emotional state — entirely on-device, no API.',
        },
        {
          title: 'Reading and memorisation plans',
          desc: 'Custom schedules with surah-by-surah progress tracking that persists locally.',
        },
        {
          title: 'Daily reminders',
          desc: 'Local notifications with Android 13+ permission and exact-alarm handling, plus correct time-zone scheduling.',
        },
        {
          title: 'Proper Arabic typography',
          desc: 'HafsSmart and me_quran fonts with page-accurate rendering, plus page-view and scroll-view reading modes.',
        },
        {
          title: 'Dark and light themes',
          desc: 'A full theme layer with a distraction-free reading surface in both modes.',
        },
        {
          title: 'Fully offline and private',
          desc: 'No network calls at all. Reading progress and preferences never leave the device.',
        },
      ],
      architecture: [
        'Flutter and Dart, targeting Android and iOS from one codebase',
        'Provider for state: theme, settings, bookmarks, and reading plans as separate scoped providers',
        'Local persistence through a cache helper layer — no backend, no account',
        'A rule-based inference engine mapping mood to verse selections in local logic',
        'flutter_local_notifications and timezone for exact, correctly-zoned daily reminders',
        'Custom Arabic font assets with a JSON-backed Hafs text source',
        'A Gradle release pipeline configured for Java 17 with desugaring for optimised APKs',
      ],
      highlights: [
        'Every feature works with the network switched off, recommender included',
        'Full RTL and Arabic localisation across the entire interface',
        'Android 13+ notification permissions and exact-alarm scheduling handled properly',
        'Release APK pipeline solved through Java 17 and desugaring configuration',
      ],
      impact:
        '100% offline by design — every feature, including the intelligent verse recommender, runs on-device with no network dependency and no user data leaving the phone.',
    },
    ar: {
      title: 'القرآن الكريم — تطبيق ذكي يعمل دون إنترنت',
      tagline: 'يعمل دون إنترنت بالكامل، بما في ذلك الجزء الذكي',
      summary:
        'تطبيق Flutter متعدد المنصات لقراءة القرآن وحفظه. كل ميزة فيه — بما فيها مقترح «آية حسب حالتك» القائم على القواعد — تعمل على الجهاز دون شبكة ودون خروج أي بيانات من الهاتف.',
      overview:
        'أغلب تطبيقات القرآن تحتاج اتصالاً لشيء ما: الصوت، أو البحث، أو الاقتراحات، أو المزامنة. وهذا التطبيق لا يحتاج. القراءة وخطط الحفظ والعلامات والتنبيهات ومقترح الآيات تعمل كلها محلياً، أي أنه يعمل في الطائرة وفي القبو وعلى شريحة بلا باقة بيانات.',
      problem:
        'ادّعاء العمل دون إنترنت سهل، والالتزام به صعب. وما إن تضيف ميزة ذكية حتى يكون الحل المعتاد نداءً لواجهة برمجية — وهو ما يكسر الوعد ويضيف بطئاً ويرسل حالة المستخدم الشعورية إلى خادم.',
      solution:
        'ميزة «آية حسب حالتك» محرّك استدلال قائم على القواعد لا نداء لنموذج: يربط الحالة الشعورية — حزن، أو قلق، أو امتنان، أو فرح — بآيات مناسبة للسياق عبر منطق محلي. وتُحفظ خطط القراءة والعلامات والتفضيلات على الجهاز عبر طبقة حالة مبنية على Provider. أما التنبيهات فتُجدوَل محلياً مع معالجة صحيحة لأذونات أندرويد 13 وما بعده وللمناطق الزمنية.',
      role: 'تطوير فردي — المعمارية، والطباعة العربية، والتكاملات الأصلية، وبناء الإصدارات',
      features: [
        {
          title: 'آية حسب حالتك',
          desc: 'مقترح قائم على القواعد يقترح آيات مطمئنة تناسب حالة القارئ الشعورية — على الجهاز بالكامل ودون واجهة برمجية.',
        },
        {
          title: 'خطط القراءة والحفظ',
          desc: 'جداول مخصّصة مع تتبّع التقدّم سورة بسورة يُحفظ محلياً.',
        },
        {
          title: 'تذكيرات يومية',
          desc: 'تنبيهات محلية مع معالجة أذونات أندرويد 13 والمنبّهات الدقيقة وجدولة صحيحة للمنطقة الزمنية.',
        },
        {
          title: 'طباعة عربية سليمة',
          desc: 'خطوط HafsSmart و me_quran بعرض مطابق للصفحة، مع نمطَي قراءة: صفحة أو تمرير.',
        },
        {
          title: 'وضع ليلي ونهاري',
          desc: 'طبقة سمات كاملة بسطح قراءة خالٍ من التشتيت في الوضعين.',
        },
        {
          title: 'خصوصية كاملة دون إنترنت',
          desc: 'لا نداءات شبكة إطلاقاً. وتقدّم القراءة والتفضيلات لا تغادر الجهاز.',
        },
      ],
      architecture: [
        'Flutter و Dart باستهداف أندرويد و iOS من قاعدة شيفرة واحدة',
        'Provider لإدارة الحالة: السمة والإعدادات والعلامات وخطط القراءة كمزوّدات منفصلة',
        'حفظ محلي عبر طبقة مساعدة للتخزين — بلا خادم وبلا حساب',
        'محرّك استدلال قائم على القواعد يربط الحالة الشعورية باختيار الآيات محلياً',
        'flutter_local_notifications مع timezone لتذكيرات يومية دقيقة وصحيحة زمنياً',
        'أصول خطوط عربية مخصّصة مع مصدر نص حفص بصيغة JSON',
        'خط إصدار Gradle مهيّأ لـ Java 17 مع desugaring لإنتاج حزم APK محسّنة',
      ],
      highlights: [
        'كل ميزة تعمل والشبكة مغلقة، بما فيها المقترح الذكي',
        'دعم كامل للاتجاه من اليمين إلى اليسار وتعريب الواجهة بالكامل',
        'معالجة سليمة لأذونات التنبيهات في أندرويد 13 وجدولة المنبّهات الدقيقة',
        'حلّ خط إنتاج حزم الإصدار عبر تهيئة Java 17 و desugaring',
      ],
      impact:
        'يعمل دون إنترنت بنسبة 100% بالتصميم — كل ميزة، بما فيها مقترح الآيات الذكي، تعمل على الجهاز دون اعتماد على الشبكة ودون خروج بيانات المستخدم من الهاتف.',
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const projectSlugs = projects.map((p) => p.slug)
