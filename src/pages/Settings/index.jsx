import { useRef, useState } from 'react'
import {
  Database,
  Download,
  Info,
  Languages,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Sun,
  Upload,
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../context/ToastContext'
import { PLATFORM_STATS } from '../../data'
import { downloadFile } from '../../utils/format'
import { exportAllData, importAllData } from '../../utils/storage'
import { Button, Card, Modal, SectionHeading, Segmented } from '../../components/common'
import styles from './Settings.module.css'

export function Settings() {
  const { t, locale, setLocale, locales } = useI18n()
  const { theme, setTheme } = useTheme()
  const { resetProgress } = useProgress()
  const toast = useToast()
  const fileRef = useRef(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleExport = () => {
    downloadFile('ai-mastery-backup.json', JSON.stringify(exportAllData(), null, 2))
    toast.success(t('settings.exportData'))
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const payload = JSON.parse(await file.text())
      importAllData(payload)
      toast.success(t('settings.importData'))
      setTimeout(() => window.location.reload(), 600)
    } catch (err) {
      toast.error(err.message || t('common.error'))
    } finally {
      event.target.value = ''
    }
  }

  const handleReset = () => {
    resetProgress()
    setConfirmOpen(false)
    toast.success(t('settings.resetDone'))
  }

  return (
    <div className="page">
      <SectionHeading title={t('settings.title')} level={1} />

      <div className={styles.sections}>
        {/* ---- Ko'rinish ---- */}
        <Card>
          <h2 className={styles.title}>
            <Palette size={16} aria-hidden="true" />
            {t('settings.appearance')}
          </h2>

          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>{t('settings.theme')}</span>
              <span className={styles.rowHint}>Yorug‘, tungi yoki tizim sozlamasi</span>
            </div>
            <Segmented
              value={theme}
              onChange={setTheme}
              label={t('settings.theme')}
              options={[
                { value: 'light', label: t('settings.themeLight'), icon: Sun },
                { value: 'dark', label: t('settings.themeDark'), icon: Moon },
                { value: 'system', label: t('settings.themeSystem'), icon: Monitor },
              ]}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.rowText}>
              <span className={styles.rowLabel}>
                <Languages size={14} aria-hidden="true" />
                {t('settings.language')}
              </span>
              <span className={styles.rowHint}>Interfeys tili</span>
            </div>
            <Segmented
              value={locale}
              onChange={setLocale}
              label={t('settings.language')}
              options={locales.map((l) => ({ value: l.code, label: l.flag + ' ' + l.label }))}
            />
          </div>
        </Card>

        {/* ---- Ma'lumotlar ---- */}
        <Card>
          <h2 className={styles.title}>
            <Database size={16} aria-hidden="true" />
            {t('settings.data')}
          </h2>
          <p className={styles.note}>{t('auth.demoNote')}</p>

          <div className={styles.actions}>
            <Button variant="secondary" icon={Download} onClick={handleExport}>
              {t('settings.exportData')}
            </Button>
            <Button variant="secondary" icon={Upload} onClick={() => fileRef.current?.click()}>
              {t('settings.importData')}
            </Button>
            <Button variant="dangerGhost" icon={RotateCcw} onClick={() => setConfirmOpen(true)}>
              {t('settings.resetProgress')}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className={styles.fileInput}
              aria-label={t('settings.importData')}
            />
          </div>
        </Card>

        {/* ---- Platforma haqida ---- */}
        <Card>
          <h2 className={styles.title}>
            <Info size={16} aria-hidden="true" />
            {t('settings.about')}
          </h2>
          <dl className={styles.about}>
            <div>
              <dt>Kurslar</dt>
              <dd>{PLATFORM_STATS.courses}</dd>
            </div>
            <div>
              <dt>{t('common.lessons')}</dt>
              <dd>{PLATFORM_STATS.lessons}</dd>
            </div>
            <div>
              <dt>AI vositalari</dt>
              <dd>{PLATFORM_STATS.tools}</dd>
            </div>
            <div>
              <dt>Promptlar</dt>
              <dd>{PLATFORM_STATS.prompts}</dd>
            </div>
            <div>
              <dt>Loyihalar</dt>
              <dd>{PLATFORM_STATS.projects}</dd>
            </div>
            <div>
              <dt>Challenge lar</dt>
              <dd>{PLATFORM_STATS.challenges}</dd>
            </div>
          </dl>
          <p className={styles.version}>AI Mastery · demo rejim · v1.0</p>
        </Card>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={t('settings.resetProgress')}
        description={t('settings.resetConfirm')}
        size="sm"
        footer={
          <div className={styles.modalFoot}>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="danger" icon={RotateCcw} onClick={handleReset}>
              {t('settings.resetProgress')}
            </Button>
          </div>
        }
      >
        <p className={styles.note}>
          Barcha XP, darslar, testlar, saqlangan promptlar va nishonlar o‘chiriladi. Bu amalni
          qaytarib bo‘lmaydi — avval ma’lumotlarni eksport qilib olishingiz mumkin.
        </p>
      </Modal>
    </div>
  )
}

export default Settings
