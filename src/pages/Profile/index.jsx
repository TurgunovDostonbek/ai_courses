import { useState } from 'react'
import { Award, BookOpen, CalendarDays, Save, Target, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { BADGES } from '../../data/gamification'
import { formatDate, formatNumber } from '../../utils/format'
import {
  Button,
  Card,
  Field,
  Input,
  ProgressBar,
  SectionHeading,
  StatTile,
} from '../../components/common'
import Icon from '../../components/common/Icon'
import { ActivityFeed } from '../../components/dashboard'
import styles from './Profile.module.css'

const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]))

export function Profile() {
  const { t, locale } = useI18n()
  const toast = useToast()
  const { user, updateProfile } = useAuth()
  const { stats, progress } = useProgress()

  const [form, setForm] = useState({
    name: user.name,
    role: user.role,
    goal: user.goal,
  })

  const rank = stats.rank
  const initials = (form.name || 'AI').trim().slice(0, 2).toUpperCase()

  const handleSave = (e) => {
    e.preventDefault()
    updateProfile(form)
    toast.success(t('common.saved'))
  }

  return (
    <div className="page">
      <SectionHeading title={t('profile.title')} level={1} />

      <div className={styles.hero}>
        <span className={styles.avatar}>{initials}</span>
        <div className={styles.heroText}>
          <h2 className={styles.name}>{user.name || t('profile.name')}</h2>
          {user.role && <p className={styles.role}>{user.role}</p>}
          <div className={styles.rankRow}>
            <span className={styles.rankBadge} style={{ background: rank.current.color }}>
              <Icon name={rank.current.icon} size={13} />
              {rank.current.name}
            </span>
            {user.joinedAt && (
              <span className={styles.joined}>
                <CalendarDays size={13} aria-hidden="true" />
                {t('profile.joined')}: {formatDate(user.joinedAt, locale)}
              </span>
            )}
          </div>
          <div className={styles.rankProgress}>
            <ProgressBar value={rank.progress} size="sm" />
            <span className={styles.rankNext}>
              {rank.next
                ? formatNumber(rank.xpToNext, locale) + ' XP → ' + rank.next.name
                : 'Eng yuqori daraja'}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <StatTile icon={Zap} label={t('dash.xp')} value={formatNumber(stats.xp, locale)} />
        <StatTile
          icon={BookOpen}
          label={t('dash.completedLessons')}
          value={stats.completedLessons + '/' + stats.totalLessons}
          tone="info"
        />
        <StatTile icon={Award} label={t('dash.badges')} value={stats.badges.length} tone="success" />
        <StatTile
          icon={Target}
          label={t('dash.promptScore')}
          value={stats.bestPromptScore || '—'}
          sub={'O‘rtacha: ' + (stats.avgPromptScore || 0)}
          tone="warn"
        />
      </div>

      <div className={styles.grid}>
        <Card>
          <h2 className={styles.cardTitle}>{t('profile.title')}</h2>
          <form className={styles.form} onSubmit={handleSave}>
            <Field label={t('profile.name')} htmlFor="p-name">
              <Input
                id="p-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ismingiz"
              />
            </Field>
            <Field label={t('profile.role')} htmlFor="p-role">
              <Input
                id="p-role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Dasturchi, marketolog, o‘qituvchi…"
              />
            </Field>
            <Field label={t('profile.goal')} htmlFor="p-goal" hint="Tavsiyalar shu maqsadga moslashadi">
              <Input
                id="p-goal"
                value={form.goal}
                onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                placeholder="Masalan: ishimni AI bilan 2x tezlashtirish"
              />
            </Field>
            <Button type="submit" icon={Save}>
              {t('common.save')}
            </Button>
          </form>
        </Card>

        <div className={styles.side}>
          <Card>
            <h2 className={styles.cardTitle}>{t('dash.badges')}</h2>
            {stats.badges.length === 0 ? (
              <p className={styles.empty}>{t('badges.locked')}</p>
            ) : (
              <div className={styles.badges}>
                {stats.badges.map((id) => {
                  const badge = BADGE_BY_ID[id]
                  if (!badge) return null
                  return (
                    <span key={id} className={styles.badge} title={badge.description}>
                      <span aria-hidden="true">{badge.emoji}</span>
                      {badge.name}
                    </span>
                  )
                })}
              </div>
            )}
          </Card>

          <Card>
            <h2 className={styles.cardTitle}>{t('dash.recentActivity')}</h2>
            <ActivityFeed items={progress.activity} limit={10} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
