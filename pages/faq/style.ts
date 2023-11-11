import styled from 'styled-components'
import { Accordion } from 'react-bootstrap'
// @ts-ignore
import { variables } from '@company/variables.ts'

const HeaderSection = styled.div`
  background-color: ${variables.primary}1a;
  background-image: linear-gradient(
    135deg,
    transparent,
    rgba(50, 181, 101, 0.1)
  );
`
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
  .accordion-button {
    padding-left: 0;
    padding-right: 0;
  }
`

export { HeaderSection, AccordionWrapper }
