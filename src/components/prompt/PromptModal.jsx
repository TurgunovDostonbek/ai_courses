import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Copy, FlaskConical, Save } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useToast } from '../../context/ToastContext'
import { useProgress } from '../../context/ProgressContext'
import { useCopy } from '../../hooks/useCopy'
import { extractVariables, fillTemplate } from '../../utils/promptBuilder'
import { Button } from '../common/Button'
import { Field, Textarea } from '../common/Field'
import Modal from '../common/Modal'
import styles from './Prompt.module.css'

/**
 * Shablonni moslashtirish oynasi:
 * {{o'zgaruvchilar}} to'ldiriladi va natija nusxalanadi yoki saqlanadi.
 */
export function PromptModal({ prompt, open, onClose }) {
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const { savePrompt } = useProgress()
  const { copied, copy } = useCopy()
  // Har shablon uchun yangi nusxa — ota komponent `key` beradi
  const [values, setValues] = useState({})

  const variables = useMemo(
    () => (prompt ? prompt.variables?.length ? prompt.variables : extractVariables(prompt.body) : []),
    [prompt]
  )

  if (!prompt) return null

  const filled = fillTemplate(prompt.body, values)
  const remaining = variables.filter((v) => !(values[v] || '').trim()).length

  const handleSave = () => {
    savePrompt({
      title: prompt.title,
      body: filled,
      category: prompt.category,
      tags: prompt.tags,
      source: prompt.id,
    })
    toast.success(t('common.saved'))
    onClose?.()
  }

  const handleLab = () => {
    navigate('/prompt-lab', { state: { prompt: filled, title: prompt.title } })
    onClose?.()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={prompt.title}
      description={prompt.description}
      size="lg"
      footer={
        <div className={styles.modalFoot}>
          <Button variant="ghost" icon={FlaskConical} onClick={handleLab}>
            {t('nav.promptLab')}
          </Button>
          <Button variant="secondary" icon={Save} onClick={handleSave}>
            {t('lab.savePrompt')}
          </Button>
          <Button icon={copied ? Check : Copy} onClick={() => copy(filled)}>
            {copied ? t('common.copied') : t('common.copy')}
          </Button>
        </div>
      }
    >
      <div className={styles.modalBody}>
        {variables.length > 0 ? (
          <div className={styles.varGrid}>
            {variables.map((name) => (
              <Field key={name} label={name} htmlFor={'var-' + name}>
                <Textarea
                  id={'var-' + name}
                  rows={2}
                  value={values[name] || ''}
                  onChange={(e) => setValues((prev) => ({ ...prev, [name]: e.target.value }))}
                  placeholder={'{{' + name + '}}'}
                />
              </Field>
            ))}
          </div>
        ) : (
          <p className={styles.noVars}>{t('library.variables')}: —</p>
        )}

        <div className={styles.resultBlock}>
          <div className={styles.resultHead}>
            <span>{t('lab.generated')}</span>
            {remaining > 0 && (
              <span className={styles.remaining}>
                {remaining} {t('common.optional').toLowerCase()}
              </span>
            )}
          </div>
          <pre className={styles.result}>{filled}</pre>
        </div>
      </div>
    </Modal>
  )
}

export default PromptModal
