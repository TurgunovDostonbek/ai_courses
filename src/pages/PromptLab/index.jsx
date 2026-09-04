import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Check,
  Copy,
  Eraser,
  Languages,
  Play,
  Save,
  Scissors,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { useCopy } from '../../hooks/useCopy'
import { useDebounce } from '../../hooks/useDebounce'
import {
  EMPTY_LAB_STATE,
  VISIBLE_LAB_FIELDS,
  buildPrompt,
  countFilled,
  improvePrompt,
  professionalizePrompt,
  shortenPrompt,
  translateHeadings,
} from '../../utils/promptBuilder'
import { scorePrompt } from '../../utils/promptScore'
import { complete } from '../../services/aiService'
import {
  Button,
  Card,
  EmptyState,
  Field,
  ProgressBar,
  SectionHeading,
  Textarea,
} from '../../components/common'
import { ScorePanel } from '../../components/prompt'
import styles from './PromptLab.module.css'

export function PromptLab() {
  const { t, locale } = useI18n()
  const toast = useToast()
  const location = useLocation()
  const { savePrompt, incrementPromptsCreated } = useProgress()
  const { copied, copy } = useCopy()

  const [fields, setFields] = useState(EMPTY_LAB_STATE)
  // Kutubxonadan kelgan shablon — dastlabki qiymat sifatida olinadi
  const [override, setOverride] = useState(() => location.state?.prompt ?? null)
  const [simulating, setSimulating] = useState(false)
  const [simulation, setSimulation] = useState(null)

  // Marshrut holatini tozalaymiz — sahifa yangilanganda shablon qayta yuklanmasin
  useEffect(() => {
    if (location.state?.prompt) window.history.replaceState({}, '')
  }, [location.state])

  const built = useMemo(() => buildPrompt(fields), [fields])
  const output = override ?? built
  const debouncedOutput = useDebounce(output, 260)
  const result = useMemo(() => (debouncedOutput ? scorePrompt(debouncedOutput) : null), [debouncedOutput])

  const filled = countFilled(fields)
  const fillPercent = Math.round((filled / VISIBLE_LAB_FIELDS.length) * 100)

  const setField = (key, value) => {
    setOverride(null)
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  const transform = (fn, message) => {
    if (!output) return
    setOverride(fn(output))
    toast.info(message)
  }

  const handleClear = () => {
    setFields(EMPTY_LAB_STATE)
    setOverride(null)
    setSimulation(null)
  }

  const handleSave = () => {
    if (!output.trim()) return
    savePrompt({
      title: fields.goal?.trim()?.slice(0, 60) || 'Prompt Lab prompti',
      body: output,
      category: 'productivity',
      tags: ['lab'],
      source: 'lab',
    })
    incrementPromptsCreated()
    toast.success(t('common.saved'))
  }

  const handleSimulate = async () => {
    if (!output.trim()) return
    setSimulating(true)
    setSimulation(null)
    const res = await complete({ prompt: output })
    setSimulating(false)
    if (res.ok) setSimulation(res.data.text)
    else toast.error(res.error.message)
  }

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.practice')}
        title={t('lab.title')}
        description={t('lab.subtitle')}
        level={1}
        action={
          <Button variant="ghost" icon={Eraser} onClick={handleClear}>
            {t('lab.clear')}
          </Button>
        }
      />

      <div className={styles.layout}>
        {/* ---------------- Maydonlar ---------------- */}
        <section className={styles.builder}>
          <div className={styles.builderHead}>
            <span className={styles.builderCount}>
              {filled}/{VISIBLE_LAB_FIELDS.length} maydon to‘ldirildi
            </span>
            <ProgressBar value={fillPercent} size="xs" className={styles.builderBar} />
          </div>

          <div className={styles.fields}>
            {VISIBLE_LAB_FIELDS.map((f) => (
              <Field key={f.key} label={t(f.labelKey)} hint={f.hint} htmlFor={'lab-' + f.key}>
                <Textarea
                  id={'lab-' + f.key}
                  rows={f.rows}
                  value={fields[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => setField(f.key, e.target.value)}
                />
              </Field>
            ))}
          </div>
        </section>

        {/* ---------------- Natija ---------------- */}
        <aside className={styles.output}>
          <Card padded={false} className={styles.outputCard}>
            <div className={styles.outputHead}>
              <span className={styles.outputTitle}>
                <Sparkles size={15} aria-hidden="true" />
                {t('lab.generated')}
              </span>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={() => copy(output)}
                disabled={!output}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? t('common.copied') : t('common.copy')}
              </button>
            </div>

            {output ? (
              <pre className={styles.preview}>{output}</pre>
            ) : (
              <div className={styles.emptyWrap}>
                <EmptyState compact icon={Wand2} title={t('lab.emptyState')} />
              </div>
            )}

            <div className={styles.tools}>
              <Button
                size="sm"
                variant="secondary"
                icon={Wand2}
                onClick={() => transform(improvePrompt, t('lab.improve'))}
                disabled={!output}
              >
                {t('lab.improve')}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon={Scissors}
                onClick={() => transform(shortenPrompt, t('lab.shorten'))}
                disabled={!output}
              >
                {t('lab.shorten')}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon={Sparkles}
                onClick={() => transform(professionalizePrompt, t('lab.professional'))}
                disabled={!output}
              >
                {t('lab.professional')}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon={Languages}
                onClick={() => transform((p) => translateHeadings(p, locale), t('lab.translate'))}
                disabled={!output || locale === 'uz'}
              >
                {t('lab.translate')}
              </Button>
            </div>

            <div className={styles.mainActions}>
              <Button icon={Save} onClick={handleSave} disabled={!output} fullWidth>
                {t('lab.savePrompt')}
              </Button>
              <Button
                variant="soft"
                icon={Play}
                onClick={handleSimulate}
                loading={simulating}
                disabled={!output}
                fullWidth
              >
                {t('lab.testInSimulator')}
              </Button>
            </div>
          </Card>

          {simulation && (
            <Card className={styles.simulation}>
              <span className={styles.simLabel}>AI simulyator</span>
              <pre className={styles.simText}>{simulation}</pre>
            </Card>
          )}

          {result && <ScorePanel result={result} compact />}
        </aside>
      </div>
    </div>
  )
}

export default PromptLab
