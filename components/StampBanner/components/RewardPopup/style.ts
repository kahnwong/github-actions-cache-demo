import styled from 'styled-components'

const RewardWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 1;
  border-radius: 1rem;
`
const RewardBody = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 96vh;
`
const RewardCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const RewardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  max-width: 400px;
  img {
    max-width: 100%;
  }
`
const RewardBackgroundContent = styled.div`
  z-index: -1;
  background-color: rgb(255, 255, 255);
  padding: 1rem;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(30px);
`

export {
  RewardWrapper,
  RewardBody,
  RewardCentered,
  RewardContent,
  RewardBackgroundContent
}
