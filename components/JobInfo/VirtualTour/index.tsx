import { FC, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import Title from 'components/JobInfo/Title'
import { IJobinfoVirtualTour } from 'interfaces/JobInfo'
import { Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Wrapper, VirtualItem, Description, VirtualTourButton } from './style'

interface IPropertyVirtualTour extends HTMLAttributes<HTMLElement> {
  theme?: string
  data?: IJobinfoVirtualTour[]
}

const PropertyVirtualTour: FC<IPropertyVirtualTour> = ({
  theme,
  data,
  ...props
}) => (
  <Container {...props} className='py-5'>
    <Title text='Virtual Tour' underLineColor={theme} />
    <Wrapper theme={theme}>
      {data &&
        data.map((item) => (
          <VirtualItem key={`brochure-${item.topic}-${item.id}`}>
            <div
              className='d-flex justify-content-center align-items-center my-5'
              style={{
                width: 180
              }}
            >
              <Image
                src={item.thumbnailImageUrl as string}
                style={{}}
                className='position-absolute virtual-image'
              />
              <Image
                src='/assets/images/landing/virtual-tour-360.png'
                width={66}
                height={66}
                className='position-absolute'
              />
            </div>
            {item.description && <Description>{item.description}</Description>}

            <OverlayTrigger
              placement='top'
              overlay={<Tooltip>{item.topic}</Tooltip>}
              delay={{ show: 300, hide: 0 }}
            >
              <VirtualTourButton
                href={item.url}
                className='mt-3'
                variant='theme'
                disabled={!item.url}
              >
                {item.topic}
              </VirtualTourButton>
            </OverlayTrigger>
          </VirtualItem>
        ))}
    </Wrapper>
  </Container>
)

PropertyVirtualTour.defaultProps = {
  theme: '#000'
}
PropertyVirtualTour.propTypes = {
  theme: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      thumbnailImageUrl: PropTypes.string,
      topic: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  ).isRequired
}

export default PropertyVirtualTour
