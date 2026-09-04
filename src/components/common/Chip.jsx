import { cx } from '../../utils/format'
import styles from './Chip.module.css'

/** Kichik yorliq / status belgisi. */
export function Chip({ tone = 'neutral', size = 'md', icon: IconCmp, className, children, ...rest }) {
  return (
    <span className={cx(styles.chip, styles[tone], styles[size], className)} {...rest}>
      {IconCmp && <IconCmp size={size === 'sm' ? 11 : 13} aria-hidden="true" />}
      {children}
    </span>
  )
}

/** Filtr uchun bosiladigan chip. */
export function FilterChip({ active, icon: IconCmp, count, className, children, ...rest }) {
  return (
    <button
      type="button"
      className={cx(styles.filter, active && styles.filterActive, className)}
      aria-pressed={active}
      {...rest}
    >
      {IconCmp && <IconCmp size={14} aria-hidden="true" />}
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  )
}

export default Chip
