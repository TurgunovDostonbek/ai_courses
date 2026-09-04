import { NavLink } from 'react-router-dom'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import Icon from '../common/Icon'
import { BOTTOM_NAV } from './navConfig'
import styles from './BottomNav.module.css'

/** Mobil qurilmalar uchun pastki navigatsiya. */
export function BottomNav() {
  const { t } = useI18n()
  return (
    <nav className={styles.nav} aria-label={t('nav.menu')}>
      {BOTTOM_NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => cx(styles.item, isActive && styles.active)}
        >
          <Icon name={item.icon} size={19} />
          <span className={styles.label}>{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
