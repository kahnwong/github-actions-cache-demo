import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'
import { MAX_WIDTH_LG, MAX_WIDTH_SM } from 'config/breakpoint'
// @ts-ignore
import { variables } from '@company/variables.ts'

const Wrapper = styled.div`
  .bg-table-1 {
    background: ${variables.primary}1a;
  }

  .bg-table-2 {
    background: ${variables.primary}2a;
  }

  .container-width {
    min-width: 910px;
    max-width: 955px;
  }

  .color-line {
    color: #06c755;
  }

  .color-fb {
    color: #4267b2;
  }

  .color-tw {
    color: #1da1f2;
  }

  .color-copy {
    color: #ff8c7a;
  }

  .table-img {
    width: 72px;
    max-height: 45px;
  }
`

const SpanTable = styled.span`
  color: #2f4858cc;
  left: -10px;
  position: relative;
  font-size: 14px;
`

const SpanCopy = styled.span`
  color: #2f4858cc;
  left: -12px;
  padding-left: 5px;
  padding-right: 0;
  position: relative;
  font-size: 14px;
`

const TableUL = styled.ul`
  margin: 0;
  padding-left: 19px;
  padding-right: 0;
  line-height: auto;
`

const DropDownFilterWrapper = styled(Dropdown)`
  min-width: 230px;

  ${MAX_WIDTH_LG} {
    min-width: 230px;
  }
  .dropdown-menu.show {
    width: 230px;
    min-width: 230px;
    ${MAX_WIDTH_LG} {
      width: 100%;
      min-width: 230px;
    }
    ${MAX_WIDTH_SM} {
      width: 100%;
      min-width: 230px;
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
  max-width: 100%;
`

export {
  DropDownFilterWrapper,
  DropDownToggleWrapper,
  FillterTextWrapper,
  Wrapper,
  SpanTable,
  SpanCopy,
  TableUL
}
