/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'

import useDisclosure from 'hooks/useDisclosure'
import { getStampById, getStampContent } from 'services/stamp'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import LoadingScreen from 'components/LoadingScreen'

import StampModal from './components/StampModal'

const StampBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(false)
  const {
    state: { user },
    dispatch
  } = useUser()

  const isInitStamp = useRef(false)
  const { data: stampData, isLoading } = useQuery(
    ['stamp', user?.id],
    () => getStampById(user?.id),
    { enabled: !isEmpty(user) }
  )

  const { data: stampCurrent } = useQuery(['content'], () => getStampContent())
  const dataStamp = stampCurrent?.data.payload

  useEffect(() => {
    if (!isInitStamp.current && !isLoading && stampData?.data) {
      dispatch({
        type: IUserDispatch.UPDATE_STAMP,
        payload: { count: stampData.data.payload || 0 }
      })
      isInitStamp.current = true
    }
  }, [isLoading, stampData?.data, isInitStamp.current])

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />
  }

  return (
    <>
      {dataStamp && dataStamp.id && (
        <>
          <div
            className='rounded overflow-hidden position-relative d-none d-main-block'
            role='button'
            onClick={onOpen}
          >
            <Image
              src={dataStamp.bannerImgTH}
              alt='stamp campaign banner'
              layout='responsive'
              width={500}
              height={167}
              priority
            />
          </div>
          <div
            className='rounded overflow-hidden position-relative d-main-none'
            role='button'
            onClick={onOpen}
          >
            <Image
              // mobile source
              src={dataStamp.bannerImgTH}
              alt='stamp campaign banner'
              layout='responsive'
              width={500}
              height={167}
            />
          </div>
        </>
      )}
      {dataStamp && dataStamp.id && (
        <StampModal show={isOpen} onHide={onClose} stampContent={dataStamp} />
      )}
    </>
  )
}

export default StampBanner
