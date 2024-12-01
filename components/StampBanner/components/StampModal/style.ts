import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { MAX_WIDTH_SM } from 'config/breakpoint'

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
  overflow: hidden;
  display: grid;
  ${MAX_WIDTH_SM} {
    border-radius: unset;
  }
`

export { ModalHeader, BannerWrapper }
