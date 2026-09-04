import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import { scoreLabel } from '../../utils/promptScore'
import { ProgressRing } from '../common/ProgressBar'
import styles from './ScorePanel.module.css'

const SEVERITY_ICONS = {
  error: XCircle,
  warn: AlertTriangle,
  info: Info,
}

const TONE_COLOR = {
  success: 'var(--success)',
  warn: 'var(--warning)',
  danger: 'var(--danger)',
}

/** Prompt bahosi: umumiy ball, mezonlar bo'yicha taqsimot va tavsiyalar. */
export function ScorePanel({ result, compact = false }) {
  const { t } = useI18n()
  if (!result) return null

  const label = scoreLabel(result.score)
  const color = TONE_COLOR[label.tone] || 'var(--brand)'

  return (
    <div className={cx(styles.panel, compact && styles.compact)}>
      <div className={styles.top}>
        <ProgressRing value={result.score} size={compact ? 92 : 112} stroke={9} tone={color}>
          <span className={styles.score} style={{ color }}>
            {result.score}
          </span>
          <span className={styles.scoreMax}>/ 100</span>
        </ProgressRing>

        <div className={styles.topText}>
          <span className={styles.verdict} style={{ color }}>
            {label.label}
          </span>
          {result.words !== undefined && (
            <span className={styles.words}>{result.words} so‘z</span>
          )}
          {result.strengths?.length > 0 && (
            <ul className={styles.strengths}>
              {result.strengths.map((s) => (
                <li key={s}>
                  <CheckCircle2 size={13} aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.breakdown}>
        <span className={styles.sectionTitle}>{t('practice.breakdown')}</span>
        {result.breakdown?.map((b) => {
          const pct = Math.round((b.earned / b.weight) * 100)
          return (
            <div key={b.key} className={styles.criterion}>
              <span className={styles.criterionLabel}>{t(b.labelKey)}</span>
              <span className={styles.bar} aria-hidden="true">
                <span
                  className={styles.barFill}
                  style={{
                    width: pct + '%',
                    background: pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--danger)',
                  }}
                />
              </span>
              <span className={styles.criterionValue}>
                {b.earned}/{b.weight}
              </span>
            </div>
          )
        })}
      </div>

      {result.feedback?.length > 0 && (
        <div className={styles.feedback}>
          <span className={styles.sectionTitle}>{t('practice.feedback')}</span>
          <ul className={styles.feedbackList}>
            {result.feedback.map((f, i) => {
              const IconCmp = SEVERITY_ICONS[f.severity] || Info
              return (
                <li key={f.key || i} className={cx(styles.feedbackItem, styles['sev_' + f.severity])}>
                  <IconCmp size={14} aria-hidden="true" />
                  <span>{f.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ScorePanel
