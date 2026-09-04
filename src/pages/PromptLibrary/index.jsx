import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Copy, Library, Star, Trash2 } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useProgress } from '../../context/ProgressContext'
import { useToast } from '../../context/ToastContext'
import { useDebounce } from '../../hooks/useDebounce'
import { PROMPTS, PROMPT_CATEGORIES } from '../../data/prompts'
import {
  EmptyState,
  FilterChip,
  SearchInput,
  SectionHeading,
  Tabs,
} from '../../components/common'
import { PromptCard, PromptModal } from '../../components/prompt'
import styles from './PromptLibrary.module.css'

export function PromptLibrary() {
  const { t } = useI18n()
  const toast = useToast()
  const { savedPrompts, deleteSavedPrompt, duplicateSavedPrompt, toggleFavoritePrompt } = useProgress()
  const [searchParams, setSearchParams] = useSearchParams()

  const [tab, setTab] = useState('all')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [active, setActive] = useState(null)

  const debouncedQuery = useDebounce(query, 220)

  const handleQuery = (value) => {
    setQuery(value)
    if (value) setSearchParams({ q: value }, { replace: true })
    else setSearchParams({}, { replace: true })
  }

  const counts = useMemo(() => {
    const map = { all: PROMPTS.length }
    for (const p of PROMPTS) map[p.category] = (map[p.category] || 0) + 1
    return map
  }, [])

  const filtered = useMemo(() => {
    const source = tab === 'saved' ? savedPrompts : PROMPTS
    const q = debouncedQuery.trim().toLowerCase()
    return source.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      const haystack = [p.title, p.description, p.body, ...(p.tags || [])].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [tab, category, debouncedQuery, savedPrompts])

  const tabs = [
    { value: 'all', label: t('library.title'), count: PROMPTS.length },
    { value: 'saved', label: t('library.saved'), count: savedPrompts.length, icon: Star },
  ]

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.practice')}
        title={t('library.title')}
        description={t('library.subtitle')}
        level={1}
      />

      <div className={styles.controls}>
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <SearchInput
          value={query}
          onChange={handleQuery}
          placeholder={t('common.searchPlaceholder')}
          className={styles.search}
        />
      </div>

      <div className={styles.filters}>
        <FilterChip active={category === 'all'} count={counts.all} onClick={() => setCategory('all')}>
          {t('common.all')}
        </FilterChip>
        {PROMPT_CATEGORIES.map((c) => (
          <FilterChip
            key={c.id}
            active={category === c.id}
            count={counts[c.id] || 0}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Library}
          title={tab === 'saved' ? t('library.savedEmpty') : t('common.noResults')}
          description={tab === 'saved' ? t('lab.emptyState') : t('common.tryAgain')}
        />
      ) : (
        <div className={styles.grid}>
          {filtered.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onUse={setActive}
              favorite={tab === 'saved' ? prompt.favorite : undefined}
              onToggleFavorite={tab === 'saved' ? (p) => toggleFavoritePrompt(p.id) : undefined}
              actions={
                tab === 'saved' ? (
                  <>
                    <button
                      type="button"
                      className={styles.iconAction}
                      onClick={() => duplicateSavedPrompt(prompt.id)}
                      aria-label={t('common.duplicate')}
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconActionDanger}
                      onClick={() => {
                        deleteSavedPrompt(prompt.id)
                        toast.info(t('common.delete'))
                      }}
                      aria-label={t('common.delete')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : null
              }
            />
          ))}
        </div>
      )}

      <PromptModal key={active?.id} prompt={active} open={Boolean(active)} onClose={() => setActive(null)} />
    </div>
  )
}

export default PromptLibrary
