import styled from 'styled-components'
import { Modal, ToggleButtonGroup } from 'react-bootstrap'
import { MAX_WIDTH_LG, MAX_WIDTH_SM } from 'config/breakpoint'

const StyledModal = styled(Modal)`
  /* Move up the modal above PopupPromote */
  z-index: 1056;
  .modal-header {
    border-bottom: none;
  }
  .modal-body {
    margin: 0 98px;
    padding: 0;
    .pdpa-content {
      background-color: var(--bs-gray-200);
      margin: 0;
      padding: 24px 66px;
    }
  }
  .modal-footer {
    border-top: none;
    padding: 40px 0 60px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  ${MAX_WIDTH_LG} {
    .modal-body {
      margin: 0 48px;
      .pdpa-content {
        padding: 24px 48px;
      }
    }
    .modal-footer {
      padding: 20px 0 30px 0;
    }
  }

  ${MAX_WIDTH_SM} {
    .modal-body {
      margin: 0 16px;
      .pdpa-content {
        padding: 16px;
      }
    }
    .modal-footer {
      padding: 16px;
    }
  }
`

const TabGroup = styled(ToggleButtonGroup)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: stretch;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 0;
    padding: 10px;
    text-align: center;
  }
`

export { StyledModal, TabGroup }
