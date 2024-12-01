import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

const DropdownWrapper = styled(Dropdown)`
  .dropdown-toggle {
    font-size: 0.945rem !important;
    font-weight: 300;
    &:hover,
    :focus,
    :active,
    :visited {
      background-color: white !important;
      color: inherit;
      box-shadow: none;
    }
  }

  .dropdown-menu {
    min-width: 240px;
    .dropdown-item {
      color: var(--bs-dark);
      font-size: 0.945rem;
      padding: 0.5rem 1rem;
      &:active {
        color: var(--bs-white);
      }
    }
  }

  button {
    background-color: white;
    border: none;
    &:hover,
    :focus,
    :active,
    :visited {
      background-color: white !important;
      color: inherit;
      box-shadow: none !important;
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
export { DropdownWrapper, DropDownToggleWrapper }
