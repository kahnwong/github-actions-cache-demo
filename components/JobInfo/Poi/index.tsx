import { FC, HTMLAttributes, useState } from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { IJobinfoPoi } from 'interfaces/JobInfo'
import { Col, Container, Row } from 'react-bootstrap'
import { getLng } from 'utils/getLng'
import PopupGallery from 'components/PopupGallery'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Title from '../Title'
import {
  CardButton,
  NearBy,
  Wrapper,
  WrapperContent,
  WrapperMap
} from './style'

const MapPOI: any = dynamic(() => import('./MapPoI'), { ssr: false })
interface IPOI extends HTMLAttributes<HTMLElement> {
  theme?: string
  dataPoi: IJobinfoPoi[]
  latitude: number
  longitude: number
  googleMapsUrl?: string
  streetViewUrl?: string
  mapImageUrl?: string
  locale?: string
}

const PropertyPoi: FC<IPOI> = ({
  theme,
  dataPoi,
  latitude,
  longitude,
  googleMapsUrl,
  streetViewUrl,
  mapImageUrl,
  locale,
  ...props
}) => {
  const localeLng = locale?.toUpperCase() || 'TH'
  const { t } = useTranslation()

  const [showGallery, setShowGallery] = useState<boolean>(false)
  const graphicMap: string[] = []
  graphicMap.push(mapImageUrl as string)
  const handleClose = () => {
    setShowGallery(false)
  }
  return (
    <Wrapper {...props}>
      <WrapperContent>
        <Container>
          <Title text={t('jobinfo.poi.title')} underLineColor={theme} />
          <Row className='pt-4 row-gutters-custom'>
            {googleMapsUrl && (
              <Col xs={6} sm={4} md={3} xl={2} className='mb-4 mb-sm-3'>
                <a href={googleMapsUrl} target='_blank' rel='noreferrer'>
                  <CardButton>
                    <Image
                      src='/assets/images/maps/googlemap.png'
                      alt='Google Map'
                      width={45}
                      height={45}
                    />
                    <p className='text-dark'>Google Map</p>
                  </CardButton>
                </a>
              </Col>
            )}
            {streetViewUrl && (
              <Col xs={6} sm={4} md={3} xl={2} className='mb-4 mb-sm-3'>
                <a href={streetViewUrl} target='_blank' rel='noreferrer'>
                  <CardButton>
                    <Image
                      src='/assets/images/maps/googlestreet.png'
                      alt='Google Street'
                      width={45}
                      height={45}
                    />
                    <p className='text-dark'>Google Street</p>
                  </CardButton>
                </a>
              </Col>
            )}
            {mapImageUrl && (
              <Col xs={6} sm={4} md={3} xl={2} className='mb-4 mb-sm-3'>
                <CardButton
                  onClick={() => {
                    setShowGallery(true)
                  }}
                >
                  <Image
                    src='/assets/images/maps/graphicmap.png'
                    alt='Graphic Map'
                    width={45}
                    height={45}
                  />
                  <p>Graphic Map</p>
                </CardButton>
              </Col>
            )}
          </Row>
        </Container>
        <PopupGallery
          isShow={showGallery}
          handleClose={handleClose}
          listImage={graphicMap}
          autoPlay={false}
        />
        <WrapperMap>
          {!(latitude === null || longitude === null) && (
            <MapPOI
              POI={dataPoi}
              latitude={latitude}
              longitude={longitude}
              locale={locale}
            />
          )}
        </WrapperMap>
        <Container className='mt-4'>
          <Title text={t('jobinfo.poi.nearbyPlaces')} underLineColor={theme} />
          <Row className='row-gutters-custom'>
            {dataPoi &&
              dataPoi?.map((d) => {
                const tname = getLng(d, localeLng, true)
                const tDistanct = getLng(d.distanceType, localeLng, true)
                return (
                  <Col xs={12} lg={6} key={`poi-${d.id}-${tname('name')}`}>
                    <NearBy className='d-flex justify-content-between spanPoi'>
                      <span>{tname('name')}</span>
                      <span>
                        {d.distance} {tDistanct('name')}
                      </span>
                    </NearBy>
                  </Col>
                )
              })}
          </Row>
        </Container>
      </WrapperContent>
    </Wrapper>
  )
}

PropertyPoi.defaultProps = {
  theme: '#000',
  googleMapsUrl: '',
  streetViewUrl: '',
  mapImageUrl: '',
  locale: 'TH'
}
PropertyPoi.propTypes = {
  theme: PropTypes.string,
  googleMapsUrl: PropTypes.string,
  streetViewUrl: PropTypes.string,
  mapImageUrl: PropTypes.string,
  locale: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
}

export default PropertyPoi
