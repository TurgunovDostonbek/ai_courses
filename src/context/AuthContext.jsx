import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import { toISODate } from '../utils/format'

/**
 * Demo autentifikatsiya.
 * Backend ulanganda faqat shu provayder ichidagi funksiyalar
 * real API chaqiruvlariga almashtiriladi — interfeys o'zgarmaydi.
 */

const AuthContext = createContext(null)

const DEFAULT_USER = {
  id: 'local-user',
  name: '',
  role: '',
  goal: '',
  email: '',
  avatarColor: '#6366f1',
  joinedAt: null,
  authenticated: false,
  roles: ['student'],
}

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.user, DEFAULT_USER)

  const updateProfile = useCallback(
    (patch) => {
      setUser((prev) => ({
        ...DEFAULT_USER,
        ...prev,
        ...patch,
        joinedAt: prev?.joinedAt || toISODate(),
      }))
    },
    [setUser]
  )

  const signIn = useCallback(
    ({ name, email } = {}) => {
      setUser((prev) => ({
        ...DEFAULT_USER,
        ...prev,
        name: name || prev?.name || '',
        email: email || prev?.email || '',
        authenticated: true,
        joinedAt: prev?.joinedAt || toISODate(),
      }))
    },
    [setUser]
  )

  const signOut = useCallback(() => {
    setUser((prev) => ({ ...prev, authenticated: false }))
  }, [setUser])

  const value = useMemo(
    () => ({
      user: { ...DEFAULT_USER, ...(user || {}) },
      isAdmin: (user?.roles || []).includes('admin'),
      updateProfile,
      signIn,
      signOut,
    }),
    [user, updateProfile, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth AuthProvider ichida ishlatilishi kerak')
  return ctx
}
