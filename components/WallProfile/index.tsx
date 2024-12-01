import { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { FiAlertCircle, FiEdit3 } from 'react-icons/fi'
import PinGreen from 'public/assets/icons/pin-green.png'
import { Alert, Container } from 'react-bootstrap'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useCompany } from '../../contexts/companyContext'

interface IProfileField {
  profileFilled?: boolean
  interestFilled?: boolean
}
const WallProfile: FC<IProfileField> = ({ profileFilled, interestFilled }) => {
  const { t } = useTranslation()
  const urlProfile = '/user-profile'
  const urlInterest = '/interest'
  const {
    state: { companyNameEn }
  } = useCompany()

  return (
    <Container>
      <Alert
        variant='light'
        className='border mb-0 bn-small d-flex align-items-center'
      >
        <FiAlertCircle size={24} className='me-2 flex-shrink-0' />
        <div>
          {t('wallProfile.emailAndPhone')},{' '}
          <span className='text-primary'>
            {t('wallProfile.receiveRevenue')}
          </span>
          {!profileFilled && (
            <Link href={urlProfile}>
              <a className='mt-2 text-end'>
                <FiEdit3 size={16} className='ms-2 me-1' />
                {t('wallProfile.updateProfile')}
              </a>
            </Link>
          )}
          <div className='d-inline pe-2 ms-2 '>
            {!profileFilled && !interestFilled && (
              <span className='px-2'>{t('wallProfile.and')}</span>
            )}
            {!interestFilled && (
              <Link href={urlInterest}>
                <a className='mt-2 text-end'>
                  <Image
                    src={PinGreen}
                    alt={`${companyNameEn} user interest`}
                    height={14}
                    width={14}
                  />
                  <span className='ps-0'>
                    {' '}
                    {t('wallProfile.interestInformation')}
                  </span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </Alert>
    </Container>
  )
}

WallProfile.defaultProps = {
  profileFilled: false,
  interestFilled: false
}
WallProfile.propTypes = {
  profileFilled: PropTypes.bool,
  interestFilled: PropTypes.bool
}
export default WallProfile
