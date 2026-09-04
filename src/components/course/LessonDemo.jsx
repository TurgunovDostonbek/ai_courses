import { useMemo, useState } from 'react'
import { RotateCcw, Sparkles } from 'lucide-react'
import { cx } from '../../utils/format'
import styles from './LessonDemo.module.css'

/* ------------------------------------------------------------------ */
/* 1. Temperature — tasodifiylik darajasi                              */
/* ------------------------------------------------------------------ */

const TEMPERATURE_SAMPLES = [
  {
    max: 0.2,
    label: 'Deterministik',
    text: 'Yangi mahsulotimiz bugun sotuvga chiqdi. Batafsil ma’lumot saytimizda.',
    note: 'Har safar deyarli bir xil javob. Fakt, tarjima va JSON uchun eng yaxshisi.',
  },
  {
    max: 0.6,
    label: 'Muvozanatli',
    text: 'Kutilgan kun keldi — yangi mahsulotimiz endi sizniki bo‘lishi mumkin. Batafsil: saytda.',
    note: 'Aniqlik va tabiiylik o‘rtasida. Kundalik yozish uchun standart tanlov.',
  },
  {
    max: 1.01,
    label: 'Ijodiy',
    text: 'Uzoq kutilgan lahza: qutini ochasiz — va ertangi kuningiz biroz boshqacha boshlanadi.',
    note: 'Variantlar rang-barang, lekin barqarorlik pasayadi. Brainstorm uchun.',
  },
]

