/**
 * Prompt Lab: maydonlardan strukturalangan prompt yig'ish
 * va uni transformatsiya qilish (qisqartirish, professional qilish, tarjima).
 */

export const LAB_FIELDS = [
  {
    key: 'role',
    labelKey: 'lab.role',
    heading: 'ROL',
    placeholder: 'Masalan: 10 yillik tajribaga ega frontend dasturchi',
    prefix: 'Sen ',
    suffix: 'san.',
    rows: 2,
    hint: 'Rol javobning uslubi va chuqurligini belgilaydi.',
  },
  {
    key: 'goal',
    labelKey: 'lab.goal',
    heading: 'MAQSAD',
    placeholder: 'Nimaga erishmoqchisiz? Natija bilan nima qilasiz?',
    rows: 2,
    hint: 'Maqsad — model uchun eng muhim yo‘naltiruvchi.',
  },
  {
    key: 'context',
    labelKey: 'lab.context',
    heading: 'KONTEKST',
    placeholder: 'Vaziyat, tarix, cheklovlar, oldingi urinishlar…',
    rows: 4,
    hint: 'Eng katta sifat sakrashi shu maydondan keladi.',
  },
  {
    key: 'audience',
    labelKey: 'lab.audience',
    heading: 'AUDITORIYA',
    placeholder: 'Kim o‘qiydi yoki ishlatadi? Bilim darajasi qanday?',
    rows: 2,
    hint: 'Auditoriya chuqurlik va lug‘atni belgilaydi.',
  },
  {
    key: 'input',
    labelKey: 'lab.input',
    heading: 'KIRISH MA’LUMOTI',
    placeholder: 'Model ishlaydigan matn, kod yoki ma’lumot',
    rows: 4,
    wrapTag: 'input_data',
    hint: 'Uzun ma’lumot teg ichida beriladi — chalkashlik kamayadi.',
  },
  {
    key: 'task',
    labelKey: 'lab.goal',
    heading: 'VAZIFA',
    placeholder: 'Aniq nima qilish kerak? Harakat fe’li bilan yozing.',
    rows: 3,
    hidden: true, // goal bilan birlashtiriladi
  },
  {
    key: 'constraints',
    labelKey: 'lab.constraints',
    heading: 'CHEKLOVLAR',
    placeholder: 'Har qatorda bitta cheklov:\nMaksimal 200 so‘z\nTexnik atamasiz\nKutubxona qo‘shma',
    rows: 4,
    asList: true,
    hint: 'Ijobiy shaklda yozing: «nima qilish kerak».',
  },
  {
    key: 'outputFormat',
    labelKey: 'lab.outputFormat',
    heading: 'NATIJA FORMATI',
    placeholder: 'Markdown jadval, JSON, raqamlangan ro‘yxat, shablon…',
    rows: 3,
    hint: 'Format aytilmasa — natija har safar boshqacha bo‘ladi.',
  },
  {
    key: 'tone',
    labelKey: 'lab.tone',
    heading: 'OHANG',
    placeholder: 'Professional, do‘stona, qisqa va qat’iy…',
    rows: 2,
    hint: 'Eng aniq usul — namuna matn berish.',
  },
  {
    key: 'examples',
    labelKey: 'lab.examples',
    heading: 'MISOLLAR',
    placeholder: 'Kirish → kutilgan chiqish namunasi',
    rows: 4,
    wrapTag: 'examples',
    hint: '1–2 misol formatni barqarorlashtiradi.',
  },
]

export const VISIBLE_LAB_FIELDS = LAB_FIELDS.filter((f) => !f.hidden)

export const EMPTY_LAB_STATE = Object.fromEntries(LAB_FIELDS.map((f) => [f.key, '']))

const asBulletList = (text) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith('-') || l.startsWith('•') ? l : `- ${l}`))
    .join('\n')

/**
 * Maydonlardan strukturalangan promptni yig'adi.
 * Bo'sh maydonlar natijaga tushmaydi.
 */
export function buildPrompt(state) {
  const parts = []

  const role = state.role?.trim()
  if (role) {
    const text = /^(sen|siz|you|ты)\b/i.test(role) ? role : `Sen ${role}san.`
    parts.push(`# ROL\n${text}`)
  }

  const goal = state.goal?.trim()
  if (goal) parts.push(`# MAQSAD\n${goal}`)

  const context = state.context?.trim()
  if (context) parts.push(`# KONTEKST\n${context}`)

  const audience = state.audience?.trim()
  if (audience) parts.push(`# AUDITORIYA\n${audience}`)

  const input = state.input?.trim()
  if (input) parts.push(`# KIRISH MA’LUMOTI\n<input_data>\n${input}\n</input_data>`)

  const constraints = state.constraints?.trim()
  if (constraints) parts.push(`# CHEKLOVLAR\n${asBulletList(constraints)}`)

  const tone = state.tone?.trim()
  if (tone) parts.push(`# OHANG\n${tone}`)

  const examples = state.examples?.trim()
  if (examples) parts.push(`# MISOLLAR\n<examples>\n${examples}\n</examples>`)

  const format = state.outputFormat?.trim()
  if (format) parts.push(`# NATIJA FORMATI\n${format}`)

  if (parts.length === 0) return ''

  // Eng muhim ko'rsatmani oxirida takrorlash — modellar oxirgi qismga ko'proq e'tibor beradi
  const closing = []
  if (format) closing.push('Natijani aynan yuqorida ko‘rsatilgan formatda ber.')
  if (constraints) closing.push('Barcha cheklovlarga qat’iy rioya qil.')
  closing.push('Kirish so‘zisiz, faqat so‘ralgan natijani ber.')
  parts.push(`# MUHIM\n${closing.map((c) => `- ${c}`).join('\n')}`)

  return parts.join('\n\n')
}

