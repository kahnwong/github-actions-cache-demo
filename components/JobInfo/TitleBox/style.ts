import { MAX_WIDTH_MD } from 'config/breakpoint'
import styled from 'styled-components'

interface ITitleBox {
  textAlign?: string
  textColor?: string
}

interface IBox {
  theme?: string
}

const Box = styled.h3<IBox>`
  background-color: ${({ theme }) => theme ?? '#22BB66'};

  border-radius: 4px;
`
const TitleBox = styled.div<ITitleBox>`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  padding: 0.1rem 7rem;
  margin: 0.5rem;
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  color: ${({ textColor }) => textColor ?? '#fff'};
  ${MAX_WIDTH_MD} {
    padding: 0.1rem 1rem;
  }
`
export { TitleBox, Box }
