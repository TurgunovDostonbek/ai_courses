import { Navigate, useParams } from 'react-router-dom'
import {
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Sparkles,
  Star,
  Target,
  AlertTriangle,
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { PRICING, TOOLS, TOOL_CATEGORIES, getTool } from '../../data/tools'
import { Breadcrumb, Button, Card, Chip, CodeBlock } from '../../components/common'
import Icon from '../../components/common/Icon'
import { ToolCard } from '../../components/ai-tools'
import styles from './ToolDetail.module.css'

const CATEGORY_BY_ID = Object.fromEntries(TOOL_CATEGORIES.map((c) => [c.id, c]))

export function ToolDetail() {
  const { toolId } = useParams()
  const { t } = useI18n()

  const tool = getTool(toolId)
  if (!tool) return <Navigate to="/ai-tools" replace />

  const category = CATEGORY_BY_ID[tool.category]
  const related = TOOLS.filter((x) => x.category === tool.category && x.id !== tool.id).slice(0, 3)

  return (
    <div className="page">
      <Breadcrumb
        items={[
          { label: t('tools.title'), to: '/ai-tools' },
          { label: tool.name },
        ]}
      />

      <header className={styles.hero}>
        <span className={styles.logo} style={{ background: tool.color }} aria-hidden="true">
          {tool.initials}
        </span>
        <div className={styles.heroText}>
          <div className={styles.heroTop}>
            <h1 className={styles.title}>{tool.name}</h1>
            <span className={styles.rating}>
              <Star size={14} fill="currentColor" aria-hidden="true" />
              {tool.rating}
            </span>
          </div>
          <p className={styles.vendor}>
            {tool.vendor} · {tool.subtitle}
          </p>
          <div className={styles.chips}>
            {category && (
              <Chip size="sm" tone="brand">
                <Icon name={category.icon} size={12} />
                {category.label}
              </Chip>
            )}
            <Chip size="sm" tone="neutral">
              {PRICING[tool.pricing]}
            </Chip>
          </div>
        </div>
        <Button href={tool.url} icon={ExternalLink} size="lg">
          {t('tools.visit')}
        </Button>
      </header>

      <div className={styles.body}>
        <div className={styles.main}>
          <Card>
            <h2 className={styles.sectionTitle}>{t('tools.what')}</h2>
            <p className={styles.text}>{tool.what}</p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>{t('tools.why')}</h2>
            <p className={styles.text}>{tool.why}</p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>
              <Target size={15} aria-hidden="true" />
              {t('tools.when')}
            </h2>
            <ul className={styles.list}>
              {tool.when.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <div className={styles.proCon}>
            <Card className={styles.pros}>
              <h2 className={styles.sectionTitle}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {t('tools.strengths')}
              </h2>
              <ul className={styles.plainList}>
                {tool.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>

            <Card className={styles.cons}>
              <h2 className={styles.sectionTitle}>
                <AlertTriangle size={15} aria-hidden="true" />
                {t('tools.weaknesses')}
              </h2>
              <ul className={styles.plainList}>
                {tool.weaknesses.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>
          </div>

          <section className={styles.example}>
            <h2 className={styles.sectionTitle}>
              <Sparkles size={15} aria-hidden="true" />
              {t('tools.example')}
            </h2>
            <CodeBlock code={tool.examplePrompt} label={tool.name} />
          </section>
        </div>

        <aside className={styles.side}>
          <Card className={styles.useCase}>
            <h2 className={styles.sectionTitle}>{t('tools.useCase')}</h2>
            <p className={styles.text}>{tool.useCase}</p>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>
              <Lightbulb size={15} aria-hidden="true" />
              {t('tools.tips')}
            </h2>
            <ul className={styles.list}>
              {tool.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className={styles.sectionTitle}>{t('tools.bestFor')}</h2>
            <div className={styles.chips}>
              {tool.bestFor.map((item) => (
                <Chip key={item} size="sm">
                  {item}
                </Chip>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>{category?.label} — {t('tools.learnMore')}</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <ToolCard key={item.id} tool={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ToolDetail
