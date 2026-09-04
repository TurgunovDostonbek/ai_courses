import { NavLink } from 'react-router-dom'
import { ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import { ProgressBar } from '../common/ProgressBar'
import Logo from './Logo'
import { FOOTER_NAV, NAV_GROUPS } from './navConfig'
import styles from './Sidebar.module.css'

function NavItem({ item, collapsed, onNavigate }) {
  const { t } = useI18n()
  const label = t(item.labelKey)
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) => cx(styles.item, isActive && styles.itemActive)}
      title={collapsed ? label : undefined}
    >
      <span className={styles.itemIcon}>
        <Icon name={item.icon} size={17} />
      </span>
      {!collapsed && <span className={styles.itemLabel}>{label}</span>}
    </NavLink>
  )
}

/**
 * Yon panel. Desktopda doimiy (yig'ilishi mumkin),
 * mobil/planshetda drawer sifatida ochiladi.
 */
export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const { t } = useI18n()
  const { stats } = useProgress()
  const rank = stats.rank

  return (
    <>
      {mobileOpen && <div className={styles.scrim} onClick={onCloseMobile} aria-hidden="true" />}

      <aside
        className={cx(styles.sidebar, collapsed && styles.collapsed, mobileOpen && styles.mobileOpen)}
        aria-label={t('nav.menu')}
      >
        <div className={styles.head}>
          <Logo compact={collapsed} />
          <button
            type="button"
            className={cx(styles.iconBtn, styles.mobileClose)}
            onClick={onCloseMobile}
            aria-label={t('common.close')}
          >
            <X size={18} />
          </button>
        </div>

        <nav className={styles.nav}>
          {NAV_GROUPS.map((group) => (
            <div key={group.id} className={styles.group}>
              {!collapsed && <p className={styles.groupLabel}>{t(group.labelKey)}</p>}
              <div className={styles.groupItems}>
                {group.items.map((item) => (
                  <NavItem key={item.to} item={item} collapsed={collapsed} onNavigate={onCloseMobile} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.foot}>
          {!collapsed && (
            <div className={styles.rankCard}>
              <div className={styles.rankTop}>
                <span className={styles.rankIcon} style={{ background: rank.current.color }}>
                  <Icon name={rank.current.icon} size={14} />
                </span>
                <div className={styles.rankText}>
                  <span className={styles.rankName}>{rank.current.name}</span>
                  <span className={styles.rankXp}>{stats.xp.toLocaleString()} XP</span>
                </div>
              </div>
              <ProgressBar value={rank.progress} size="xs" />
              {rank.next && (
                <span className={styles.rankNext}>
                  {t('dash.nextRank')}: {rank.xpToNext.toLocaleString()} XP
                </span>
              )}
            </div>
          )}

          <div className={styles.footNav}>
            {FOOTER_NAV.map((item) => (
              <NavItem key={item.to} item={item} collapsed={collapsed} onNavigate={onCloseMobile} />
            ))}
          </div>

          <button
            type="button"
            className={cx(styles.iconBtn, styles.collapseBtn)}
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Panelni ochish' : 'Panelni yig‘ish'}
          >
            {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            {!collapsed && <span>Yig‘ish</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
