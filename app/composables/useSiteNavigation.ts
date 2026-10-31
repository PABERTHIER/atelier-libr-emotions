export function useSiteNavigation() {
  const mobileMenuOpen = useState('mobile-menu-open', () => false)
  const desktopSection = useState<string | null>(
    'desktop-menu-section',
    () => null
  )

  function closeNavigation() {
    mobileMenuOpen.value = false
    desktopSection.value = null
  }

  return { mobileMenuOpen, desktopSection, closeNavigation }
}
