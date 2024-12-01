import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { MAX_WIDTH_SM } from 'config/breakpoint'

const PropertyModalWrapper = styled(Modal)`
  .modal-dialog {
    ${MAX_WIDTH_SM} {
      min-height: 100%;
      margin: 0 auto;
      padding: 3rem 0.5rem 0.5rem 0.5rem;
      align-items: flex-end;
    }
  }
  .modal-header {
    padding: 1rem 1rem;
    border-bottom: none;
    z-index: 2;
  }

  .modal-content {
    overflow: hidden;

    ${MAX_WIDTH_SM} {
      overflow-y: auto;
    }
  }
  .modal-body {
    padding: 0rem 3rem 3rem 3rem;
    ${MAX_WIDTH_SM} {
      padding: 0rem 1rem 1rem 1rem;
      overflow-y: unset;
    }
  }
`

const InformationGroupWrapper = styled.div`
  margin-top: -30px;
`

export { PropertyModalWrapper, InformationGroupWrapper }
