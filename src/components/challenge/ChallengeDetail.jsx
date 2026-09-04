import { useState } from 'react'
import { CheckCircle2, Clock, Flame, ListChecks, Send, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import { Accordion } from '../common/Misc'
import { Button } from '../common/Button'
import { Chip } from '../common/Chip'
import { Textarea } from '../common/Field'
import styles from './Challenge.module.css'

/** Challenge sharti, mezonlari va javob maydoni. */
export function ChallengeDetail({ challenge, record, onSubmit, className }) {
  const { t } = useI18n()
  // Holat challenge almashganda tiklanadi — ota komponent `key` beradi
  const [answer, setAnswer] = useState(record?.answer || '')

  const completed = Boolean(record?.completedAt)

  return (
    <div className={cx(styles.detail, className)}>
      <header className={styles.detailHead}>
        <div className={styles.detailTitleRow}>
          <h2 className={styles.detailTitle}>{challenge.title}</h2>
          {completed && (
            <span className={styles.doneTag}>
              <CheckCircle2 size={13} aria-hidden="true" />
              {t('challenge.completed')}
            </span>
          )}
        </div>
        <div className={styles.metaRow}>
          <Chip size="sm" tone="neutral">
            {t('common.' + challenge.difficulty)}
          </Chip>
          <span className={styles.meta}>
            <Clock size={12} aria-hidden="true" />
            {challenge.estimate} {t('common.min')}
          </span>
          <span className={styles.meta}>
            <Zap size={12} aria-hidden="true" />
            {challenge.xp} XP
          </span>
          <span className={styles.meta}>
            <Flame size={12} aria-hidden="true" />
            {challenge.category}
          </span>
        </div>
      </header>

      <section className={styles.block}>
        <span className={styles.blockLabel}>{t('challenge.task')}</span>
        <p className={styles.blockText}>{challenge.task}</p>
      </section>

      <section className={styles.block}>
        <span className={styles.blockLabel}>{t('challenge.context')}</span>
        <p className={styles.blockText}>{challenge.context}</p>
      </section>

      <section className={styles.block}>
        <span className={styles.blockLabel}>
          <ListChecks size={13} aria-hidden="true" />
          {t('challenge.criteria')}
        </span>
        <ul className={styles.criteria}>
          {challenge.criteria.map((c) => (
            <li key={c}>
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      {challenge.hint && (
        <Accordion title={t('lesson.hint')}>
          <p className={styles.blockText}>{challenge.hint}</p>
        </Accordion>
      )}

      <section className={styles.block}>
        <label className={styles.blockLabel} htmlFor={'answer-' + challenge.id}>
          {t('challenge.yourAnswer')}
        </label>
        <Textarea
          id={'answer-' + challenge.id}
          rows={8}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={t('lesson.answerPlaceholder')}
        />
      </section>

      <Button icon={Send} onClick={() => onSubmit(answer)} disabled={!answer.trim()}>
        {completed ? t('common.save') : t('challenge.submit')}
      </Button>
    </div>
  )
}

export default ChallengeDetail
