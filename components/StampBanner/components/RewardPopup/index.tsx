import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Fade } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import type { FC } from 'react'
import type { IStampPrize } from 'interfaces/Reward'

import {
  RewardBackgroundContent,
  RewardBody,
  RewardCentered,
  RewardContent,
  RewardWrapper
} from './style'

interface IProps {
  isOpen: boolean
  onClose: () => void
  rewardData?: IStampPrize
}

const RewardPopup: FC<IProps> = (props) => {
  const { isOpen, onClose, rewardData } = props
  const [isTransitionOut, setIsTransitionOut] = useState(true)
  return (
    <Fade
      in={isOpen}
      onEnter={() => setIsTransitionOut(false)}
      onExited={() => setIsTransitionOut(true)}
    >
      <RewardWrapper
        style={{
          zIndex: isTransitionOut || (!isOpen && isEmpty(rewardData)) ? -1 : 1
        }}
      >
        <RewardBody>
          <RewardCentered>
            <RewardContent>
              <img
                src={rewardData?.imageTH ? rewardData.imageTH : undefined}
                alt={(rewardData?.titleTH as string) || ''}
              />
              <small className='mt-1 mb-3'>คุณได้รับรางวัล</small>
              <div className='h5 mb-4'>{rewardData?.titleTH}</div>
              <Button onClick={onClose}>ตกลง</Button>
              <RewardBackgroundContent />
            </RewardContent>
          </RewardCentered>
        </RewardBody>
      </RewardWrapper>
    </Fade>
  )
}

RewardPopup.defaultProps = {
  rewardData: undefined
}
RewardPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  rewardData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titleTH: PropTypes.string.isRequired,
    titleEN: PropTypes.string.isRequired,
    titleCN: PropTypes.string.isRequired,
    imageTH: PropTypes.string.isRequired,
    imageEN: PropTypes.string.isRequired,
    imageCN: PropTypes.string.isRequired,
    day: PropTypes.number.isRequired
  })
}

export default RewardPopup
