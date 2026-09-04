import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'

const ThemeContext = createContext(null)

const THEMES = ['light', 'dark', 'system']

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(
    () => readStorage(STORAGE_KEYS.theme, 'system') || 'system'
  )
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  // Haqiqiy mavzu render paytida hisoblanadi — qo'shimcha state kerak emas
  const resolved = preference === 'system' ? (prefersDark ? 'dark' : 'light') : preference

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved)
  }, [resolved])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, preference)
  }, [preference])

  const setTheme = useCallback((value) => {
    if (THEMES.includes(value)) setPreference(value)
  }, [])

  const toggleTheme = useCallback(() => {
    setPreference(resolved === 'dark' ? 'light' : 'dark')
  }, [resolved])

  const value = useMemo(
    () => ({ theme: preference, resolvedTheme: resolved, setTheme, toggleTheme, themes: THEMES }),
    [preference, resolved, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme ThemeProvider ichida ishlatilishi kerak')
  return ctx
}
