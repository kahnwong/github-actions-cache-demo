import { FC } from 'react'
import PropTypes from 'prop-types'
import { TitleText } from './style'

type TTextAlign = 'left' | 'right' | 'center' | 'justify'
interface ITitle {
  text: string
  textColor?: string
  underLineColor?: string
  textAlign?: TTextAlign
}
const Title: FC<ITitle> = ({ text, underLineColor, textColor, textAlign }) => (
  <TitleText
    underLineColor={underLineColor}
    textAlign={textAlign}
    textColor={textColor}
  >
    {text}
  </TitleText>
)
Title.defaultProps = {
  underLineColor: '#222529',
  textColor: '#222529',
  textAlign: 'center'
}
Title.propTypes = {
  text: PropTypes.string.isRequired,
  underLineColor: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify'])
}

export default Title
