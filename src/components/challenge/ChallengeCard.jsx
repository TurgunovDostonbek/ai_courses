import { CheckCircle2, Clock, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import styles from './Challenge.module.css'

/** Ro'yxatdagi challenge kartasi. */
export function ChallengeCard({ challenge, completed, active, onSelect }) {
  const { t } = useI18n()

  return (
    <button
      type="button"
      className={cx(styles.card, active && styles.cardActive, completed && styles.cardDone)}
      onClick={() => onSelect(challenge)}
      aria-current={active}
    >
      <span className={styles.cardMark} aria-hidden="true">
        {completed ? <CheckCircle2 size={15} /> : challenge.title.slice(0, 1)}
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardTitle}>{challenge.title}</span>
        <span className={styles.cardTask}>{challenge.task}</span>
        <span className={styles.cardMeta}>
          <span>
            <Clock size={11} aria-hidden="true" /> {challenge.estimate} {t('common.min')}
          </span>
          <span>
            <Zap size={11} aria-hidden="true" /> {challenge.xp} XP
          </span>
          <span className={styles.cardCategory}>{challenge.category}</span>
        </span>
      </span>
    </button>
  )
}

export default ChallengeCard
