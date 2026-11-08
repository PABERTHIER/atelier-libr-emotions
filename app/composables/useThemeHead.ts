export function useThemeHead() {
  const { theme } = useSiteTheme()

  // Follow the OS until the visitor chooses a theme, then keep browser chrome aligned with that choice, including in server-rendered HTML
  useHead(() => ({
    meta: [
      { mode: 'light', color: '#f7f5f2' },
      { mode: 'dark', color: '#1c1917' },
    ].map(({ mode, color }) => ({
      name: 'theme-color',
      content: color,
      media:
        theme.value === null
          ? `(prefers-color-scheme: ${mode})`
          : theme.value === mode
            ? 'all'
            : 'not all',
    })),
  }))
}
