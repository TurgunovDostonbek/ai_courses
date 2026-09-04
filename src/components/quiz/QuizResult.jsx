import { ArrowRight, Check, RotateCcw, X } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import { Button } from '../common/Button'
import { ProgressRing } from '../common/ProgressBar'
import styles from './QuizResult.module.css'

/** Test yakuni: ball, tahlil va keyingi qadam. */
export function QuizResult({ quiz, score, correct, total, results, onRetake, nextTo, xpGained }) {
  const { t } = useI18n()
  const passed = score >= (quiz.passScore ?? 70)

  const verdict = score >= 90 ? t('quiz.excellent') : score >= 70 ? t('quiz.good') : t('quiz.needsWork')

  return (
    <div className={styles.wrap}>
      <div className={cx(styles.hero, passed ? styles.pass : styles.fail)}>
        <ProgressRing value={score} size={132} stroke={10} tone={passed ? 'var(--success)' : 'var(--danger)'}>
          <span className={styles.ringValue}>{score}%</span>
          <span className={styles.ringLabel}>{t('quiz.yourScore')}</span>
        </ProgressRing>

        <div className={styles.heroText}>
          <span className={cx(styles.status, passed ? styles.statusPass : styles.statusFail)}>
            {passed ? t('quiz.passed') : t('quiz.failed')}
          </span>
          <h2 className={styles.verdict}>{verdict}</h2>
          <div className={styles.counts}>
            <span className={styles.countOk}>
              <Check size={14} aria-hidden="true" /> {t('quiz.correctCount')}: {correct}
            </span>
            <span className={styles.countBad}>
              <X size={14} aria-hidden="true" /> {t('quiz.wrongCount')}: {total - correct}
            </span>
          </div>
          {xpGained > 0 && <p className={styles.xp}>+{xpGained} XP</p>}
        </div>
      </div>

      <div className={styles.review}>
        <h3 className={styles.reviewTitle}>{t('quiz.explanation')}</h3>
        <ol className={styles.reviewList}>
          {quiz.questions.map((q, i) => (
            <li key={q.id} className={styles.reviewItem}>
              <span
                className={cx(styles.reviewMark, results[i] ? styles.markOk : styles.markBad)}
                aria-hidden="true"
              >
                {results[i] ? <Check size={12} /> : <X size={12} />}
              </span>
              <div className={styles.reviewBody}>
                <span className={styles.reviewPrompt}>{q.prompt}</span>
                {!results[i] && <span className={styles.reviewExplain}>{q.explain}</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" icon={RotateCcw} onClick={onRetake}>
          {t('quiz.retake')}
        </Button>
        {nextTo && (
          <Button to={nextTo} iconRight={ArrowRight}>
            {t('common.continue')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default QuizResult
