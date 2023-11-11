import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { Modal } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import type { FC } from 'react'
import type { IStampPrize, IStampReward } from 'interfaces/Reward'

import useDisclosure from 'hooks/useDisclosure'
import { useUser } from 'contexts/userContext'
import { MIN_TODAY_SHARE } from 'config/stamp'

// import stampBannerImg from 'public/assets/images/stamp/card_info.jpg'

import StampBody from '../StampBody'
import StampFooter from '../StampFooter'
import RewardPopup from '../RewardPopup'
import { BannerWrapper, ModalHeader } from './style'

interface IProps {
  show: boolean
  onHide: () => void
  stampContent: IStampReward
}

const StampModal: FC<IProps> = (props) => {
  const { show, onHide, stampContent } = props

  const [rewardData, setRewardData] = useState<IStampPrize>()
  const [hasSeenReward, setHasSeenReward] = useState<boolean>(false)

  const {
    state: { user, stampCount }
  } = useUser()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const foundReward = stampContent.stampPrizes.find(
      (reward) => reward.day === stampCount
    )
    if (
      user &&
      show &&
      !hasSeenReward &&
      foundReward &&
      !isEmpty(foundReward)
    ) {
      if (user.todayShare >= MIN_TODAY_SHARE) {
        setRewardData(foundReward)
        setTimeout(() => {
          onOpen()
          setHasSeenReward(true)
        }, 1000)
      }
    }
  }, [user, show, stampCount, hasSeenReward])

  return (
    <Modal show={show} onHide={onHide} size='lg' fullscreen='sm-down'>
      <ModalHeader closeButton />
      <Modal.Body className='p-0'>
        <BannerWrapper className='p-0'>
          {stampContent && (
            <Image
              src={stampContent.bannerImgTH}
              alt='Stamp Campaign'
              layout='responsive'
              width={500}
              height={167}
            />
          )}
        </BannerWrapper>
        <StampBody stampContent={stampContent} />
        {stampContent && <StampFooter textFooter={stampContent.descTH} />}
      </Modal.Body>
      <RewardPopup isOpen={isOpen} onClose={onClose} rewardData={rewardData} />
    </Modal>
  )
}

StampModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  stampContent: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // titleTH: PropTypes.string.isRequired,
    // titleEN: PropTypes.string.isRequired,
    // titleCN: PropTypes.string.isRequired,
    descTH: PropTypes.string.isRequired,
    descEN: PropTypes.string.isRequired,
    descCN: PropTypes.string.isRequired,
    bannerImgTH: PropTypes.string.isRequired,
    bannerImgEN: PropTypes.string.isRequired,
    bannerImgCN: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    // createdBy: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    // updatedBy: PropTypes.string.isRequired,
    // deletedAt: PropTypes.string.isRequired,
    stampPrizes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        titleTH: PropTypes.string.isRequired,
        titleEN: PropTypes.string.isRequired,
        titleCN: PropTypes.string.isRequired,
        imageTH: PropTypes.string.isRequired,
        imageEN: PropTypes.string.isRequired,
        imageCN: PropTypes.string.isRequired,
        day: PropTypes.number.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
}

export default StampModal
