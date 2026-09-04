import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Award, BarChart3, Clock, Flame, Table2, TrendingUp, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { COURSES } from '../../data/courses'
import { QUIZZES } from '../../data/quizzes'
import { formatMinutes, formatNumber, toISODate } from '../../utils/format'
import { Card, EmptyState, SectionHeading, Segmented, StatTile } from '../../components/common'
import styles from './Analytics.module.css'

const DAYS = 14

/** Oxirgi N kunning sana qatorini quradi. */
function buildDays(count) {
  const out = []
  const today = new Date()
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    out.push({ iso: toISODate(d), label: d.getDate() + '.' + (d.getMonth() + 1) })
  }
  return out
}

/** Tokenlar bilan bo'yalgan tooltip — mavzu bilan birga o'zgaradi. */
function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipLabel}>{label}</span>
      <span className={styles.tooltipValue}>
        {payload[0].value}
        {unit ? ' ' + unit : ''}
      </span>
    </div>
  )
}

const axisProps = {
  stroke: 'var(--text-muted)',
  tickLine: false,
  axisLine: false,
  tick: { fontSize: 11, fill: 'var(--text-muted)' },
}

export function Analytics() {
  const { t, locale } = useI18n()
  const { progress, stats, courseProgress } = useProgress()
  const [view, setView] = useState('chart')

  const days = useMemo(() => buildDays(DAYS), [])

  const xpSeries = useMemo(
    () => days.map((d) => ({ ...d, xp: progress.xpByDate[d.iso] || 0 })),
    [days, progress.xpByDate]
  )

  const minuteSeries = useMemo(
    () => days.map((d) => ({ ...d, min: progress.minutesByDate[d.iso] || 0 })),
    [days, progress.minutesByDate]
  )

  const courseSeries = useMemo(
    () =>
      COURSES.map((c) => ({
        name: c.title,
        short: 'L' + c.level,
        percent: courseProgress[c.id]?.percent || 0,
      })),
    [courseProgress]
  )

  const quizSeries = useMemo(
    () =>
      QUIZZES.filter((q) => progress.quizzes[q.id]).map((q) => ({
        name: q.title.split('—')[0].trim(),
        score: progress.quizzes[q.id].score,
      })),
    [progress.quizzes]
  )

  const hasData = stats.xp > 0 || stats.completedLessons > 0

  if (!hasData) {
    return (
      <div className="page">
        <SectionHeading
          eyebrow={t('nav.progress')}
          title={t('analytics.title')}
          description={t('analytics.subtitle')}
          level={1}
        />
        <EmptyState
          icon={BarChart3}
          title={t('analytics.noData')}
          description="Birinchi darsni tugating — statistika shu yerda to‘planadi."
        />
      </div>
    )
  }

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.progress')}
        title={t('analytics.title')}
        description={t('analytics.subtitle')}
        level={1}
      />

      <div className={styles.stats}>
        <StatTile icon={Zap} label={t('dash.xp')} value={formatNumber(stats.xp, locale)} sub={stats.rank.current.name} />
        <StatTile
          icon={Clock}
          label={t('analytics.studyTime')}
          value={formatMinutes(stats.studyMinutes, locale)}
          tone="info"
        />
        <StatTile
          icon={Award}
          label={t('analytics.quizAverage')}
          value={stats.quizzesTaken ? stats.quizAverage + '%' : '—'}
          sub={stats.quizzesTaken + ' ta test'}
          tone="success"
        />
        <StatTile icon={Flame} label={t('dash.streak')} value={stats.streak} sub={'Rekord: ' + stats.longestStreak} tone="warn" />
      </div>

      <div className={styles.grid}>
        {/* ---- Kunlik XP ---- */}
        <Card className={styles.chartCard}>
          <div className={styles.chartHead}>
            <h2 className={styles.chartTitle}>
              <TrendingUp size={16} aria-hidden="true" />
              {t('analytics.weeklyXp')}
            </h2>
            <Segmented
              size="sm"
              value={view}
              onChange={setView}
              label="Ko‘rinish"
              options={[
                { value: 'chart', label: 'Grafik', icon: BarChart3 },
                { value: 'table', label: 'Jadval', icon: Table2 },
              ]}
            />
          </div>

          {view === 'chart' ? (
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={xpSeries} margin={{ top: 8, right: 4, bottom: 0, left: -18 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="label" {...axisProps} />
                <YAxis {...axisProps} width={38} />
                <Tooltip cursor={{ fill: 'var(--bg-hover)' }} content={<ChartTooltip unit="XP" />} />
                <Bar dataKey="xp" fill="var(--brand)" radius={[4, 4, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sana</th>
                    <th>XP</th>
                    <th>{t('analytics.studyTime')}</th>
                  </tr>
                </thead>
                <tbody>
                  {xpSeries.map((row, i) => (
                    <tr key={row.iso}>
                      <td>{row.iso}</td>
                      <td>{row.xp}</td>
                      <td>{minuteSeries[i].min}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* ---- O'quv vaqti ---- */}
        <Card className={styles.chartCard}>
          <h2 className={styles.chartTitle}>
            <Clock size={16} aria-hidden="true" />
            {t('analytics.studyTime')}
          </h2>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={minuteSeries} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
              <defs>
                <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--info)" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="var(--info)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} width={38} />
              <Tooltip cursor={{ stroke: 'var(--border-strong)' }} content={<ChartTooltip unit="daq" />} />
              <Area
                type="monotone"
                dataKey="min"
                stroke="var(--info)"
                strokeWidth={2}
                fill="url(#minGradient)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--bg-surface)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* ---- Kurslar ---- */}
        <Card className={styles.chartCard}>
          <h2 className={styles.chartTitle}>
            <BarChart3 size={16} aria-hidden="true" />
            {t('analytics.byCourse')}
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={courseSeries}
              layout="vertical"
              margin={{ top: 4, right: 16, bottom: 0, left: 4 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--border-subtle)" />
              <XAxis type="number" domain={[0, 100]} {...axisProps} />
              <YAxis type="category" dataKey="short" width={34} {...axisProps} />
              <Tooltip cursor={{ fill: 'var(--bg-hover)' }} content={<ChartTooltip unit="%" />} />
              <Bar dataKey="percent" fill="var(--brand)" radius={[0, 4, 4, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
          {/* Ustunlar bitta o'lchovni ko'rsatadi — rang emas, yozuv identifikatsiya qiladi */}
          <ul className={styles.legend}>
            {courseSeries.map((row) => (
              <li key={row.name}>
                <span className={styles.legendKey}>{row.short}</span>
                {row.name}
                <strong>{row.percent}%</strong>
              </li>
            ))}
          </ul>
        </Card>

        {/* ---- Testlar ---- */}
        <Card className={styles.chartCard}>
          <h2 className={styles.chartTitle}>
            <Award size={16} aria-hidden="true" />
            {t('analytics.quizAverage')}
          </h2>
          {quizSeries.length === 0 ? (
            <EmptyState compact icon={Award} title={t('analytics.noData')} />
          ) : (
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={quizSeries} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
                <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
                <XAxis dataKey="name" {...axisProps} interval={0} height={44} angle={-18} textAnchor="end" />
                <YAxis domain={[0, 100]} {...axisProps} width={38} />
                <Tooltip cursor={{ fill: 'var(--bg-hover)' }} content={<ChartTooltip unit="%" />} />
                <Bar dataKey="score" fill="var(--success)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Analytics
