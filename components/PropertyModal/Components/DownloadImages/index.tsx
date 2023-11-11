import { FC, useState } from 'react'
import { usePropertyModalContext } from 'contexts/propertyModalContext'
import { Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import PopupGallery from 'components/PopupGallery'
import PropTypes from 'prop-types'
import CssFilterConverter from 'css-filter-converter'
// @ts-ignore
import { variables } from '@company/variables.ts'
import { useTranslation } from 'react-i18next'
import downloadIcon from '../../../../public/assets/icons/download.png'

interface IDownloadImages {
  onDownload: Function
}

const DownloadImages: FC<IDownloadImages> = ({ onDownload }) => {
  const {
    state: {
      data: { downloadLink }
    }
  } = usePropertyModalContext()
  const { t } = useTranslation()
  const [showGallery, setShowGallery] = useState<boolean>(false)
  const handleClose = () => {
    setShowGallery(false)
  }
  const listImage = downloadLink?.split(',')
  if (!downloadLink) return null
  return (
    <Row>
      {listImage?.slice(0, 4).map((img, index) => {
        if (index < 3 || listImage?.length <= 4) {
          return (
            <Col
              xs={6}
              className='mb-2 px-1'
              key={img}
              onClick={() => setShowGallery(true)}
            >
              <div className='ratio ratio-4x3 cursor-pointer'>
                <Image
                  src={img}
                  alt='download file'
                  layout='fill'
                  objectFit='cover'
                  className='rounded'
                />
              </div>
            </Col>
          )
        }
        return (
          <Col
            xs={6}
            className='mb-2 px-1'
            key={img}
            onClick={() => setShowGallery(true)}
          >
            <div className='ratio ratio-4x3 cursor-pointer'>
              <div className='d-flex justify-content-center align-items-center'>
                <Image
                  src={img}
                  layout='fill'
                  objectFit='cover'
                  style={{
                    filter: 'brightness(0.6)'
                  }}
                  className='rounded position-absolute'
                />
                <span className='position-absolute more-image text-white'>
                  {`+${listImage.length - 3}`}
                </span>
              </div>
            </div>
          </Col>
        )
      })}
      <PopupGallery
        isShow={showGallery}
        handleClose={handleClose}
        listImage={listImage || []}
      />
      <Col
        xs={12}
        className='d-flex align-items-center justify-content-end mt-2'
      >
        <div
          className='cursor-pointer'
          tabIndex={0}
          role='button'
          onClick={() => onDownload(listImage)}
          onKeyDown={() => null}
        >
          <Image
            src={downloadIcon}
            style={{
              filter: CssFilterConverter.hexToFilter(variables.primary).color!
            }}
            height='16'
            width='16'
            aria-label='location'
            alt='location'
          />
          <span className='text-primary display-10 ms-2 mt-1'>
            {t('downloadImages.downloadTitle')}
          </span>
        </div>
      </Col>
    </Row>
  )
}

DownloadImages.propTypes = {
  onDownload: PropTypes.func.isRequired
}

export default DownloadImages
