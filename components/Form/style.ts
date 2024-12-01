import styled from 'styled-components'

interface IFromLabel {
  required?: boolean
}
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`
const FormLabel = styled.label<IFromLabel>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #222529;
  margin-bottom: 8px;
  &:after {
    content: '${({ required }) => (required === true ? '*' : '')}';
    color: #e93c51;
  }
`
const FormHelper = styled.span`
  margin-left: 7px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #6c757d;
`

export { FormWrapper, FormLabel, FormHelper }
