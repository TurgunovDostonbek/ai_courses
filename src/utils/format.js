/** Umumiy formatlash va kichik yordamchilar. */

/** CSS Modules bilan sinf nomlarini birlashtirish. */
export function cx(...args) {
  return args
    .flat()
    .filter((a) => typeof a === 'string' && a.trim())
    .join(' ')
}

export function formatNumber(n, locale = 'uz') {
  const tag = { uz: 'uz-UZ', en: 'en-US', ru: 'ru-RU' }[locale] || 'en-US'
  try {
    return new Intl.NumberFormat(tag).format(n ?? 0)
  } catch {
    return String(n ?? 0)
  }
}

export function formatDate(value, locale = 'uz') {
  if (!value) return ''
  const tag = { uz: 'uz-UZ', en: 'en-US', ru: 'ru-RU' }[locale] || 'en-US'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  try {
    return new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
  } catch {
    return d.toISOString().slice(0, 10)
  }
}

export function formatMinutes(min, locale = 'uz') {
  const m = Math.max(0, Math.round(min || 0))
  if (m < 60) return `${m} ${locale === 'ru' ? 'мин' : locale === 'en' ? 'min' : 'daq'}`
  const h = Math.floor(m / 60)
  const rest = m % 60
  const hLabel = locale === 'ru' ? 'ч' : locale === 'en' ? 'h' : 'soat'
  const mLabel = locale === 'ru' ? 'мин' : locale === 'en' ? 'min' : 'daq'
  return rest ? `${h} ${hLabel} ${rest} ${mLabel}` : `${h} ${hLabel}`
}

/** ISO sana (YYYY-MM-DD) — lokal vaqt zonasida. */
export function toISODate(date = new Date()) {
  const d = new Date(date)
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10)
}

export function daysBetween(a, b) {
  const d1 = new Date(`${a}T00:00:00`)
  const d2 = new Date(`${b}T00:00:00`)
  return Math.round((d2 - d1) / 86400000)
}

export function percent(part, total) {
  if (!total) return 0
  return Math.max(0, Math.min(100, Math.round((part / total) * 100)))
}

export function truncate(text, max = 120) {
  const t = String(text ?? '')
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t
}

/** Turli tillar uchun sodda normalizatsiya (fill-in javoblarini solishtirish uchun). */
export function normalizeAnswer(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[’'`´]/g, "'")
    .replace(/[^\p{L}\p{N}\s'-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Barqaror, o'qiladigan ID (sertifikat va saqlangan promptlar uchun). */
export function makeId(prefix = 'id') {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  const time = Date.now().toString(36).slice(-4).toUpperCase()
  return `${prefix}-${time}${rand}`
}

/** Matnni buferga nusxalash (fallback bilan). */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fallback pastda */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

/** Faylni yuklab olish (eksport uchun). */
export function downloadFile(filename, content, type = 'application/json') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
