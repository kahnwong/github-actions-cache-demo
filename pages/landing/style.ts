import styled from 'styled-components'
import { MAX_WIDTH_LG } from 'config/breakpoint'
import Carousel from 'react-bootstrap/Carousel'
// @ts-ignore
import { variables } from '@company/variables.ts'

const Section = styled.section`
  text-align: center;
`

export const SectionCover = styled.div`
  height: 670px;
  background-image: url('assets/images/landing/cover-landing-page-desktop.png');
  background-size: cover;
  background-position: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  ${MAX_WIDTH_LG} {
    height: 719px;
    background-image: url('assets/images/landing/cover-landing-page-mobile.png');
  }
  button {
    min-width: 220px;
  }
`

const ButtonWrapper = styled.div`
  button {
    min-width: 220px;
  }
`

const LineVertical = styled.span`
  border-left: 1px solid #ffffff;
  height: 80px;
  width: 1px !important;
  display: inline-block;
  ${MAX_WIDTH_LG} {
    border-left: green;
    border-bottom: 1px solid #ffffff;
    width: 160px !important;
    height: 2px;
    padding: 0 50px;
    margin: 20px 0;
  }
`

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
    display: none;
  }
  &.hide-control {
    .carousel-control-prev,
    .carousel-control-next,
    .carousel-indicators {
      display: none;
    }
  }
  .carousel-indicators {
    display: none;
  }
`

const CarouselShowIndicators = styled(Carousel)`
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
    display: none;
  }
  &.hide-control {
    .carousel-control-prev,
    .carousel-control-next,
    .carousel-indicators {
      display: none;
    }
  }
  .carousel-indicators > button {
    background-color: ${variables.primary};
  }
`

const CarouselStepShare = styled(Carousel)`
  .carousel-control-next,
  .carousel-control-prev /*, .carousel-indicators */ {
    filter: invert(100%);
  }
  .carousel-indicators {
    display: none;
  }
`
const DescriptionCard = styled.div`
  --bs-gutter-x: 0;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  .description-text-medium {
    font-size: 18px;
    ${MAX_WIDTH_LG} {
      font-size: 14px;
    }
  }
  .description-text-small {
    font-size: 14px;
    font-weight: 400;
    ${MAX_WIDTH_LG} {
      font-size: 12px;
    }
  }
`
// ยังไม่ได้ใช้ อันเดิม
const SectionHero = styled(Section)`
  position: relative;
  overflow: hidden;
  .container {
    position: relative;
    z-index: 1;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 350px;
    background-color: ${variables['light-green']};
    z-index: 0;
    ${MAX_WIDTH_LG} {
      height: 40vw;
      min-height: 180px;
    }
  }
  &:after {
    content: '';
    position: absolute;
    top: -100px;
    right: -10%;
    width: 200%;
    height: 440px;
    background-color: ${variables['light-green']};
    border-radius: 50%;
    transform: rotate(6deg);
    z-index: 0;
    ${MAX_WIDTH_LG} {
      top: calc(-390px + 45vw);
      right: -40%;
    }
  }
`

export {
  Section,
  SectionHero,
  LineVertical,
  CarouselHighlight,
  CarouselShowIndicators,
  CarouselStepShare,
  DescriptionCard,
  ButtonWrapper
}
