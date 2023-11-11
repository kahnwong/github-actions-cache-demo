import styled from 'styled-components'
import Select from 'react-select'

const WrapperHeader = styled.div`
  background: #fff;
  position: sticky;
  padding-top: 10px;
  top: 0;
  z-index: 1020;
  box-shadow: rgb(0 0 0 / 16%) 0px 2px 2px;
  .navbar-collapse {
    align-items: end;
  }
  .nav-link {
    color: #000000 !important;
    font-size: 1rem;
    font-weight: 400;
    line-height: 24px;
    border-bottom: 2px solid #ffffff;
    &:hover,
    :active {
      background: #f6f6f6;
      border-bottom: 2px solid ${({ theme }) => theme ?? '#222529'};
    }
  }
  footer {
    bottom: 0;
    width: 100%;
  }
`
const SelectBox = styled(Select)`
  font-weight: 400;
  font-size: 16px;
  width: 250px;
  margin: 1rem 0;
  /* border: 2px solid ${({ theme }) => theme ?? '#222529'}; */
  /* border: 2px solid transparent; */
  border-color: transparent;
  span[class$='indicatorSeparator'] {
    display: none;
  }
  .react-select__control {
    border-color: transparent;
    &.react-select__control--menu-is-open {
      border-color: ${({ theme }) => theme ?? '#222529'};
    }
    &.react-select__control--is-focused {
      border-color: ${({ theme }) => theme ?? '#222529'};
      box-shadow: 0 0 0 1px ${({ theme }) => theme ?? '#222529'};
    }
    .react-select__indicator-separator {
      background-color: transparent;
    }
  }
  .react-select__menu {
    .react-select__menu-list {
      .react-select__option {
        &.react-select__option--is-selected {
          background-color: ${({ theme }) => theme ?? '#222529'};
        }
        &.react-select__option--is-focused {
          background-color: var(--smoke);
        }
        &.react-select__option--is-selected.react-select__option--is-focused {
          background-color: ${({ theme }) => theme ?? '#222529'};
        }
      }
    }
  }
`
const PrivateHeader = styled.div`
  background: #6c757d;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`
export { WrapperHeader, SelectBox, PrivateHeader }
