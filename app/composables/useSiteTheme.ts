type SiteTheme = 'light' | 'dark'

export function useSiteTheme() {
  const savedTheme = useCookie<SiteTheme>('atelierlibremotions-theme', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const theme = useState<SiteTheme | null>('site-theme', () =>
    savedTheme.value === 'light' || savedTheme.value === 'dark'
      ? savedTheme.value
      : null
  )

  function setTheme(value: SiteTheme) {
    theme.value = value
    savedTheme.value = value
  }

  return { theme, setTheme }
}
