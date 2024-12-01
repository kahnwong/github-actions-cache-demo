import styled from 'styled-components'
import { MAX_WIDTH_LG, MAX_WIDTH_SM } from 'config/breakpoint'
// @ts-ignore
import { variables } from '@company/variables.ts'

const Wrapper = styled.div`
  background:#fff,
  .navbar {
    height: 80px;
    ${MAX_WIDTH_SM} {
      height: 60px;
    }
  }

  .nav-link {
    font-size: 16.8px;
    font-weight: 300;
    margin: 0 0.5px !important;
    // margin: 5px 0.5px 0 0 !important;
    color: #635d5d !important;
    &:hover,
    &:active,
    &:focus {
      color: ${variables.primary} !important;
    }
    ${MAX_WIDTH_LG} {
      font-size: 14px;
    }
  }
`

const Header = styled.header`
  background-color: #ffffff;
  ${MAX_WIDTH_SM} {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
`
const Main = styled.main`
  ${MAX_WIDTH_SM} {
    display: block;
    margin-top: 120px;
  }
`

const MobileMenu = styled.div`
  .nav-link {
    font-size: 14px;
    font-weight: 300;
    margin: 0 8px;
    padding: 0.5rem 0.5rem;
  }
  ${MAX_WIDTH_LG} {
    border-bottom: 1px solid #dcdbdb;
  }
`

export { Header, Wrapper, MobileMenu, Main }
