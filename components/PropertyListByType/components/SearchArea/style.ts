import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const Wrapper = styled.div`
  display: flex;
  align-items: center !important;
  min-height: 92px;
  border-bottom: 1px solid #dee2e6 !important;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  position: relative;
`
const WrapperButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 48px;
  background: #007581;
  border-radius: 4px;
`
const WrapperLink = styled(Button)`
  font-size: 0.665em !important;
  font-weight: 400;
  line-height: 1.5em;
  color: #z ;
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
