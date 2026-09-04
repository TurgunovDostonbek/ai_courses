import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe2,
  HelpCircle,
  Key,
  Lightbulb,
  Target,
  Zap,
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { getCourse } from '../../data/courses'
import { getCourseLessons, getLesson, getLessonNeighbors } from '../../data/lessons'
import { getQuizForCourse } from '../../data/quizzes'
import { formatMinutes } from '../../utils/format'
import { Accordion, Breadcrumb, Button, Card, ProgressBar, Textarea } from '../../components/common'
import { LessonBlocks } from '../../components/course'
import styles from './Lesson.module.css'

export function Lesson() {
  const { lessonId } = useParams()
  const { t, locale } = useI18n()
  const navigate = useNavigate()
  const toast = useToast()
  const { completeLesson, savePracticeAnswer, isLessonComplete, getLessonRecord, courseProgress } =
    useProgress()

  const lesson = getLesson(lessonId)
  const [answer, setAnswer] = useState(() => getLessonRecord(lessonId)?.practiceAnswer || '')
  const [showSample, setShowSample] = useState(false)
  const [shownLessonId, setShownLessonId] = useState(lessonId)

  // Dars almashganda holat render paytida tiklanadi — yozilayotgan javob o'chmasin
  if (shownLessonId !== lessonId) {
    setShownLessonId(lessonId)
    setAnswer(getLessonRecord(lessonId)?.practiceAnswer || '')
    setShowSample(false)
  }

  if (!lesson) return <Navigate to="/courses" replace />

  const course = getCourse(lesson.courseId)
  const { prev, next } = getLessonNeighbors(lesson.id)
  const siblings = getCourseLessons(lesson.courseId)
  const position = siblings.findIndex((l) => l.id === lesson.id) + 1
  const completed = isLessonComplete(lesson.id)
  const progress = courseProgress[lesson.courseId]
  const quiz = getQuizForCourse(lesson.courseId)

  const handleComplete = () => {
    const { xp } = completeLesson(lesson.id, { practiceAnswer: answer })
    if (xp > 0) {
      toast.success('+' + xp + ' XP · ' + lesson.title, { title: t('lesson.completed') })
    }
    if (next) navigate('/lessons/' + next.id)
    else if (quiz) navigate('/courses/' + lesson.courseId + '/quiz')
    else navigate('/courses/' + lesson.courseId)
  }

  const handleSaveAnswer = () => {
    savePracticeAnswer(lesson.id, answer)
    toast.success(t('common.saved'))
  }

  return (
    <div className="page">
      <Breadcrumb
        items={[
          { label: t('courses.title'), to: '/courses' },
          { label: course?.title, to: '/courses/' + lesson.courseId },
          { label: lesson.title },
        ]}
      />

      <div className={styles.progressStrip}>
        <span className={styles.position}>
          {t('common.lessons')} {position}/{siblings.length}
        </span>
        <ProgressBar value={progress?.percent || 0} size="xs" className={styles.strip} />
        <span className={styles.percent}>{progress?.percent || 0}%</span>
      </div>

      <article className={styles.article}>
        <header className={styles.head}>
          <div className={styles.headMeta}>
            <span className={styles.metaItem}>
              <Clock size={13} aria-hidden="true" />
              {formatMinutes(lesson.duration, locale)} {t('lesson.readingTime')}
            </span>
            <span className={styles.metaItem}>
              <Zap size={13} aria-hidden="true" />
              {lesson.xp} XP
            </span>
            {completed && (
              <span className={styles.doneTag}>
                <CheckCircle2 size={13} aria-hidden="true" />
                {t('lesson.completed')}
              </span>
            )}
          </div>

          <h1 className={styles.title}>{lesson.title}</h1>
          <p className={styles.summary}>{lesson.summary}</p>
        </header>

        {/* ---- Maqsad va nega ---- */}
        <div className={styles.intro}>
          <Card className={styles.introCard}>
            <h2 className={styles.introTitle}>
              <Target size={15} aria-hidden="true" />
              {t('lesson.objectives')}
            </h2>
            <ul className={styles.objectives}>
              {lesson.objectives?.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Card>

          <Card className={styles.introCard}>
            <h2 className={styles.introTitle}>
              <HelpCircle size={15} aria-hidden="true" />
              {t('lesson.why')}
            </h2>
            <p className={styles.whyText}>{lesson.why}</p>
          </Card>
        </div>

        {/* ---- Kontent ---- */}
        <LessonBlocks blocks={lesson.blocks} />

        {/* ---- Hayotdagi misollar ---- */}
        {lesson.realWorld?.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Globe2 size={16} aria-hidden="true" />
              {t('lesson.realWorld')}
            </h2>
            <ul className={styles.realWorld}>
              {lesson.realWorld.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ---- Amaliyot ---- */}
        {lesson.practice && (
          <section className={styles.practice}>
            <h2 className={styles.sectionTitle}>
              <Lightbulb size={16} aria-hidden="true" />
              {t('lesson.practice')}
            </h2>

            <h3 className={styles.practiceTitle}>{lesson.practice.title}</h3>
            <p className={styles.practiceTask}>{lesson.practice.task}</p>

            {lesson.practice.hint && (
              <Accordion title={t('lesson.hint')} className={styles.hint}>
                <p className={styles.hintText}>{lesson.practice.hint}</p>
              </Accordion>
            )}

            <label className={styles.answerLabel} htmlFor="practice-answer">
              {t('lesson.yourAnswer')}
            </label>
            <Textarea
              id="practice-answer"
              rows={6}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={t('lesson.answerPlaceholder')}
            />

            <div className={styles.practiceActions}>
              <Button variant="secondary" size="sm" onClick={handleSaveAnswer} disabled={!answer.trim()}>
                {t('common.save')}
              </Button>
              {lesson.practice.sample && (
                <Button variant="ghost" size="sm" onClick={() => setShowSample((s) => !s)}>
                  {showSample ? t('common.showLess') : t('lesson.showSample')}
                </Button>
              )}
            </div>

            {showSample && lesson.practice.sample && (
              <div className={styles.sample}>
                <span className={styles.sampleLabel}>{t('lesson.sample')}</span>
                <p className={styles.sampleText}>{lesson.practice.sample}</p>
              </div>
            )}
          </section>
        )}

        {/* ---- Xulosa ---- */}
        {lesson.keyTakeaways?.length > 0 && (
          <section className={styles.takeaways}>
            <h2 className={styles.sectionTitle}>
              <Key size={16} aria-hidden="true" />
              {t('lesson.keyTakeaways')}
            </h2>
            <ul className={styles.takeawayList}>
              {lesson.keyTakeaways.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* ---- Yakuniy panel ---- */}
      <div className={styles.footer}>
        <Button onClick={handleComplete} size="lg" icon={CheckCircle2} variant={completed ? 'secondary' : 'primary'}>
          {completed ? t('lesson.nextLesson') : t('lesson.markComplete')}
        </Button>

        <div className={styles.nav}>
          {prev ? (
            <Link to={'/lessons/' + prev.id} className={styles.navLink}>
              <ArrowLeft size={15} aria-hidden="true" />
              <span className={styles.navText}>
                <span className={styles.navLabel}>{t('common.prev')}</span>
                <span className={styles.navTitle}>{prev.title}</span>
              </span>
            </Link>
          ) : (
            <Link to={'/courses/' + lesson.courseId} className={styles.navLink}>
              <ArrowLeft size={15} aria-hidden="true" />
              <span className={styles.navText}>
                <span className={styles.navLabel}>{t('lesson.backToCourse')}</span>
                <span className={styles.navTitle}>{course?.title}</span>
              </span>
            </Link>
          )}

          {next && (
            <Link to={'/lessons/' + next.id} className={styles.navLinkRight}>
              <span className={styles.navText}>
                <span className={styles.navLabel}>{t('common.next')}</span>
                <span className={styles.navTitle}>{next.title}</span>
              </span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Lesson
