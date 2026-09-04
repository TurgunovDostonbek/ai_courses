import { useCallback, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/**
 * localStorage bilan sinxronlanadigan state.
 * Boshqa tab'dagi o'zgarishlarni ham tinglaydi.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        writeStorage(key, resolved)
        return resolved
      })
    },
    [key]
  )

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== key) return
      setValue(readStorage(key, initialValue))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // initialValue ataylab bog'liqlikda emas — faqat kalit o'zgarishi muhim
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [value, set]
}
