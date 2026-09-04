import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Flame,
  GraduationCap,
  Hammer,
  PenLine,
  Search as SearchIcon,
  Wrench,
} from 'lucide-react'
import { SEARCH_INDEX } from '../../data'
import { useI18n } from '../../context/I18nContext'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { cx } from '../../utils/format'
import styles from './CommandPalette.module.css'

const TYPE_META = {
  course: { icon: GraduationCap, label: 'Kurs' },
  lesson: { icon: BookOpen, label: 'Dars' },
  tool: { icon: Wrench, label: 'Vosita' },
  prompt: { icon: PenLine, label: 'Prompt' },
  challenge: { icon: Flame, label: 'Challenge' },
  project: { icon: Hammer, label: 'Loyiha' },
}

const MAX_RESULTS = 12

/** Global qidiruv (Ctrl+K). */
export function CommandPalette({ open, onClose }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useLockBodyScroll(open)

  // Ochilganda fokus kiritish maydoniga o'tadi (holat mount paytida toza)
  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 40)
    return () => clearTimeout(id)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return SEARCH_INDEX.filter((i) => i.type === 'course').slice(0, 6)
    }
    const terms = q.split(/\s+/)
    return SEARCH_INDEX.map((item) => {
      const title = item.title.toLowerCase()
      let score = 0
      for (const term of terms) {
        if (title.startsWith(term)) score += 6
        else if (title.includes(term)) score += 4
        else if (item.keywords.includes(term)) score += 1
        else return null
      }
      return { item, score }
    })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((r) => r.item)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[active]) {
        e.preventDefault()
        navigate(results[active].to)
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, results, active, navigate, onClose])

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label={t('common.search')}>
        <div className={styles.searchRow}>
          <SearchIcon size={17} className={styles.searchIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder={t('common.searchPlaceholder')}
            aria-label={t('common.search')}
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <div className={styles.results} ref={listRef} role="listbox">
          {results.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>{t('common.noResults')}</p>
              <p className={styles.emptyText}>{t('common.tryAgain')}</p>
            </div>
          ) : (
            results.map((item, i) => {
              const meta = TYPE_META[item.type] || TYPE_META.lesson
              const MetaIcon = meta.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  data-active={i === active}
                  className={cx(styles.result, i === active && styles.resultActive)}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    navigate(item.to)
                    onClose()
                  }}
                >
                  <span className={styles.resultIcon} aria-hidden="true">
                    <MetaIcon size={15} />
                  </span>
                  <span className={styles.resultText}>
                    <span className={styles.resultTitle}>{item.title}</span>
                    {item.subtitle && <span className={styles.resultSub}>{item.subtitle}</span>}
                  </span>
                  <span className={styles.resultType}>{meta.label}</span>
                </button>
              )
            })
          )}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd> tanlash
          </span>
          <span>
            <kbd className={styles.kbd}>Enter</kbd> ochish
          </span>
          <span className={styles.footerCount}>
            {results.length} {t('common.results')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
