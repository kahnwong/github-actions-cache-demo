import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { MAX_WIDTH_MD } from '../../../config/breakpoint'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
  .btn-theme:hover {
    color: #ffffff;
    background: ${(props) => props.theme};
  }
  .virtual-image {
    width: 180px;
    height: 104px;
    border-radius: 8px;
    filter: brightness(0.6);
    object-fit: cover;
    ${MAX_WIDTH_MD} {
      width: 175px;
      height: 100px;
    }
  }
`
const VirtualItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`
const VirtualTourButton = styled(Button)`
  background: #ffffff;
  color: #222529;
  border: 1px solid #222529;
  border-radius: 4px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
`
const Description = styled.div`
  margin-top: 20px;
  font-size: 14px;
`

export { Wrapper, VirtualItem, Description, VirtualTourButton }
