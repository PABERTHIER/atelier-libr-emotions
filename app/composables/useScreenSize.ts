export function useScreenSize() {
  // All four queries are false at the existing 1024px SSR fallback
  const isMobile = useNativeMediaQuery('(max-width: 639.9px)', false)
  const isMediumOrBelowScreen = useNativeMediaQuery(
    '(max-width: 767.9px)',
    false
  )
  const isTablet = useNativeMediaQuery(
    '(min-width: 640px) and (max-width: 1023.9px)',
    false
  )
  const isComputer = useNativeMediaQuery('(min-width: 1024.1px)', false)

  return {
    isMobile,
    isMediumOrBelowScreen,
    isTablet,
    isComputer,
  }
}
