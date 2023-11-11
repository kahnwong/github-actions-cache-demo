import { FC, ButtonHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import { Button } from './style'

interface IFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  textColor?: string
}

const FormButton: FC<IFormButton> = (props) => {
  const { children, textColor, ...rest } = props;
  return <Button {...rest} text-color={textColor}>{children ?? 'Submit'}</Button>
}
FormButton.defaultProps = {
  color: undefined,
  textColor: '#ffffff',
}
FormButton.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
}

export default FormButton
