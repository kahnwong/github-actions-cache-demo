import { MAX_WIDTH_MD } from 'config/breakpoint'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  background-color: #e4e4e4;
  .badge-nearby {
    .no-gutters-custom {
      @media (max-width: 767px) {
        margin-right: 0;
        margin-left: 0;
      }
    }
    .no-gutters-custom > .col,
    .no-gutters-custom > [class*='col-'] {
      @media (max-width: 767px) {
        padding-right: 0;
        padding-left: 0;
      }
    }

    .poi-badge {
      @media (max-width: 320px) {
        width: 100%;
        font-size: 10px;
      }
      @media (max-width: 450px) {
        width: 110px;
        font-size: 10px;
      }
      @media (max-width: 991px) {
        margin-bottom: 1rem;
      }

      font-size: 12px;
      padding: 4.2px 10px;
      width: 130px;
      cursor: pointer;
      height: 29px;
      &:hover {
        box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.36);
        -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.36);
        -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.36);
        transition: all 0.3s;
      }
    }
  }
  .spanPoi {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: #222529;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }
  .row-gutters-custom {
    @media (max-width: 767px) {
      margin-right: 0;
      margin-left: 0;
    }
  }
  .row-gutters-custom > .col,
  .row-gutters-custom > [class*='col-'] {
    @media (max-width: 767px) {
      padding-right: 0;
      padding-left: 0;
    }
  }
`
const WrapperContent = styled.div`
  ${MAX_WIDTH_MD} {
    padding: 3rem 0;
  }
  padding: 48px;
`

const WrapperMap = styled.div`
  width: 100%;
  .leaflet-popup-content {
    min-width: 200px !important;
    max-width: 300px !important;
    margin: 0 auto;
  }
`

const CardButton = styled.div`
  &:hover {
    cursor: pointer;
    transition: transform 0.3s;
    transform: scale(1.03);
  }
  background: #f4f4f4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  /* width: 175px; */
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;

  p {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: bold;
  }

  img {
    width: 45px;
    margin-bottom: 0.5rem;
  }
  ${MAX_WIDTH_MD} {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

const NearBy = styled.div`
  ${MAX_WIDTH_MD} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`
const PopupTitle = styled.h6`
  font-family: prompt;
  font-weight: 500;
  line-height: 1.2;
  color: #242424;
  font-size: 1rem;
`

export { Wrapper, WrapperContent, WrapperMap, CardButton, NearBy, PopupTitle }
