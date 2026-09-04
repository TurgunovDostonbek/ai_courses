import { Link } from 'react-router-dom'
import { ExternalLink, Star } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { cx } from '../../utils/format'
import { PRICING, TOOL_CATEGORIES } from '../../data/tools'
import Icon from '../common/Icon'
import styles from './ToolCard.module.css'

const CATEGORY_BY_ID = Object.fromEntries(TOOL_CATEGORIES.map((c) => [c.id, c]))

/** AI vositasi kartasi. */
export function ToolCard({ tool }) {
  const { t } = useI18n()
  const category = CATEGORY_BY_ID[tool.category]

  return (
    <article className={cx(styles.card, tool.featured && styles.featured)}>
      <Link to={'/ai-tools/' + tool.id} className={styles.main}>
        <div className={styles.head}>
          <span className={styles.logo} style={{ background: tool.color }} aria-hidden="true">
            {tool.initials}
          </span>
          <div className={styles.headText}>
            <h3 className={styles.name}>{tool.name}</h3>
            <span className={styles.vendor}>{tool.vendor}</span>
          </div>
          <span className={styles.rating}>
            <Star size={12} fill="currentColor" aria-hidden="true" />
            {tool.rating}
          </span>
        </div>

        <p className={styles.subtitle}>{tool.subtitle}</p>

        <div className={styles.bestFor}>
          {(tool.bestFor || []).slice(0, 3).map((item) => (
            <span key={item} className={styles.pill}>
              {item}
            </span>
          ))}
        </div>
      </Link>

      <footer className={styles.foot}>
        {category && (
          <span className={styles.category} style={{ color: category.color }}>
            <Icon name={category.icon} size={13} />
            {category.label}
          </span>
        )}
        <span className={cx(styles.pricing, styles['p_' + tool.pricing])}>{PRICING[tool.pricing]}</span>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visit}
          aria-label={tool.name + ' — ' + t('tools.visit')}
        >
          <ExternalLink size={14} />
        </a>
      </footer>
    </article>
  )
}

export default ToolCard
