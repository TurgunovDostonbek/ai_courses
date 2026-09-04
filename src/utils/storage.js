/**
 * localStorage ustidagi xavfsiz qatlam.
 * Brauzer saqlashni bloklagan holatlarda ham ilova ishlashda davom etadi.
 */

const PREFIX = 'ai-mastery:'

export const STORAGE_KEYS = {
  theme: `${PREFIX}theme`,
  locale: `${PREFIX}locale`,
  progress: `${PREFIX}progress`,
  savedPrompts: `${PREFIX}saved-prompts`,
  user: `${PREFIX}user`,
  sidebar: `${PREFIX}sidebar-collapsed`,
}

export function readStorage(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

/** Barcha ilova ma'lumotlarini bitta obyektga yig'adi (eksport uchun). */
export function exportAllData() {
  const data = {}
  for (const [name, key] of Object.entries(STORAGE_KEYS)) {
    data[name] = readStorage(key, null)
  }
  return { version: 1, exportedAt: new Date().toISOString(), data }
}

/** Eksport qilingan ma'lumotni qaytadan yozadi. */
export function importAllData(payload) {
  if (!payload || typeof payload !== 'object' || !payload.data) {
    throw new Error("Noto'g'ri fayl formati")
  }
  for (const [name, key] of Object.entries(STORAGE_KEYS)) {
    if (payload.data[name] !== undefined && payload.data[name] !== null) {
      writeStorage(key, payload.data[name])
    }
  }
  return true
}

export function clearAppData() {
  for (const key of Object.values(STORAGE_KEYS)) removeStorage(key)
}
