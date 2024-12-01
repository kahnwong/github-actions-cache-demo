import styled from 'styled-components'
import Headers from 'public/assets/images/header.jpeg'
import { MIN_WIDTH_LG } from 'config/breakpoint'

const Wrapper = styled.div`
  position: relative;
  height: 120px;
  background-color: #fff;
  background-image: linear-gradient(
    181deg,
    transparent 50%,
    rgba(0, 181, 255, 0.3)
  );

  + div {
    ${MIN_WIDTH_LG} {
      margin-top: 57px;
    }
  }
`

const WrapperBG = styled.div`
  background-image: url(${Headers.src});
  background-position: 0 -200px;
  background-size: 990px;
  background-attachment: fixed;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: repeat-x;
  opacity: 0.3;
`

export { Wrapper, WrapperBG }
