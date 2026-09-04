import { useEffect } from 'react'

/**
 * Global klaviatura yorlig'i.
 * @param {string} key - masalan 'k' yoki 'Escape'
 * @param {Function} handler
 * @param {{ctrl?:boolean, meta?:boolean, shift?:boolean, enabled?:boolean}} options
 */
export function useHotkey(key, handler, options = {}) {
  const { ctrl = false, shift = false, enabled = true } = options

  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e) => {
      const modifierOk = ctrl ? e.ctrlKey || e.metaKey : true
      const shiftOk = shift ? e.shiftKey : true
      if (e.key.toLowerCase() === key.toLowerCase() && modifierOk && shiftOk) {
        handler(e)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, handler, ctrl, shift, enabled])
}
