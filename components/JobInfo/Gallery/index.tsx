import { FC, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import Title from 'components/JobInfo/Title'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'
import { ReactPhotoCollage } from 'react-photo-collage'
import { IJobinfoGallery } from 'interfaces/JobInfo'

interface IPropertyBuildingInfo extends HTMLAttributes<HTMLElement> {
  theme?: string
  data?: IJobinfoGallery[]
}
interface ICollageImages {
  source: string
}

const PropertyBuildingInfo: FC<IPropertyBuildingInfo> = ({
  theme,
  data,
  ...props
}) => {
  const photos = data?.map((x) => ({
    source: x?.imageUrl
  })) as ICollageImages[]
  const settingXs = {
    width: '100%',
    height: ['250px'],
    layout: [1],
    photos,
    showNumOfRemainingPhotos: true
  }

  const { t } = useTranslation()
  const setting = {
    width: '100%',
    height: ['250px'],
    photos,
    showNumOfRemainingPhotos: true
  }

  const getLayout = () => {
    switch (photos?.length) {
      case 1:
        return [1]
      case 2:
        return [2]
      case 3:
      case 4:
      case 5:
        return [2, 3]
      default:
        if (photos?.length > 5) return [2, 3, 2]
        return [1]
    }
  }

  return (
    <Container {...props} className='py-5'>
      <Title text={t('jobinfo.projectGallery.title')} underLineColor={theme} />
      <Row>
        <Col className='px-0 px-sm-3'>
          <div className='d-none d-sm-block'>
            <ReactPhotoCollage {...setting} layout={getLayout()} />
          </div>
          <div className='d-block d-sm-none'>
            <ReactPhotoCollage {...settingXs} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

PropertyBuildingInfo.defaultProps = {
  theme: '#000'
}
PropertyBuildingInfo.propTypes = {
  theme: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default PropertyBuildingInfo
