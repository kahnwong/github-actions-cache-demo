import { MAX_WIDTH_LG } from 'config/breakpoint'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--bs-gray-300);
  background-color: var(--bs-light);
  overflow: hidden;
  margin-left: auto;

  ${MAX_WIDTH_LG} {
    width: 56px;
    height: 56px;
  }
`

const WrapperHeader = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid var(--bs-gray-300);
  background-color: var(--bs-light);
  overflow: hidden;
  margin-left: auto;

  ${MAX_WIDTH_LG} {
    width: 56px;
    height: 56px;
  }
`
export { Wrapper, WrapperHeader }
