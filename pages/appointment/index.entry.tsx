import Head from 'next/head'

import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'

import type { NextPage } from 'next'
import type { TAppointmentStatus } from 'interfaces/AppointmentList'

import { getAppointment } from 'services/appointment'
import PrivateLayout from 'layouts/PrivateLayout'
import withPrivate from 'hocs/withPrivate'

import AppointmentList from './AppointmentList'

const Appointment: NextPage = () => {
  const { t } = useTranslation()
  const [appointmentStatus, setAppointmentStatus] =
    useState<TAppointmentStatus>('active')

  const { data, isLoading, isError } = useQuery(
    ['appointment', appointmentStatus],
    () => getAppointment(appointmentStatus)
  )

  const btnActive = `${appointmentStatus !== 'active' ? 'outline-' : ''}primary`
  const btnRecent = `${appointmentStatus === 'active' ? 'outline-' : ''}primary`

  return (
    <PrivateLayout useBackButton title={t('appointment.headerTitle')}>
      <Head>
        <title>{t('appointment.headerTitle')}</title>
      </Head>
      <Container className='pt-4'>
        <div className='bn-tabs d-flex align-items-center'>
          <h1 className='h2 d-none d-lg-block'>
            {t('appointment.headerTitle')}
          </h1>
          <div className='d-flex ms-auto gap-lg-3 flex-grow-1 flex-lg-grow-0'>
            <Button
              variant={`${btnActive}`}
              className='bn-tabs-btn px-5 btn'
              type='button'
              onClick={() => setAppointmentStatus('active')}
            >
              {t('appointment.current')}
            </Button>
            <Button
              variant={`${btnRecent}`}
              className='bn-tabs-btn px-5'
              type='button'
              onClick={() => setAppointmentStatus('recent')}
            >
              {t('appointment.past')}
            </Button>
          </div>
        </div>
        <div>
          <div className='border-bottom d-none d-lg-block pt-4'>
            <Row>
              <Col xs={3} lg={{ span: 2, offset: 2 }}>
                {t('appointment.date')}
              </Col>
              <Col xs='auto'>{t('appointment.projectAndPlace')}</Col>
            </Row>
          </div>
          {data?.data.payload && (
            <AppointmentList
              appointment={data.data.payload}
              isLoading={isLoading}
              isError={isError}
            />
          )}
        </div>
      </Container>
    </PrivateLayout>
  )
}
export default withPrivate(Appointment)
