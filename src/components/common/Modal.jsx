import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cx } from '../../utils/format'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import styles from './Modal.module.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Modal oynasi: Escape bilan yopiladi, fokus ichida ushlanadi,
 * ochilganda sahifa skrolli to'xtaydi.
 */
export function Modal({ open, onClose, title, description, size = 'md', footer, children, className }) {
  const panelRef = useRef(null)
  const previousFocus = useRef(null)

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    previousFocus.current = document.activeElement

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll(FOCUSABLE)
    if (focusables?.length) focusables[0].focus()
    else panel?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose?.()
        return
      }
      if (e.key !== 'Tab') return
      const items = panel?.querySelectorAll(FOCUSABLE)
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previousFocus.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div
        ref={panelRef}
        className={cx(styles.panel, styles[size], className)}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal'}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <div className={styles.headerText}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

export default Modal
