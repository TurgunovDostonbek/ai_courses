import { Link } from 'react-router-dom'
import { CalendarDays, Flame, Trophy } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { CHALLENGES, getDailyChallenge } from '../../data/challenges'
import { formatDate } from '../../utils/format'
import { Card, SectionHeading, StatTile } from '../../components/common'
import { ChallengeDetail } from '../../components/challenge'
import styles from './DailyChallenge.module.css'

export function DailyChallenge() {
  const { t, locale } = useI18n()
  const toast = useToast()
  const { completeChallenge, getChallengeRecord, stats, progress } = useProgress()

  const challenge = getDailyChallenge()
  const record = getChallengeRecord(challenge.id)
  const completedCount = Object.keys(progress.challenges).length

  const submit = (answer) => {
    const { xp } = completeChallenge(challenge.id, answer, challenge.title)
    toast.success(xp > 0 ? '+' + xp + ' XP · ' + challenge.title : t('common.saved'))
  }

  return (
    <div className="page">
      <SectionHeading
        eyebrow={formatDate(new Date(), locale)}
        title={t('challenge.daily')}
        description="Har kuni bitta vazifa — seriyani saqlang va ko‘nikmani mustahkamlang."
        level={1}
      />

      <div className={styles.stats}>
        <StatTile icon={Flame} label={t('dash.streak')} value={stats.streak} tone="warn" />
        <StatTile
          icon={Trophy}
          label="Bajarilgan challenge"
          value={completedCount + '/' + CHALLENGES.length}
          tone="success"
        />
        <StatTile icon={CalendarDays} label="Eng uzun seriya" value={stats.longestStreak} tone="info" />
      </div>

      <ChallengeDetail
        key={challenge.id}
        challenge={challenge}
        record={record}
        onSubmit={submit}
        className={styles.detail}
      />

      <Card className={styles.more}>
        <p className={styles.moreText}>
          Bugungi vazifani tugatdingizmi? Barcha challenge lar ro‘yxatidan yana tanlashingiz mumkin.
        </p>
        <Link to="/challenges" className={styles.moreLink}>
          {t('challenge.title')} →
        </Link>
      </Card>
    </div>
  )
}

export default DailyChallenge
