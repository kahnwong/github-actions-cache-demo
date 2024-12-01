import styled from 'styled-components'

const PayoffBox = styled.div`
  padding: 40px;
  background: #f4f4f4;
  border-radius: 4px;
  min-height: 348px;

  .payoff-logo {
    width: 20px !important;
  }
`

const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  color: #076077;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`
const NumberText = styled.h3`
  margin: 20px 0;
  font-style: normal;
  font-weight: 700;
  color: #076077;
  font-weight: 600;
  font-size: 36px;
  line-height: 48px;
  text-align: center;
`
const Description = styled.h3`
  font-family: 'Prompt';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
  margin-bottom: 0;
`
export { PayoffBox, Title, NumberText, Description }
