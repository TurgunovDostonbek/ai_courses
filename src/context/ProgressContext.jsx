import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import { daysBetween, makeId, percent, toISODate } from '../utils/format'
import { COURSES } from '../data/courses'
import { LESSONS, TOTAL_LESSONS, getCourseLessons, getLesson } from '../data/lessons'
import { QUIZZES } from '../data/quizzes'
import { XP_RULES, evaluateBadges, getRank } from '../data/gamification'

/**
 * Progress — platformaning yagona haqiqat manbai.
 * Barcha o'zgarishlar localStorage ga yoziladi.
 *
 * Shakl:
 * {
 *   xp, streak, longestStreak, lastActiveDate, activeDates: [],
 *   lessons: { [lessonId]: { completedAt, practiceAnswer } },
 *   quizzes: { [quizId]: { score, correct, total, takenAt, attempts } },
 *   practiceScores: [{ taskId, score, at }],
 *   challenges: { [challengeId]: { answer, completedAt } },
 *   projects: { [projectId]: { checked: [], completedAt } },
 *   badges: [], activity: [{ type, ref, label, xp, at }],
 *   xpByDate: { 'YYYY-MM-DD': number },
 *   minutesByDate: { 'YYYY-MM-DD': number },
 *   promptsCreated: number,
 *   certificate: { id, name, score, issuedAt } | null
 * }
 */

const ProgressContext = createContext(null)

const EMPTY_PROGRESS = {
  version: 1,
  xp: 0,
  streak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  activeDates: [],
  lessons: {},
  quizzes: {},
  practiceScores: [],
  challenges: {},
  projects: {},
  badges: [],
  activity: [],
  xpByDate: {},
  minutesByDate: {},
  promptsCreated: 0,
  certificate: null,
}

