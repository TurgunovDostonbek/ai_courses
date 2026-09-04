import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Flame } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { CHALLENGES } from '../../data/challenges'
import { FilterChip, ProgressBar, SectionHeading } from '../../components/common'
import { ChallengeCard, ChallengeDetail } from '../../components/challenge'
import styles from './Challenges.module.css'

const DIFFICULTIES = ['all', 'beginner', 'intermediate', 'advanced']

export function Challenges() {
  const { t } = useI18n()
  const toast = useToast()
  const { completeChallenge, getChallengeRecord, progress } = useProgress()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialId = searchParams.get('id')
  const [activeId, setActiveId] = useState(initialId || CHALLENGES[0].id)
  const [difficulty, setDifficulty] = useState('all')

  const visible = useMemo(
    () => (difficulty === 'all' ? CHALLENGES : CHALLENGES.filter((c) => c.difficulty === difficulty)),
    [difficulty]
  )

  const active = CHALLENGES.find((c) => c.id === activeId) || CHALLENGES[0]
  const done = Object.keys(progress.challenges).length

  const select = (challenge) => {
    setActiveId(challenge.id)
    setSearchParams({ id: challenge.id }, { replace: true })
  }

  const submit = (answer) => {
    const { xp } = completeChallenge(active.id, answer, active.title)
    toast.success(xp > 0 ? '+' + xp + ' XP · ' + active.title : t('common.saved'))
  }

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.practice')}
        title={t('challenge.title')}
        description="Har bir challenge — bilimni real vazifada sinash uchun."
        level={1}
      />

      <div className={styles.summary}>
        <span className={styles.summaryText}>
          <Flame size={16} aria-hidden="true" />
          {done}/{CHALLENGES.length} bajarildi
        </span>
        <ProgressBar value={Math.round((done / CHALLENGES.length) * 100)} size="xs" className={styles.summaryBar} />
      </div>

      <div className={styles.filters}>
        {DIFFICULTIES.map((d) => (
          <FilterChip
            key={d}
            active={difficulty === d}
            count={d === 'all' ? CHALLENGES.length : CHALLENGES.filter((c) => c.difficulty === d).length}
            onClick={() => setDifficulty(d)}
          >
            {t(d === 'all' ? 'common.all' : 'common.' + d)}
          </FilterChip>
        ))}
      </div>

      <div className={styles.layout}>
        <div className={styles.list}>
          {visible.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              completed={Boolean(getChallengeRecord(challenge.id))}
              active={challenge.id === activeId}
              onSelect={select}
            />
          ))}
        </div>

        <ChallengeDetail
          key={active.id}
          challenge={active}
          record={getChallengeRecord(active.id)}
          onSubmit={submit}
          className={styles.detail}
        />
      </div>
    </div>
  )
}

export default Challenges
