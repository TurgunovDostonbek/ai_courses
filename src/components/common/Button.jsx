import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../../utils/format'
import styles from './Button.module.css'

/**
 * Universal tugma.
 * `to` berilsa Link, `href` berilsa <a>, aks holda <button>.
 */
export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon: IconCmp,
    iconRight: IconRight,
    loading = false,
    fullWidth = false,
    className,
    children,
    to,
    href,
    type = 'button',
    disabled,
    ...rest
  },
  ref
) {
  const classes = cx(
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.full,
    loading && styles.loading,
    !children && styles.iconOnly,
    className
  )

  const content = (
    <>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && IconCmp && <IconCmp size={size === 'sm' ? 14 : 16} aria-hidden="true" />}
      {children && <span className={styles.label}>{children}</span>}
      {!loading && IconRight && <IconRight size={size === 'sm' ? 14 : 16} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} aria-disabled={disabled || undefined} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  )
})

export default Button
