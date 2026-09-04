/**
 * Gamifikatsiya: XP qoidalari, darajalar va nishonlar (badges).
 * Nishon shartlari `check(stats)` funksiyasi orqali baholanadi —
 * yangi nishon qo‘shish uchun faqat shu massivga qator qo‘shiladi.
 */

export const XP_RULES = {
  lesson: 50,
  quiz: 30,
  quizPerfect: 20, // 100% uchun bonus
  practice: 70,
  promptChallenge: 100,
  dailyChallenge: 80,
  project: 500,
  streakBonus: 10, // har kun uchun (maks 7)
}

export const RANKS = [
  { id: 'beginner', name: 'Beginner', minXp: 0, color: '#94a3b8', icon: 'Sprout' },
  { id: 'explorer', name: 'Explorer', minXp: 300, color: '#0ea5e9', icon: 'Compass' },
  { id: 'prompt-beginner', name: 'Prompt Beginner', minXp: 800, color: '#14b8a6', icon: 'PenLine' },
  { id: 'prompt-engineer', name: 'Prompt Engineer', minXp: 1800, color: '#22c55e', icon: 'Wand2' },
  { id: 'ai-user', name: 'AI User', minXp: 3200, color: '#eab308', icon: 'Bot' },
  { id: 'ai-power-user', name: 'AI Power User', minXp: 5200, color: '#f97316', icon: 'Zap' },
  { id: 'ai-expert', name: 'AI Expert', minXp: 8000, color: '#a855f7', icon: 'Sparkles' },
  { id: 'ai-master', name: 'AI Master', minXp: 12000, color: '#6366f1', icon: 'Crown' },
]

/** XP dan joriy darajani, keyingi darajani va foizni hisoblaydi. */
export function getRank(xp = 0) {
  let current = RANKS[0]
  for (const r of RANKS) if (xp >= r.minXp) current = r
  const idx = RANKS.indexOf(current)
  const next = RANKS[idx + 1] || null
  const span = next ? next.minXp - current.minXp : 1
  const gained = next ? xp - current.minXp : 1
  return {
    current,
    next,
    index: idx,
    progress: next ? Math.min(100, Math.round((gained / span) * 100)) : 100,
    xpToNext: next ? Math.max(0, next.minXp - xp) : 0,
  }
}

export const BADGES = [
  {
    id: 'first-step',
    name: 'First Step',
    emoji: '👣',
    description: 'Birinchi darsni tugatdingiz',
    tier: 'bronze',
    check: (s) => s.completedLessons >= 1,
  },
  {
    id: 'first-prompt',
    name: 'First Prompt',
    emoji: '🏆',
    description: 'Prompt Lab da birinchi promptingizni yaratdingiz',
    tier: 'bronze',
    check: (s) => s.promptsCreated >= 1,
  },
  {
    id: 'prompt-builder',
    name: 'Prompt Builder',
    emoji: '🧱',
    description: '10 ta prompt yaratdingiz yoki saqladingiz',
    tier: 'silver',
    check: (s) => s.promptsCreated + s.savedPrompts >= 10,
  },
  {
    id: 'prompt-engineer',
    name: 'Prompt Engineer',
    emoji: '✍️',
    description: 'Prompt Engineering kursini tugatdingiz',
    tier: 'gold',
    check: (s) => s.completedCourses.includes('prompt-engineering'),
  },
  {
    id: 'sharp-shooter',
    name: 'Sharp Shooter',
    emoji: '🎯',
    description: 'Prompt Practice da 90+ ball oldingiz',
    tier: 'gold',
    check: (s) => s.bestPromptScore >= 90,
  },
  {
    id: 'ai-explorer',
    name: 'AI Explorer',
    emoji: '🧭',
    description: 'AI Fundamentals kursini tugatdingiz',
    tier: 'silver',
    check: (s) => s.completedCourses.includes('fundamentals'),
  },
  {
    id: 'toolsmith',
    name: 'Toolsmith',
    emoji: '🧰',
    description: 'AI Tools kursini tugatdingiz',
    tier: 'silver',
    check: (s) => s.completedCourses.includes('ai-tools'),
  },
  {
    id: 'ai-coder',
    name: 'AI Coder',
    emoji: '💻',
    description: 'AI for Programmers kursini tugatdingiz',
    tier: 'gold',
    check: (s) => s.completedCourses.includes('ai-coding'),
  },
  {
    id: 'business-mind',
    name: 'Business Mind',
    emoji: '💼',
    description: 'AI for Work & Business kursini tugatdingiz',
    tier: 'gold',
    check: (s) => s.completedCourses.includes('ai-work'),
  },
  {
    id: 'research-master',
    name: 'Research Master',
    emoji: '🔬',
    description: 'Advanced AI kursidagi RAG darsini tugatdingiz',
    tier: 'gold',
    check: (s) => s.completedLessonIds.includes('a-06'),
  },
  {
    id: 'automation-master',
    name: 'Automation Master',
    emoji: '⚙️',
    description: 'Agent va avtomatlashtirish darslarini tugatdingiz',
    tier: 'gold',
    check: (s) => s.completedLessonIds.includes('a-09') && s.completedLessonIds.includes('a-12'),
  },
  {
    id: 'quiz-ace',
    name: 'Quiz Ace',
    emoji: '🧠',
    description: 'Bitta testda 100% natija',
    tier: 'gold',
    check: (s) => s.perfectQuizzes >= 1,
  },
  {
    id: 'streak-7',
    name: 'On Fire',
    emoji: '🔥',
    description: '7 kunlik uzluksiz seriya',
    tier: 'silver',
    check: (s) => s.longestStreak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Unstoppable',
    emoji: '🚀',
    description: '30 kunlik uzluksiz seriya',
    tier: 'platinum',
    check: (s) => s.longestStreak >= 30,
  },
  {
    id: 'challenger',
    name: 'Challenger',
    emoji: '⚡',
    description: '5 ta kunlik challenge bajardingiz',
    tier: 'silver',
    check: (s) => s.challengesCompleted >= 5,
  },
  {
    id: 'builder',
    name: 'Builder',
    emoji: '🛠️',
    description: 'Birinchi loyihangizni tugatdingiz',
    tier: 'gold',
    check: (s) => s.projectsCompleted >= 1,
  },
  {
    id: 'half-way',
    name: 'Halfway There',
    emoji: '📈',
    description: 'Darslarning 50% ini tugatdingiz',
    tier: 'silver',
    check: (s) => s.overallProgress >= 50,
  },
  {
    id: 'ai-master',
    name: 'AI Master',
    emoji: '👑',
    description: 'Barcha 6 ta kursni tugatdingiz',
    tier: 'platinum',
    check: (s) => s.completedCourses.length >= 6,
  },
]

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]))

export const TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum']

export const TIER_META = {
  bronze: { label: 'Bronza', color: '#b45309' },
  silver: { label: 'Kumush', color: '#64748b' },
  gold: { label: 'Oltin', color: '#d97706' },
  platinum: { label: 'Platina', color: '#7c3aed' },
}

/** Statistika asosida qo‘lga kiritilgan nishon id larini qaytaradi. */
export function evaluateBadges(stats) {
  return BADGES.filter((b) => {
    try {
      return b.check(stats)
    } catch {
      return false
    }
  }).map((b) => b.id)
}
