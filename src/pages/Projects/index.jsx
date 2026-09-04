import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Clock, Hammer, Rocket, Sparkles, Target, Zap } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { PROJECTS, PROJECT_LAB_BLUEPRINT } from '../../data/projects'
import { generateProjectPlan } from '../../services/aiService'
import { cx } from '../../utils/format'
import {
  Button,
  Card,
  Chip,
  CodeBlock,
  Input,
  ProgressBar,
  SectionHeading,
  Tabs,
} from '../../components/common'
import Icon from '../../components/common/Icon'
import styles from './Projects.module.css'

export function Projects() {
  const { t } = useI18n()
  const toast = useToast()
  const { getProjectRecord, toggleProjectStep } = useProgress()
  const [searchParams, setSearchParams] = useSearchParams()

  const [tab, setTab] = useState('projects')
  const [activeId, setActiveId] = useState(searchParams.get('id') || PROJECTS[0].id)
  const [idea, setIdea] = useState('')
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const active = PROJECTS.find((p) => p.id === activeId) || PROJECTS[0]
  const record = getProjectRecord(active.id)
  const checkedCount = record.checked.length
  const percentDone = Math.round((checkedCount / active.steps.length) * 100)

  const select = (project) => {
    setActiveId(project.id)
    setSearchParams({ id: project.id }, { replace: true })
  }

  const toggle = (index) => {
    const wasComplete = record.completedAt
    toggleProjectStep(active.id, index, active.steps.length)
    if (!wasComplete && record.checked.length + 1 === active.steps.length) {
      toast.success('+500 XP · ' + active.title, { title: t('projects.title') })
    }
  }

  const handleGenerate = async () => {
    if (!idea.trim()) return
    setLoading(true)
    setPlan(null)
    const res = await generateProjectPlan(idea, PROJECT_LAB_BLUEPRINT)
    setLoading(false)
    if (res.ok) setPlan(res.data)
    else toast.error(res.error.message)
  }

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.learn')}
        title={t('projects.title')}
        description={t('projects.subtitle')}
        level={1}
      />

      <Tabs
        tabs={[
          { value: 'projects', label: t('projects.title'), icon: Hammer, count: PROJECTS.length },
          { value: 'lab', label: t('projects.lab'), icon: Sparkles },
        ]}
        value={tab}
        onChange={setTab}
        className={styles.tabs}
      />

      {tab === 'projects' ? (
        <div className={styles.layout}>
          {/* ---------------- Ro'yxat ---------------- */}
          <div className={styles.list}>
            {PROJECTS.map((project) => {
              const rec = getProjectRecord(project.id)
              const pct = Math.round((rec.checked.length / project.steps.length) * 100)
              return (
                <button
                  key={project.id}
                  type="button"
                  className={cx(styles.item, project.id === activeId && styles.itemActive)}
                  onClick={() => select(project)}
                >
                  <span className={styles.itemHead}>
                    <span className={styles.itemNum}>{String(project.order).padStart(2, '0')}</span>
                    <span className={styles.itemTitle}>{project.title}</span>
                    {rec.completedAt && <Check size={14} className={styles.itemDone} aria-hidden="true" />}
                  </span>
                  <span className={styles.itemTagline}>{project.tagline}</span>
                  <ProgressBar value={pct} size="xs" tone={rec.completedAt ? 'success' : 'brand'} />
                </button>
              )
            })}
          </div>

          {/* ---------------- Batafsil ---------------- */}
          <div className={styles.detail}>
            <Card>
              <div className={styles.detailHead}>
                <div>
                  <h2 className={styles.detailTitle}>{active.title}</h2>
                  <p className={styles.detailTagline}>{active.tagline}</p>
                </div>
                <div className={styles.detailMeta}>
                  <Chip size="sm" tone="neutral">
                    {t('common.' + active.difficulty)}
                  </Chip>
                  <Chip size="sm" icon={Clock}>
                    {active.estimateHours} soat
                  </Chip>
                  <Chip size="sm" icon={Zap} tone="brand">
                    {active.xp} XP
                  </Chip>
                </div>
              </div>

              <div className={styles.problemGrid}>
                <div>
                  <span className={styles.label}>{t('projects.problem')}</span>
                  <p className={styles.text}>{active.problem}</p>
                </div>
                <div>
                  <span className={styles.label}>{t('projects.outcome')}</span>
                  <p className={styles.text}>{active.outcome}</p>
                </div>
              </div>

              <div className={styles.skills}>
                <span className={styles.label}>{t('projects.skills')}</span>
                <div className={styles.skillChips}>
                  {active.skills.map((s) => (
                    <Chip key={s} size="sm">
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.stepsHead}>
                <h3 className={styles.sectionTitle}>
                  <Target size={15} aria-hidden="true" />
                  {t('projects.steps')}
                </h3>
                <span className={styles.stepsCount}>
                  {checkedCount}/{active.steps.length} · {percentDone}%
                </span>
              </div>
              <ProgressBar value={percentDone} size="sm" className={styles.stepsBar} />

              <ol className={styles.steps}>
                {active.steps.map((step, i) => {
                  const checked = record.checked.includes(i)
                  return (
                    <li key={step.title}>
                      <label className={cx(styles.step, checked && styles.stepChecked)}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(i)}
                          className={styles.checkbox}
                        />
                        <span className={styles.stepBody}>
                          <strong className={styles.stepTitle}>{step.title}</strong>
                          <span className={styles.stepText}>{step.body}</span>
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ol>
            </Card>

            <Card>
              <h3 className={styles.sectionTitle}>
                <Check size={15} aria-hidden="true" />
                {t('projects.checklist')}
              </h3>
              <ul className={styles.checklist}>
                {active.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      ) : (
        /* ---------------- Project Lab ---------------- */
        <div className={styles.lab}>
          <Card className={styles.labIntro}>
            <h2 className={styles.sectionTitle}>
              <Rocket size={16} aria-hidden="true" />
              {t('projects.lab')}
            </h2>
            <p className={styles.text}>{t('projects.labSubtitle')}</p>
            <div className={styles.labForm}>
              <Input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={t('projects.labPlaceholder')}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <Button onClick={handleGenerate} loading={loading} disabled={!idea.trim()} icon={Sparkles}>
                {t('projects.generatePlan')}
              </Button>
            </div>
          </Card>

          {plan && (
            <div className={styles.planGrid}>
              {plan.sections.map((section) => (
                <Card key={section.key} className={styles.planCard}>
                  <h3 className={styles.planTitle}>
                    <span className={styles.planIcon} aria-hidden="true">
                      <Icon name={section.icon} size={15} />
                    </span>
                    {section.title}
                  </h3>
                  <p className={styles.planGuide}>{section.guide}</p>
                  <ul className={styles.planItems}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <CodeBlock code={section.prompt} label="Prompt" className={styles.planPrompt} />
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Projects
