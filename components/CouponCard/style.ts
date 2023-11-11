import styled from 'styled-components'
import { MAX_WIDTH_LG, MAX_WIDTH_SE } from 'config/breakpoint'

const CouponCardButtonGroupWrapper = styled.div`
  display: flex;
  ${MAX_WIDTH_SE} {
    flex-direction: column;
  }
  a {
    ${MAX_WIDTH_LG} {
      width: 100%;
      margin-right: 0.5rem;
    }
  }
  button {
    padding: 0rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    ${MAX_WIDTH_LG} {
      width: 100%;
    }
    &:first-child {
      margin-right: 0.5rem;
      ${MAX_WIDTH_SE} {
        margin-bottom: 0.5rem;
        margin-right: 0rem;
      }
    }
  }
`
const CouponCardTitleWrapper = styled.h5`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
`

export { CouponCardButtonGroupWrapper, CouponCardTitleWrapper }
