import styled, { css } from 'styled-components'
import { MAX_WIDTH_LG } from 'config/breakpoint'

interface IChildrenWrapper {
  isSlide?: boolean
}

const SeeMoreLinkWrapper = styled.a`
  ${MAX_WIDTH_LG} {
    font-size: calc(0.55rem + 1.38vw);
  }
`
const SectionWrapper = styled.section`
  &.bn-gradient-1 {
    background-color: rgba(0, 117, 129, 0.05);
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(50, 181, 101, 0.1) 100%
    );
  }
  &.bn-gradient-2 {
    background-color: rgba(0, 117, 129, 0.05);
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 181, 255, 0.1) 100%
    );
  }
  &.bn-gradient-3 {
    background-color: rgba(0, 117, 129, 0.05);
    background-image: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 100, 191, 0.1) 100%
    );
  }
`

const ChildrenWrapper = styled.div<IChildrenWrapper>`
 ${({ isSlide }) =>
   isSlide &&
   css`
    ${MAX_WIDTH_LG} {
      overflow-x: auto;
      padding-bottom: 1rem;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    `}
    }
`

export { SeeMoreLinkWrapper, SectionWrapper, ChildrenWrapper }
