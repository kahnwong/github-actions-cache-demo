import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'
import { MAX_WIDTH_LG, MAX_WIDTH_SM } from 'config/breakpoint'

const DropDownFilterWrapper = styled(Dropdown)`
  min-width: 100px;

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
  border: 1px solid rgba(47, 72, 88, 0.1);
  color: rgba(47, 72, 88, 0.8);
  background-color: white;
  svg {
    opacity: 0.5;
  }
`

const FillterTextWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`

const DropDownToggleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  text-overflow: ellipsis;
`

export {
  DropDownFilterWrapper,
  DropDownToggleWrapper,
  FillterTextWrapper,
  DropDownToggleContainer
}
