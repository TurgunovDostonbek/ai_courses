import { cx } from '../../utils/format'
import styles from './ProgressBar.module.css'

/** Chiziqli progress. */
export function ProgressBar({ value = 0, size = 'md', tone = 'brand', label, showValue = false, className }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={cx(styles.wrap, className)}>
      {(label || showValue) && (
        <div className={styles.meta}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{clamped}%</span>}
        </div>
      )}
      <div
        className={cx(styles.track, styles[size])}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div className={cx(styles.fill, styles[tone])} style={{ width: clamped + '%' }} />
      </div>
    </div>
  )
}

/** Dumaloq progress — dashboard va kurs kartalari uchun. */
export function ProgressRing({ value = 0, size = 96, stroke = 8, tone = 'var(--brand)', children }) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  const center = size / 2

  return (
    <div className={styles.ring} style={{ width: size, height: size }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--bg-inset)" strokeWidth={stroke} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={'rotate(-90 ' + center + ' ' + center + ')'}
          className={styles.ringFill}
        />
      </svg>
      <div className={styles.ringContent}>{children}</div>
    </div>
  )
}

export default ProgressBar
