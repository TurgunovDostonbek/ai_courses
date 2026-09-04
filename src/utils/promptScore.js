/**
 * Prompt baholash mexanizmi.
 *
 * Vazn (jami 100):
 *   Context 20 · Goal 20 · Specificity 20 · Constraints 15 · Format 15 · Examples 10
 *
 * Bu — heuristik baholovchi: signal so'zlar, struktura va o'lchanadigan
 * elementlar bo'yicha ball beradi. Real AI baholash ulanganda
 * `services/aiService.js` dagi `evaluatePrompt` shu natijani almashtiradi.
 */

export const CRITERIA = [
  { key: 'context', weight: 20, labelKey: 'practice.criteria.context' },
  { key: 'goal', weight: 20, labelKey: 'practice.criteria.goal' },
  { key: 'specificity', weight: 20, labelKey: 'practice.criteria.specificity' },
  { key: 'constraints', weight: 15, labelKey: 'practice.criteria.constraints' },
  { key: 'format', weight: 15, labelKey: 'practice.criteria.format' },
  { key: 'examples', weight: 10, labelKey: 'practice.criteria.examples' },
]

const SIGNALS = {
  context: [
    'kontekst', 'context', 'vaziyat', 'auditoriya', 'audience', 'mijoz', 'foydalanuvchi',
    'biznes', 'loyiha', 'men ', 'bizning', 'hozir', 'maqsadli', 'target', 'background',
    'ситуац', 'контекст', 'аудитор',
  ],
  goal: [
    'maqsad', 'goal', 'vazifa', 'task', 'kerak', 'yoz', 'tuz', 'yarat', 'tahlil',
    'ro‘yxatla', "ro'yxatla", 'taqqosla', 'baholay', 'qisqartir', 'tushuntir',
    'objective', 'создать', 'написать', 'цель', 'задача',
  ],
  specificity: [
    'aynan', 'aniq', 'har bir', 'quyidagi', 'shu jumladan', 'masalan', 'ya’ni', "ya'ni",
    'specifically', 'exactly', 'including', 'именно', 'конкретно',
  ],
  constraints: [
    'cheklov', 'constraint', 'maksimal', 'minimal', 'ishlatma', 'qo‘shma', "qo'shma",
    'faqat', 'only', 'must', 'shart', 'taqiq', 'limit', 'so‘zdan', "so'zdan", 'belgi',
    'не ', 'только', 'максимум', 'ограничен',
  ],
  format: [
    'format', 'jadval', 'table', 'json', 'markdown', 'ro‘yxat', "ro'yxat", 'list',
    'bo‘lim', "bo'lim", 'sarlavha', 'struktura', 'shablon', 'template', 'csv', 'xml',
    'формат', 'таблиц', 'список',
  ],
  examples: [
    'misol', 'example', 'namuna', 'sample', 'masalan', 'for instance', 'namunasi',
    'пример', 'образец',
  ],
}

const ROLE_SIGNALS = ['sen ', 'siz ', 'you are', 'act as', 'ты ', 'sen —', 'rol:', 'role:']

function countSignals(text, list) {
  const lower = text.toLowerCase()
  return list.reduce((n, s) => (lower.includes(s) ? n + 1 : n), 0)
}

const clamp01 = (n) => Math.max(0, Math.min(1, n))

/**
 * Promptni baholaydi.
 * @param {string} prompt
 * @returns {{score:number, breakdown:Array, feedback:Array, strengths:Array}}
 */
