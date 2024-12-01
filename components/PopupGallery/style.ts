import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

const ModalHeader = styled(Modal.Header)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  border: none;
`
const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .image-gallery {
    width: 100%;
  }
`

export { ModalHeader, ModalContent }
