import styled from 'styled-components'
import { Button } from 'react-bootstrap'

const BrochureItem = styled.div`
  padding: 8px 16px;
  .btn-theme:hover {
    color: #ffffff;
    background: ${(props) => props.theme};
  }
`

const BrochureButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme ?? '#222529'}};
  border-radius: 4px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 247px;
  color: ${({ theme }) => theme ?? '#222529'};
`
export { Button, BrochureItem, BrochureButton }
