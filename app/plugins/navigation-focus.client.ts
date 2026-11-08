export default defineNuxtPlugin({
  name: 'navigation-focus',
  dependsOn: ['overlay-scroll-lock'],
  setup(nuxtApp) {
    const router = useRouter()

    let pendingPath: string | null = null
    let frame = 0
    let focusRequest = 0

    async function focusDestination(hash: string) {
      cancelAnimationFrame(frame)

      const request = ++focusRequest
      const destination = router.currentRoute.value.fullPath

      await nuxtApp.$overlayScroll.whenUnlocked()

      if (
        request !== focusRequest ||
        destination !== router.currentRoute.value.fullPath
      ) {
        return
      }

      frame = requestAnimationFrame(() => {
        const target = hash
          ? document.getElementById(decodeURIComponent(hash.slice(1)))
          : document.getElementById('page-container')

        if (!target) {
          return
        }

        const hadTabindex = target.hasAttribute('tabindex')

        if (!hadTabindex) {
          target.setAttribute('tabindex', '-1')
          target.addEventListener(
            'blur',
            () => target.removeAttribute('tabindex'),
            {
              once: true,
            }
          )
        }

        target.focus({ preventScroll: true })
      })
    }

    const removeNavigationGuard = router.afterEach((to, from, failure) => {
      if (failure) {
        return
      }

      cancelAnimationFrame(frame)

      focusRequest++

      if (to.path !== from.path) {
        pendingPath = to.path
      } else if (to.hash && to.hash !== from.hash) {
        void focusDestination(to.hash)
      }
    })

    const removePageHook = nuxtApp.hook('page:finish', () => {
      if (pendingPath === router.currentRoute.value.path) {
        pendingPath = null

        void focusDestination(router.currentRoute.value.hash)
      }
    })

    nuxtApp.vueApp.onUnmount(() => {
      removeNavigationGuard()
      removePageHook()

      focusRequest++

      cancelAnimationFrame(frame)
    })
  },
})
