import styled from 'styled-components'
import { Button } from 'react-bootstrap'
// @ts-ignore
import { variables } from '@company/variables.ts'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center !important;
  vertical-align: middle;
`
const WrapperButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 50px;
  background: ${variables.primary}};
  border-radius: 4px;
`
const WrapperLink = styled(Button)`
  font-size: 0.665em !important;
  font-weight: 400;
  line-height: 1.5em;
  color: #ff8c7a;
  background: none;
  padding: 4px !important;
  margin: 0 !important;
  border: none !important;
  box-shadow: none;
  &:hover {
    color: #fe5f47;
  }
  &:focus,
  :active,
  :visited {
    color: #ff8c7a;
    border: none !important;
    box-shadow: none;
  }
`
const ButtonModal = styled(Button)`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  border: 1px solid rgba(47, 72, 88, 0.1);
  color: rgba(47, 72, 88, 0.8);
  background-color: white;
  box-shadow: none;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2;
  svg {
    opacity: 0.5;
  }
  &:hover,
  :focus,
  :focus-visible,
  :focus-within,
  :target,
  :active,
  :visited {
    color: #ff8c7a;
    border: 1px solid rgba(47, 72, 88, 0.1);
    background-color: white;
    box-shadow: none;
    color: rgba(47, 72, 88, 0.8);
  }
`
const WrapperBox = styled.div`
  width: 100%;
  align-items: center !important;
  vertical-align: middle;
  padding: 0.25em 0 0.25em 0;
`
const WrapperHorizontalLine = styled.div`
  // display: flex;
  // align-items: center !important;
  // border-bottom: 1px solid #dee2e6;
  // background: #dee2e6;
  // box-shadow: 0px 1px 10px rgb(0 0 0 / 10%);
  // vertical-align: middle;
  // position: relative;
  // width: 100%;
  // height: 1px;
  // margin: 1.5625em 0 0.5em 0;

  display: flex;
  align-items: center !important;
  min-height: 2px;
  background: #eeefef;
  border-bottom: 1px solid #dee2e6 !important;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
  position: relative;
  margin: 1em 0 0.5em 0;
  width: 100%;
`

export {
  Wrapper,
  WrapperButton,
  WrapperLink,
  ButtonModal,
  WrapperBox,
  WrapperHorizontalLine
}
