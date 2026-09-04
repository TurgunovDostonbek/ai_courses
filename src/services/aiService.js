/**
 * AI servis qatlami.
 *
 * Hozir mock rejimda ishlaydi (backend yo'q). Arxitektura real API ga
 * ulanishga tayyor: `callProvider` ni almashtirish kifoya —
 * qolgan ilova kodi o'zgarmaydi.
 *
 * Real ulanishda:
 *   1. Backend proxy yozing (API kalit HECH QACHON frontendda bo'lmasin)
 *   2. `AI_ENDPOINT` ni o'sha proxy manziliga qo'ying
 *   3. `MODE` ni 'live' ga o'zgartiring
 *
 * Har bir funksiya bir xil shaklda javob qaytaradi:
 *   { ok: true, data, meta } | { ok: false, error }
 */

import { scorePrompt } from '../utils/promptScore'

export const MODE = 'mock' // 'mock' | 'live'
export const AI_ENDPOINT = '/api/ai' // backend proxy manzili

const DEFAULT_TIMEOUT = 30000

/** Xatolarni bitta shaklga keltiradi. */
function normalizeError(err) {
  if (err?.name === 'AbortError') {
    return { code: 'timeout', message: 'So‘rov vaqti tugadi. Qayta urinib ko‘ring.' }
  }
  if (err?.status === 429) {
    return { code: 'rate_limit', message: 'So‘rovlar juda ko‘p. Biroz kutib turing.' }
  }
  if (err?.status >= 500) {
    return { code: 'server', message: 'Server xatosi. Keyinroq urinib ko‘ring.' }
  }
  if (err?.status === 401 || err?.status === 403) {
    return { code: 'auth', message: 'Ruxsat yo‘q yoki kalit noto‘g‘ri.' }
  }
  return { code: 'unknown', message: err?.message || 'Noma’lum xatolik yuz berdi.' }
}

/** Sun'iy kechikish — mock rejimda real his berish uchun. */
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Provayderga real so'rov (live rejim uchun).
 * Backend `{ text, usage }` qaytarishi kutiladi.
 */
async function callProvider({ prompt, system, temperature, signal }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)
  const composite = signal
    ? new AbortController()
    : controller
  if (signal) {
    signal.addEventListener('abort', () => composite.abort(), { once: true })
    controller.signal.addEventListener('abort', () => composite.abort(), { once: true })
  }

  try {
    const res = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt, system, temperature }),
      signal: composite.signal,
    })
    if (!res.ok) {
      const err = new Error(`AI API xatosi: ${res.status}`)
      err.status = res.status
      throw err
    }
    return await res.json()
  } finally {
    clearTimeout(timer)
  }
}

/* ------------------------------------------------------------------ */
/* Mock javob generatori                                               */
/* ------------------------------------------------------------------ */

function mockCompletion(prompt) {
  const p = (prompt || '').toLowerCase()
  const hasFormat = /format|jadval|json|ro‘yxat|ro'yxat|table|list/.test(p)
  const hasRole = /sen |siz |you are|act as/.test(p)
  const hasContext = /kontekst|context|vaziyat|auditoriya/.test(p)

  const notes = []
  if (!hasRole) notes.push('rol berilmagan')
  if (!hasContext) notes.push('kontekst cheklangan')
  if (!hasFormat) notes.push('natija formati ko‘rsatilmagan')

  const quality = 3 - notes.length

  const body = [
    '## Xulosa',
    quality >= 2
      ? 'Promptingiz aniq tuzilgan — quyida shu spetsifikatsiyaga mos namunaviy javob keltirilgan.'
      : 'Prompt yetarlicha aniq emas, shuning uchun javob umumiy chiqdi. Quyida nima yetishmayotgani ko‘rsatilgan.',
    '',
    '## Namunaviy javob',
    quality >= 2
      ? '1. Birinchi asosiy punkt — so‘ralgan formatga mos.\n2. Ikkinchi punkt — cheklovlaringiz hisobga olingan.\n3. Uchinchi punkt — auditoriyangizga moslashtirilgan.'
      : 'Mavzu bo‘yicha umumiy ma’lumot. Aniq kontekst berilmagani uchun javob har qanday vaziyatga mos, ammo hech biriga aynan mos emas.',
    '',
    '## Ushbu prompt bo‘yicha eslatma',
    notes.length
      ? `Yaxshilash mumkin: ${notes.join(', ')}.`
      : 'Prompt to‘liq: rol, kontekst va format berilgan.',
    '',
    '---',
    '_Demo rejim: bu javob lokal generatsiya qilingan. Real AI API ulanganda shu joyda haqiqiy model javobi bo‘ladi._',
  ].join('\n')

  return {
    text: body,
    usage: {
      inputTokens: Math.ceil((prompt || '').length / 4),
      outputTokens: Math.ceil(body.length / 4),
    },
  }
}

