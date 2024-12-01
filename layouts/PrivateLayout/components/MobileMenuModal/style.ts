import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

const ModalWrapper = styled(Modal)`
  .modal-header {
    border-bottom: none;
  }

  .mobile-menu-modal-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0rem;
    font-weight: 300;
    margin-right: auto;
    // color: var(--bs-dark);
    color: #076077;
  }
  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: none;
    border-radius: none;
    outline: 0;
    height: auto !important;
  }
`

export { ModalWrapper }
