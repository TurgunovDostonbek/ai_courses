import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Flame, Languages, Menu, Moon, Search, Sun, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useTheme } from '../../context/ThemeContext'
import { useProgress } from '../../context/ProgressContext'
import { useAuth } from '../../context/AuthContext'
import { cx, formatNumber } from '../../utils/format'
import Icon from '../common/Icon'
import styles from './Topbar.module.css'

/** Ilovaning yuqori paneli: qidiruv, statistika, mavzu va til. */
export function Topbar({ onOpenMenu, onOpenSearch }) {
  const { t, locale, setLocale, locales } = useI18n()
  const { resolvedTheme, toggleTheme } = useTheme()
  const { stats } = useProgress()
  const { user } = useAuth()
  const [langOpen, setLangOpen] = useState(false)

  const initials = (user.name || 'AI').trim().slice(0, 2).toUpperCase()

  return (
    <header className={styles.topbar}>
      <button
        type="button"
        className={cx(styles.iconBtn, styles.menuBtn)}
        onClick={onOpenMenu}
        aria-label={t('nav.menu')}
      >
        <Menu size={19} />
      </button>

      <button type="button" className={styles.searchBtn} onClick={onOpenSearch}>
        <Search size={16} aria-hidden="true" />
        <span className={styles.searchLabel}>{t('common.searchPlaceholder')}</span>
        <kbd className={styles.kbd}>Ctrl K</kbd>
      </button>

      <div className={styles.right}>
        <div className={styles.metrics}>
          <span className={styles.metric} title={t('dash.streak')}>
            <Flame size={15} className={styles.flame} aria-hidden="true" />
            {stats.streak}
          </span>
          <span className={styles.metric} title={t('dash.xp')}>
            <Zap size={15} className={styles.zap} aria-hidden="true" />
            {formatNumber(stats.xp, locale)}
          </span>
        </div>

        <Link to="/daily-challenge" className={styles.iconBtn} aria-label={t('dash.todayChallenge')}>
          <Bell size={17} />
        </Link>

        <div className={styles.langWrap}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setLangOpen((o) => !o)}
            aria-label={t('settings.language')}
            aria-expanded={langOpen}
          >
            <Languages size={17} />
          </button>
          {langOpen && (
            <>
              <div className={styles.langScrim} onClick={() => setLangOpen(false)} aria-hidden="true" />
              <div className={styles.langMenu} role="menu">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={l.code === locale}
                    className={cx(styles.langItem, l.code === locale && styles.langActive)}
                    onClick={() => {
                      setLocale(l.code)
                      setLangOpen(false)
                    }}
                  >
                    <span aria-hidden="true">{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label={t('settings.theme')}
        >
          {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <Link to="/profile" className={styles.avatar} aria-label={t('nav.profile')}>
          {user.name ? initials : <Icon name="UserRound" size={16} />}
        </Link>
      </div>
    </header>
  )
}

export default Topbar