/* ------------------------------------------------------------------ */
/* Ommaviy API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Prompt yuborib javob olish (AI Simulator).
 * @returns {Promise<{ok:boolean, data?:{text:string}, meta?:object, error?:object}>}
 */
export async function complete({ prompt, system, temperature = 0.4, signal } = {}) {
  const started = Date.now()
  if (!prompt || !prompt.trim()) {
    return { ok: false, error: { code: 'empty', message: 'Prompt bo‘sh.' } }
  }

  try {
    let result
    if (MODE === 'live') {
      result = await callProvider({ prompt, system, temperature, signal })
    } else {
      await delay(500 + Math.random() * 700)
      if (signal?.aborted) throw Object.assign(new Error('aborted'), { name: 'AbortError' })
      result = mockCompletion(prompt)
    }
    return {
      ok: true,
      data: { text: result.text },
      meta: { ms: Date.now() - started, usage: result.usage, mode: MODE },
    }
  } catch (err) {
    return { ok: false, error: normalizeError(err), meta: { ms: Date.now() - started } }
  }
}

/**
 * Promptni baholash.
 * Mock rejimda lokal heuristik baholovchi ishlatiladi;
 * live rejimda LLM-as-judge promptiga ulash mumkin.
 */
export async function evaluatePrompt(prompt, { signal } = {}) {
  try {
    if (MODE === 'live') {
      const res = await callProvider({
        prompt: buildJudgePrompt(prompt),
        temperature: 0,
        signal,
      })
      const parsed = parseJson(res.text)
      if (parsed) return { ok: true, data: parsed, meta: { mode: 'live' } }
      // Live javobi parse bo'lmasa — lokal baholovchiga tushamiz
    }
    await delay(280)
    return { ok: true, data: scorePrompt(prompt), meta: { mode: 'mock' } }
  } catch (err) {
    return { ok: false, error: normalizeError(err) }
  }
}

/** LLM-as-judge prompti — live rejimda ishlatiladi. */
function buildJudgePrompt(prompt) {
  return `Sen prompt sifatini baholaydigan qat'iy ekspertsan.

Quyidagi promptni baholab, FAQAT JSON qaytar:
{
  "score": 0-100,
  "breakdown": [{"key":"context","earned":0-20},{"key":"goal","earned":0-20},
                {"key":"specificity","earned":0-20},{"key":"constraints","earned":0-15},
                {"key":"format","earned":0-15},{"key":"examples","earned":0-10}],
  "feedback": [{"severity":"error|warn|info","text":"..."}],
  "strengths": ["..."]
}

PROMPT:
"""
${prompt}
"""`
}

/** Model javobidan JSON ajratish (```json bloklariga chidamli). */
export function parseJson(raw) {
  if (!raw) return null
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    return JSON.parse(raw.slice(start, end + 1))
  } catch {
    return null
  }
}

/**
 * Project Lab uchun bosqichli reja.
 * Mock rejimda blueprint asosida strukturalangan reja qaytaradi.
 */