const MAX_ACTIVITY = 40

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.progress, EMPTY_PROGRESS)
  const [savedPrompts, setSavedPrompts] = useLocalStorage(STORAGE_KEYS.savedPrompts, [])
  const badgeListeners = useRef([])

  const state = useMemo(() => ({ ...EMPTY_PROGRESS, ...(progress || {}) }), [progress])

  /* ---------------------------------------------------------------- */
  /* Ichki yordamchilar                                                */
  /* ---------------------------------------------------------------- */

  /** Streak ni bugungi sana bo'yicha yangilaydi. */
  const touchStreak = useCallback((draft) => {
    const today = toISODate()
    if (draft.lastActiveDate === today) return draft

    const gap = draft.lastActiveDate ? daysBetween(draft.lastActiveDate, today) : null
    let streak = 1
    if (gap === 1) streak = (draft.streak || 0) + 1
    else if (gap === 0) streak = draft.streak || 1

    return {
      ...draft,
      streak,
      longestStreak: Math.max(draft.longestStreak || 0, streak),
      lastActiveDate: today,
      activeDates: draft.activeDates.includes(today)
        ? draft.activeDates
        : [...draft.activeDates, today].slice(-400),
    }
  }, [])

  /** XP qo'shadi, sanaga yozadi va faoliyat tarixini yangilaydi. */
  const award = useCallback(
    (draft, { xp = 0, type, ref, label, minutes = 0 }) => {
      const today = toISODate()
      const next = touchStreak({
        ...draft,
        xp: (draft.xp || 0) + xp,
        xpByDate: { ...draft.xpByDate, [today]: (draft.xpByDate?.[today] || 0) + xp },
        minutesByDate: minutes
          ? { ...draft.minutesByDate, [today]: (draft.minutesByDate?.[today] || 0) + minutes }
          : draft.minutesByDate,
      })
      if (type) {
        next.activity = [
          { id: makeId('act'), type, ref, label, xp, at: new Date().toISOString() },
          ...(draft.activity || []),
        ].slice(0, MAX_ACTIVITY)
      }
      return next
    },
    [touchStreak]
  )

  /* ---------------------------------------------------------------- */
  /* Hisoblangan statistika                                            */
  /* ---------------------------------------------------------------- */

  const completedLessonIds = useMemo(() => Object.keys(state.lessons), [state.lessons])

  const courseProgress = useMemo(() => {
    const map = {}
    for (const course of COURSES) {
      const lessons = getCourseLessons(course.id)
      const done = lessons.filter((l) => state.lessons[l.id]).length
      const quiz = QUIZZES.find((q) => q.courseId === course.id)
      const quizResult = quiz ? state.quizzes[quiz.id] : null
      map[course.id] = {
        total: lessons.length,
        completed: done,
        percent: percent(done, lessons.length),
        quizId: quiz?.id || null,
        quizScore: quizResult?.score ?? null,
        quizPassed: quizResult ? quizResult.score >= (quiz?.passScore ?? 70) : false,
        isComplete: done === lessons.length && lessons.length > 0,
      }
    }
    return map
  }, [state.lessons, state.quizzes])

  const completedCourses = useMemo(
    () => COURSES.filter((c) => courseProgress[c.id]?.isComplete).map((c) => c.id),
    [courseProgress]
  )

  const quizScores = useMemo(() => Object.values(state.quizzes).map((q) => q.score), [state.quizzes])

  const stats = useMemo(() => {
    const completedLessons = completedLessonIds.length
    const quizAverage = quizScores.length
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0
    const promptScores = state.practiceScores.map((p) => p.score)
    const bestPromptScore = promptScores.length ? Math.max(...promptScores) : 0
    const avgPromptScore = promptScores.length
      ? Math.round(promptScores.reduce((a, b) => a + b, 0) / promptScores.length)
      : 0
    const studyMinutes = Object.values(state.minutesByDate).reduce((a, b) => a + b, 0)

    return {
      xp: state.xp,
      streak: state.streak,
      longestStreak: state.longestStreak,
      completedLessons,
      totalLessons: TOTAL_LESSONS,
      overallProgress: percent(completedLessons, TOTAL_LESSONS),
      quizAverage,
      quizzesTaken: quizScores.length,
      perfectQuizzes: quizScores.filter((s) => s === 100).length,
      bestPromptScore,
      avgPromptScore,
      completedCourses,
      completedLessonIds,
      challengesCompleted: Object.keys(state.challenges).length,
      projectsCompleted: Object.values(state.projects).filter((p) => p.completedAt).length,
      badges: state.badges,
      studyMinutes,
      promptsCreated: state.promptsCreated,
      savedPrompts: savedPrompts.length,
      rank: getRank(state.xp),
    }
  }, [state, completedLessonIds, quizScores, completedCourses, savedPrompts.length])

  /* ---------------------------------------------------------------- */
  /* Nishonlarni avtomatik baholash                                    */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const earned = evaluateBadges(stats)
    const fresh = earned.filter((id) => !state.badges.includes(id))
    if (fresh.length === 0) return
    setProgress((prev) => ({ ...EMPTY_PROGRESS, ...prev, badges: [...new Set([...(prev.badges || []), ...earned])] }))
    badgeListeners.current.forEach((fn) => fn(fresh))
    // stats o'zgarganda tekshiramiz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats.completedLessons, stats.quizzesTaken, stats.bestPromptScore, stats.streak, stats.challengesCompleted, stats.projectsCompleted, stats.promptsCreated, stats.savedPrompts])

  const onBadgeEarned = useCallback((fn) => {
    badgeListeners.current.push(fn)
    return () => {
      badgeListeners.current = badgeListeners.current.filter((f) => f !== fn)
    }
  }, [])

  /* ---------------------------------------------------------------- */
  /* Amallar                                                           */
  /* ---------------------------------------------------------------- */

  const completeLesson = useCallback(
    (lessonId, { practiceAnswer } = {}) => {
      const lesson = getLesson(lessonId)
      if (!lesson) return { xp: 0, alreadyDone: true }
      let gained = 0

      setProgress((prev) => {
        const draft = { ...EMPTY_PROGRESS, ...prev }
        const already = Boolean(draft.lessons[lessonId])
        const xp = already ? 0 : lesson.xp || XP_RULES.lesson
        const practiceXp = !already && practiceAnswer?.trim() ? XP_RULES.practice : 0
        gained = xp + practiceXp

        const next = award(draft, {
          xp: gained,
          type: already ? null : 'lesson',
          ref: lessonId,
          label: lesson.title,
          minutes: already ? 0 : lesson.duration || 0,
        })

        next.lessons = {
          ...draft.lessons,
          [lessonId]: {
            completedAt: draft.lessons[lessonId]?.completedAt || new Date().toISOString(),
            practiceAnswer: practiceAnswer ?? draft.lessons[lessonId]?.practiceAnswer ?? '',
          },
        }
        return next
      })

      return { xp: gained }
    },
    [award, setProgress]
  )

  const savePracticeAnswer = useCallback(
    (lessonId, answer) => {
      setProgress((prev) => {
        const draft = { ...EMPTY_PROGRESS, ...prev }
        const existing = draft.lessons[lessonId]
        if (!existing) return draft
        return {
          ...draft,
          lessons: { ...draft.lessons, [lessonId]: { ...existing, practiceAnswer: answer } },
        }
      })
    },
    [setProgress]
  )

  const submitQuiz = useCallback(
    (quizId, { score, correct, total }) => {
      const quiz = QUIZZES.find((q) => q.id === quizId)
      let gained = 0

      setProgress((prev) => {
        const draft = { ...EMPTY_PROGRESS, ...prev }
        const previous = draft.quizzes[quizId]
        const isBetter = !previous || score > previous.score
        const baseXp = previous ? 0 : quiz?.xp || XP_RULES.quiz
        const perfectXp = score === 100 && (!previous || previous.score < 100) ? XP_RULES.quizPerfect : 0
        gained = baseXp + perfectXp

        const next = award(draft, {
          xp: gained,
          type: 'quiz',
          ref: quizId,
          label: quiz?.title || 'Test',
          minutes: 5,
        })

        next.quizzes = {
          ...draft.quizzes,
          [quizId]: {
            score: isBetter ? score : previous.score,
            lastScore: score,
            correct,
            total,
            takenAt: new Date().toISOString(),
            attempts: (previous?.attempts || 0) + 1,
          },
        }
        return next
      })

      return { xp: gained }
    },
    [award, setProgress]
  )

  const recordPracticeScore = useCallback(
    (taskId, score) => {
      let gained = 0
      setProgress((prev) => {
        const draft = { ...EMPTY_PROGRESS, ...prev }
        const already = draft.practiceScores.some((p) => p.taskId === taskId)
        gained = already ? Math.round(XP_RULES.promptChallenge / 4) : XP_RULES.promptChallenge

        const next = award(draft, {
          xp: gained,
          type: 'practice',
          ref: taskId,
          label: `Prompt Practice — ${score}/100`,
          minutes: 6,
        })
        next.practiceScores = [
          ...draft.practiceScores.filter((p) => p.taskId !== taskId),
          { taskId, score, at: new Date().toISOString() },
        ]
        return next
      })
      return { xp: gained }
    },
    [award, setProgress]
  )

  const completeChallenge = useCallback(
    (challengeId, answer, label) => {
      let gained = 0
      setProgress((prev) => {
        const draft = { ...EMPTY_PROGRESS, ...prev }
        const already = Boolean(draft.challenges[challengeId])
        gained = already ? 0 : XP_RULES.dailyChallenge

        const next = award(draft, {
          xp: gained,
          type: already ? null : 'challenge',
          ref: challengeId,
          label: label || 'Challenge',
          minutes: already ? 0 : 15,
        })
        next.challenges = {
          ...draft.challenges,
          [challengeId]: {
            answer,
            completedAt: draft.challenges[challengeId]?.completedAt || new Date().toISOString(),
          },
        }
        return next
      })
      return { xp: gained }
    },
    [award, setProgress]
  )

  const toggleProjectStep = useCallback(
    (projectId, index, totalSteps) => {
      setProgress((prev) => {
        const draft = { ...EMPTY_PROGRESS, ...prev }
        const current = draft.projects[projectId] || { checked: [], completedAt: null }
        const checked = current.checked.includes(index)
          ? current.checked.filter((i) => i !== index)
          : [...current.checked, index]
        const justCompleted = checked.length === totalSteps && !current.completedAt

        let next = { ...draft }
        if (justCompleted) {
          next = award(draft, {
            xp: XP_RULES.project,
            type: 'project',
            ref: projectId,
            label: 'Loyiha tugatildi',
            minutes: 60,
          })
        }
        next.projects = {
          ...draft.projects,
          [projectId]: {
            checked,
            completedAt: justCompleted ? new Date().toISOString() : current.completedAt,
          },
        }
        return next
      })
    },
    [award, setProgress]
  )

  const incrementPromptsCreated = useCallback(() => {
    setProgress((prev) => ({
      ...EMPTY_PROGRESS,
      ...prev,
      promptsCreated: (prev.promptsCreated || 0) + 1,
    }))
  }, [setProgress])

  const issueCertificate = useCallback(
    (name) => {
      const cert = {
        id: makeId('AIM'),
        name,
        score: Math.round((stats.overallProgress + (stats.quizAverage || 0)) / 2),
        issuedAt: new Date().toISOString(),
      }
      setProgress((prev) => ({ ...EMPTY_PROGRESS, ...prev, certificate: cert }))
      return cert
    },
    [setProgress, stats.overallProgress, stats.quizAverage]
  )

  const resetProgress = useCallback(() => {
    setProgress(EMPTY_PROGRESS)
    setSavedPrompts([])
  }, [setProgress, setSavedPrompts])

  /* ---------------------------------------------------------------- */
  /* Saqlangan promptlar                                               */
  /* ---------------------------------------------------------------- */

  const savePrompt = useCallback(
    (prompt) => {
      const record = {
        id: makeId('pr'),
        title: prompt.title?.trim() || 'Nomsiz prompt',
        body: prompt.body || '',
        category: prompt.category || 'productivity',
        tags: prompt.tags || [],
        source: prompt.source || 'custom',
        favorite: false,
        createdAt: new Date().toISOString(),
      }
      setSavedPrompts((prev) => [record, ...prev])
      return record
    },
    [setSavedPrompts]
  )

  const updateSavedPrompt = useCallback(
    (id, patch) => {
      setSavedPrompts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
    },
    [setSavedPrompts]
  )

  const deleteSavedPrompt = useCallback(
    (id) => setSavedPrompts((prev) => prev.filter((p) => p.id !== id)),
    [setSavedPrompts]
  )

  const duplicateSavedPrompt = useCallback(
    (id) => {
      setSavedPrompts((prev) => {
        const found = prev.find((p) => p.id === id)
        if (!found) return prev
        return [
          { ...found, id: makeId('pr'), title: `${found.title} (nusxa)`, createdAt: new Date().toISOString() },
          ...prev,
        ]
      })
    },
    [setSavedPrompts]
  )

  const toggleFavoritePrompt = useCallback(
    (id) => setSavedPrompts((prev) => prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))),
    [setSavedPrompts]
  )

  /* ---------------------------------------------------------------- */
  /* Tavsiya mexanizmi                                                 */
  /* ---------------------------------------------------------------- */

  const recommendation = useMemo(() => {
    // 1. Prompt ball past bo'lsa — asosga qaytarish
    if (stats.avgPromptScore > 0 && stats.avgPromptScore < 60) {
      return {
        type: 'revisit',
        title: 'Prompt Engineering asoslarini takrorlang',
        text: 'Prompt ballaringiz 60 dan past — Level 2 dagi Kontekst va Cheklovlar darslarini qayta ko‘rib chiqing.',
        to: '/lessons/p-04',
        cta: 'Darsga o‘tish',
        tone: 'warn',
      }
    }
    // 2. Streak
    if (stats.streak >= 7) {
      return {
        type: 'streak',
        title: `${stats.streak} kunlik seriya! 🔥`,
        text: 'Ajoyib izchillik. Bugungi darsni ham tugatib, seriyani saqlab qoling.',
        to: '/courses',
        cta: 'Davom etish',
        tone: 'success',
      }
    }
    // 3. Keyingi tugallanmagan dars
    const nextLesson = LESSONS.find((l) => !state.lessons[l.id])
    if (nextLesson) {
      const course = COURSES.find((c) => c.id === nextLesson.courseId)
      return {
        type: 'next',
        title: nextLesson.title,
        text: `${course?.title} — keyingi darsingiz`,
        to: `/lessons/${nextLesson.id}`,
        cta: 'Davom etish',
        tone: 'brand',
      }
    }
    // 4. Hammasi tugagan
    return {
      type: 'done',
      title: 'Barcha darslar tugatildi 🎉',
      text: 'Sertifikatingizni oling va loyihalarda amaliyot qiling.',
      to: '/certificate',
      cta: 'Sertifikat',
      tone: 'success',
    }
  }, [stats.avgPromptScore, stats.streak, state.lessons])

  /** Davom etish uchun keyingi dars. */
  const nextLesson = useMemo(() => LESSONS.find((l) => !state.lessons[l.id]) || null, [state.lessons])

  const value = useMemo(
    () => ({
      progress: state,
      stats,
      courseProgress,
      recommendation,
      nextLesson,
      savedPrompts,
      isLessonComplete: (id) => Boolean(state.lessons[id]),
      getLessonRecord: (id) => state.lessons[id] || null,
      getQuizResult: (id) => state.quizzes[id] || null,
      getChallengeRecord: (id) => state.challenges[id] || null,
      getProjectRecord: (id) => state.projects[id] || { checked: [], completedAt: null },
      completeLesson,
      savePracticeAnswer,
      submitQuiz,
      recordPracticeScore,
      completeChallenge,
      toggleProjectStep,
      incrementPromptsCreated,
      issueCertificate,
      resetProgress,
      savePrompt,
      updateSavedPrompt,
      deleteSavedPrompt,
      duplicateSavedPrompt,
      toggleFavoritePrompt,
      onBadgeEarned,
    }),
    [
      state, stats, courseProgress, recommendation, nextLesson, savedPrompts,
      completeLesson, savePracticeAnswer, submitQuiz, recordPracticeScore,
      completeChallenge, toggleProjectStep, incrementPromptsCreated, issueCertificate,
      resetProgress, savePrompt, updateSavedPrompt, deleteSavedPrompt,
      duplicateSavedPrompt, toggleFavoritePrompt, onBadgeEarned,
    ]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress ProgressProvider ichida ishlatilishi kerak')
  return ctx
}
