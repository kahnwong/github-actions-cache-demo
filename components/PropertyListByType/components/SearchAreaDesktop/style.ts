import styled from 'styled-components'
import { Button } from 'react-bootstrap'
// @ts-ignore
import { variables } from '@company/variables.ts'

const Wrapper = styled.div`
  display: flex;
  align-items: center !important;
  vertical-align: middle;
  position: relative;
  width: 100%;
`
const WrapperButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 48px;
  background: ${variables};
  border-radius: 4px;
`
const WrapperLink = styled(Button)`
  font-size: 0.675em !important;
  font-weight: 400;
  line-height: 1.5em;
  color: #ff8c7a ;
  background: none;
  padding: 4px !important;
  margin: 0 !important;
  border: none !important;
  box-shadow:none;
  &:hover{
    color:#fe5f47;
  }
  &:focus,
    :active,
    :visited { {
    color: #ff8c7a;
    border: none !important;
    box-shadow:none;
  }
`

export { Wrapper, WrapperButton, WrapperLink }
