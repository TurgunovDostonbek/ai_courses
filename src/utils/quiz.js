/** Quiz javoblarini tekshirish mantiqi — UI dan alohida saqlanadi. */

import { normalizeAnswer } from './format'

/** Javob to'g'rimi? Har savol turi uchun bitta joyda. */
export function isAnswerCorrect(question, value) {
  switch (question.type) {
    case 'multiple':
    case 'promptfix':
    case 'scenario':
    case 'truefalse':
      return value === question.answer
    case 'fill':
      return (question.answer || []).some(
        (a) => normalizeAnswer(a) === normalizeAnswer(value || '')
      )
    case 'matching':
      return (question.pairs || []).every((pair, i) => value?.[i] === pair.right)
    default:
      return false
  }
}

/** Savolga javob berilganmi (tekshirish tugmasini yoqish uchun). */
export function hasAnswer(question, value) {
  if (question.type === 'matching') {
    return (question.pairs || []).every((_, i) => Boolean(value?.[i]))
  }
  if (question.type === 'fill') return Boolean((value || '').trim())
  return value !== undefined && value !== null
}