function TemperatureDemo() {
  const [temp, setTemp] = useState(0.4)
  const sample = TEMPERATURE_SAMPLES.find((s) => temp < s.max) || TEMPERATURE_SAMPLES[2]

  return (
    <div className={styles.demo}>
      <DemoHead title="Temperature bilan tajriba" hint="Slayderni suring va javob qanday o‘zgarishini ko‘ring" />
      <div className={styles.sliderRow}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className={styles.slider}
          aria-label="Temperature"
        />
        <span className={styles.sliderValue}>{temp.toFixed(1)}</span>
      </div>
      <div className={styles.output}>
        <span className={styles.badge}>{sample.label}</span>
        <p className={styles.outputText}>{sample.text}</p>
        <p className={styles.note}>{sample.note}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Next token — keyingi tokenni bashorat qilish                     */
/* ------------------------------------------------------------------ */

const NEXT_TOKEN_TREE = {
  'Osmon': [
    { token: 'ko‘k', p: 0.42 },
    { token: 'bulutli', p: 0.21 },
    { token: 'ochiq', p: 0.14 },
    { token: 'tiniq', p: 0.09 },
  ],
  'Osmon ko‘k': [
    { token: 'va', p: 0.31 },
    { token: 'rangda', p: 0.27 },
    { token: 'edi', p: 0.18 },
    { token: 'bo‘lib', p: 0.11 },
  ],
  'Osmon ko‘k va': [
    { token: 'quyoshli', p: 0.34 },
    { token: 'toza', p: 0.22 },
    { token: 'sokin', p: 0.17 },
    { token: 'salqin', p: 0.12 },
  ],
}

const FALLBACK_TOKENS = [
  { token: 'kun', p: 0.29 },
  { token: 'havo', p: 0.24 },
  { token: 'edi', p: 0.16 },
  { token: 'boshlandi', p: 0.11 },
]

function NextTokenDemo() {
  const [text, setText] = useState('Osmon')
  const options = NEXT_TOKEN_TREE[text] || FALLBACK_TOKENS

  return (
    <div className={styles.demo}>
      <DemoHead
        title="Model keyingi so‘zni qanday tanlaydi"
        hint="Variantni bosing — model xuddi shunday, ehtimollik bo‘yicha davom ettiradi"
      />
      <p className={styles.sentence}>
        {text}
        <span className={styles.caret} aria-hidden="true" />
      </p>
      <div className={styles.tokens}>
        {options.map((opt) => (
          <button
            key={opt.token}
            type="button"
            className={styles.token}
            onClick={() => setText((prev) => prev + ' ' + opt.token)}
          >
            <span className={styles.tokenBar} style={{ width: Math.round(opt.p * 100) + '%' }} aria-hidden="true" />
            <span className={styles.tokenText}>{opt.token}</span>
            <span className={styles.tokenP}>{Math.round(opt.p * 100)}%</span>
          </button>
        ))}
      </div>
      <button type="button" className={styles.reset} onClick={() => setText('Osmon')}>
        <RotateCcw size={13} /> Boshidan
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Tokenizer — matnni tokenlarga bo'lish (taxminiy)                 */
/* ------------------------------------------------------------------ */

/** Taxminiy tokenizatsiya: ~4 belgi = 1 token qoidasiga yaqin bo'laklash. */
function tokenize(text) {
  const chunks = []
  const words = text.split(/(\s+)/).filter(Boolean)
  for (const word of words) {
    if (/^\s+$/.test(word)) {
      chunks.push(word)
      continue
    }
    if (word.length <= 4) {
      chunks.push(word)
    } else {
      for (let i = 0; i < word.length; i += 4) chunks.push(word.slice(i, i + 4))
    }
  }
  return chunks
}

function TokenizerDemo() {
  const [text, setText] = useState('Prompt engineering — AI bilan ishlashning eng muhim ko‘nikmasi.')
  const chunks = useMemo(() => tokenize(text), [text])
  const tokenCount = chunks.filter((c) => !/^\s+$/.test(c)).length

  return (
    <div className={styles.demo}>
      <DemoHead title="Tokenizer" hint="Matn yozing — model uni qanday bo‘laklarga ajratishini ko‘ring" />
      <textarea
        className={styles.textarea}
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Tokenlarga ajratiladigan matn"
      />
      <div className={styles.chunks}>
        {chunks.map((chunk, i) =>
          /^\s+$/.test(chunk) ? (
            <span key={i}> </span>
          ) : (
            <span key={i} className={cx(styles.chunk, styles['chunk' + (i % 4)])}>
              {chunk}
            </span>
          )
        )}
      </div>
      <div className={styles.stats}>
        <span>
          Belgilar: <strong>{text.length}</strong>
        </span>
        <span>
          Tokenlar (taxminan): <strong>{tokenCount}</strong>
        </span>
        <span>
          So‘zlar: <strong>{text.trim() ? text.trim().split(/\s+/).length : 0}</strong>
        </span>
      </div>
      <p className={styles.note}>
        Bu — soddalashtirilgan model. Real tokenizator tilga qarab boshqacha bo‘ladi: o‘zbekcha matn
        inglizchaga qaraganda ko‘proq token oladi.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Context window — oyna to'lishi                                   */
/* ------------------------------------------------------------------ */

const CONTEXT_PARTS = [
  { key: 'system', label: 'System prompt', tokens: 400, color: 'var(--brand)' },
  { key: 'history', label: 'Suhbat tarixi', tokens: 0, color: 'var(--accent-500)' },
  { key: 'document', label: 'Yuklangan hujjat', tokens: 0, color: 'var(--info)' },
  { key: 'answer', label: 'Javob uchun joy', tokens: 2000, color: 'var(--success)' },
]

function ContextWindowDemo() {
  const [messages, setMessages] = useState(6)
  const [docPages, setDocPages] = useState(4)
  const limit = 16000

  const parts = CONTEXT_PARTS.map((p) => {
    if (p.key === 'history') return { ...p, tokens: messages * 320 }
    if (p.key === 'document') return { ...p, tokens: docPages * 800 }
    return p
  })
  const used = parts.reduce((s, p) => s + p.tokens, 0)
  const overflow = used > limit

  return (
    <div className={styles.demo}>
      <DemoHead title="Context window to‘lishi" hint="16 000 tokenlik oyna — nima qayerda joy egallaydi" />

      <div className={styles.controls}>
        <label className={styles.control}>
          <span>
            Suhbat xabarlari: <strong>{messages}</strong>
          </span>
          <input
            type="range"
            min="0"
            max="40"
            value={messages}
            onChange={(e) => setMessages(Number(e.target.value))}
            className={styles.slider}
          />
        </label>
        <label className={styles.control}>
          <span>
            Hujjat sahifalari: <strong>{docPages}</strong>
          </span>
          <input
            type="range"
            min="0"
            max="20"
            value={docPages}
            onChange={(e) => setDocPages(Number(e.target.value))}
            className={styles.slider}
          />
        </label>
      </div>

      <div className={styles.window} role="img" aria-label={'Oynadan ' + used + ' token band'}>
        {parts.map((p) => (
          <span
            key={p.key}
            className={styles.windowPart}
            style={{ width: Math.min(100, (p.tokens / limit) * 100) + '%', background: p.color }}
            title={p.label + ': ' + p.tokens + ' token'}
          />
        ))}
      </div>

      <div className={styles.legend}>
        {parts.map((p) => (
          <span key={p.key} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: p.color }} aria-hidden="true" />
            {p.label} — {p.tokens.toLocaleString()}
          </span>
        ))}
      </div>

      <p className={cx(styles.note, overflow && styles.noteDanger)}>
        {overflow
          ? 'Oyna to‘ldi (' + used.toLocaleString() + ' / ' + limit.toLocaleString() + '). Eng eski xabarlar kesiladi — model ularni umuman ko‘rmaydi.'
          : 'Band: ' + used.toLocaleString() + ' / ' + limit.toLocaleString() + ' token. Yana ' + (limit - used).toLocaleString() + ' token joy bor.'}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function DemoHead({ title, hint }) {
  return (
    <div className={styles.head}>
      <span className={styles.headIcon} aria-hidden="true">
        <Sparkles size={15} />
      </span>
      <div>
        <strong className={styles.headTitle}>{title}</strong>
        {hint && <p className={styles.headHint}>{hint}</p>}
      </div>
      <span className={styles.live}>interaktiv</span>
    </div>
  )
}

const DEMOS = {
  temperature: TemperatureDemo,
  nextToken: NextTokenDemo,
  tokenizer: TokenizerDemo,
  contextWindow: ContextWindowDemo,
}

/** Dars ichidagi interaktiv demo. Noma'lum nom uchun hech narsa chiqmaydi. */
export function LessonDemo({ name }) {
  const Cmp = DEMOS[name]
  if (!Cmp) return null
  return <Cmp />
}

export default LessonDemo
