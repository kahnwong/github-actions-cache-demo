import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

const DropdownWrapper = styled(Dropdown)`
  .dropdown-toggle {
    &:hover,
    :focus,
    :active,
    :visited {
      background-color: white !important;
      color: inherit;
      box-shadow: none;
    }
  }
  .dropdown-toggle::after {
    content: none;
  }

  .dropdown-menu {
    min-width: 240px;
    .dropdown-item {
      color: var(--bs-dark);
      font-size: 1rem;
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
export { DropdownWrapper }
