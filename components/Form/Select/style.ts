import styled from 'styled-components'
import Select from 'react-select'

const SelectBox = styled(Select)`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  width: 100%;

  span[class$='indicatorSeparator'] {
    display: none;
  }
  .react-select__control {
    border-color: transparent transparent #6c757d transparent;
    border-radius: 0;
    height: 40px;

    &.react-select__control--menu-is-open {
      border-color: ${({ theme }) => theme ?? '#222529'};
    }
    &.react-select__control--is-focused {
      border-color: ${({ theme }) => theme ?? '#222529'};
      box-shadow: 0 0 0 1px ${({ theme }) => theme ?? '#222529'};
    }
    &.react-select__control:hover {
      border-color: ${({ theme }) => theme ?? '#222529'};
    }
    .react-select__indicator-separator {
      background-color: transparent;
    }
  }
`
export { SelectBox }
