import styled from 'styled-components'

interface ITitleText {
  textAlign?: string
  textColor?: string
  underLineColor?: string
}

const TitleText = styled.h3<ITitleText>`
  font-style: normal;
  margin-bottom: 44px;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  text-decoration: underline;
  text-underline-offset: 16px;
  text-align: ${({ textAlign }) => textAlign ?? 'center'};
  color: ${({ textColor }) => textColor ?? '#222529'};
  text-decoration-color: ${({ underLineColor }) => underLineColor ?? '#222529'};
`
export { TitleText }
