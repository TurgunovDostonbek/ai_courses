import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronRight, Copy } from 'lucide-react'
import { cx } from '../../utils/format'
import { useCopy } from '../../hooks/useCopy'
import styles from './Misc.module.css'

/** Sahifa yoki bo'lim sarlavhasi. */
export function SectionHeading({ eyebrow, title, description, action, level = 2, align = 'start', className }) {
  const Tag = `h${level}`
  return (
    <div className={cx(styles.heading, align === 'center' && styles.headingCenter, className)}>
      <div className={styles.headingText}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <Tag className={styles.headingTitle}>{title}</Tag>
        {description && <p className={styles.headingDesc}>{description}</p>}
      </div>
      {action && <div className={styles.headingAction}>{action}</div>}
    </div>
  )
}

/** Kichik statistika plitkasi. */
export function StatTile({ icon: IconCmp, label, value, sub, tone = 'brand', className }) {
  return (
    <div className={cx(styles.stat, className)}>
      {IconCmp && (
        <span className={cx(styles.statIcon, styles[`tone_${tone}`])} aria-hidden="true">
          <IconCmp size={17} />
        </span>
      )}
      <div className={styles.statBody}>
        <span className={styles.statValue}>{value}</span>
        <span className={styles.statLabel}>{label}</span>
        {sub && <span className={styles.statSub}>{sub}</span>}
      </div>
    </div>
  )
}

/** Breadcrumb navigatsiyasi. */
export function Breadcrumb({ items = [], className }) {
  return (
    <nav className={cx(styles.crumbs, className)} aria-label="Breadcrumb">
      <ol className={styles.crumbList}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label + i} className={styles.crumbItem}>
              {last || !item.to ? (
                <span className={styles.crumbCurrent} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={styles.crumbLink}>
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight size={13} className={styles.crumbSep} aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/** Sodda tooltip — hover va fokusda ochiladi. */
export function Tooltip({ label, side = 'top', children, className }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className={cx(styles.tooltipWrap, className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className={cx(styles.tooltip, styles[`side_${side}`])} role="tooltip">
          {label}
        </span>
      )}
    </span>
  )
}

/** Nusxalash tugmasi bilan kod bloki. */
export function CodeBlock({ code, lang, label, className }) {
  const { copied, copy } = useCopy()
  return (
    <div className={cx(styles.codeBlock, className)}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLang}>{label || lang || 'text'}</span>
        <button type="button" className={styles.codeCopy} onClick={() => copy(code)}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Nusxalandi' : 'Nusxalash'}
        </button>
      </div>
      <pre className={styles.codePre}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

/** Tab navigatsiyasi. */
export function Tabs({ tabs, value, onChange, className }) {
  return (
    <div className={cx(styles.tabs, className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          className={cx(styles.tab, value === tab.value && styles.tabActive)}
          onClick={() => onChange?.(tab.value)}
        >
          {tab.icon && <tab.icon size={15} aria-hidden="true" />}
          {tab.label}
          {tab.count !== undefined && <span className={styles.tabCount}>{tab.count}</span>}
        </button>
      ))}
    </div>
  )
}

/** Yig'iladigan bo'lim. */
export function Accordion({ title, defaultOpen = false, children, className }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={cx(styles.accordion, className)}>
      <button
        type="button"
        className={styles.accordionHead}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <ChevronRight size={15} className={cx(styles.accordionChevron, open && styles.accordionOpen)} />
        {title}
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  )
}

/** Sahifalash. */
export function Pagination({ page, totalPages, onChange, className }) {
  if (totalPages <= 1) return null
  const pages = []
  const push = (p) => pages.push(p)
  push(1)
  for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) push(p)
  if (totalPages > 1) push(totalPages)
  const unique = [...new Set(pages)].sort((a, b) => a - b)

  return (
    <nav className={cx(styles.pagination, className)} aria-label="Sahifalar">
      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Oldingi sahifa"
      >
        ‹
      </button>
      {unique.map((p, i) => (
        <span key={p} className={styles.pageGroup}>
          {i > 0 && unique[i - 1] !== p - 1 && <span className={styles.pageDots}>…</span>}
          <button
            type="button"
            className={cx(styles.pageBtn, p === page && styles.pageActive)}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        </span>
      ))}
      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Keyingi sahifa"
      >
        ›
      </button>
    </nav>
  )
}
