import { FC } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-bootstrap'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { ModalHeader, ModalContent } from './style'

interface IGallery {
  isShow?: boolean
  listImage: string[]
  handleClose: () => void
  autoPlay?: boolean
}

const PopupGallery: FC<IGallery> = ({
  isShow,
  listImage,
  handleClose,
  autoPlay
}) => {
  const images = listImage?.map((elem) => ({
    original: elem,
    thumbnail: elem,
    thumbnailHeight: 50
  }))
  if (!listImage) return null
  return (
    <Modal show={isShow} onHide={handleClose} keyboard={false} fullscreen>
      <ModalContent>
        <ModalHeader closeButton />
        <ImageGallery
          autoPlay={autoPlay}
          items={images}
          lazyLoad
          slideInterval={5000}
          showFullscreenButton={false}
        />
      </ModalContent>
    </Modal>
  )
}
PopupGallery.defaultProps = {
  isShow: false,
  autoPlay: true
}

PopupGallery.propTypes = {
  isShow: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool
}

export default PopupGallery