/** Promptdagi to'ldirilgan maydonlar sonini qaytaradi (progress uchun). */
export function countFilled(state) {
  return VISIBLE_LAB_FIELDS.filter((f) => (state[f.key] || '').trim()).length
}

/* ------------------------------------------------------------------ */
/* Transformatsiyalar — lokal (AI'siz) versiyalar                      */
/* ------------------------------------------------------------------ */

const FILLER_WORDS = [
  'iltimos', 'agar mumkin bo‘lsa', "agar mumkin bo'lsa", 'juda ham', 'menimcha',
  'umid qilamanki', 'shunday qilib', 'aslida', 'albatta', 'please', 'kindly',
  'пожалуйста', 'если можно',
]

/** Ortiqcha so'zlarni olib tashlaydi va qatorlarni siqadi. */
export function shortenPrompt(prompt) {
  let out = prompt
  for (const w of FILLER_WORDS) {
    out = out.replace(new RegExp(w, 'gi'), '')
  }
  return out
    .split('\n')
    .map((l) => l.replace(/\s{2,}/g, ' ').trimEnd())
    .filter((l, i, arr) => !(l.trim() === '' && arr[i - 1]?.trim() === ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Professional darajaga ko'taradi: yetishmayotgan bo'limlarni qo'shadi. */
export function professionalizePrompt(prompt) {
  const has = (h) => prompt.toUpperCase().includes(h)
  const additions = []

  if (!has('# ROL')) {
    additions.push('# ROL\nSen ushbu sohada tajribaga ega mutaxassissan.')
  }
  if (!has('# CHEKLOVLAR')) {
    additions.push(
      '# CHEKLOVLAR\n- Aniq va qisqa yoz\n- Taxmin qilma; noaniq joyni «aniqlashtirish kerak» deb belgila\n- Isbotlanmagan da’vo yozma'
    )
  }
  if (!has('# NATIJA FORMATI')) {
    additions.push('# NATIJA FORMATI\nStrukturalangan javob: sarlavhalar va qisqa punktlar.')
  }
  if (!has('# MUHIM')) {
    additions.push('# MUHIM\n- Faqat so‘ralgan natijani ber, kirish so‘zisiz.')
  }

  return additions.length ? `${prompt}\n\n${additions.join('\n\n')}` : prompt
}

/** Sifatni oshiruvchi standart bloklarni qo'shadi. */
export function improvePrompt(prompt) {
  const block = [
    '# SIFAT QOIDALARI',
    '- Aniq bilmasang «bilmayman» deb yoz, taxmin qilma',
    '- Har bir muhim da’vo uchun asos yoki manba ko‘rsat',
    '- Javob oxirida ishonch darajasi past bo‘lgan joylarni ayt',
  ].join('\n')

  if (prompt.includes('# SIFAT QOIDALARI')) return prompt
  return `${prompt}\n\n${block}`
}

/** Bo'lim sarlavhalarini tanlangan tilga o'giradi (mazmun o'zgarmaydi). */
const HEADING_MAP = {
  en: {
    'ROL': 'ROLE',
    'MAQSAD': 'GOAL',
    'KONTEKST': 'CONTEXT',
    'AUDITORIYA': 'AUDIENCE',
    'KIRISH MA’LUMOTI': 'INPUT DATA',
    'CHEKLOVLAR': 'CONSTRAINTS',
    'OHANG': 'TONE',
    'MISOLLAR': 'EXAMPLES',
    'NATIJA FORMATI': 'OUTPUT FORMAT',
    'MUHIM': 'IMPORTANT',
    'SIFAT QOIDALARI': 'QUALITY RULES',
  },
  ru: {
    'ROL': 'РОЛЬ',
    'MAQSAD': 'ЦЕЛЬ',
    'KONTEKST': 'КОНТЕКСТ',
    'AUDITORIYA': 'АУДИТОРИЯ',
    'KIRISH MA’LUMOTI': 'ВХОДНЫЕ ДАННЫЕ',
    'CHEKLOVLAR': 'ОГРАНИЧЕНИЯ',
    'OHANG': 'ТОН',
    'MISOLLAR': 'ПРИМЕРЫ',
    'NATIJA FORMATI': 'ФОРМАТ ОТВЕТА',
    'MUHIM': 'ВАЖНО',
    'SIFAT QOIDALARI': 'ПРАВИЛА КАЧЕСТВА',
  },
}

export function translateHeadings(prompt, locale) {
  const map = HEADING_MAP[locale]
  if (!map) return prompt
  let out = prompt
  for (const [from, to] of Object.entries(map)) {
    out = out.replace(new RegExp(`^# ${from}$`, 'gm'), `# ${to}`)
  }
  return out
}

/** Shablondagi {{o'zgaruvchilar}} ro'yxatini qaytaradi. */
export function extractVariables(text) {
  const found = text.match(/\{\{\s*([^}]+?)\s*\}\}/g) || []
  return [...new Set(found.map((v) => v.replace(/[{}]/g, '').trim()))]
}

/** Shablondagi o'zgaruvchilarni qiymatlar bilan almashtiradi. */
export function fillTemplate(text, values) {
  return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (match, name) => {
    const key = name.trim()
    const value = values?.[key]
    return value !== undefined && String(value).trim() !== '' ? value : match
  })
}
