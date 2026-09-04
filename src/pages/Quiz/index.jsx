import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Award, Check } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { COURSES, getCourse } from '../../data/courses'
import { getQuizForCourse } from '../../data/quizzes'
import { percent } from '../../utils/format'
import { Breadcrumb, Button, Card, ProgressBar } from '../../components/common'
import { QuestionCard, QuizResult, hasAnswer, isAnswerCorrect } from '../../components/quiz'
import styles from './Quiz.module.css'

export function Quiz() {
  const { courseId } = useParams()
  const { t } = useI18n()
  const toast = useToast()
  const { submitQuiz, getQuizResult } = useProgress()

  const [phase, setPhase] = useState('intro') // intro | run | result
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState(false)
  const [results, setResults] = useState([])
  const [xpGained, setXpGained] = useState(0)

  const course = getCourse(courseId)
  const quiz = getQuizForCourse(courseId)
  if (!course || !quiz) return <Navigate to="/courses" replace />

  const previous = getQuizResult(quiz.id)
  const question = quiz.questions[index]
  const total = quiz.questions.length
  const answered = hasAnswer(question, answers[question?.id])

  const start = () => {
    setPhase('run')
    setIndex(0)
    setAnswers({})
    setResults([])
    setRevealed(false)
    setXpGained(0)
  }

  const check = () => setRevealed(true)

  const goNext = () => {
    const correct = isAnswerCorrect(question, answers[question.id])
    const nextResults = [...results, correct]

    if (index + 1 < total) {
      setResults(nextResults)
      setIndex(index + 1)
      setRevealed(false)
      return
    }

    // Yakun
    const correctCount = nextResults.filter(Boolean).length
    const score = percent(correctCount, total)
    const { xp } = submitQuiz(quiz.id, { score, correct: correctCount, total })
    setResults(nextResults)
    setXpGained(xp)
    setPhase('result')
    if (xp > 0) toast.success('+' + xp + ' XP', { title: quiz.title })
  }

  const nextCourse = COURSES.find((c) => c.order === course.order + 1)

  /* ---------------- Kirish ---------------- */
  if (phase === 'intro') {
    return (
      <div className="page">
        <Breadcrumb
          items={[
            { label: t('courses.title'), to: '/courses' },
            { label: course.title, to: '/courses/' + course.id },
            { label: t('quiz.title') },
          ]}
        />

        <Card className={styles.intro}>
          <span className={styles.introIcon} aria-hidden="true">
            <Award size={26} />
          </span>
          <h1 className={styles.introTitle}>{quiz.title}</h1>
          <p className={styles.introText}>{quiz.description}</p>

          <ul className={styles.introMeta}>
            <li>
              <strong>{total}</strong> savol
            </li>
            <li>
              <strong>{quiz.passScore}%</strong> o‘tish balli
            </li>
            <li>
              <strong>{quiz.xp}</strong> XP
            </li>
          </ul>

          {previous && (
            <p className={styles.previous}>
              Oldingi eng yaxshi natija: <strong>{previous.score}%</strong> ({previous.attempts} urinish)
            </p>
          )}

          <Button size="lg" onClick={start} iconRight={ArrowRight}>
            {previous ? t('quiz.retake') : t('quiz.start')}
          </Button>
        </Card>
      </div>
    )
  }

  /* ---------------- Natija ---------------- */
  if (phase === 'result') {
    const correctCount = results.filter(Boolean).length
    return (
      <div className="page">
        <Breadcrumb
          items={[
            { label: course.title, to: '/courses/' + course.id },
            { label: t('quiz.title') },
          ]}
        />
        <QuizResult
          quiz={quiz}
          score={percent(correctCount, total)}
          correct={correctCount}
          total={total}
          results={results}
          xpGained={xpGained}
          onRetake={start}
          nextTo={nextCourse ? '/courses/' + nextCourse.id : '/certificate'}
        />
      </div>
    )
  }

  /* ---------------- Savollar ---------------- */
  return (
    <div className="page">
      <div className={styles.runHead}>
        <span className={styles.counter}>
          {t('quiz.question')} {index + 1}/{total}
        </span>
        <ProgressBar value={percent(index, total)} size="xs" className={styles.runBar} />
      </div>

      <Card className={styles.questionCard}>
        <QuestionCard
          question={question}
          value={answers[question.id]}
          onChange={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
          revealed={revealed}
        />

        <div className={styles.runActions}>
          {!revealed ? (
            <Button onClick={check} disabled={!answered} icon={Check} size="lg">
              {t('quiz.check')}
            </Button>
          ) : (
            <Button onClick={goNext} iconRight={ArrowRight} size="lg">
              {index + 1 < total ? t('quiz.next') : t('quiz.finish')}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Quiz
