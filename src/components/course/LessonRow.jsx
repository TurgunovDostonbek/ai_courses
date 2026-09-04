import { Link } from 'react-router-dom'
import { Check, Circle, Clock, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx, formatMinutes } from '../../utils/format'
import styles from './LessonRow.module.css'

/** Kurs sahifasidagi bitta dars qatori. */
export function LessonRow({ lesson, index, completed, current }) {
  const { t, locale } = useI18n()

  return (
    <Link
      to={'/lessons/' + lesson.id}
      className={cx(styles.row, completed && styles.done, current && styles.current)}
    >
      <span className={styles.marker} aria-hidden="true">
        {completed ? <Check size={14} /> : <Circle size={9} />}
      </span>

      <span className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className={styles.body}>
        <span className={styles.title}>{lesson.title}</span>
        <span className={styles.summary}>{lesson.summary}</span>
      </span>

      <span className={styles.meta}>
        <span className={styles.metaItem}>
          <Clock size={12} aria-hidden="true" />
          {formatMinutes(lesson.duration, locale)}
        </span>
        <span className={styles.metaItem}>
          <Zap size={12} aria-hidden="true" />
          {lesson.xp} XP
        </span>
        {current && !completed && <span className={styles.currentTag}>{t('common.continue')}</span>}
      </span>
    </Link>
  )
}

export default LessonRow
