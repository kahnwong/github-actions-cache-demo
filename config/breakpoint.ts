const SCREEN_BREAKPOINT = {
  se: 350,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}
const BREAKPOINT_DOWN = 0.02
export const SCREEN_BREAK_POINT_SE = SCREEN_BREAKPOINT.se
export const SCREEN_BREAK_POINT_SM = SCREEN_BREAKPOINT.sm
export const SCREEN_BREAK_POINT_MD = SCREEN_BREAKPOINT.md
export const SCREEN_BREAK_POINT_LG = SCREEN_BREAKPOINT.lg
export const SCREEN_BREAK_POINT_XL = SCREEN_BREAKPOINT.xl
export const SCREEN_BREAK_POINT_XXL = SCREEN_BREAKPOINT.xxl
export const MIN_WIDTH_SE = `@media only screen and (min-width: ${SCREEN_BREAKPOINT.se}px)`
export const MIN_WIDTH_SM = `@media only screen and (min-width: ${SCREEN_BREAKPOINT.sm}px)`
export const MIN_WIDTH_MD = `@media only screen and (min-width: ${SCREEN_BREAKPOINT.md}px)`
export const MIN_WIDTH_LG = `@media only screen and (min-width: ${SCREEN_BREAKPOINT.lg}px)`
export const MIN_WIDTH_XL = `@media only screen and (min-width: ${SCREEN_BREAKPOINT.xl}px)`
export const MIN_WIDTH_XXL = `@media only screen and (min-width: ${SCREEN_BREAKPOINT.xxl}px)`
export const MAX_WIDTH_SE = `@media only screen and (max-width: ${
  SCREEN_BREAKPOINT.se - BREAKPOINT_DOWN
}px)`
export const MAX_WIDTH_SM = `@media only screen and (max-width: ${
  SCREEN_BREAKPOINT.sm - BREAKPOINT_DOWN
}px)`
export const MAX_WIDTH_MD = `@media only screen and (max-width: ${
  SCREEN_BREAKPOINT.md - BREAKPOINT_DOWN
}px)`
export const MAX_WIDTH_LG = `@media only screen and (max-width: ${
  SCREEN_BREAKPOINT.lg - BREAKPOINT_DOWN
}px)`
export const MAX_WIDTH_XL = `@media only screen and (max-width: ${
  SCREEN_BREAKPOINT.xl - BREAKPOINT_DOWN
}px)`
export const MAX_WIDTH_XXL = `@media only screen and (max-width: ${
  SCREEN_BREAKPOINT.xxl - BREAKPOINT_DOWN
}px)`
