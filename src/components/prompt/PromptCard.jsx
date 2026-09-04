import { Check, Copy, Star, Wand2 } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useCopy } from '../../hooks/useCopy'
import { cx, truncate } from '../../utils/format'
import { DIFFICULTIES, PROMPT_CATEGORIES } from '../../data/prompts'
import Icon from '../common/Icon'
import { Chip } from '../common/Chip'
import styles from './Prompt.module.css'

const CATEGORY_BY_ID = Object.fromEntries(PROMPT_CATEGORIES.map((c) => [c.id, c]))

/** Prompt shabloni kartasi — kutubxona va saqlanganlar ro'yxatida. */
export function PromptCard({
  prompt,
  onUse,
  favorite,
  onToggleFavorite,
  actions,
  highlight,
}) {
  const { t } = useI18n()
  const { copied, copy } = useCopy()
  const category = CATEGORY_BY_ID[prompt.category] || PROMPT_CATEGORIES[0]

  return (
    <article className={cx(styles.card, highlight && styles.cardHighlight)}>
      <header className={styles.cardHead}>
        <span
          className={styles.cardIcon}
          style={{ background: category.color + '1f', color: category.color }}
          aria-hidden="true"
        >
          <Icon name={category.icon} size={16} />
        </span>
        <div className={styles.cardHeadText}>
          <h3 className={styles.cardTitle}>{prompt.title}</h3>
          <span className={styles.cardCategory}>{category.label}</span>
        </div>
        {onToggleFavorite && (
          <button
            type="button"
            className={cx(styles.starBtn, favorite && styles.starActive)}
            onClick={() => onToggleFavorite(prompt)}
            aria-label={t('library.favorite')}
            aria-pressed={Boolean(favorite)}
          >
            <Star size={16} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </header>

      {prompt.description && <p className={styles.cardDesc}>{prompt.description}</p>}

      <pre className={styles.preview}>{truncate(prompt.body, 220)}</pre>

      <div className={styles.tags}>
        {prompt.difficulty && (
          <Chip size="sm" tone="neutral">
            {DIFFICULTIES[prompt.difficulty] || prompt.difficulty}
          </Chip>
        )}
        {(prompt.tags || []).slice(0, 3).map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
        {prompt.variables?.length > 0 && (
          <span className={styles.varCount}>
            {prompt.variables.length} {t('library.variables').toLowerCase()}
          </span>
        )}
      </div>

      <footer className={styles.cardFoot}>
        <button type="button" className={styles.footBtn} onClick={() => copy(prompt.body)}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? t('common.copied') : t('common.copy')}
        </button>
        {onUse && (
          <button type="button" className={cx(styles.footBtn, styles.footPrimary)} onClick={() => onUse(prompt)}>
            <Wand2 size={14} />
            {t('library.customize')}
          </button>
        )}
        {actions}
      </footer>
    </article>
  )
}

export default PromptCard
