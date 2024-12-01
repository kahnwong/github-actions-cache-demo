import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

const ModalHeader = styled(Modal.Header)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  border: none;
`
const BannerWrapper = styled.div`
  border-top-left-radius: calc(1rem - 1px);
  border-top-right-radius: calc(1rem - 1px);
  border-bottom-right-radius: calc(1rem - 1px);
  border-bottom-left-radius: calc(1rem - 1px);
  overflow: hidden;
  img {
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export { ModalHeader, BannerWrapper }
