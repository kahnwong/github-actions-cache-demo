import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'
import { MAX_WIDTH_LG, MAX_WIDTH_SM } from 'config/breakpoint'

const DropDownFilterWrapper = styled(Dropdown)`
  min-width: 180px;

  ${MAX_WIDTH_LG} {
    min-width: 48%;
  }
  .dropdown-menu.show {
    width: 320px;
    ${MAX_WIDTH_LG} {
      width: 100%;
    }
    ${MAX_WIDTH_SM} {
      width: calc(100vw - 40px);
    }
  }
  &.sort {
    min-width: 190px;
    ${MAX_WIDTH_LG} {
      min-width: 48%;
    }
    .dropdown-menu.show {
      width: 220px;
      ${MAX_WIDTH_LG} {
        width: 100%;
      }
      ${MAX_WIDTH_SM} {
        width: calc(100vw - 40px);
      }
    }
  }
`

const DropDownToggleWrapper = styled(Dropdown.Toggle)`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  border: 0 !important;
  color: rgba(47, 72, 88, 0.8);
  background-color: transparent !important;
  color: white !important;
  box-shadow: none !important;
  svg {
    opacity: 0.5;
  }
`

const FilterTextWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

export { DropDownFilterWrapper, DropDownToggleWrapper, FilterTextWrapper }
