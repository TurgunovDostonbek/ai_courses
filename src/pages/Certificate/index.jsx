import { useState } from 'react'
import { Award, Download, Lock, Printer, ScrollText } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { COURSES } from '../../data/courses'
import { downloadFile, formatDate } from '../../utils/format'
import { Button, Card, Field, Input, ProgressBar, SectionHeading } from '../../components/common'
import styles from './Certificate.module.css'

const REQUIRED_PROGRESS = 80

export function Certificate() {
  const { t, locale } = useI18n()
  const toast = useToast()
  const { user } = useAuth()
  const { stats, progress, issueCertificate } = useProgress()
  const [name, setName] = useState(user.name || '')

  const certificate = progress.certificate
  const unlocked = stats.overallProgress >= REQUIRED_PROGRESS

  const handleIssue = () => {
    if (!name.trim()) return
    const cert = issueCertificate(name.trim())
    toast.success(cert.id, { title: t('cert.title') })
  }

  const handleDownload = () => {
    if (!certificate) return
    const text = [
      'AI MASTERY — SERTIFIKAT',
      '',
      t('cert.presentedTo') + ': ' + certificate.name,
      t('cert.forCompleting') + ': AI Mastery — ' + COURSES.length + ' darajali dastur',
      t('cert.score') + ': ' + certificate.score + '%',
      t('cert.date') + ': ' + formatDate(certificate.issuedAt, locale),
      t('cert.id') + ': ' + certificate.id,
      '',
      'XP: ' + stats.xp + ' · ' + t('common.lessons') + ': ' + stats.completedLessons + '/' + stats.totalLessons,
    ].join('\n')
    downloadFile('ai-mastery-sertifikat.txt', text, 'text/plain')
  }

  return (
    <div className="page">
      <SectionHeading
        eyebrow={t('nav.progress')}
        title={t('cert.title')}
        description={t('cert.subtitle')}
        level={1}
      />

      {!unlocked && !certificate ? (
        <Card className={styles.locked}>
          <span className={styles.lockIcon} aria-hidden="true">
            <Lock size={24} />
          </span>
          <h2 className={styles.lockedTitle}>{t('cert.locked')}</h2>
          <p className={styles.lockedText}>
            {t('cert.requirement')} — hozir {stats.overallProgress}% ({REQUIRED_PROGRESS}% kerak)
          </p>
          <ProgressBar value={stats.overallProgress} size="md" showValue className={styles.lockedBar} />
          <Button to="/courses" icon={ScrollText}>
            {t('courses.title')}
          </Button>
        </Card>
      ) : (
        <div className={styles.wrap}>
          {!certificate && (
            <Card className={styles.form}>
              <Field
                label={t('cert.name')}
                htmlFor="cert-name"
                hint="Sertifikatda aynan shu ism chiqadi"
              >
                <Input
                  id="cert-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('cert.namePlaceholder')}
                />
              </Field>
              <Button icon={Award} onClick={handleIssue} disabled={!name.trim()} size="lg">
                {t('cert.title')}
              </Button>
            </Card>
          )}

          {certificate && (
            <>
              <div className={styles.certificate} id="certificate">
                <div className={styles.certInner}>
                  <div className={styles.certHead}>
                    <span className={styles.certMark} aria-hidden="true">
                      <Award size={26} />
                    </span>
                    <span className={styles.certBrand}>AI MASTERY</span>
                  </div>

                  <span className={styles.certLabel}>{t('cert.presentedTo')}</span>
                  <h2 className={styles.certName}>{certificate.name}</h2>

                  <p className={styles.certFor}>
                    {t('cert.forCompleting')} — {COURSES.length} darajali AI va Prompt Engineering dasturi
                  </p>

                  <dl className={styles.certMeta}>
                    <div>
                      <dt>{t('cert.score')}</dt>
                      <dd>{certificate.score}%</dd>
                    </div>
                    <div>
                      <dt>{t('cert.date')}</dt>
                      <dd>{formatDate(certificate.issuedAt, locale)}</dd>
                    </div>
                    <div>
                      <dt>{t('cert.id')}</dt>
                      <dd className={styles.certId}>{certificate.id}</dd>
                    </div>
                  </dl>

                  <div className={styles.certFoot}>
                    <span>
                      {stats.completedLessons}/{stats.totalLessons} {t('common.lessons')}
                    </span>
                    <span>{stats.xp} XP</span>
                    <span>{stats.badges.length} {t('nav.badges').toLowerCase()}</span>
                  </div>
                </div>
              </div>

              <div className={styles.actions}>
                <Button icon={Printer} variant="secondary" onClick={() => window.print()}>
                  {t('cert.print')}
                </Button>
                <Button icon={Download} onClick={handleDownload}>
                  {t('cert.download')}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Certificate
