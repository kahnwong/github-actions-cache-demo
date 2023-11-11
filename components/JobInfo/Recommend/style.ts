import { MAX_WIDTH_MD } from 'config/breakpoint'
import styled from 'styled-components'

const WrapperContent = styled.div`
  ${MAX_WIDTH_MD} {
    padding: 3rem 0;
    width: 100%;
  }
  padding: 65px;
  .react-multiple-carousel__arrow--right {
    right: 0 !important;
  }
  .react-multiple-carousel__arrow--left {
    left: 0 !important;
  }
  .react-multiple-carousel__arrow {
    background: rgb(10 11 11 / 70%);
  }
  a {
    color: unset !important;
    text-decoration: none;
  }
`

export { WrapperContent }
