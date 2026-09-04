/**
 * Ma'lumot qatlamining yagona kirish nuqtasi.
 * Komponentlar `@/data` (yoki nisbiy yo'l) orqali shu yerdan import qiladi —
 * keyinchalik backend ulanganda faqat shu qatlam o'zgaradi.
 */

export * from './courses'
export * from './lessons'
export * from './quizzes'
export * from './tools'
export * from './prompts'
export * from './gamification'
export * from './challenges'
export * from './projects'

import { COURSES } from './courses'
import { LESSONS, getCourseLessons } from './lessons'
import { TOOLS } from './tools'
import { PROMPTS } from './prompts'
import { CHALLENGES } from './challenges'
import { PROJECTS } from './projects'

/** Kurs bo'yicha umumiy statistika (dars soni, davomiylik, XP). */
export function getCourseStats(courseId) {
  const lessons = getCourseLessons(courseId)
  return {
    lessonCount: lessons.length,
    totalMinutes: lessons.reduce((sum, l) => sum + (l.duration || 0), 0),
    totalXp: lessons.reduce((sum, l) => sum + (l.xp || 0), 0),
  }
}

export const PLATFORM_STATS = {
  courses: COURSES.length,
  lessons: LESSONS.length,
  tools: TOOLS.length,
  prompts: PROMPTS.length,
  challenges: CHALLENGES.length,
  projects: PROJECTS.length,
  totalMinutes: LESSONS.reduce((s, l) => s + (l.duration || 0), 0),
}

/**
 * Global qidiruv indeksi — barcha kontent turlari bitta ro'yxatda.
 * Command palette (Ctrl+K) va qidiruv sahifasi shundan foydalanadi.
 */
export const SEARCH_INDEX = [
  ...COURSES.map((c) => ({
    id: `course:${c.id}`,
    type: 'course',
    title: c.title,
    subtitle: c.tagline,
    keywords: [c.title, c.tagline, ...(c.tags || [])].join(' ').toLowerCase(),
    to: `/courses/${c.id}`,
  })),
  ...LESSONS.map((l) => ({
    id: `lesson:${l.id}`,
    type: 'lesson',
    title: l.title,
    subtitle: l.summary,
    keywords: [l.title, l.summary, ...(l.keyTakeaways || [])].join(' ').toLowerCase(),
    to: `/lessons/${l.id}`,
  })),
  ...TOOLS.map((t) => ({
    id: `tool:${t.id}`,
    type: 'tool',
    title: t.name,
    subtitle: t.subtitle,
    keywords: [t.name, t.subtitle, t.vendor, ...(t.bestFor || [])].join(' ').toLowerCase(),
    to: `/ai-tools/${t.id}`,
  })),
  ...PROMPTS.map((p) => ({
    id: `prompt:${p.id}`,
    type: 'prompt',
    title: p.title,
    subtitle: p.description,
    keywords: [p.title, p.description, ...(p.tags || [])].join(' ').toLowerCase(),
    to: `/prompt-library?q=${encodeURIComponent(p.title)}`,
  })),
  ...CHALLENGES.map((c) => ({
    id: `challenge:${c.id}`,
    type: 'challenge',
    title: c.title,
    subtitle: c.task,
    keywords: [c.title, c.task, c.category].join(' ').toLowerCase(),
    to: `/challenges?id=${c.id}`,
  })),
  ...PROJECTS.map((p) => ({
    id: `project:${p.id}`,
    type: 'project',
    title: p.title,
    subtitle: p.tagline,
    keywords: [p.title, p.tagline, ...(p.skills || [])].join(' ').toLowerCase(),
    to: `/projects?id=${p.id}`,
  })),
]
