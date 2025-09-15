import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreenSize() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')
  const isTablet = breakpoints.between('sm', 'lg')
  const isComputer = breakpoints.greater('lg')

  const device = reactive({ isMobile, isTablet, isComputer })

  return {
    ...toRefs(device),
  }
}
