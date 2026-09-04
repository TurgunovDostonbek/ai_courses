import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  FlaskConical,
  Hammer,
  Library,
  PlayCircle,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { COURSES } from '../../data/courses'
import { PLATFORM_STATS, getCourseStats } from '../../data'
import { formatNumber } from '../../utils/format'
import { Button } from '../../components/common'
import Icon from '../../components/common/Icon'
import styles from './Home.module.css'

const FEATURES = [
  {
    icon: BookOpen,
    title: '6 darajali kurs',
    text: 'AI asoslaridan RAG va agentlargacha — har bir dars amaliyot bilan tugaydi.',
  },
  {
    icon: FlaskConical,
    title: 'Prompt Lab',
    text: 'Maydonlarni to‘ldiring — professional strukturaga ega prompt avtomatik yig‘iladi.',
  },
  {
    icon: Target,
    title: 'Prompt Practice',
    text: 'Yomon promptni tuzating va 6 mezon bo‘yicha darhol ball oling.',
  },
  {
    icon: Wrench,
    title: 'AI Tools katalogi',
    text: 'Har bir vosita uchun: nima uchun, qachon, kuchli va zaif tomonlari.',
  },
  {
    icon: Library,
    title: 'Prompt kutubxonasi',
    text: 'Sinalgan shablonlar — o‘zgaruvchilarni to‘ldiring va ishlating.',
  },
  {
    icon: Hammer,
    title: 'Real loyihalar',
    text: 'Bosqichli yo‘riqnoma bilan portfolio uchun ishlaydigan mahsulot quring.',
  },
  {
    icon: BarChart3,
    title: 'Analitika',
    text: 'XP, seriya, test natijalari va prompt sifati — hammasi bir joyda.',
  },
  {
    icon: Award,
    title: 'Nishon va sertifikat',
    text: '18 ta nishon, 8 daraja va kurs oxirida shaxsiy sertifikat.',
  },
]

const STEPS = [
  { title: 'O‘rganing', text: 'Qisqa, amaliy darslar. Har birida real misol va interaktiv demo.' },
  { title: 'Mashq qiling', text: 'Prompt Lab va Practice’da darhol qo‘llang — ball oling.' },
  { title: 'Quring', text: 'Loyihalarda AI’ni haqiqiy ish jarayoniga qo‘shing.' },
  { title: 'Isbotlang', text: 'Test, nishon va sertifikat bilan natijangizni ko‘rsating.' },
]

export function Home() {
  const { t, locale } = useI18n()
  const { stats, courseProgress } = useProgress()
  const started = stats.completedLessons > 0

  return (
    <div className={styles.page}>
      {/* ---------------- Hero ---------------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <Sparkles size={13} aria-hidden="true" />
            {t('home.badge')}
          </span>

          <h1 className={styles.heroTitle}>
            <span>{t('home.heroTitle1')}</span>
            <span className={styles.gradient}>{t('home.heroTitle2')}</span>
          </h1>

          <p className={styles.heroText}>{t('home.heroText')}</p>

          <div className={styles.heroActions}>
            <Button to={started ? '/dashboard' : '/courses'} size="lg" iconRight={ArrowRight}>
              {started ? t('common.continue') : t('home.ctaPrimary')}
            </Button>
            <Button to="/ai-tools" size="lg" variant="secondary" icon={Wrench}>
              {t('home.ctaSecondary')}
            </Button>
          </div>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>{formatNumber(PLATFORM_STATS.lessons, locale)}</dt>
              <dd>{t('home.statsLessons')}</dd>
            </div>
            <div className={styles.stat}>
              <dt>{formatNumber(PLATFORM_STATS.tools, locale)}</dt>
              <dd>{t('home.statsTools')}</dd>
            </div>
            <div className={styles.stat}>
              <dt>{formatNumber(PLATFORM_STATS.prompts, locale)}</dt>
              <dd>{t('home.statsPrompts')}</dd>
            </div>
            <div className={styles.stat}>
              <dt>{formatNumber(PLATFORM_STATS.projects, locale)}</dt>
              <dd>{t('home.statsProjects')}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------------- O'quv yo'li ---------------- */}
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('home.pathTitle')}</h2>
          <p className={styles.sectionText}>{t('home.pathText')}</p>
        </header>

        <ol className={styles.path}>
          {COURSES.map((course) => {
            const cs = getCourseStats(course.id)
            const progress = courseProgress[course.id]
            return (
              <li key={course.id} className={styles.pathItem}>
                <Link to={'/courses/' + course.id} className={styles.pathCard}>
                  <span className={styles.pathLevel} style={{ background: course.color }}>
                    {course.level}
                  </span>
                  <span className={styles.pathIcon} style={{ color: course.color }}>
                    <Icon name={course.icon} size={19} />
                  </span>
                  <span className={styles.pathBody}>
                    <span className={styles.pathTitle}>{course.title}</span>
                    <span className={styles.pathTagline}>{course.tagline}</span>
                    <span className={styles.pathMeta}>
                      <PlayCircle size={12} aria-hidden="true" />
                      {cs.lessonCount} {t('common.lessons')}
                      {progress?.completed > 0 && (
                        <span className={styles.pathProgress}>· {progress.percent}%</span>
                      )}
                    </span>
                  </span>
                  <ArrowRight size={16} className={styles.pathArrow} aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      {/* ---------------- Imkoniyatlar ---------------- */}
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('home.featuresTitle')}</h2>
        </header>

        <div className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.feature}>
              <span className={styles.featureIcon} aria-hidden="true">
                <f.icon size={18} />
              </span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureText}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Qanday ishlaydi ---------------- */}
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t('home.howTitle')}</h2>
        </header>

        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNum}>{i + 1}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Yakuniy CTA ---------------- */}
      <section className={styles.finalCta}>
        <h2 className={styles.finalTitle}>{t('home.finalCta')}</h2>
        <p className={styles.finalText}>{t('home.finalCtaText')}</p>
        <Link to="/dashboard" className={styles.finalBtn}>
          {t('home.ctaPrimary')}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </div>
  )
}

export default Home
