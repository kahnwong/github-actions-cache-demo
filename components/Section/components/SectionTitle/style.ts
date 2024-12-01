import styled from 'styled-components'
import { MAX_WIDTH_LG } from 'config/breakpoint'

const HeaderWrapper = styled.h2`
  margin-bottom: 0px;
  ${MAX_WIDTH_LG} {
    font-size: calc(0.8rem + 1.38vw);
  }
`

export { HeaderWrapper }
