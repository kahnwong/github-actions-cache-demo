import styled from 'styled-components'
import { Modal, Tooltip, Button } from 'react-bootstrap'

const ModalHeader = styled(Modal.Header)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  border: none;
`
const ModalBody = styled(Modal.Body)`
  h5,
  h6 {
    text-align: center;
  }
`

const InfoTooltip = styled(Tooltip)`
  .tooltip-inner {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 6px 5px;
    gap: 10px;
    max-width: 300px;
    background: rgba(34, 37, 41, 0.5);
    border-radius: 4px;
  }
`

const InfoButton = styled(Button)`
  line-height: 1;
  padding: 0.25rem 0.45rem;
  border-radius: 2rem;
`

export { ModalHeader, ModalBody, InfoTooltip, InfoButton }
