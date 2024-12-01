import 'leaflet/dist/leaflet.css'
import { FC, useState } from 'react'
import L from 'leaflet'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import { getLng } from 'utils/getLng'
import {
  useMap,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl
} from 'react-leaflet'
import { IJobinfoPoi } from 'interfaces/JobInfo'
import styled from 'styled-components'
import { POI_RGB } from './constant'
import { PopupTitle } from './style'

const PopupLeaflet = styled(Popup)`
  a.leaflet-popup-close-button {
    color: #fff !important;
  }
  width: auto !important;
`

interface IMaps {
  POI: IJobinfoPoi[]
  latitude: number
  longitude: number
  locale: string
}

const MapsPOI: FC<IMaps> = ({ POI, latitude, longitude, locale }) => {
  const [locData, setLocData] = useState(POI || [])
  const localeLng = locale?.toUpperCase() || 'TH'
  const geoData = { lat: latitude, lng: longitude }
  const centerTH = { lat: 13.736634, lng: 100.479852 }
  const [center, setCenter] = useState(geoData || centerTH)

  const poiMarker = locData?.map((value) => {
    if (value.latitude && value.longitude) {
      const result = POI_RGB.find((v) => v.id === value.poiType?.id)
      const lat: number = value.latitude as unknown as number
      const lon: number = value.longitude as unknown as number
      const pos: L.LatLngExpression = [lat, lon]
      const tHeadTitle = getLng(value, localeLng || 'TH', true)
      const labelIcon = new L.DivIcon({
        className: 'my-div-icon',
        html: `<div style=" position: absolute; color: #fff;
                  width:40px;
                  height:30px;
                  background-color: ${result?.colors}; border-radius: 5px;
                  padding: 2px 5px; left: -20px; display:flex; justify-content: center; align-items: center;">
                 <Image src="${value.poiType?.iconUrl}" width={20} height={20} /></div>
                 <div style="position : relative"></div>
      <div style=" width: 10px; height: 10px; position: relative;
                  top: 30px; right: 5.5px; border-top: solid 5px ${result?.colors};
                  border-left: solid 5px transparent; border-right: solid 5px transparent;"/>`
      })
      return (
        <Marker
          key={`pot-marker-${value.id}`}
          position={pos}
          icon={labelIcon}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup()
          }}
        >
          <PopupLeaflet className='popup'>
            <div className='ratio ratio-16x9'>
              <Image
                src={value.imageUrl as string}
                alt={value.nameTh as string}
                layout='fill'
                style={{ borderRadius: '12px 12px 0 0' }}
              />
            </div>
            <div className='p-2 text-center'>
              <PopupTitle className='m-0' style={{ fontSize: '1rem' }}>
                {tHeadTitle('name')}
              </PopupTitle>
            </div>
          </PopupLeaflet>
        </Marker>
      )
    }
    return ''
  })
  const homeIcon = new L.Icon({
    iconUrl: '/assets/images/icon-house-02.svg',
    iconRetinaUrl: '/assets/images/icon-house-02.svg',
    iconAnchor: [5, 55],
    popupAnchor: [15, -50],
    iconSize: [40, 45]
  })
  const badge = () => {
    const handleFilter = (id: number) => {
      if (id === 0) {
        setLocData(POI)
        setCenter(geoData)
      } else {
        const filtered = POI?.filter((fil) => fil.poiType?.id === id)
        if (filtered.length > 0) {
          const latlon = {
            lat: filtered[0].latitude as unknown as number,
            lng: filtered[0].longitude as unknown as number
          }
          setCenter(latlon)
          setLocData(filtered)
        }
      }
    }
    return (
      <Row className='no-gutters-custom'>
        {POI_RGB.map((val, i) => {
          const t = getLng(val, localeLng || 'TH')
          return (
            <Col
              key={`poi-badge-${val.id}`}
              xs={4}
              sm={4}
              md={3}
              lg={2}
              align='center'
              onClick={() => handleFilter(val.id)}
            >
              <span
                key={`ba-${val.id}`}
                className='badge badge-pill d-flex  align-items-center justify-content-center poi-badge'
                style={{ backgroundColor: val.colors }}
              >
                {i !== 0 && (
                  <Image
                    src={val.icon}
                    alt={t('text')}
                    className='me-1'
                    width={25}
                    height={25}
                  />
                )}
                {t('text')}
              </span>
            </Col>
          )
        })}
      </Row>
    )
  }
  const ChangeView = ({ coords }: any) => {
    const map = useMap()
    map.setView(coords, 12)
    return null
  }
  return (
    <Container>
      <div className='badge-nearby my-4 d-flex'>{badge()}</div>
      <MapContainer
        zoomControl={false}
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: '55vh' }}
      >
        <ChangeView coords={center} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='bottomright' />
        <Marker
          icon={homeIcon}
          position={[geoData?.lat, geoData?.lng]}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup()
          }}
        />
        {poiMarker}
      </MapContainer>
    </Container>
  )
}

export default MapsPOI
