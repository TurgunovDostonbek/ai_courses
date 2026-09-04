import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  Hammer,
  Lightbulb,
  PenLine,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx, formatDate, toISODate } from '../../utils/format'
import { Button } from '../common/Button'
import { EmptyState } from '../common/States'
import styles from './Widgets.module.css'

/* ------------------------------------------------------------------ */
/* Tavsiya kartasi                                                     */
/* ------------------------------------------------------------------ */

const REC_ICONS = {
  next: BookOpen,
  streak: Flame,
  revisit: Lightbulb,
  done: Trophy,
}

/** «Keyingi qadam» — Progress kontekstidagi tavsiya asosida. */
export function RecommendationCard({ recommendation }) {
  const IconCmp = REC_ICONS[recommendation.type] || Sparkles

  return (
    <div className={cx(styles.rec, styles['rec_' + recommendation.tone])}>
      <span className={styles.recIcon} aria-hidden="true">
        <IconCmp size={20} />
      </span>
      <div className={styles.recBody}>
        <span className={styles.recEyebrow}>Keyingi qadam</span>
        <h3 className={styles.recTitle}>{recommendation.title}</h3>
        <p className={styles.recText}>{recommendation.text}</p>
      </div>
      <Button to={recommendation.to} iconRight={ArrowRight} className={styles.recBtn}>
        {recommendation.cta}
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Faoliyat tarixi                                                     */
/* ------------------------------------------------------------------ */

const ACTIVITY_ICONS = {
  lesson: BookOpen,
  quiz: Award,
  practice: PenLine,
  challenge: Flame,
  project: Hammer,
}

/** Oxirgi harakatlar ro'yxati. */
export function ActivityFeed({ items = [], limit = 6 }) {
  const { t, locale } = useI18n()

  if (items.length === 0) {
    return <EmptyState compact icon={Sparkles} title={t('dash.noActivity')} />
  }

  return (
    <ul className={styles.feed}>
      {items.slice(0, limit).map((item) => {
        const IconCmp = ACTIVITY_ICONS[item.type] || Sparkles
        return (
          <li key={item.id} className={styles.feedItem}>
            <span className={cx(styles.feedIcon, styles['act_' + item.type])} aria-hidden="true">
              <IconCmp size={14} />
            </span>
            <div className={styles.feedText}>
              <span className={styles.feedLabel}>{item.label}</span>
              <span className={styles.feedDate}>{formatDate(item.at, locale)}</span>
            </div>
            {item.xp > 0 && <span className={styles.feedXp}>+{item.xp} XP</span>}
          </li>
        )
      })}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Seriya kalendari                                                    */
/* ------------------------------------------------------------------ */

const WEEKS = 18

/** Oxirgi ~4 oylik faollik xaritasi. */
export function StreakCalendar({ activeDates = [], xpByDate = {} }) {
  const active = new Set(activeDates)
  const today = new Date()
  const days = []

  // Hafta yakshanbadan boshlanadi — oxirgi ustun bugungi haftaga to'g'ri keladi
  const start = new Date(today)
  start.setDate(start.getDate() - (WEEKS * 7 - 1) - today.getDay())

  for (let i = 0; i < WEEKS * 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const iso = toISODate(d)
    const xp = xpByDate[iso] || 0
    let level = 0
    if (active.has(iso)) level = 1
    if (xp >= 60) level = 2
    if (xp >= 140) level = 3
    if (xp >= 260) level = 4
    days.push({ iso, level, xp, future: d > today })
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.grid}>
        {days.map((day) => (
          <span
            key={day.iso}
            className={cx(styles.day, styles['lvl' + day.level], day.future && styles.future)}
            title={day.iso + (day.xp ? ' — ' + day.xp + ' XP' : '')}
          />
        ))}
      </div>
      <div className={styles.legend}>
        <span>kam</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={cx(styles.day, styles['lvl' + l])} aria-hidden="true" />
        ))}
        <span>ko‘p</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Kichik havola kartasi                                               */
/* ------------------------------------------------------------------ */

/** Tezkor havola plitkasi (Prompt Lab, Challenge va h.k.). */
export function QuickLink({ to, icon: IconCmp, title, text, tone = 'brand' }) {
  return (
    <Link to={to} className={cx(styles.quick, styles['q_' + tone])}>
      <span className={styles.quickIcon} aria-hidden="true">
        <IconCmp size={18} />
      </span>
      <span className={styles.quickBody}>
        <span className={styles.quickTitle}>{title}</span>
        <span className={styles.quickText}>{text}</span>
      </span>
      <ArrowRight size={16} className={styles.quickArrow} aria-hidden="true" />
    </Link>
  )
}
