import styled from 'styled-components'
// @ts-ignore
import { variables } from '@company/variables'
import { Form } from 'react-bootstrap'

interface IFormInputCheckbox {
  color?: string
  textColor?: string
}

const Warpper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px 20px;
`

const InputCheckbox = styled(Form.Check)<IFormInputCheckbox>`
  .form-check-input:checked {
    background-color: ${({ color }) => color ?? variables.secondary};
    border-color: ${({ color }) => color ?? variables.secondary};
  }
  cursor: pointer;
`
const InputLabel = styled.label`
  margin-left: 9px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.3125em;
`

export { Warpper, InputCheckbox, InputLabel }
