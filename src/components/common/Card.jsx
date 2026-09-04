import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'
import styles from './Card.module.css'

/** Umumiy karta. `to` berilsa bosiladigan (interaktiv) kartaga aylanadi. */
export function Card({ as: As = 'div', to, interactive = false, padded = true, className, children, ...rest }) {
  const classes = cx(styles.card, padded && styles.padded, (interactive || to) && styles.interactive, className)

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <As className={classes} {...rest}>
      {children}
    </As>
  )
}

export function CardHeader({ title, subtitle, action, icon: IconCmp, className }) {
  return (
    <div className={cx(styles.header, className)}>
      {IconCmp && (
        <span className={styles.headerIcon} aria-hidden="true">
          <IconCmp size={17} />
        </span>
      )}
      <div className={styles.headerText}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}

export function CardBody({ className, children }) {
  return <div className={cx(styles.body, className)}>{children}</div>
}

export function CardFooter({ className, children }) {
  return <div className={cx(styles.footer, className)}>{children}</div>
}

export default Card
