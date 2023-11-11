import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

const DropdownWrapper = styled(Dropdown)`
  width: 30px;
  margin: 0 0.25em;
  background-color: none;
  .dropdown-toggle {
    background-color: #0000ff00;
    border-color: none;
    &:hover,
    :focus,
    :active,
    :visited {
      background-color: #0000ff00;
      color: inherit;
      box-shadow: none;
    }
  }

  .dropdown-toggle {
    img {
      top: 8px !important;
    }
  }

  .dropdown-toggle::after {
    content: none;
  }

  .dropdown-menu {
    min-width: 30px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: #fff;
    .dropdown-item {
      color: var(--bs-dark);
      font-size: 1em;
      padding: 0;
      &:active {
        color: var(--bs-white);
      }
    }
  }
  .dropdown-menu.show {
    width: 100%;
    padding: 0 0.15rem;
    border-radius: 4px;
    border: solid 1px #e0e0e1;
  }
  .dropdown-item:hover {
    color: inherit;
    opacity: 0.8;
  }
  .dropdown-item {
    display: block;
    width: 100%;
    //padding: 0.25rem 0.15rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    border: 0;
    &:hover,
    &:focus,
    &:active,
    :focus-visible,
    :visited {
      color: #fff;
      text-decoration: none;
      background-color: #0000ff00;
    }
  }

  button {
    width: 30px;
    height: 30px;
    padding: 0.025rem 0.15rem;
    background-color: none;
    border: none;
    &:hover,
    :focus,
    :active,
    :visited {
      background-color: #0000ff00;
      color: inherit;
      box-shadow: none !important;
    }
  }
`
export { DropdownWrapper }
