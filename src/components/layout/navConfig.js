/**
 * Navigatsiya konfiguratsiyasi — sidebar, mobil drawer va bottom nav
 * shu bitta manbadan quriladi.
 */

export const NAV_GROUPS = [
  {
    id: 'learn',
    labelKey: 'nav.learn',
    items: [
      { to: '/dashboard', labelKey: 'nav.dashboard', icon: 'LayoutDashboard', end: true },
      { to: '/courses', labelKey: 'nav.courses', icon: 'GraduationCap' },
      { to: '/projects', labelKey: 'nav.projects', icon: 'Hammer' },
    ],
  },
  {
    id: 'practice',
    labelKey: 'nav.practice',
    items: [
      { to: '/prompt-lab', labelKey: 'nav.promptLab', icon: 'FlaskConical' },
      { to: '/prompt-practice', labelKey: 'nav.promptPractice', icon: 'Target' },
      { to: '/prompt-library', labelKey: 'nav.promptLibrary', icon: 'Library' },
      { to: '/ai-tools', labelKey: 'nav.aiTools', icon: 'Wrench' },
      { to: '/challenges', labelKey: 'nav.challenges', icon: 'Flame' },
    ],
  },
  {
    id: 'progress',
    labelKey: 'nav.progress',
    items: [
      { to: '/analytics', labelKey: 'nav.analytics', icon: 'TrendingUp' },
      { to: '/badges', labelKey: 'nav.badges', icon: 'Award' },
      { to: '/certificate', labelKey: 'nav.certificate', icon: 'ScrollText' },
    ],
  },
]

export const FOOTER_NAV = [
  { to: '/profile', labelKey: 'nav.profile', icon: 'UserRound' },
  { to: '/settings', labelKey: 'nav.settings', icon: 'Settings' },
]

/** Mobil pastki navigatsiya — eng ko'p ishlatiladigan 5 ta bo'lim. */
export const BOTTOM_NAV = [
  { to: '/dashboard', labelKey: 'nav.dashboard', icon: 'LayoutDashboard', end: true },
  { to: '/courses', labelKey: 'nav.courses', icon: 'GraduationCap' },
  { to: '/prompt-lab', labelKey: 'nav.promptLab', icon: 'FlaskConical' },
  { to: '/ai-tools', labelKey: 'nav.aiTools', icon: 'Wrench' },
  { to: '/profile', labelKey: 'nav.profile', icon: 'UserRound' },
]

export const ALL_NAV_ITEMS = [...NAV_GROUPS.flatMap((g) => g.items), ...FOOTER_NAV]
