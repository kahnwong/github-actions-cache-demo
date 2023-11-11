import { Button as ButtonBootstrap } from 'react-bootstrap'
import styled from 'styled-components'
// @ts-ignore
import { variables } from '@company/variables.ts'

interface IFormButton {
  color?: string
  textColor?: string
}

const Button = styled(ButtonBootstrap)<IFormButton>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 54px;
  border-radius: 4px;
  border: 4px;
  color: ${({ textColor }) => textColor ?? '#fff'};
  background: ${({ color }) => color ?? variables.secondary};
  border-color: ${({ color }) => color ?? variables.secondary};
  :hover {
    opacity: 0.8;
    background: ${({ color }) => color ?? variables.secondary};
    border-color: ${({ color }) => color ?? variables.secondary};
  }
  :disabled {
    background: ${({ color }) => color ?? variables.secondary};
    border-color: ${({ color }) => color ?? variables.secondary};
  }
`

export { Button }
