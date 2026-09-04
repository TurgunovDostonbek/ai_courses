/**
 * Kurs (Level) metadatasi.
 * Darslar `data/lessons/` ichida alohida fayllarda, `courseId` orqali bog'lanadi.
 */

export const COURSES = [
  {
    id: 'fundamentals',
    order: 1,
    level: 1,
    slug: 'ai-fundamentals',
    title: 'AI Fundamentals',
    tagline: 'AI nima va u aslida qanday ishlaydi',
    description:
      "Sun'iy intellektning asoslari: LLM, token, context window, hallucination va AI ning real chegaralari. Bu daraja qolgan hamma narsaning poydevori.",
    icon: 'Brain',
    color: '#6366f1',
    difficulty: 'beginner',
    estimatedHours: 4,
    tags: ['AI', 'LLM', 'Asoslar'],
    outcomes: [
      "AI, ML, Deep Learning va Generative AI farqini ayta olasiz",
      'LLM javobni qanday hosil qilishini tushunasiz',
      'Token va context window cheklovlarini hisobga olib ishlaysiz',
      'Hallucination’ni aniqlay va kamaytira olasiz',
    ],
  },
  {
    id: 'prompt-engineering',
    order: 2,
    level: 2,
    slug: 'prompt-engineering',
    title: 'Prompt Engineering',
    tagline: 'AI bilan gaplashishni professional darajada o‘rganing',
    description:
      'Platformaning yuragi. Role, Context, Task, Constraints, Examples — professional prompt anatomiyasi, few-shot, chaining, structured output va prompt refinement.',
    icon: 'PenLine',
    color: '#a855f7',
    difficulty: 'beginner',
    estimatedHours: 6,
    tags: ['Prompt', 'Amaliyot', 'Eng muhim'],
    featured: true,
    outcomes: [
      'Har qanday vazifa uchun tuzilgan (structured) prompt yoza olasiz',
      'Few-shot va zero-shot texnikalarini to‘g‘ri tanlaysiz',
      'JSON/XML formatda ishonchli natija olasiz',
      'Prompt’ni iterativ yaxshilash jarayonini egallaysiz',
    ],
  },
  {
    id: 'ai-tools',
    order: 3,
    level: 3,
    slug: 'ai-tools',
    title: 'AI Tools',
    tagline: 'To‘g‘ri vazifaga to‘g‘ri vosita',
    description:
      'Chat, coding, image, video, audio va research vositalari. Har biri uchun: nima, qachon, kuchli/zaif tomonlari va real use case.',
    icon: 'Wrench',
    color: '#0ea5e9',
    difficulty: 'beginner',
    estimatedHours: 5,
    tags: ['Tools', 'Workflow'],
    outcomes: [
      'Vazifaga mos AI vositasini tanlay olasiz',
      'Har bir vositaning chegaralarini bilasiz',
      'Bir nechta vositani bitta workflow’ga birlashtirasiz',
    ],
  },
  {
    id: 'ai-coding',
    order: 4,
    level: 4,
    slug: 'ai-for-programmers',
    title: 'AI for Programmers',
    tagline: 'AI bilan kod yozish, debug, refactor va review',
    description:
      'Dasturchilar uchun modul: AI bilan kod yozish, xatolarni topish, refactoring, testing, Git, React/TS va AI coding agentlari bilan ishlash.',
    icon: 'Code2',
    color: '#22c55e',
    difficulty: 'intermediate',
    estimatedHours: 7,
    tags: ['Coding', 'Developer'],
    outcomes: [
      'AI bilan ishonchli, tekshirilgan kod yozasiz',
      'AI-generated kodni review qilishni bilasiz',
      'Coding agentlarni to‘g‘ri boshqarasiz',
    ],
  },
  {
    id: 'ai-work',
    order: 5,
    level: 5,
    slug: 'ai-for-work',
    title: 'AI for Work & Business',
    tagline: 'Ish, biznes, marketing, ta’lim va freelance',
    description:
      'AI’ni real ish jarayoniga qo‘shish: email, hisobot, taqdimot, biznes-reja, marketing, dars rejasi, mijoz bilan muloqot va proposal.',
    icon: 'Briefcase',
    color: '#f59e0b',
    difficulty: 'intermediate',
    estimatedHours: 6,
    tags: ['Business', 'Productivity'],
    outcomes: [
      'Kundalik ish vazifalarini AI bilan 2–5x tezlashtirasiz',
      'Biznes va marketing uchun tayyor workflow’larga ega bo‘lasiz',
      'Freelance jarayonini AI bilan professional yuritasiz',
    ],
  },
  {
    id: 'advanced-ai',
    order: 6,
    level: 6,
    slug: 'advanced-ai',
    title: 'Advanced AI',
    tagline: 'API, RAG, agentlar va AI application architecture',
    description:
      'Professional daraja: LLM arxitekturasi, API integratsiya, embeddings, vector DB, RAG, function calling, agentlar, evaluation va AI security.',
    icon: 'Cpu',
    color: '#ef4444',
    difficulty: 'advanced',
    estimatedHours: 8,
    tags: ['Advanced', 'Engineering'],
    outcomes: [
      'AI API’ni ilovangizga ishonchli ulaysiz',
      'RAG pipeline qurasiz',
      'Agent workflow va evaluation tizimini loyihalaysiz',
    ],
  },
]

export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c]))

export const getCourse = (id) => COURSE_BY_ID[id] || null
