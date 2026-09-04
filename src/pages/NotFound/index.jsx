import { Compass, Home, Search } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { Button } from '../../components/common'
import styles from './NotFound.module.css'

export function NotFound() {
  const { t } = useI18n()

  return (
    <div className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">
        <Compass size={30} />
      </span>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>{t('error.notFound')}</h1>
      <p className={styles.text}>{t('error.notFoundText')}</p>
      <div className={styles.actions}>
        <Button to="/dashboard" icon={Home}>
          {t('error.goHome')}
        </Button>
        <Button to="/courses" variant="secondary" icon={Search}>
          {t('courses.title')}
        </Button>
      </div>
    </div>
  )
}

export default NotFound
