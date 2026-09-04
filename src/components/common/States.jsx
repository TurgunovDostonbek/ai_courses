import { AlertTriangle, Inbox, RotateCcw } from 'lucide-react'
import { cx } from '../../utils/format'
import Button from './Button'
import styles from './States.module.css'

/** Bo'sh holat — ro'yxat bo'sh yoki filtr natija bermaganda. */
export function EmptyState({ icon: IconCmp = Inbox, title, description, action, compact = false, className }) {
  return (
    <div className={cx(styles.state, compact && styles.compact, className)}>
      <span className={styles.iconWrap} aria-hidden="true">
        <IconCmp size={compact ? 20 : 26} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}

/** Xato holati — qayta urinish tugmasi bilan. */
export function ErrorState({ title, description, onRetry, retryLabel = 'Qayta urinish', className }) {
  return (
    <div className={cx(styles.state, styles.error, className)} role="alert">
      <span className={cx(styles.iconWrap, styles.errorIcon)} aria-hidden="true">
        <AlertTriangle size={24} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {onRetry && (
        <div className={styles.action}>
          <Button variant="secondary" icon={RotateCcw} onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

/** Skeleton bloki. */
export function Skeleton({ width = '100%', height = 14, radius = 'var(--r-xs)', className, style }) {
  return (
    <span
      className={cx(styles.skeleton, className)}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  )
}

/** Karta shaklidagi skeleton (ro'yxat yuklanayotganda). */
export function SkeletonCard({ lines = 3, className }) {
  return (
    <div className={cx(styles.skeletonCard, className)} aria-hidden="true">
      <Skeleton width={40} height={40} radius="var(--r-sm)" />
      <div className={styles.skeletonBody}>
        <Skeleton width="55%" height={15} />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} width={i === lines - 1 ? '70%' : '100%'} height={11} />
        ))}
      </div>
    </div>
  )
}

/** Sahifa yuklanayotganda ko'rsatiladigan blok (lazy route fallback). */
export function PageLoader({ label = 'Yuklanmoqda…' }) {
  return (
    <div className={styles.pageLoader} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.loaderLabel}>{label}</span>
    </div>
  )
}

export default EmptyState
