import styled from 'styled-components'
import ReactSelect from 'react-select'

const MockupWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding 30px 0;
`
const Select = styled(ReactSelect)`
  font-size: 16px;
  &.react-select-custom {
    width: 250px;
    margin-left: 30px;
    .react-select__control {
      &.react-select__control--menu-is-open {
        border-color: ${({ theme }) => theme ?? '#22BB66'};
      }
      &.react-select__control--is-focused {
        border-color: ${({ theme }) => theme ?? '#22BB66'};
        box-shadow: 0 0 0 1px ${({ theme }) => theme ?? '#22BB66'};
      }
    }
    .react-select__menu {
      .react-select__menu-list {
        .react-select__option {
          &.react-select__option--is-selected {
            background-color: ${({ theme }) => theme ?? '#22BB66'};
          }
          &.react-select__option--is-focused {
            background-color: var(--smoke);
          }
          &.react-select__option--is-selected.react-select__option--is-focused {
            background-color: ${({ theme }) => theme ?? '#22BB66'};
          }
        }
      }
    }
  }
  @media (max-width: 991.98px) {
    &.react-select-custom {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`
export { MockupWrapper, Select }
