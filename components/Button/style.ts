import styled from 'styled-components'
import { Button } from 'react-bootstrap'

// @ts-ignore
import { variables } from '@company/variables.ts'

const Wrapper = styled(Button)`
  &.bn-gradient-1 {
    background-color: rgba(0, 117, 129, 0.05);
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(50, 181, 101, 0.1) 100%
    );
  }
  &.bn-gradient-2 {
    background-color: rgba(0, 117, 129, 0.05);
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 181, 255, 0.1) 100%
    );
  }
  &.bn-gradient-3 {
    background-color: rgba(0, 117, 129, 0.05);
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 100, 191, 0.1) 100%
    );
  }
  &.bn-btn-gradient {
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 117, 129, 0.5) 100%
    );
  }
  &.bn-btn-gradient-secondary {
    background: linear-gradient(
      180deg,
      ${variables.secondary} 0%,
      #009571 100%
    );
  }
  &.bn-btn-gradient-primary {
    background: linear-gradient(180deg, ${variables.primary} 0%, #076077 100%);
  }
`

export { Wrapper }
