import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const StyledButton = styled(Button)`
  color: #222529;
  background-color: #ffffff;
  border-color: #cfd4d9;

  &:hover,
  :focus,
  :active,
  :disabled {
    color: #222529;
    background-color: #ffffff;
    border-color: #cfd4d9;
  }
`
const StyledText = styled.span`
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 18px;
`
export { StyledButton, StyledText }
