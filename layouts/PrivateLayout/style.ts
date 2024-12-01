import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .navbar {
    height: 57px;
  }
  .nav-link {
    font-size: 16.8px;
    font-weight: 300;
    margin: 0 8px;
  }
  .bn-navbar-abs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1030;   
    +div>div:first-child {
    padding-top: 56px;
  }
}
`

export { Wrapper }
