import { AlertTriangle, CheckCircle2, Info, Lightbulb, ThumbsDown, ThumbsUp } from 'lucide-react'
import { CodeBlock } from '../common/Misc'
import { cx } from '../../utils/format'
import LessonDemo from './LessonDemo'
import styles from './LessonBlocks.module.css'

const CALLOUT_ICONS = {
  info: Info,
  warn: AlertTriangle,
  danger: AlertTriangle,
  success: CheckCircle2,
  tip: Lightbulb,
}

function Callout({ tone = 'info', title, body }) {
  const IconCmp = CALLOUT_ICONS[tone] || Info
  return (
    <aside className={cx(styles.callout, styles['tone_' + tone])}>
      <IconCmp size={17} className={styles.calloutIcon} aria-hidden="true" />
      <div className={styles.calloutBody}>
        {title && <strong className={styles.calloutTitle}>{title}</strong>}
        <p className={styles.calloutText}>{body}</p>
      </div>
    </aside>
  )
}

function Compare({ bad, good }) {
  return (
    <div className={styles.compare}>
      <div className={cx(styles.compareCol, styles.bad)}>
        <span className={styles.compareHead}>
          <ThumbsDown size={14} aria-hidden="true" />
          {bad?.title || 'Yomon'}
        </span>
        <p className={styles.compareText}>{bad?.body}</p>
      </div>
      <div className={cx(styles.compareCol, styles.good)}>
        <span className={styles.compareHead}>
          <ThumbsUp size={14} aria-hidden="true" />
          {good?.title || 'Yaxshi'}
        </span>
        <p className={styles.compareText}>{good?.body}</p>
      </div>
    </div>
  )
}

function Table({ head = [], rows = [] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        {head.length > 0 && (
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Steps({ items = [] }) {
  return (
    <ol className={styles.steps}>
      {items.map((item, i) => (
        <li key={item.title || i} className={styles.step}>
          <span className={styles.stepNum} aria-hidden="true">
            {i + 1}
          </span>
          <div className={styles.stepBody}>
            <strong className={styles.stepTitle}>{item.title}</strong>
            {item.body && <p className={styles.stepText}>{item.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** Bitta kontent blokini render qiladi. */
export function LessonBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className={styles.heading}>{block.body}</h2>
    case 'text':
      return <p className={styles.text}>{block.body}</p>
    case 'list':
      return (
        <ul className={styles.list}>
          {(block.items || []).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'callout':
      return <Callout tone={block.tone} title={block.title} body={block.body} />
    case 'code':
      return <CodeBlock code={block.body} lang={block.lang} className={styles.code} />
    case 'compare':
      return <Compare bad={block.bad} good={block.good} />
    case 'table':
      return <Table head={block.head} rows={block.rows} />
    case 'steps':
      return <Steps items={block.items} />
    case 'demo':
      return <LessonDemo name={block.demo} />
    default:
      return null
  }
}

/** Dars kontentining to'liq ro'yxati. */
export function LessonBlocks({ blocks = [] }) {
  return (
    <div className={styles.blocks}>
      {blocks.map((block, i) => (
        <LessonBlock key={i} block={block} />
      ))}
    </div>
  )
}

export default LessonBlocks
