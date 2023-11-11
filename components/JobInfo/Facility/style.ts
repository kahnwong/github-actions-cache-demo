import styled from 'styled-components'
import { MAX_WIDTH_LG, MIN_WIDTH_LG } from 'config/breakpoint'

const FacilityWrapper = styled.div`
  padding: 1.5rem 0;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  position: relative;
`

const FacilityBody = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  padding: 0 0.775rem;
`
const FacilityColumn = styled.div`
  padding: 0.55rem;
  ${MIN_WIDTH_LG} {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  ${MAX_WIDTH_LG} {
    padding: 0;
    width: 100%;
  }
`

const FacilityDetail = styled.div`
  padding: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  items-container: center;
`
export { FacilityWrapper, FacilityBody, FacilityColumn, FacilityDetail }
