import styled from 'styled-components'
// @ts-ignore
import { variables } from '@company/variables.ts'
import { MAX_WIDTH_LG } from '../../config/breakpoint'

const DownloadingWrapper = styled.div`
  background-color: ${variables.primary}1A;
  height: 186px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  color: black;
`
const ContentWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  color: black;
  margin-top: 30px;

  ${MAX_WIDTH_LG} {
    padding: 20px;
  }

  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: auto;
    background: rgba(0, 140, 139, 0.05);
    border-radius: 4px;
    color: ${variables.primary};
    font-weight: 600;
    font-size: 20px;
    padding: 10px 20px;
  }

  .header-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 39px;
    width: 115px;
    background: ${variables.primary}0D;
    border-radius: 4px;
    font-weight: 500;
    font-size: 18px;
    color: #222529;
    padding: 6px 20px;
  }

  .vertical-line {
    background-color: #e2e2e2;
    left: 50%;
    margin-left: -1px;
    margin-top: 2rem;
    width: 1px;
    padding: 0;
  }
`

const OrderBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${variables.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`

export { DownloadingWrapper, ContentWrapper, OrderBox }
