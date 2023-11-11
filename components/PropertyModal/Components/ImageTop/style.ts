import { MAX_WIDTH_SM } from 'config/breakpoint'
import styled from 'styled-components'

const ImageTopWrapper = styled.div`
  position: relative;
  top: -52px;
  margin: 0rem -3rem;
  ${MAX_WIDTH_SM} {
    margin: 0rem -1rem;
  }
  width: auto;
`

export { ImageTopWrapper }
