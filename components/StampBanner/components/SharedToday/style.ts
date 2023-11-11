import styled from 'styled-components'
import { MAX_WIDTH_SM, MAX_WIDTH_LG } from 'config/breakpoint'

const StepShare = styled.div`
  border: 3px solid #f8f9fa;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
  display: inline-block;
  ${MAX_WIDTH_LG} {
    width: 75px;
    height: 75px;
  }
  ${MAX_WIDTH_SM} {
    width: 50px;
    height: 50px;
  }

  &.waiting-StepShare {
    border-color: var(--bs-warning);
  }
  &.complete-StepShare {
    border-color: var(--bs-secondary);
  }
`
const SmallText = styled.small`
  font-size: 0.75rem;
`

const RewardPieceImage = styled.img`
  transform: scale(1.6);
  padding: 5px;
`

export { StepShare, SmallText, RewardPieceImage }
