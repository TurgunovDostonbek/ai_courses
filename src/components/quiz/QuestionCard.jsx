import { useMemo } from 'react'
import { Check, Info, X } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import { isAnswerCorrect } from '../../utils/quiz'
import { Input, Select } from '../common/Field'
import styles from './QuestionCard.module.css'

function Option({ label, selected, correct, revealed, onSelect }) {
  const state = revealed ? (correct ? 'correct' : selected ? 'wrong' : '') : selected ? 'selected' : ''
  return (
    <button
      type="button"
      className={cx(styles.option, state && styles[state])}
      onClick={onSelect}
      disabled={revealed}
      aria-pressed={selected}
    >
      <span className={styles.optionMark} aria-hidden="true">
        {revealed && correct && <Check size={13} />}
        {revealed && !correct && selected && <X size={13} />}
      </span>
      <span className={styles.optionText}>{label}</span>
    </button>
  )
}

/** Bitta quiz savoli — barcha turlarni qo'llab-quvvatlaydi. */
export function QuestionCard({ question, value, onChange, revealed }) {
  const { t } = useI18n()

  // Moslashtirish savoli uchun o'ng ustun variantlari (aralashtirilgan)
  const rightOptions = useMemo(() => {
    if (question.type !== 'matching') return []
    return (question.pairs || [])
      .map((p) => p.right)
      .slice()
      .sort((a, b) => a.localeCompare(b))
  }, [question])

  const correct = revealed && isAnswerCorrect(question, value)

  return (
    <div className={styles.card}>
      <p className={styles.prompt}>{question.prompt}</p>

      {(question.type === 'multiple' ||
        question.type === 'promptfix' ||
        question.type === 'scenario') && (
        <div className={styles.options}>
          {question.options.map((opt, i) => (
            <Option
              key={i}
              label={opt}
              selected={value === i}
              correct={i === question.answer}
              revealed={revealed}
              onSelect={() => onChange(i)}
            />
          ))}
        </div>
      )}

      {question.type === 'truefalse' && (
        <div className={styles.options}>
          {[true, false].map((val) => (
            <Option
              key={String(val)}
              label={val ? t('quiz.true') : t('quiz.false')}
              selected={value === val}
              correct={val === question.answer}
              revealed={revealed}
              onSelect={() => onChange(val)}
            />
          ))}
        </div>
      )}

      {question.type === 'fill' && (
        <div className={styles.fill}>
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t('quiz.fillPlaceholder')}
            disabled={revealed}
            invalid={revealed && !correct}
            aria-label={t('quiz.fillPlaceholder')}
          />
          {revealed && !correct && (
            <p className={styles.rightAnswer}>
              {t('quiz.correct')}: <strong>{question.answer[0]}</strong>
            </p>
          )}
        </div>
      )}

      {question.type === 'matching' && (
        <div className={styles.matching}>
          {question.pairs.map((pair, i) => {
            const rowCorrect = value?.[i] === pair.right
            return (
              <div
                key={pair.left}
                className={cx(styles.matchRow, revealed && (rowCorrect ? styles.correct : styles.wrong))}
              >
                <span className={styles.matchLeft}>{pair.left}</span>
                <Select
                  value={value?.[i] || ''}
                  disabled={revealed}
                  onChange={(e) => onChange({ ...(value || {}), [i]: e.target.value })}
                  aria-label={pair.left}
                >
                  <option value="">{t('quiz.matchPlaceholder')}</option>
                  {rightOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </div>
            )
          })}
        </div>
      )}

      {revealed && (
        <div className={cx(styles.explain, correct ? styles.explainOk : styles.explainBad)}>
          <span className={styles.explainIcon} aria-hidden="true">
            {correct ? <Check size={15} /> : <Info size={15} />}
          </span>
          <div>
            <strong className={styles.explainTitle}>
              {correct ? t('quiz.correct') : t('quiz.wrong')}
            </strong>
            <p className={styles.explainText}>{question.explain}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
