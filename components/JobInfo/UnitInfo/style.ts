// eslint-disable-next-line import/no-absolute-path,import/no-unresolved
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { MAX_WIDTH_SM } from 'config/breakpoint'

interface ISectionButton {
  theme?: string
  textColor?: string
}
interface IStatingPrice {
  theme?: string
}

const colorsecondary700 = '#22BB66'
const colorsecondary900 = '#22BB661A'

const UnitInfoContainer = styled(Container)`
  background-color: '#F4F4F4';
`

const Wrapper = styled.div`
  padding: 48px;
  background: #f4f4f4;
  box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.25);
  ${MAX_WIDTH_SM} {
    padding: 48px 25px;
  }
`

const Button = styled.button<ISectionButton>`
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  padding: 0.5rem 2rem;
  border-radius: 100px;
  background: #fff;
  border: 1px solid #000;
  color: #000;
  &.active,
  &:focus {
    border: 1px solid
      ${({ theme }) => (theme.length ? theme : colorsecondary700)};
    color: ${({ theme }) => (theme.length ? theme : colorsecondary700)};
    background: ${({ theme }) =>
      theme.length ? `${theme}1A` : colorsecondary900};
  }
  &:hover {
    border: 1px solid
      ${({ theme }) => (theme.length ? theme : colorsecondary700)};
    color: ${({ theme }) => (theme.length ? theme : colorsecondary700)};
  }
`

const ButtonImage = styled.button<ISectionButton>`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  padding: 0.5rem 2rem;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.length && theme};
  color: ${({ theme }) => theme.length && theme};
  border-radius: 4px;
  &:hover {
    border: 1px solid ${({ theme }) => theme.length && theme};
    color: #fff;
    background: ${({ theme }) => theme.length && theme};
  }
  ${MAX_WIDTH_SM} {
    font-size: 16px;
  }
`
const DetailBox = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 24px 10px;
  display: flex;
  font-size: 18px;
  line-height: 32px;
`

const StatingPriceText = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #000;
`
const StatingPrice = styled.div<IStatingPrice>`
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  color: ${({ theme }) => theme.length && theme};
`
const PromotionPrice = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: #6c757d;
`
const ModalPlanTitle = styled.div`
  color: #000;
  font-weight: 600;
  font-size: 24px;
  margin-right: 30px;
`

export {
  UnitInfoContainer,
  Wrapper,
  Button,
  ButtonImage,
  DetailBox,
  StatingPriceText,
  StatingPrice,
  PromotionPrice,
  ModalPlanTitle
}
