import styled from 'styled-components'
import { Button } from 'react-bootstrap'

// facebook color
const StyledButton = styled(Button)`
  background-color: #1877f2;
  border-color: #1877f2;
  &:hover,
  :focus,
  :active,
  :disabled {
    background-color: #1877f2;
    border-color: #1877f2;
  }
`

export { StyledButton }
