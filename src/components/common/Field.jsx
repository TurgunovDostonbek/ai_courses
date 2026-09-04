import { forwardRef, useId } from 'react'
import { Search, X } from 'lucide-react'
import { cx } from '../../utils/format'
import styles from './Field.module.css'

/** Yorliq + yordam matni + xato bilan o'ralgan maydon. */
export function Field({ label, hint, error, required, htmlFor, className, children }) {
  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : (
        hint && <p className={styles.hint}>{hint}</p>
      )}
    </div>
  )
}

export const Input = forwardRef(function Input({ className, invalid, ...rest }, ref) {
  return <input ref={ref} className={cx(styles.input, invalid && styles.invalid, className)} {...rest} />
})

export const Textarea = forwardRef(function Textarea({ className, invalid, rows = 4, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cx(styles.input, styles.textarea, invalid && styles.invalid, className)}
      {...rest}
    />
  )
})

export const Select = forwardRef(function Select({ className, children, ...rest }, ref) {
  return (
    <div className={styles.selectWrap}>
      <select ref={ref} className={cx(styles.input, styles.select, className)} {...rest}>
        {children}
      </select>
    </div>
  )
})

/** Ikonka va tozalash tugmasi bilan qidiruv maydoni. */
export function SearchInput({ value, onChange, onClear, placeholder, className, ...rest }) {
  const id = useId()
  return (
    <div className={cx(styles.search, className)}>
      <Search size={16} className={styles.searchIcon} aria-hidden="true" />
      <input
        id={id}
        type="search"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        {...rest}
      />
      {value && (
        <button
          type="button"
          className={styles.searchClear}
          onClick={() => (onClear ? onClear() : onChange?.(''))}
          aria-label="Tozalash"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

/** Ikki-uch variantli segment tanlagich (masalan mavzu tanlash). */
export function Segmented({ options, value, onChange, size = 'md', className, label }) {
  return (
    <div className={cx(styles.segmented, styles[`seg_${size}`], className)} role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={cx(styles.segment, value === opt.value && styles.segmentActive)}
          onClick={() => onChange?.(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.icon && <opt.icon size={14} aria-hidden="true" />}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default Field