export function scorePrompt(prompt) {
  const text = (prompt || '').trim()
  const words = text ? text.split(/\s+/).length : 0
  const lines = text ? text.split('\n').filter((l) => l.trim()).length : 0

  if (!text) {
    return {
      score: 0,
      breakdown: CRITERIA.map((c) => ({ ...c, earned: 0, ratio: 0 })),
      feedback: [{ key: 'empty', severity: 'error', text: 'Prompt bo‘sh.' }],
      strengths: [],
    }
  }

  /* --- Har mezon uchun 0..1 nisbat --- */
  const ratios = {}

  // Context: signal so'zlar + matn hajmi + rol mavjudligi
  const ctxSignals = countSignals(text, SIGNALS.context)
  const hasRole = ROLE_SIGNALS.some((s) => text.toLowerCase().includes(s))
  ratios.context = clamp01(ctxSignals / 3) * 0.7 + (hasRole ? 0.3 : 0) + (words > 40 ? 0.05 : 0)
  ratios.context = clamp01(ratios.context)

  // Goal: harakat fe'llari va aniq vazifa
  const goalSignals = countSignals(text, SIGNALS.goal)
  ratios.goal = clamp01(goalSignals / 3)

  // Specificity: aniqlashtiruvchi so'zlar, raqamlar, uzunlik
  const numbers = (text.match(/\b\d+\b/g) || []).length
  const specSignals = countSignals(text, SIGNALS.specificity)
  ratios.specificity = clamp01(
    specSignals / 3 * 0.4 + clamp01(numbers / 3) * 0.3 + clamp01(words / 80) * 0.3
  )

  // Constraints: cheklov so'zlari + o'lchanadigan chegaralar
  const constSignals = countSignals(text, SIGNALS.constraints)
  const hasMeasure = /\b\d+\s*(so‘z|so'z|word|belgi|char|qator|line|punkt|слов|символ)/i.test(text)
  ratios.constraints = clamp01(constSignals / 3 * 0.7 + (hasMeasure ? 0.3 : 0))

  // Format: format so'zlari + strukturaviy belgilar
  const fmtSignals = countSignals(text, SIGNALS.format)
  const hasStructure = /(^|\n)\s*(#{1,3}\s|\d+[.)]\s|[-*•]\s|<[a-z_]+>)/m.test(text)
  ratios.format = clamp01(fmtSignals / 2 * 0.6 + (hasStructure ? 0.4 : 0))

  // Examples: misol so'zlari + tirnoq bloklari
  const exSignals = countSignals(text, SIGNALS.examples)
  const hasBlock = /"""|```|<example|misol:/i.test(text)
  ratios.examples = clamp01(exSignals / 2 * 0.6 + (hasBlock ? 0.4 : 0))

  /* --- Ball --- */
  const breakdown = CRITERIA.map((c) => {
    const ratio = ratios[c.key] ?? 0
    return { ...c, ratio, earned: Math.round(c.weight * ratio) }
  })
  let score = breakdown.reduce((s, b) => s + b.earned, 0)

  // Juda qisqa prompt uchun jarima (10 so'zdan kam — spetsifikatsiya bo'lolmaydi)
  if (words < 10) score = Math.min(score, 25)

  score = Math.max(0, Math.min(100, score))

  /* --- Feedback --- */
  const feedback = []
  const strengths = []

  const push = (cond, key, severity, text) => {
    if (cond) feedback.push({ key, severity, text })
  }

  push(ratios.context < 0.5, 'context', 'error', 'Kontekst yetishmayapti — vaziyat, siz kimsiz va nima uchun kerakligini yozing.')
  push(!hasRole, 'role', 'warn', 'Rol berilmagan — «Sen …san» bilan boshlash javob uslubini aniqlashtiradi.')
  push(ratios.goal < 0.5, 'goal', 'error', 'Vazifa noaniq — aniq harakat fe’li ishlating (yoz, tuz, tahlil qil, ro‘yxatla).')
  push(ratios.specificity < 0.5, 'specificity', 'warn', 'Aniqlik past — sonlar va konkret talablar qo‘shing («5 ta», «3 bo‘lim»).')
  push(ratios.constraints < 0.5, 'constraints', 'warn', 'Cheklovlar yo‘q — uzunlik, uslub va texnik chegaralarni belgilang.')
  push(ratios.format < 0.5, 'format', 'warn', 'Natija formati ko‘rsatilmagan — jadval, ro‘yxat yoki shablon so‘rang.')
  push(ratios.examples < 0.4, 'examples', 'info', 'Misol yo‘q — 1–2 namuna formatni sezilarli barqarorlashtiradi.')
  push(words < 15, 'length', 'warn', 'Prompt juda qisqa — spetsifikatsiya darajasiga yetmagan.')
  push(words > 600, 'toolong', 'info', 'Prompt juda uzun — keraksiz qismlarni olib tashlang, model chalg‘imasin.')

  if (ratios.context >= 0.6) strengths.push('Kontekst yaxshi berilgan')
  if (hasRole) strengths.push('Rol aniq belgilangan')
  if (ratios.goal >= 0.6) strengths.push('Vazifa aniq qo‘yilgan')
  if (ratios.constraints >= 0.6) strengths.push('Cheklovlar mavjud')
  if (ratios.format >= 0.6) strengths.push('Natija formati belgilangan')
  if (ratios.examples >= 0.5) strengths.push('Misol berilgan')
  if (hasStructure && lines > 4) strengths.push('Prompt strukturalangan')

  return { score, breakdown, feedback, strengths, words }
}

/** Ballga qarab sifat darajasi. */
export function scoreLabel(score) {
  if (score >= 90) return { key: 'excellent', label: 'A’lo', tone: 'success' }
  if (score >= 75) return { key: 'good', label: 'Yaxshi', tone: 'success' }
  if (score >= 55) return { key: 'ok', label: 'O‘rtacha', tone: 'warn' }
  if (score >= 35) return { key: 'weak', label: 'Zaif', tone: 'warn' }
  return { key: 'poor', label: 'Yetarli emas', tone: 'danger' }
}
