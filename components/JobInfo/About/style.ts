import styled from 'styled-components'
import { MAX_WIDTH_LG } from 'config/breakpoint'

const AboutWrapper = styled.div`
  height: 450px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1rem;
  position: relative;
  background: rgb(215 215 215 / 50%);
  .container {
    justify-content: end;
    position: relative;
    ${MAX_WIDTH_LG} {
      max-width: 100% !important;
    }
  }
`
const AboutBody = styled.div`
  height: 100%;
  width: 600px;
  position: absolute;
  right: 0px;
  padding: 3rem 1.75rem 1.75rem 1.75rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  ${MAX_WIDTH_LG} {
    max-width: 100%;
    margin: 0;
  }
`

const AboutDetail = styled.div`
  color: #fff;
  text-align: center;
  height: 280px;
  overflow-y: scroll;

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    background-color: #fff;
  }

  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #6c757d;
  }
`
export { AboutWrapper, AboutBody, AboutDetail }
