import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'
import styles from './Logo.module.css'

/** Platforma logotipi. */
export function Logo({ to = '/', compact = false, className }) {
  return (
    <Link to={to} className={cx(styles.logo, compact && styles.compact, className)} aria-label="AI Mastery">
      <span className={styles.mark} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M12 2.5 14.4 8l5.6 1.4-4 4.2.7 5.9-4.7-2.7-4.7 2.7.7-5.9-4-4.2L9.6 8 12 2.5Z"
            fill="currentColor"
            opacity="0.92"
          />
        </svg>
      </span>
      {!compact && (
        <span className={styles.text}>
          AI <span className={styles.accent}>Mastery</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
