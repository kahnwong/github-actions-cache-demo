import styled from 'styled-components'

const LogoWrapper = styled.div``
const QuoteWrapper = styled.blockquote`
  font-size: 0.75rem;
  letter-spacing: 1px;
  color: var(--bs-primary);
`

const ButtonWrapper = styled.div`
  max-width: 340px;
`

const CompanyLogo = styled.img`
  width: 24px;
  height: 24px;
`
const FooterNoteWrapper = styled.small`
  font-size: 0.75rem;
`

export {
  CompanyLogo,
  ButtonWrapper,
  LogoWrapper,
  FooterNoteWrapper,
  QuoteWrapper
}
