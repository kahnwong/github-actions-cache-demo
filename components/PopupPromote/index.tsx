import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Modal } from 'react-bootstrap'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import { IPopupCurrent } from 'interfaces/PopupPromote'
import { getPopupCurrent } from 'services/popupPromote'
import { getLng } from 'utils/getLng'
import { ModalHeader, BannerWrapper } from './style'

const PopupPromote: FC = () => {
  const {
    state: { isVisit, language },
    dispatch
  } = useUser()
  const [showAds, setShowAds] = useState<boolean>(false)
  const handleClose = () => {
    setShowAds(false)
  }
  const { data: popupData, isLoading } = useQuery(['POPUP_CURRENT'], () =>
    getPopupCurrent()
  )

  const [dataPop, setDataPop] = useState<IPopupCurrent>({ url: '', image: '' })

  useEffect(() => {
    if (
      popupData &&
      popupData?.data.payload?.length > 0 &&
      !isLoading &&
      !isVisit
    ) {
      const dataPayload = popupData?.data.payload
      const dataLength = popupData?.data.payload?.length
      const dataRandom = Math.floor(Math.random() * dataLength)
      const newImage = dataPayload.filter((item) => item?.imageTH !== null)

      const tPopup =
        newImage && getLng(newImage[dataRandom], language?.toUpperCase())

      const dataCurrent = {
        url: tPopup('url'),
        image: tPopup('image')
      }

      const check: number = Date.parse(new Date().toString())
      const start = Date.parse(newImage[dataRandom]?.startDate || '')
      const end = Date.parse(newImage[dataRandom]?.endDate || '')

      if (+check <= end && check >= start && !isVisit) {
        dispatch({ type: IUserDispatch.VISIT })
        setDataPop(dataCurrent)
        setTimeout(() => {
          setShowAds(true)
        }, 2000)
      }
    }
  }, [popupData?.data])

  return (
    <Modal centered show={showAds} onHide={handleClose} keyboard={false}>
      <ModalHeader closeButton />
      <Modal.Body className='p-0'>
        <BannerWrapper>
          {/* TODO change to use img tag for image responsive */}
          <a href={dataPop.url} target='_blank' rel='noopener noreferrer'>
            <img id='img-campaign' src={dataPop.image} alt='announce' />
          </a>
        </BannerWrapper>
      </Modal.Body>
    </Modal>
  )
}

export default PopupPromote
