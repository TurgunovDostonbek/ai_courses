import { useMemo, useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { COURSES } from '../../data/courses'
import { getCourseStats } from '../../data'
import { FilterChip, ProgressBar, SectionHeading } from '../../components/common'
import { CourseCard } from '../../components/course'
import styles from './Courses.module.css'

const FILTERS = [
  { id: 'all', labelKey: 'common.all' },
  { id: 'beginner', labelKey: 'common.beginner' },
  { id: 'intermediate', labelKey: 'common.intermediate' },
  { id: 'advanced', labelKey: 'common.advanced' },
]

export function Courses() {
  const { t } = useI18n()
  const { courseProgress, stats } = useProgress()
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const map = { all: COURSES.length }
    for (const c of COURSES) map[c.difficulty] = (map[c.difficulty] || 0) + 1
    return map
  }, [])

  const visible = filter === 'all' ? COURSES : COURSES.filter((c) => c.difficulty === filter)

  return (
    <div className="page">
      <SectionHeading
        eyebrow={t('nav.learn')}
        title={t('courses.title')}
        description={t('courses.subtitle')}
        level={1}
      />

      <div className={styles.overview}>
        <div className={styles.overviewText}>
          <GraduationCap size={18} aria-hidden="true" />
          <span>
            {stats.completedLessons}/{stats.totalLessons} {t('common.lessons')} ·{' '}
            {stats.completedCourses.length}/{COURSES.length} kurs tugatildi
          </span>
        </div>
        <ProgressBar value={stats.overallProgress} showValue size="md" />
      </div>

      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <FilterChip
            key={f.id}
            active={filter === f.id}
            count={counts[f.id] || 0}
            onClick={() => setFilter(f.id)}
          >
            {t(f.labelKey)}
          </FilterChip>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={courseProgress[course.id]}
            stats={getCourseStats(course.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Courses
