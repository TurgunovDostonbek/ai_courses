import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import styles from '../components/common/Toast.module.css'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warn: AlertTriangle,
  info: Info,
}

const DEFAULT_DURATION = 3600

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const toast = useCallback(
    (message, options = {}) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      const item = {
        id,
        message,
        tone: options.tone || 'info',
        title: options.title,
        duration: options.duration ?? DEFAULT_DURATION,
      }
      setToasts((prev) => [...prev.slice(-3), item])
      if (item.duration > 0) {
        timers.current.set(id, setTimeout(() => dismiss(id), item.duration))
      }
      return id
    },
    [dismiss]
  )

  const value = useMemo(
    () => ({
      toast,
      dismiss,
      success: (m, o) => toast(m, { ...o, tone: 'success' }),
      error: (m, o) => toast(m, { ...o, tone: 'error' }),
      warn: (m, o) => toast(m, { ...o, tone: 'warn' }),
      info: (m, o) => toast(m, { ...o, tone: 'info' }),
    }),
    [toast, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className={styles.viewport} role="region" aria-label="Bildirishnomalar">
          {toasts.map((t) => {
            const Icon = ICONS[t.tone] || Info
            return (
              <div key={t.id} className={`${styles.toast} ${styles[t.tone]}`} role="status">
                <Icon size={18} className={styles.icon} aria-hidden="true" />
                <div className={styles.body}>
                  {t.title && <strong className={styles.title}>{t.title}</strong>}
                  <span className={styles.message}>{t.message}</span>
                </div>
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => dismiss(t.id)}
                  aria-label="Yopish"
                >
                  <X size={15} />
                </button>
              </div>
            )
          })}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast ToastProvider ichida ishlatilishi kerak')
  return ctx
}
