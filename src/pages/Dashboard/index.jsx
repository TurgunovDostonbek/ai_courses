import { Link } from 'react-router-dom'
import {
  Award,
  BookOpen,
  Flame,
  FlaskConical,
  Hammer,
  Library,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { COURSES } from '../../data/courses'
import { getCourseStats } from '../../data'
import { getDailyChallenge } from '../../data/challenges'
import { BADGES } from '../../data/gamification'
import { formatNumber } from '../../utils/format'
import { Card, CardBody, CardHeader, ProgressRing, SectionHeading, StatTile } from '../../components/common'
import Icon from '../../components/common/Icon'
import { CourseCard } from '../../components/course'
import { ActivityFeed, QuickLink, RecommendationCard, StreakCalendar } from '../../components/dashboard'
import styles from './Dashboard.module.css'

/* Nishon emojilari — id bo'yicha tez qidirish uchun */
const BADGE_EMOJI = Object.fromEntries(BADGES.map((b) => [b.id, b.emoji]))

export function Dashboard() {
  const { t, locale } = useI18n()
  const { user } = useAuth()
  const { stats, courseProgress, recommendation, progress } = useProgress()
  const rank = stats.rank
  const daily = getDailyChallenge()
  const dailyDone = Boolean(progress.challenges[daily.id])

  const activeCourses = COURSES.filter((c) => {
    const p = courseProgress[c.id]
    return p && p.completed > 0 && !p.isComplete
  }).slice(0, 2)

  const greeting = stats.completedLessons > 0 ? t('dash.welcomeBack') : t('dash.welcome')

  return (
    <div className="page">
      <SectionHeading
        eyebrow={t('dash.journey')}
        title={user.name ? greeting + ', ' + user.name : greeting}
        description={
          stats.completedLessons > 0
            ? stats.completedLessons +
              '/' +
              stats.totalLessons +
              ' dars tugatildi · ' +
              stats.overallProgress +
              '%'
            : 'Birinchi darsni boshlang — 5 daqiqada birinchi natijani ko‘rasiz.'
        }
        level={1}
      />

      <div className={styles.statGrid}>
        <StatTile icon={Zap} label={t('dash.xp')} value={formatNumber(stats.xp, locale)} sub={rank.current.name} />
        <StatTile
          icon={Flame}
          label={t('dash.streak')}
          value={stats.streak}
          sub={'Eng uzun: ' + stats.longestStreak}
          tone="warn"
        />
        <StatTile
          icon={BookOpen}
          label={t('dash.completedLessons')}
          value={stats.completedLessons + '/' + stats.totalLessons}
          sub={stats.overallProgress + '%'}
          tone="info"
        />
        <StatTile
          icon={Award}
          label={t('dash.quizAvg')}
          value={stats.quizzesTaken ? stats.quizAverage + '%' : '—'}
          sub={stats.quizzesTaken + ' ta test'}
          tone="success"
        />
      </div>

      <RecommendationCard recommendation={recommendation} />

      <div className={styles.grid}>
        {/* ---------------- Chap ustun ---------------- */}
        <div className={styles.col}>
          {activeCourses.length > 0 && (
            <section className={styles.block}>
              <h2 className={styles.blockTitle}>{t('dash.continueLearning')}</h2>
              <div className={styles.courseGrid}>
                {activeCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={courseProgress[course.id]}
                    stats={getCourseStats(course.id)}
                  />
                ))}
              </div>
            </section>
          )}

          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Amaliyot</h2>
            <div className={styles.quickGrid}>
              <QuickLink
                to="/prompt-lab"
                icon={FlaskConical}
                title={t('nav.promptLab')}
                text="Strukturalangan prompt yig‘ing"
              />
              <QuickLink
                to="/prompt-practice"
                icon={Target}
                title={t('nav.promptPractice')}
                text="Ball oling va yaxshilang"
                tone="success"
              />
              <QuickLink
                to="/prompt-library"
                icon={Library}
                title={t('nav.promptLibrary')}
                text="Tayyor shablonlar"
                tone="info"
              />
              <QuickLink
                to="/projects"
                icon={Hammer}
                title={t('nav.projects')}
                text="Portfolio uchun loyihalar"
                tone="warn"
              />
            </div>
          </section>

          <Card padded={false}>
            <CardHeader
              title={t('analytics.activity')}
              icon={TrendingUp}
              action={
                <Link to="/analytics" className={styles.link}>
                  {t('common.showMore')}
                </Link>
              }
              className={styles.cardHeadPad}
            />
            <CardBody className={styles.cardBodyPad}>
              <StreakCalendar activeDates={progress.activeDates} xpByDate={progress.xpByDate} />
            </CardBody>
          </Card>
        </div>

        {/* ---------------- O'ng ustun ---------------- */}
        <aside className={styles.col}>
          <Card className={styles.rankCard}>
            <ProgressRing value={rank.progress} size={128} stroke={10} tone={rank.current.color}>
              <span className={styles.rankIcon} style={{ color: rank.current.color }}>
                <Icon name={rank.current.icon} size={22} />
              </span>
              <span className={styles.rankPct}>{rank.progress}%</span>
            </ProgressRing>
            <div className={styles.rankText}>
              <span className={styles.rankLabel}>{t('dash.level')}</span>
              <strong className={styles.rankName}>{rank.current.name}</strong>
              {rank.next ? (
                <span className={styles.rankNext}>
                  {t('dash.nextRank')}: {formatNumber(rank.xpToNext, locale)} XP → {rank.next.name}
                </span>
              ) : (
                <span className={styles.rankNext}>Eng yuqori daraja 🎉</span>
              )}
            </div>
          </Card>

          <Card padded={false}>
            <CardHeader title={t('dash.todayChallenge')} icon={Flame} className={styles.cardHeadPad} />
            <CardBody className={styles.cardBodyPad}>
              <h3 className={styles.dailyTitle}>{daily.title}</h3>
              <p className={styles.dailyText}>{daily.task}</p>
              <Link to="/daily-challenge" className={styles.dailyBtn}>
                {dailyDone ? t('challenge.completed') : t('common.start')} · +{daily.xp} XP
              </Link>
            </CardBody>
          </Card>

          <Card padded={false}>
            <CardHeader
              title={t('dash.recentActivity')}
              icon={Zap}
              action={
                <Link to="/profile" className={styles.link}>
                  {t('common.showMore')}
                </Link>
              }
              className={styles.cardHeadPad}
            />
            <CardBody className={styles.cardBodyPad}>
              <ActivityFeed items={progress.activity} limit={6} />
            </CardBody>
          </Card>

          <Card padded={false}>
            <CardHeader
              title={t('dash.badges')}
              icon={Award}
              action={
                <Link to="/badges" className={styles.link}>
                  {t('common.showMore')}
                </Link>
              }
              className={styles.cardHeadPad}
            />
            <CardBody className={styles.cardBodyPad}>
              <p className={styles.badgeCount}>
                <strong>{stats.badges.length}</strong> / 18
              </p>
              <div className={styles.badgeRow}>
                {stats.badges.slice(-8).map((id) => (
                  <span key={id} className={styles.badgeDot} title={id}>
                    {BADGE_EMOJI[id] || '🏅'}
                  </span>
                ))}
                {stats.badges.length === 0 && (
                  <span className={styles.badgeEmpty}>Birinchi nishon birinchi darsdan keyin</span>
                )}
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  )
}

export default Dashboard
