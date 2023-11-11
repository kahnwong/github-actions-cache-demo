import { Button as ReactButton } from 'react-bootstrap'
import styled from 'styled-components'

const Title = styled.h3`
  font-family: 'Prompt';
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  display: flex;
  align-items: center;
  color: #222529;
`
const Description = styled.p`
  font-family: 'Prompt';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  align-items: center;
  color: #222529;
`

const Button = styled(ReactButton)`
  padding: 12px 39px;
  background: #008c8b;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
  &:hover,
  &:focus {
    background: #008c8b;
  }
`

export { Title, Description, Button }
