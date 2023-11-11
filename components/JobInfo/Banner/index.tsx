import { FC } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-bootstrap'
import { IBanner } from 'interfaces/PropertyLanding'
import { Wrapper } from './style'

const Banner: FC<IBanner> = (props) => (
  <Wrapper >
    <Image
      {...props}
      width='100%'
      height='100%'
    />
  </Wrapper>
)
Banner.defaultProps = {
  src: '',
  alt: '',
}

Banner.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default Banner
