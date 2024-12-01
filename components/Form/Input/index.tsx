import { FC, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import FormError from 'components/Form/Error'
import { FormWrapper, FormLabel, FormHelper } from '../style'
import { Input } from './style'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helper?: string
  error?: string
}
const FormInput: FC<IFormInput> = ({
  label,
  helper,
  required,
  error,
  ...props
}) => (
  <FormWrapper>
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      {helper && <FormHelper>({helper})</FormHelper>}
    </div>
    <Input {...props} />
    <FormError type='invalid' label={error} />
  </FormWrapper>
)

FormInput.defaultProps = {
  label: undefined,
  helper: undefined,
  error: undefined
}
FormInput.propTypes = {
  label: PropTypes.string,
  helper: PropTypes.string,
  error: PropTypes.string
}

export default FormInput
