import styled from 'styled-components'
import { Accordion } from 'react-bootstrap'

const WrapperAccordion = styled(Accordion)`
  .accordion {
    &:focus,
    :active {
      background-color: #fff;
      border: none;
      shadow: none;
    }
  }
  .accordion-header {
    margin-bottom: 0;
  }
  .accordion-header-title {
    color: #076077;
  }
  .accordion-header > div {
    color: #076077;
  }
  .accordion-body {
    padding: 0rem 1.25rem;
  }
  .accordion-body > a {
    color: var(--bs-dark);
  }
  .accordion-button:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(255 255 255 / 25%);
  }
  .accordion-item {
    background-color: #fff;
    border: none;
    color: var(--bs-dark);
    &:focus,
    :active {
      background-color: #fff;
      border: none;
      shadow: none;
    }
  }
  .accordion-button {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 1.2rem;
    color: rgba(47, 72, 88, 0.8);
    text-align: left;
    background-color: #fff;
    border: 0;
    font-weight: 300;
    justify-content: space-between;
    padding: 1rem 0rem;
    border-radius: 0;
    overflow-anchor: none;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
      border-radius 0.15s ease;

    &:after {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      margin-left: auto;
      content: '';
      margin-right: -10px;
      // transform: rotate(270deg) translate(0, 4px);
      background-image: url('assets/images/arrow-right.svg');
      background-repeat: no-repeat;
      background-size: 0.44rem;
      // transition: transform 0.2s ease-in-out;
    }
  }
  .accordion-button:not(.collapsed) {
    background-color: #fff;
    border: none;
    box-shadow: none;
    &:not(.collapsed)::after {
      border: 0;
      margin-right: 2px;
      transform: rotate(90deg);
    }
  }
`
export { WrapperAccordion }
