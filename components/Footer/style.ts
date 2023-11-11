import styled from 'styled-components'
import { MAX_WIDTH_LG } from 'config/breakpoint'
// @ts-ignore
import { variables } from '@company/variables.ts'

const FooterWrapper = styled.footer`
  display: block;
  color: #ffffff;
  margin: 0;
`
const FooterTop = styled.div`
  background-color: ${variables.primary};
  font-size: 14px;
  padding: 0 22px;
`

const FooterBottom = styled.div`
  display: block;
  background-color: #222529;
  color: #ffffff;
  padding: 1rem 0;
  font-size: 16px;
  ${MAX_WIDTH_LG} {
    font-size: 16px;
  }
`

export { FooterWrapper, FooterBottom, FooterTop }