export async function generateProjectPlan(idea, blueprint, { signal } = {}) {
  if (!idea?.trim()) {
    return { ok: false, error: { code: 'empty', message: 'Loyiha g‘oyasini kiriting.' } }
  }
  try {
    if (MODE === 'live') {
      const res = await callProvider({
        prompt: `Loyiha: ${idea}\n\nQuyidagi bosqichlar bo'yicha amaliy reja tuz:\n${blueprint
          .map((b) => `- ${b.title}: ${b.guide}`)
          .join('\n')}\n\nHar bosqich uchun 3-5 punktli aniq ro'yxat ber.`,
        temperature: 0.3,
        signal,
      })
      return { ok: true, data: { text: res.text }, meta: { mode: 'live' } }
    }

    await delay(700)
    const sections = blueprint.map((b) => ({
      key: b.key,
      title: b.title,
      icon: b.icon,
      guide: b.guide,
      prompt: b.prompt,
      items: mockPlanItems(b.key, idea),
    }))
    return { ok: true, data: { idea, sections }, meta: { mode: 'mock' } }
  } catch (err) {
    return { ok: false, error: normalizeError(err) }
  }
}

function mockPlanItems(key, idea) {
  const name = idea.trim()
  const map = {
    requirements: [
      `«${name}» kim uchun? Asosiy foydalanuvchi profilini yozing`,
      'Muvaffaqiyat mezoni: qanday raqam yoki xatti-harakat bilan o‘lchanadi',
      'Majburiy va ixtiyoriy talablarni ajrating',
      'Aniqlanmagan savollarni ro‘yxatlang — bular eng katta xavf',
    ],
    features: [
      'MVP: foydalanuvchi qiymat oladigan eng kichik to‘plam',
      'v2: MVP tasdiqlangandan keyin qo‘shiladigan funksiyalar',
      'Keyinroq: hozircha aniq bo‘lmagan g‘oyalar',
      'Har funksiya uchun «nega kerak» degan bir jumla yozing',
    ],
    architecture: [
      'Qatlamlar: UI → ilova mantiqi → servis → ma’lumot',
      'Ma’lumot oqimini chizib chiqing (kirish → qayta ishlash → saqlash)',
      'Texnologiya tanlovi va har biriga alternativa',
      'Kengaytirish nuqtalarini oldindan belgilang',
    ],
    structure: [
      'src/components — qayta ishlatiladigan UI',
      'src/pages — marshrutlarga mos sahifalar',
      'src/data — ma’lumot manbalari (keyin API ga almashadi)',
      'src/services — tashqi tizimlar bilan aloqa',
      'src/hooks, src/context, src/utils — umumiy mantiq',
    ],
    components: [
      'Umumiy: Button, Card, Modal, Input, Toast, EmptyState',
      'Domen komponentlari: ro‘yxat, karta, forma',
      'Har komponent uchun props shartnomasini yozing',
      'Loading / empty / error holatlarini har birida rejalashtiring',
    ],
    api: [
      'Endpoint ro‘yxati: metod, yo‘l, vazifa',
      'So‘rov va javob shakllari (namuna JSON bilan)',
      'Xato formati — barcha endpointlarda bir xil',
      'Pagination va filtrlash strategiyasi',
    ],
    database: [
      'Asosiy jadvallar va ular orasidagi bog‘lanishlar',
      'Indekslar: eng tez-tez ishlatiladigan so‘rovlarga qarab',
      'ON DELETE xatti-harakati aniq belgilansin',
      'Migratsiya va rollback rejasi',
    ],
    auth: [
      'Kirish usuli: email/parol, OAuth yoki ikkalasi',
      'Rollar: mehmon, foydalanuvchi, admin',
      'Himoyalangan marshrutlar ro‘yxati',
      'Sessiya muddati va yangilash strategiyasi',
    ],
    testing: [
      'Birlik testlari: sof funksiyalar va utilitalar',
      'Integratsiya: komponent + ma’lumot qatlami',
      'E2E: asosiy foydalanuvchi yo‘llari (3–5 ta)',
      'Chegaraviy holatlar ro‘yxatini oldindan tuzing',
    ],
    deployment: [
      'Muhitlar: local → staging → production',
      'CI: lint, test, build ketma-ketligi',
      'Monitoring: xatolar va asosiy metrikalar',
      'Rollback rejasi — nima bo‘lsa qanday qaytariladi',
    ],
  }
  return map[key] || ['Ushbu bo‘lim uchun talablarni aniqlashtiring']
}
