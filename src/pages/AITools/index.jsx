import { useMemo, useState } from 'react'
import { Wrench } from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { useDebounce } from '../../hooks/useDebounce'
import { PRICING, TOOLS, TOOL_CATEGORIES } from '../../data/tools'
import {
  EmptyState,
  FilterChip,
  SearchInput,
  SectionHeading,
  Segmented,
} from '../../components/common'
import { ToolCard } from '../../components/ai-tools'
import styles from './AITools.module.css'

const SORTS = [
  { value: 'rating', label: 'Reyting' },
  { value: 'name', label: 'Nom' },
]

export function AITools() {
  const { t } = useI18n()
  const [category, setCategory] = useState('all')
  const [pricing, setPricing] = useState('all')
  const [sort, setSort] = useState('rating')
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 220)

  const counts = useMemo(() => {
    const map = { all: TOOLS.length }
    for (const tool of TOOLS) map[tool.category] = (map[tool.category] || 0) + 1
    return map
  }, [])

  const visible = useMemo(() => {
    const q = debounced.trim().toLowerCase()
    return TOOLS.filter((tool) => {
      if (category !== 'all' && tool.category !== category) return false
      if (pricing !== 'all' && tool.pricing !== pricing) return false
      if (!q) return true
      return [tool.name, tool.vendor, tool.subtitle, ...(tool.bestFor || [])]
        .join(' ')
        .toLowerCase()
        .includes(q)
    }).sort((a, b) => (sort === 'rating' ? b.rating - a.rating : a.name.localeCompare(b.name)))
  }, [category, pricing, sort, debounced])

  return (
    <div className="page page--wide">
      <SectionHeading
        eyebrow={t('nav.practice')}
        title={t('tools.title')}
        description={t('tools.subtitle')}
        level={1}
      />

      <div className={styles.controls}>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={t('common.searchPlaceholder')}
          className={styles.search}
        />
        <div className={styles.controlRight}>
          <Segmented
            options={[
              { value: 'all', label: t('common.all') },
              ...Object.entries(PRICING).map(([value, label]) => ({ value, label })),
            ]}
            value={pricing}
            onChange={setPricing}
            size="sm"
            label={t('tools.pricing')}
          />
          <Segmented options={SORTS} value={sort} onChange={setSort} size="sm" label="Saralash" />
        </div>
      </div>

      <div className={styles.filters}>
        <FilterChip active={category === 'all'} count={counts.all} onClick={() => setCategory('all')}>
          {t('common.all')}
        </FilterChip>
        {TOOL_CATEGORIES.map((c) => (
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

      {visible.length === 0 ? (
        <EmptyState icon={Wrench} title={t('common.noResults')} description={t('common.tryAgain')} />
      ) : (
        <div className={styles.grid}>
          {visible.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AITools
