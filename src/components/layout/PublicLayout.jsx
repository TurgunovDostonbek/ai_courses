import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Languages, Moon, Sun } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '../common'
import { PageLoader } from '../common/States'
import Logo from './Logo'
import styles from './PublicLayout.module.css'

/** Marketing (landing) qobig'i — yon panelsiz. */
export function PublicLayout() {
  const { t, locale, setLocale, locales } = useI18n()
  const { resolvedTheme, toggleTheme } = useTheme()

  const nextLocale = () => {
    const i = locales.findIndex((l) => l.code === locale)
    setLocale(locales[(i + 1) % locales.length].code)
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Logo />
        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} onClick={nextLocale} aria-label={t('settings.language')}>
            <Languages size={17} />
            <span className={styles.localeCode}>{locale.toUpperCase()}</span>
          </button>
          <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label={t('settings.theme')}>
            {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Button to="/dashboard" size="sm">
            {t('common.start')}
          </Button>
        </div>
      </header>

      <main id="main">
        <Suspense fallback={<PageLoader label={t('common.loading')} />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} AI Mastery</span>
        <span className={styles.footNote}>{t('auth.demoNote')}</span>
      </footer>
    </div>
  )
}

export default PublicLayout
