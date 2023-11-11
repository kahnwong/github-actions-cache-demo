import { FC, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import { Warpper, InputCheckbox, InputLabel } from './style'

interface IFormCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | object | HTMLElement
  required?: boolean
}
const FormCheckbox: FC<IFormCheckbox> = ({
  label,
  required,
  name,
  ...props
}) => {
  const id = name // ?? (Math.random() + 1).toString(36).substring(7)
  return (
    <Warpper>
      <InputCheckbox id={id} type='checkbox' {...props} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
    </Warpper>
  )
}

FormCheckbox.defaultProps = {
  label: undefined,
  required: false
}
FormCheckbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool
}

export default FormCheckbox
