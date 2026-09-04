import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { useHotkey } from '../../hooks/useHotkey'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { STORAGE_KEYS } from '../../utils/storage'
import { cx } from '../../utils/format'
import { BADGE_BY_ID } from '../../data/gamification'
import { PageLoader } from '../common/States'
import BottomNav from './BottomNav'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import styles from './AppLayout.module.css'

// Qidiruv indeksi katta — palitra faqat birinchi ochilishda yuklanadi
const CommandPalette = lazy(() => import('./CommandPalette'))

/** Ilova qobig'i: yon panel + yuqori panel + sahifa maydoni. */
export function AppLayout() {
  const { t } = useI18n()
  const { onBadgeEarned } = useProgress()
  const toast = useToast()
  const location = useLocation()
  const isDesktop = useMediaQuery('(min-width: 1100px)')

  const [collapsed, setCollapsed] = useLocalStorage(STORAGE_KEYS.sidebar, false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  const toggleSearch = useCallback((e) => {
    e.preventDefault()
    setSearchOpen((o) => !o)
  }, [])

  useHotkey('k', toggleSearch, { ctrl: true })

  // Marshrut o'zgarganda sahifa tepasiga qaytadi
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  // Yangi nishon qo'lga kiritilganda bildirishnoma
  useEffect(
    () =>
      onBadgeEarned((ids) => {
        for (const id of ids) {
          const badge = BADGE_BY_ID[id]
          if (badge) {
            toast.success(`${badge.emoji} ${badge.name} — ${badge.description}`, {
              title: t('badges.earned'),
              duration: 5200,
            })
          }
        }
      }),
    [onBadgeEarned, toast, t]
  )

  return (
    <div className={cx(styles.shell, isDesktop && collapsed && styles.shellCollapsed)}>
      <a className="skip-link" href="#main">
        {t('common.continue')}
      </a>

      <Sidebar
        collapsed={isDesktop && collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
      />

      <div className={styles.body}>
        <Topbar onOpenMenu={() => setMobileOpen(true)} onOpenSearch={openSearch} />
        <main className={styles.main} id="main">
          <Suspense fallback={<PageLoader label={t('common.loading')} />}>
            <Outlet />
          </Suspense>
        </main>
        <BottomNav />
      </div>

      {searchOpen && (
        <Suspense fallback={null}>
          <CommandPalette open onClose={closeSearch} />
        </Suspense>
      )}
    </div>
  )
}

export default AppLayout
