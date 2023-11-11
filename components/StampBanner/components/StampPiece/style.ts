import styled from 'styled-components'
import { MAX_WIDTH_SM, MAX_WIDTH_LG } from 'config/breakpoint'

const Piece = styled.div`
  border: 3px solid #f8f9fa;
  width: 100px;
  height: 100px;
  ${MAX_WIDTH_LG} {
    max-width: 75px;
    max-height: 75px;
  }
  ${MAX_WIDTH_SM} {
    max-width: 50px;
    max-height: 50px;
  }
  &.waiting-piece {
    border-color: var(--bs-warning);
  }
  &.complete-piece {
    border-color: var(--bs-secondary);
  }
`
const SmallText = styled.small`
  font-size: 0.75rem;
`

const RewardPieceImage = styled.img`
  transform: scale(1.6);
  top: 8px;
`
const RewardPieceText = styled.div`
  top: 2.75rem;
  z-index: 1;
  ${MAX_WIDTH_SM} {
    font-size: 70%;
    top: 2rem;
  }
`

export { Piece, SmallText, RewardPieceImage, RewardPieceText }
