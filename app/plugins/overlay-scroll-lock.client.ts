export default defineNuxtPlugin({
  name: 'overlay-scroll-lock',
  dependsOn: ['smooth-scroll'],
  setup(nuxtApp) {
    const locks = new Set<symbol>()

    let restore: (() => void) | undefined
    let pendingUnlock: Promise<void> | undefined
    let resolveUnlock: (() => void) | undefined

    function whenUnlocked(): Promise<void> {
      return pendingUnlock ?? Promise.resolve()
    }

    function lock() {
      const token = Symbol('overlay')

      if (locks.size === 0) {
        pendingUnlock = new Promise(resolve => {
          resolveUnlock = resolve
        })

        const html = document.documentElement
        const body = document.body
        const scrollX = window.scrollX
        const scrollY = window.scrollY
        const documentHeight = html.scrollHeight

        const properties = [
          [html, 'overflow'],
          [html, 'min-height'],
          [html, 'scroll-behavior'],
          [html, 'scrollbar-gutter'],
          [body, 'overflow'],
          [body, 'position'],
          [body, 'top'],
          [body, 'width'],
        ] as const

        const previousStyles = properties.map(([element, property]) => ({
          element,
          property,
          value: element.style.getPropertyValue(property),
          priority: element.style.getPropertyPriority(property),
        }))

        const lenisWasStopped = nuxtApp.$lenis.isStopped

        if (window.innerWidth > html.clientWidth) {
          html.style.scrollbarGutter = 'stable'
        }

        // Keep the real offset available to router history while the body is fixed
        html.style.minHeight = `max(${documentHeight}px, calc(${scrollY}px + 100dvh))`
        html.style.setProperty('scroll-behavior', 'auto', 'important')
        nuxtApp.$lenis.stop()

        html.style.overflow = 'hidden'
        body.style.overflow = 'hidden'
        body.style.position = 'fixed'
        body.style.top = `-${scrollY}px`
        body.style.width = '100%'
        window.scrollTo(scrollX, scrollY)

        restore = () => {
          for (const { element, property, value, priority } of previousStyles) {
            element.style.setProperty(property, value, priority)
          }

          const previousBehavior = html.style.scrollBehavior
          const previousPriority =
            html.style.getPropertyPriority('scroll-behavior')

          html.style.setProperty('scroll-behavior', 'auto', 'important')

          window.scrollTo(scrollX, scrollY)

          html.style.setProperty(
            'scroll-behavior',
            previousBehavior,
            previousPriority
          )

          nuxtApp.$lenis.resize()
          nuxtApp.$lenis.scrollTo(scrollY, { immediate: true, force: true })

          if (!lenisWasStopped) {
            nuxtApp.$lenis.start()
          }
        }
      }

      locks.add(token)

      return () => {
        if (locks.delete(token) && locks.size === 0) {
          restore?.()
          restore = undefined
          resolveUnlock?.()
          resolveUnlock = undefined
          pendingUnlock = undefined
        }
      }
    }

    nuxtApp.vueApp.onUnmount(() => {
      restore?.()
      locks.clear()
      restore = undefined
      resolveUnlock?.()
      resolveUnlock = undefined
      pendingUnlock = undefined
    })

    return { provide: { overlayScroll: { lock, whenUnlocked } } }
  },
})
