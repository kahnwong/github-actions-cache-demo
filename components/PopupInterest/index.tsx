import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Button, Modal } from 'react-bootstrap'
import { ModalHeader } from './style'

const PopupInterest: FC = () => {
  const { t } = useTranslation()
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const handleClose = () => {
    setShowAlert(false)
  }

  useEffect(() => {
    setShowAlert(true)
  })
  return (
    <Modal
      backdrop='static'
      centered
      show={showAlert}
      onHide={handleClose}
      keyboard={false}
    >
      <ModalHeader />
      <Modal.Body className='p-4 text-center'>
        <h5>{t('popupInterest.headerTitle')}</h5>
        <h6>{t('popupInterest.headerSubTitle')}</h6>
        <div className='mt-4 d-flex align-items-center justify-content-center'>
          <Link href='/interest'>
            <a target='_self'>
              <Button
                variant='secondary'
                className='px-5 d-flex align-items-center'
              >
                {t('popupInterest.buttonSubmit')}
              </Button>
            </a>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PopupInterest
