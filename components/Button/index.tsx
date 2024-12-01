import { ReactNode, FC } from 'react'
import { ButtonProps } from 'react-bootstrap'
import { Wrapper } from './style'

interface IProps extends ButtonProps {
  children: ReactNode
}

const Button: FC<IProps> = (props: IProps) => {
  const { children, ...restProps } = props
  return <Wrapper {...restProps}>{children}</Wrapper>
}

Button.propTypes = {}

export default Button
