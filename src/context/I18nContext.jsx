import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_LOCALE, LOCALES, translations } from '../i18n/translations'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'

const I18nContext = createContext(null)

const isSupported = (code) => LOCALES.some((l) => l.code === code)

function detectLocale() {
  const saved = readStorage(STORAGE_KEYS.locale, null)
  if (saved && isSupported(saved)) return saved
  const nav = (navigator.language || '').slice(0, 2).toLowerCase()
  return isSupported(nav) ? nav : DEFAULT_LOCALE
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale)

  useEffect(() => {
    writeStorage(STORAGE_KEYS.locale, locale)
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((code) => {
    if (isSupported(code)) setLocaleState(code)
  }, [])

  /** Tarjima. Topilmasa uz fallback, u ham bo'lmasa kalitning o'zi. */
  const t = useCallback(
    (key, vars) => {
      const dict = translations[locale] || {}
      let text = dict[key] ?? translations[DEFAULT_LOCALE][key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replaceAll(`{${k}}`, String(v))
        }
      }
      return text
    },
    [locale]
  )

  const value = useMemo(() => ({ locale, setLocale, t, locales: LOCALES }), [locale, setLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n I18nProvider ichida ishlatilishi kerak')
  return ctx
}
