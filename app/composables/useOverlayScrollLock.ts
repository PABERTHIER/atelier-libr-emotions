export function useOverlayScrollLock() {
  const { $overlayScroll } = useNuxtApp()

  let release: (() => void) | undefined

  function lockScroll() {
    release ??= $overlayScroll.lock()
  }

  function unlockScroll() {
    release?.()
    release = undefined
  }

  onBeforeUnmount(unlockScroll)

  return { lockScroll, unlockScroll }
}
