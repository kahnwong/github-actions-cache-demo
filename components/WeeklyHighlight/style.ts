import styled from 'styled-components'
import Carousel from 'react-bootstrap/Carousel'
import { MAX_WIDTH_LG } from 'config/breakpoint'

const CarouselHighlight = styled(Carousel)`
  .carousel-indicators button {
    height: 8px;
    width: 8px;
    border-radius: 50%;
  }
  .carousel-inner {
    border-radius: 0.5rem;
  }
  .carousel-control-prev,
  .carousel-control-next {
    width: 10%;
    &:hover {
      background-color: rgba(47, 72, 88, 0.2);
    }
    ${MAX_WIDTH_LG} {
      display: none;
    }
  }
  &.hide-control {
    .carousel-control-prev,
    .carousel-control-next,
    .carousel-indicators {
      display: none;
    }
  }
`
export { CarouselHighlight }
