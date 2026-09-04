import { useMemo, useState } from 'react'
import { ArrowRight, Eye, EyeOff, Gauge, Target, ThumbsDown } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { PRACTICE_TASKS } from '../../data/challenges'
import { CRITERIA } from '../../utils/promptScore'
import { evaluatePrompt } from '../../services/aiService'
import {
  Button,
  Card,
  Chip,
  CodeBlock,
  ProgressBar,
  SectionHeading,
  Textarea,
} from '../../components/common'
import { ScorePanel } from '../../components/prompt'
import styles from './PromptPractice.module.css'

const CRITERION_LABEL = Object.fromEntries(CRITERIA.map((c) => [c.key, c.labelKey]))

export function PromptPractice() {
  const { t } = useI18n()
  const toast = useToast()
  const { recordPracticeScore, progress } = useProgress()

  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showIdeal, setShowIdeal] = useState(false)

  const task = PRACTICE_TASKS[index]

  const bestScores = useMemo(() => {
    const map = {}
    for (const s of progress.practiceScores) map[s.taskId] = s.score
    return map
  }, [progress.practiceScores])

  const handleEvaluate = async () => {
    if (!answer.trim()) return
    setLoading(true)
    const res = await evaluatePrompt(answer)
    setLoading(false)
    if (!res.ok) {
      toast.error(res.error.message)
      return
    }
    setResult(res.data)
    const { xp } = recordPracticeScore(task.id, res.data.score)
    if (xp > 0) toast.success('+' + xp + ' XP · ' + res.data.score + '/100')
  }

  // Mashq almashganda holat qo'lda tozalanadi
  const selectTask = (next) => {
    setIndex(next)
    setAnswer('')
    setResult(null)
    setShowIdeal(false)
  }

  const goNext = () => selectTask((index + 1) % PRACTICE_TASKS.length)

  const completedCount = Object.keys(bestScores).length

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.practice')}
        title={t('practice.title')}
        description={t('practice.subtitle')}
        level={1}
      />

      <div className={styles.taskbar}>
        <span className={styles.taskCount}>
          {completedCount}/{PRACTICE_TASKS.length} mashq bajarildi
        </span>
        <ProgressBar
          value={Math.round((completedCount / PRACTICE_TASKS.length) * 100)}
          size="xs"
          className={styles.taskBar}
        />
        <div className={styles.taskDots}>
          {PRACTICE_TASKS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={[
                styles.dot,
                i === index ? styles.dotActive : '',
                bestScores[item.id] !== undefined ? styles.dotDone : '',
              ].join(' ')}
              onClick={() => selectTask(i)}
              aria-label={'Mashq ' + (i + 1)}
              aria-current={i === index}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.layout}>
        {/* ---------------- Vazifa ---------------- */}
        <section className={styles.taskCol}>
          <Card className={styles.scenario}>
            <span className={styles.blockLabel}>
              <Target size={14} aria-hidden="true" />
              {t('practice.scenario')}
            </span>
            <p className={styles.scenarioText}>{task.scenario}</p>
            <div className={styles.chips}>
              <Chip size="sm" tone="neutral">
                {t('common.' + task.difficulty)}
              </Chip>
              {bestScores[task.id] !== undefined && (
                <Chip size="sm" tone="success">
                  {t('practice.score')}: {bestScores[task.id]}
                </Chip>
              )}
            </div>
          </Card>

          <Card className={styles.badPrompt}>
            <span className={styles.blockLabel}>
              <ThumbsDown size={14} aria-hidden="true" />
              {t('practice.badPrompt')}
            </span>
            <p className={styles.badText}>{task.badPrompt}</p>
            <div className={styles.missing}>
              {task.missing.map((key) => (
                <span key={key} className={styles.missingItem}>
                  {t(CRITERION_LABEL[key] || key)}
                  <span className={styles.missingMark}>—</span>
                </span>
              ))}
            </div>
            {task.feedback && (
              <ul className={styles.feedbackList}>
                {task.missing.map(
                  (key) =>
                    task.feedback[key] && (
                      <li key={key}>
                        <strong>{t(CRITERION_LABEL[key] || key)}:</strong> {task.feedback[key]}
                      </li>
                    )
                )}
              </ul>
            )}
          </Card>

          <Card className={styles.editor}>
            <label className={styles.blockLabel} htmlFor="practice-prompt">
              <Gauge size={14} aria-hidden="true" />
              {t('practice.yourPrompt')}
            </label>
            <Textarea
              id="practice-prompt"
              rows={12}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={t('practice.placeholder')}
            />
            <div className={styles.editorActions}>
              <Button onClick={handleEvaluate} loading={loading} disabled={!answer.trim()} icon={Gauge}>
                {t('practice.evaluate')}
              </Button>
              <Button
                variant="ghost"
                icon={showIdeal ? EyeOff : Eye}
                onClick={() => setShowIdeal((s) => !s)}
              >
                {t('practice.showIdeal')}
              </Button>
              <Button variant="secondary" iconRight={ArrowRight} onClick={goNext}>
                {t('practice.nextTask')}
              </Button>
            </div>
          </Card>

          {showIdeal && (
            <CodeBlock code={task.idealPrompt} label={t('practice.improved')} className={styles.ideal} />
          )}
        </section>

        {/* ---------------- Baho ---------------- */}
        <aside className={styles.scoreCol}>
          {result ? (
            <ScorePanel result={result} />
          ) : (
            <Card className={styles.hintCard}>
              <h2 className={styles.hintTitle}>{t('practice.breakdown')}</h2>
              <ul className={styles.criteriaList}>
                {CRITERIA.map((c) => (
                  <li key={c.key}>
                    <span>{t(c.labelKey)}</span>
                    <strong>{c.weight}</strong>
                  </li>
                ))}
              </ul>
              <p className={styles.hintText}>
                Promptingizni yozing va «{t('practice.evaluate')}» tugmasini bosing — har mezon bo‘yicha
                ball va aniq tavsiyalar chiqadi.
              </p>
            </Card>
          )}
        </aside>
      </div>
    </div>
  )
}

export default PromptPractice
