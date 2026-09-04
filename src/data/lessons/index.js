import { FUNDAMENTALS_LESSONS } from './fundamentals'
import { PROMPT_LESSONS } from './promptEngineering'
import { AI_TOOLS_LESSONS } from './aiTools'
import { AI_CODING_LESSONS } from './aiCoding'
import { AI_WORK_LESSONS } from './aiWork'
import { ADVANCED_LESSONS } from './advancedAI'

export const LESSONS = [
  ...FUNDAMENTALS_LESSONS,
  ...PROMPT_LESSONS,
  ...AI_TOOLS_LESSONS,
  ...AI_CODING_LESSONS,
  ...AI_WORK_LESSONS,
  ...ADVANCED_LESSONS,
]

export const LESSON_BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l]))

export const getLesson = (id) => LESSON_BY_ID[id] || null

/** Kursning darslari, `order` bo‘yicha tartiblangan. */
export const getCourseLessons = (courseId) =>
  LESSONS.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order)

/** Dars ketma-ketligidagi oldingi/keyingi dars (kurs ichida). */
export const getLessonNeighbors = (lessonId) => {
  const lesson = LESSON_BY_ID[lessonId]
  if (!lesson) return { prev: null, next: null }
  const siblings = getCourseLessons(lesson.courseId)
  const i = siblings.findIndex((l) => l.id === lessonId)
  return {
    prev: i > 0 ? siblings[i - 1] : null,
    next: i < siblings.length - 1 ? siblings[i + 1] : null,
  }
}

/** Butun kurs bo‘ylab tekis ketma-ketlik — «keyingi darsni davom ettirish» uchun. */
export const LESSON_SEQUENCE = LESSONS.map((l) => l.id)

export const TOTAL_LESSONS = LESSONS.length
