import { MAX_WIDTH_MD } from 'config/breakpoint'
import styled from 'styled-components'

interface IWrapper {
  backgroundColor: string
}
interface IBottomText {
  theme: string
}
const Wrapper = styled.div<IWrapper>`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#ffffff'};
  ${MAX_WIDTH_MD} {
    background-color: #ffffff;
  }
`
const ContactForm = styled.div`
  margin-top: 34px;
  margin-bottom: 17px;
  padding: 65px 100px;
  background-color: #ffffff;
  width: 80%;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px;
  ${MAX_WIDTH_MD} {
    box-shadow: none;
    padding: 0;
  }
`
const BottomText = styled.a<IBottomText>`
  color: ${({ theme }) => theme ?? '#222529'};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

export { Wrapper, ContactForm, BottomText }
