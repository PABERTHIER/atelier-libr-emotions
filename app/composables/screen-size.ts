import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useScreenSize() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('sm')
  const isMediumOrBelowScreen = breakpoints.smaller('md')
  const isTablet = breakpoints.between('sm', 'lg')
  const isComputer = breakpoints.greater('lg')

  const device = reactive({
    isMobile,
    isMediumOrBelowScreen,
    isTablet,
    isComputer,
  })

  return {
    ...toRefs(device),
  }
}
