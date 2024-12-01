import styled from 'styled-components'
import { Form, Row, Button } from 'react-bootstrap'
import { MAX_WIDTH_LG } from 'config/breakpoint'
// @ts-ignore
import { variables } from '@company/variables.ts'
// @ts-ignore
import companyDetail from '@company/companyDetail.json'

export const SearchDesktop = styled.div`
  height: 415px;
  background-image: url(${companyDetail.homeSearchImage});
  background-size: cover;
  background-position: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  ${MAX_WIDTH_LG} {
    display: none;
  }
`

export const SearchMobile = styled.div`
  align-items: center;
  justify-content: center;
  display: none;
  flex-wrap: wrap;
  ${MAX_WIDTH_LG} {
    display: flex;
  }
`

export const SearchMobileBox = styled.div`
  padding: 15px 12px;
  width: 100%;
  height: 182px;
  background: ${variables.primary};
  border-radius: 8px;
`

export const StyledForm = styled(Form.Control)`
  border-radius: 0;
  height: 64px;
  border-radius: 4px 4px 0px 0px;
  font-size: 16px;
`

export const SearchButton = styled(Button)`
  width: 100%;
  height: 100%;
  background: #222529;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  border: 0;
  box-shadow: none !important;
  &:hover {
    background: #313438;
  }
  &:focus {
    background: #222529;
  }
`

export const FilterBox = styled.div`
  height: 60px;
  background: rgba(34, 37, 41, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 4px 4px;
  display: flex;
  color: #ffffff;
  align-items: center;
`

export const SearchBox = styled(Row)`
  width: 750px;
  font-size: 16px;
`

export const TextHeader = styled.span`
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  letter-spacing: 0.04em;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;

  ${MAX_WIDTH_LG} {
    font-weight: 600;
    font-size: 22px;
    line-height: 30px;
    text-shadow: 0px 1.90323px 1.90323px rgba(0, 0, 0, 0.25);
  }
`
