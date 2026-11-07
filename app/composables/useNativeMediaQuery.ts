export function useNativeMediaQuery(query: string, initialValue = false) {
  const matches = ref(initialValue)

  let mediaQuery: MediaQueryList | undefined

  function updateMatches(event: MediaQueryListEvent) {
    matches.value = event.matches
  }

  onMounted(() => {
    if (typeof window.matchMedia !== 'function') {
      return
    }

    mediaQuery = window.matchMedia(query)
    mediaQuery.addEventListener('change', updateMatches)
    matches.value = mediaQuery.matches
  })

  onScopeDispose(() => {
    mediaQuery?.removeEventListener('change', updateMatches)
  })

  return readonly(matches)
}
