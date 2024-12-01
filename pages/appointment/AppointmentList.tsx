import { FC } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Card, Row, Col } from 'react-bootstrap'
import { IAppointmentList } from '../../interfaces/AppointmentList'
import formatDateApp from '../../utils/formatDateApp'
import LoadingScreen from '../../components/LoadingScreen'
import { AccordionWrapper, WrapperDate } from './style'
import { useUser } from '../../contexts/userContext'

const AppointmentList: FC<IAppointmentList> = ({
  appointment,
  isLoading,
  isError
}) => {
  const { t } = useTranslation()
  const {
    state: { language }
  } = useUser()

  if (isLoading || isError || appointment?.length === 0) {
    return (
      <LoadingScreen
        isLoading={isLoading}
        isError={isError}
        locale={language}
      />
    )
  }
  return (
    <AccordionWrapper flush>
      {appointment?.map(
        ({
          id,
          leadName,
          contactSaleName,
          appointmentStatus,
          appointmentDate,
          finishedDate,
          createdDate,
          job
        }) => {
          const appointmentDateFormat = formatDateApp(appointmentDate)
          const createDateFormat = formatDateApp(createdDate)
          const finishDateFormat = formatDateApp(finishedDate)
          let isBadge
          switch (appointmentStatus) {
            case 'SUCCESS':
              isBadge = 'success'
              break
            case 'CANCEL':
              isBadge = 'danger'
              break
            default:
              isBadge = 'info'
              break
          }
          return (
            <AccordionWrapper.Item eventKey={id.toString()} key={id}>
              <AccordionWrapper.Header>
                <Row className='w-100'>
                  <Col xs={2} className='d-none d-lg-block'>
                    <span className={`badge rounded-pill bg-${isBadge}`}>
                      {appointmentStatus.toLocaleLowerCase()}
                    </span>
                  </Col>
                  <Col xs={2} className='p-0 text-end text-lg-start fw-normal'>
                    <WrapperDate>
                      <span className='text-primary'>
                        {appointmentDateFormat.isDay}
                      </span>
                      <small>
                        {appointmentDateFormat.isWeek}
                        <br />/{appointmentDateFormat.isMonth}/
                        {appointmentDateFormat.isYear}
                      </small>
                    </WrapperDate>
                  </Col>
                  <Col className='ps-5 ps-lg-3'>{job?.projectName}</Col>
                </Row>
              </AccordionWrapper.Header>
              <Card className='py-1' key={id}>
                <AccordionWrapper.Body className='fw-light p-0'>
                  <Card.Body
                    className='p-2 bg-light'
                    style={{ fontSize: 'medium' }}
                  >
                    <Row>
                      <Col xs={4} className='text-end'>
                        {t('appointment.appointmentList.notifyWhen')}
                      </Col>
                      <Col xs={8} className='text-primary'>
                        {createDateFormat.dateTH}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4} className='text-end'>
                        {t('appointment.appointmentList.appointment')}
                      </Col>
                      <Col xs={8} className='text-primary'>
                        {appointmentDateFormat.dateTH}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4} className='text-end'>
                        {t('appointment.appointmentList.customer')}
                      </Col>
                      <Col xs={8} className='text-primary'>
                        {leadName}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4} className='text-end'>
                        {t('appointment.appointmentList.contact')}
                      </Col>
                      <Col xs={8} className='text-primary'>
                        {contactSaleName}
                      </Col>
                    </Row>
                    {appointmentStatus !== 'ACTIVE' && (
                      <Row>
                        <Col xs={4} className='text-end'>
                          {t('appointment.appointmentList.finish')}
                        </Col>
                        <Col xs={8} className='text-primary'>
                          {finishDateFormat.dateTH}
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </AccordionWrapper.Body>
              </Card>
            </AccordionWrapper.Item>
          )
        }
      )}
    </AccordionWrapper>
  )
}
AppointmentList.defaultProps = {
  isLoading: false,
  isError: false
}
AppointmentList.propTypes = {
  appointment: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      leadName: PropTypes.string.isRequired,
      contactSaleName: PropTypes.string.isRequired,
      appointmentStatus: PropTypes.string.isRequired,
      appointmentDate: PropTypes.string.isRequired,
      finishedDate: PropTypes.string.isRequired,
      createdDate: PropTypes.string.isRequired,
      job: PropTypes.shape({ projectName: PropTypes.string.isRequired })
        .isRequired
    }).isRequired
  ).isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
}
export default AppointmentList
