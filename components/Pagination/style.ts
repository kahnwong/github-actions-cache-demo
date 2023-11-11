import styled from 'styled-components'
import { Pagination } from 'react-bootstrap'

const PaginationWrapper = styled(Pagination)`
  .page-link {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: var(--bs-primary);
    width: 40px;
    height: 40px;
  }
  .page-item.active {
    .page-link {
      background-color: var(--bs-primary);
    }
  }
`
// const DropdownPerpageWrapper = styled(Dropdown)`
//   .dropdown-menu {
//     min-width: 100%;
//   }
//   button {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 17px;
//   }
//   a {
//     font-size: 14px;
//   }
// `

export { PaginationWrapper }
