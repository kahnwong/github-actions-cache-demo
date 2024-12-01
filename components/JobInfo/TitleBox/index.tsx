import { FC } from 'react'
import PropTypes from 'prop-types'
import { TitleBox, Box } from './style'

type TTextAlign = 'left' | 'right' | 'center' | 'justify'
interface ITitle {
  text: string
  theme?: string
  textColor?: string
  textAlign?: TTextAlign
}
const Title: FC<ITitle> = ({ text, theme, textColor, textAlign }) => (
  <div className='d-flex justify-content-center'>
    <Box theme={theme}>
      <TitleBox textAlign={textAlign} textColor={textColor}>
        {text}
      </TitleBox>
    </Box>
  </div>
)
Title.defaultProps = {
  theme: '#222529',
  textColor: '#fff',
  textAlign: 'center'
}
Title.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify'])
}

export default Title
