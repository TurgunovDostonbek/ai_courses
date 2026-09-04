import { useCallback, useEffect, useRef, useState } from 'react'
import { copyText } from '../utils/format'

/** Matnni nusxalaydi va qisqa vaqt «nusxalandi» holatini ushlab turadi. */
export function useCopy(resetMs = 1800) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  const copy = useCallback(
    async (text) => {
      const ok = await copyText(text)
      if (ok) {
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), resetMs)
      }
      return ok
    },
    [resetMs]
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  return { copied, copy }
}
