import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreenSize() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')

  const device = reactive({ isMobile })

  return {
    ...toRefs(device),
  }
}
