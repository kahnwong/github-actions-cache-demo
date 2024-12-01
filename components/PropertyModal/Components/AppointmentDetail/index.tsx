import { CONTACT_LINE, CONTACT_CALL } from 'config/contact'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import classNames from 'classnames'

interface iAppointment {
  className?: string
}

const Appointment: FC<iAppointment> = ({ className }) => {
  const { t } = useTranslation()
  return (
    <div className={classNames('fw-light', className)}>
      <div className='mb-4'>
        {t('propertyModal.appointmentDetail.headerTitle')}
      </div>
      <div>
        Add Line{' '}
        <a
          href={`https://line.me/R/ti/p/${CONTACT_LINE}`}
          target='_blank'
          rel='noreferrer'
        >
          {CONTACT_LINE}
        </a>
      </div>
      <div>
        {t('propertyModal.appointmentDetail.phoneNumber')} {CONTACT_CALL}
      </div>
    </div>
  )
}

Appointment.defaultProps = {
  className: ''
}

Appointment.propTypes = {
  className: PropTypes.string
}

export default Appointment
