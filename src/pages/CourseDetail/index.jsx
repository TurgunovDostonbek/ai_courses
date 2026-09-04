import { Navigate, useParams } from 'react-router-dom'
import { Award, CheckCircle2, Clock, PlayCircle, Target, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { getCourse } from '../../data/courses'
import { getCourseLessons } from '../../data/lessons'
import { getQuizForCourse } from '../../data/quizzes'
import { getCourseStats } from '../../data'
import { formatMinutes } from '../../utils/format'
import { Breadcrumb, Button, Card, Chip, ProgressRing } from '../../components/common'
import Icon from '../../components/common/Icon'
import { LessonRow } from '../../components/course'
import styles from './CourseDetail.module.css'

export function CourseDetail() {
  const { courseId } = useParams()
  const { t, locale } = useI18n()
  const { courseProgress, isLessonComplete, getQuizResult } = useProgress()

  const course = getCourse(courseId)
  if (!course) return <Navigate to="/courses" replace />

  const lessons = getCourseLessons(course.id)
  const cs = getCourseStats(course.id)
  const progress = courseProgress[course.id] || { completed: 0, total: lessons.length, percent: 0 }
  const quiz = getQuizForCourse(course.id)
  const quizResult = quiz ? getQuizResult(quiz.id) : null

  const nextLesson = lessons.find((l) => !isLessonComplete(l.id)) || lessons[0]
  const started = progress.completed > 0

  return (
    <div className="page">
      <Breadcrumb
        items={[
          { label: t('courses.title'), to: '/courses' },
          { label: course.title },
        ]}
      />

      {/* ---------------- Hero ---------------- */}
      <header className={styles.hero} style={{ '--course-color': course.color }}>
        <div className={styles.heroMain}>
          <div className={styles.heroTop}>
            <span className={styles.icon} style={{ background: course.color }}>
              <Icon name={course.icon} size={24} />
            </span>
            <div>
              <span className={styles.level}>Level {course.level}</span>
              <h1 className={styles.title}>{course.title}</h1>
            </div>
          </div>

          <p className={styles.description}>{course.description}</p>

          <div className={styles.meta}>
            <Chip size="sm" icon={PlayCircle}>
              {cs.lessonCount} {t('common.lessons')}
            </Chip>
            <Chip size="sm" icon={Clock}>
              {formatMinutes(cs.totalMinutes, locale)}
            </Chip>
            <Chip size="sm" icon={Zap}>
              {cs.totalXp} XP
            </Chip>
            <Chip size="sm" tone="brand">
              {t('common.' + course.difficulty)}
            </Chip>
          </div>

          <div className={styles.actions}>
            <Button to={'/lessons/' + nextLesson.id} size="lg" icon={PlayCircle}>
              {started ? t('courses.continueCourse') : t('courses.startCourse')}
            </Button>
            {quiz && (
              <Button to={'/courses/' + course.id + '/quiz'} size="lg" variant="secondary" icon={Award}>
                {t('courses.finalQuiz')}
              </Button>
            )}
          </div>
        </div>

        <div className={styles.heroSide}>
          <ProgressRing value={progress.percent} size={124} stroke={10} tone={course.color}>
            <span className={styles.ringValue}>{progress.percent}%</span>
            <span className={styles.ringLabel}>{t('courses.progress')}</span>
          </ProgressRing>
          <span className={styles.ringCount}>
            {progress.completed}/{progress.total} {t('common.lessons')}
          </span>
        </div>
      </header>

      <div className={styles.body}>
        {/* ---------------- Darslar ---------------- */}
        <section className={styles.lessons}>
          <h2 className={styles.sectionTitle}>{t('courses.lessons')}</h2>
          <div className={styles.lessonList}>
            {lessons.map((lesson, i) => (
              <LessonRow
                key={lesson.id}
                lesson={lesson}
                index={i}
                completed={isLessonComplete(lesson.id)}
                current={lesson.id === nextLesson.id && !isLessonComplete(lesson.id)}
              />
            ))}
          </div>

          {quiz && (
            <Card className={styles.quizCard}>
              <span className={styles.quizIcon} aria-hidden="true">
                <Award size={20} />
              </span>
              <div className={styles.quizBody}>
                <h3 className={styles.quizTitle}>{quiz.title}</h3>
                <p className={styles.quizText}>{quiz.description}</p>
                <span className={styles.quizMeta}>
                  {quiz.questions.length} savol · o‘tish balli {quiz.passScore}% · {quiz.xp} XP
                </span>
              </div>
              <div className={styles.quizAction}>
                {quizResult && (
                  <span className={styles.quizScore}>
                    {quizResult.score}%
                    {quizResult.score >= quiz.passScore && (
                      <CheckCircle2 size={15} className={styles.quizPassed} aria-hidden="true" />
                    )}
                  </span>
                )}
                <Button to={'/courses/' + course.id + '/quiz'} variant={quizResult ? 'secondary' : 'primary'}>
                  {quizResult ? t('quiz.retake') : t('quiz.start')}
                </Button>
              </div>
            </Card>
          )}
        </section>

        {/* ---------------- Natijalar ---------------- */}
        <aside className={styles.side}>
          <Card>
            <h2 className={styles.sideTitle}>
              <Target size={16} aria-hidden="true" />
              {t('courses.outcomes')}
            </h2>
            <ul className={styles.outcomes}>
              {course.outcomes.map((o) => (
                <li key={o}>
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className={styles.sideTitle}>{t('common.category')}</h2>
            <div className={styles.tags}>
              {course.tags.map((tag) => (
                <Chip key={tag} size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}

export default CourseDetail
