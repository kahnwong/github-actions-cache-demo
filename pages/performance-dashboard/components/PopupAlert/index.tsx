import { FC, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { Modal, OverlayTrigger, Button } from 'react-bootstrap'
import dashboardAlertSVG from 'public/assets/images/dashboardAlert.svg'
import { ModalHeader, ModalBody, InfoTooltip, InfoButton } from './style'

interface IPopupAlert {
  profileFilled: boolean | null
  interestFilled: boolean | null
}

const PopupAlert: FC<IPopupAlert> = (props) => {
  const { t } = useTranslation()
  const { profileFilled, interestFilled } = props
  const [showAlert, setShowAlert] = useState<boolean>(
    !profileFilled || !interestFilled
  )
  const handleClose = () => {
    setShowAlert(false)
  }
  const urlProfile = '/user-profile'
  const urlInterest = '/interest'

  return (
    <Modal centered show={showAlert} onHide={handleClose} keyboard={false}>
      <ModalHeader closeButton />
      <ModalBody className='p-4'>
        <h5>
          {t('performanceDashboard.popupAlert.modalTitle')}
          {!profileFilled &&
            interestFilled &&
            t('performanceDashboard.popupAlert.profile')}
          {!profileFilled &&
            !interestFilled &&
            t('performanceDashboard.popupAlert.profileAndInterest')}
          {!interestFilled &&
            profileFilled &&
            t('performanceDashboard.popupAlert.interestInfo')}
        </h5>
        <h6>
          {t('performanceDashboard.popupAlert.modalSubTitle')}
          <OverlayTrigger
            placement='bottom'
            overlay={
              <InfoTooltip>
                {t('performanceDashboard.popupAlert.infoTooltip')}
              </InfoTooltip>
            }
          >
            <InfoButton size='sm' variant='dark' className='ms-2'>
              <p className='p-0 m-0'>?</p>
            </InfoButton>
          </OverlayTrigger>
        </h6>
        <div className='mt-4 d-flex align-items-center justify-content-center'>
          <Image src={dashboardAlertSVG} alt='Alert' />
        </div>
        <div className='mt-4 d-flex align-items-center justify-content-center'>
          <Button href={!profileFilled ? urlProfile : urlInterest}>
            {t('performanceDashboard.popupAlert.buttonUpdate')}
            {!profileFilled &&
              interestFilled &&
              t('performanceDashboard.popupAlert.profile')}
            {!profileFilled &&
              !interestFilled &&
              t('performanceDashboard.popupAlert.profileAndInterest')}
            {!interestFilled &&
              profileFilled &&
              t('performanceDashboard.popupAlert.interestInfo')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

PopupAlert.propTypes = {
  profileFilled: PropTypes.bool.isRequired,
  interestFilled: PropTypes.bool.isRequired
}
export default PopupAlert
