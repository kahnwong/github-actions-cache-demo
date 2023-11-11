import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  usePropertyModalContext,
  PROPERTY_MODAL_ACTIONS
} from 'contexts/propertyModalContext'
import AppointmentDetail from './Components/AppointmentDetail'
import JobInformation from './Components/JobInformation'
import ShareSocial from './Components/ShareSocial'
import JobShortInformation from './Components/JobShortInformation'
import ImageTop from './Components/ImageTop'
import { PropertyModalWrapper, InformationGroupWrapper } from './style'
import InputAction from './Components/InputAction'

const PropertyModal: FC = () => {
  const { t } = useTranslation()
  const {
    state: { isOpen, modalType },
    dispatch
  } = usePropertyModalContext()
  const renderModal = (key: string): ReactNode => {
    switch (key) {
      case 'share':
        return (
          <>
            <JobShortInformation
              title={t('propertyModal.shareProjectToEveryone')}
            />
            <hr className='my-4' />
            <ShareSocial />
            <InputAction type='copy' />
          </>
        )
      case 'appointment':
        return (
          <>
            <JobShortInformation
              title={t('propertyModal.appointmentSeeProject')}
            />
            <hr className='my-4' />
            <AppointmentDetail className='mb-4' />
            <InputAction type='call' />
          </>
        )
      case 'information':
        return (
          <>
            <ImageTop />
            <InformationGroupWrapper>
              <ShareSocial title={t('propertyModal.shareProjectToEveryone')} />
              <InputAction type='copy' className='mb-4' />
              <JobInformation />
            </InformationGroupWrapper>
          </>
        )
      case 'information-coupon':
        return (
          <>
            <ImageTop />
            <InformationGroupWrapper>
              <ShareSocial title={t('propertyModal.shareCouponToEveryone')} />
              <InputAction type='copy' className='mb-4' />
              <JobInformation />
            </InformationGroupWrapper>
          </>
        )
      case 'share-coupon':
        return (
          <>
            <JobShortInformation
              title={t('propertyModal.shareCouponToEveryone')}
            />
            <hr className='my-4' />
            <ShareSocial />
            <InputAction type='copy' />
          </>
        )
      default:
        return null
    }
  }
  return (
    <PropertyModalWrapper
      show={isOpen}
      onHide={() => dispatch({ type: PROPERTY_MODAL_ACTIONS.CLOSE_MODAL })}
      onExited={() => dispatch({ type: PROPERTY_MODAL_ACTIONS.RESET })}
      centered
      keyboard={false}
    >
      <PropertyModalWrapper.Header closeButton />
      <PropertyModalWrapper.Body>
        {renderModal(modalType)}
      </PropertyModalWrapper.Body>
    </PropertyModalWrapper>
  )
}

export default PropertyModal
