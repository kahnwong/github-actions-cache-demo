import styled from 'styled-components'
import { Accordion } from 'react-bootstrap'
import { MAX_WIDTH_MD } from '../../config/breakpoint'

const AccordionWrapper = styled(Accordion)`
  .accordion-button:focus {
    z-index: 3;
    border: none;
    border-color: none;
    outline: 0;
    box-shadow: none;
  }

  .accordion-button:not(.collapsed) {
    background-color: unset;
    box-shadow: unset;
  }
`

const WrapperDate = styled.div`
  display: flex;
  align-items: end;
  line-height: 1;
  font-size: 0.8em;
  ${MAX_WIDTH_MD} {
    font-size: 65%;
  }
  > span {
    margin-right: 4px;
    flex-shrink: 0;
    font-size: 2em;
    width: 40px;
    text-align: right;
  }
  > small {
    flex-grow: 1;
    line-height: 1.1;
    opacity: 0.75;
  }
`
export { AccordionWrapper, WrapperDate }
