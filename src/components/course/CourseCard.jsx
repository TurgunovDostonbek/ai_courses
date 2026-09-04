import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, PlayCircle } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx, formatMinutes } from '../../utils/format'
import Icon from '../common/Icon'
import { Chip } from '../common/Chip'
import { ProgressBar } from '../common/ProgressBar'
import styles from './CourseCard.module.css'

const DIFFICULTY_KEY = {
  beginner: 'common.beginner',
  intermediate: 'common.intermediate',
  advanced: 'common.advanced',
}

/** Kurs kartasi — kurslar ro'yxati va dashboard uchun. */
export function CourseCard({ course, progress, stats, compact = false }) {
  const { t, locale } = useI18n()
  const done = progress?.completed || 0
  const total = progress?.total || stats?.lessonCount || 0
  const pct = progress?.percent || 0
  const started = done > 0
  const complete = progress?.isComplete

  return (
    <Link to={'/courses/' + course.id} className={cx(styles.card, compact && styles.compact)}>
      <span className={styles.accent} style={{ background: course.color }} aria-hidden="true" />

      <div className={styles.head}>
        <span className={styles.icon} style={{ background: course.color + '1f', color: course.color }}>
          <Icon name={course.icon} size={20} />
        </span>
        <div className={styles.headText}>
          <span className={styles.level}>Level {course.level}</span>
          <h3 className={styles.title}>{course.title}</h3>
        </div>
        {complete ? (
          <CheckCircle2 size={19} className={styles.doneIcon} aria-label={t('common.completed')} />
        ) : (
          <ArrowRight size={17} className={styles.arrow} aria-hidden="true" />
        )}
      </div>

      <p className={styles.tagline}>{course.tagline}</p>

      {!compact && (
        <div className={styles.meta}>
          <Chip size="sm" tone="neutral">
            {t(DIFFICULTY_KEY[course.difficulty] || 'common.beginner')}
          </Chip>
          <span className={styles.metaItem}>
            <PlayCircle size={13} aria-hidden="true" />
            {total} {t('common.lessons')}
          </span>
          <span className={styles.metaItem}>
            <Clock size={13} aria-hidden="true" />
            {formatMinutes(stats?.totalMinutes || course.estimatedHours * 60, locale)}
          </span>
        </div>
      )}

      <div className={styles.foot}>
        <ProgressBar value={pct} size="sm" tone={complete ? 'success' : 'brand'} />
        <div className={styles.footMeta}>
          <span className={styles.footCount}>
            {done}/{total} {t('common.lessons')}
          </span>
          <span className={cx(styles.footState, complete && styles.footDone)}>
            {complete
              ? t('common.completed')
              : started
                ? t('common.inProgress')
                : t('common.notStarted')}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
