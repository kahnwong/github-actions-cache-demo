import styled from 'styled-components'
import { MAX_WIDTH_LG, MIN_WIDTH_LG } from 'config/breakpoint'

const ProjectInfoWrapper = styled.div`
  padding: 0 65px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  position: relative;
`
const ProjectBody = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
`
const ProjectColumn = styled.div`
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

const ProjectColumnCenter = styled.div`
  padding: 0.55rem 0.55rem 0.55rem 5rem;
  ${MIN_WIDTH_LG} {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  ${MAX_WIDTH_LG} {
    padding: 0;
    width: 100%;
  }
`

export { ProjectInfoWrapper, ProjectBody, ProjectColumn, ProjectColumnCenter }
