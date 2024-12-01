import { FC, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import { Error } from './style'

interface IFormError extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
const FormInput: FC<IFormError> = ({ label, ...props }) => (
  <Error {...props}>{label}</Error>
)

FormInput.defaultProps = {
  label: undefined
}
FormInput.propTypes = {
  label: PropTypes.string
}

export default FormInput
