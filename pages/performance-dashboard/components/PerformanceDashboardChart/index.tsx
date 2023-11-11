import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Row, Col } from 'react-bootstrap'
import { SHARED, DROP } from './constants'
import DoughnutChart from './components/DoughnutChart'

const PerformanceDashboardChart: FC<any> = (query) => {
  const { t } = useTranslation()
  const { totalShare, totalDrop } = query
  const [sharedData, setShared] = useState(totalShare)
  const [dropData, setDrop] = useState(totalDrop)
  useEffect(() => {
    if (query) {
      setShared(totalShare)
      setDrop(totalDrop)
    }
  }, [query])
  return (
    <Row className='gx-3 gy-3'>
      <Col md={6} xs={12} className='d-flex'>
        <Col className='flex-fill border rounded-3 px-3 pt-3 g-0 display-10 bg-white row justify-content-left align-content-top '>
          <Row className='max-height-60'>
            <h6>{t('performanceDashboard.Chart.ShareThroughSocial')}</h6>
          </Row>
          <DoughnutChart
            data={sharedData}
            labels={SHARED.labels}
            colors={SHARED.colors}
            legends={SHARED.legends}
          />
        </Col>
      </Col>
      <Col md={6} xs={12} className='d-flex'>
        <Col className='row border rounded-3 px-3 pt-3 g-0 display-10 bg-white justify-content-left align-content-top flex-fill'>
          <Row className='max-height-60'>
            <h6>{t('performanceDashboard.Chart.regisVolume')}</h6>
          </Row>
          <DoughnutChart
            data={dropData}
            labels={DROP.labels}
            colors={DROP.colors}
            legends={DROP.legends}
          />
        </Col>
      </Col>
    </Row>
  )
}

export default PerformanceDashboardChart
