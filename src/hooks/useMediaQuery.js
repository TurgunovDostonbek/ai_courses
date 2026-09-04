import { useCallback, useSyncExternalStore } from 'react'

/**
 * CSS media query natijasini kuzatadi.
 * useSyncExternalStore — brauzer holati bilan to'g'ridan-to'g'ri sinxron.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export const useIsMobile = () => useMediaQuery('(max-width: 900px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1100px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
