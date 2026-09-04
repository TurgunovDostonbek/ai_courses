import { useState } from 'react'
import { Lock } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { BADGES, TIER_META, TIER_ORDER } from '../../data/gamification'
import { cx } from '../../utils/format'
import { FilterChip, ProgressBar, SectionHeading } from '../../components/common'
import styles from './Badges.module.css'

export function Badges() {
  const { t } = useI18n()
  const { stats } = useProgress()
  const [tier, setTier] = useState('all')

  const earned = new Set(stats.badges)
  const visible = tier === 'all' ? BADGES : BADGES.filter((b) => b.tier === tier)

  return (
    <div className="page">
      <SectionHeading
        eyebrow={t('nav.progress')}
        title={t('badges.title')}
        description={t('badges.subtitle')}
        level={1}
      />

      <div className={styles.summary}>
        <div className={styles.summaryText}>
          <strong>{earned.size}</strong> / {BADGES.length} {t('badges.earned').toLowerCase()}
        </div>
        <ProgressBar value={Math.round((earned.size / BADGES.length) * 100)} size="md" showValue />
      </div>

      <div className={styles.filters}>
        <FilterChip active={tier === 'all'} count={BADGES.length} onClick={() => setTier('all')}>
          {t('common.all')}
        </FilterChip>
        {TIER_ORDER.map((id) => (
          <FilterChip
            key={id}
            active={tier === id}
            count={BADGES.filter((b) => b.tier === id).length}
            onClick={() => setTier(id)}
          >
            {TIER_META[id].label}
          </FilterChip>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((badge) => {
          const has = earned.has(badge.id)
          return (
            <article
              key={badge.id}
              className={cx(styles.badge, has ? styles.earned : styles.locked)}
              style={{ '--tier-color': TIER_META[badge.tier].color }}
            >
              <span className={styles.emoji} aria-hidden="true">
                {has ? badge.emoji : <Lock size={20} />}
              </span>
              <h3 className={styles.name}>{badge.name}</h3>
              <p className={styles.description}>{badge.description}</p>
              <span className={styles.tier}>{TIER_META[badge.tier].label}</span>
              {!has && <span className={styles.lockedTag}>{t('badges.locked')}</span>}
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Badges
