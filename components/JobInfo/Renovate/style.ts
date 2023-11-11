import styled from 'styled-components'
import { MAX_WIDTH_MD } from 'config/breakpoint'

const ImageCompareWrapper = styled.div`
  max-height: 500px;
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0.225rem;
`

const CompareBox = styled.div`
  position: relative;
  width: 50%;
`

const TitleBefore = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 8px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MAX_WIDTH_MD} {
    width: 50px;
    height: auto;
    padding: 5px;
    font-size: 60%;
  }
`

const TitleAfter = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 8px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #000;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MAX_WIDTH_MD} {
    width: 50px;
    height: auto;
    padding: 5px;
    font-size: 60%;
  }
`

export { ImageCompareWrapper, CompareBox, TitleBefore, TitleAfter }
