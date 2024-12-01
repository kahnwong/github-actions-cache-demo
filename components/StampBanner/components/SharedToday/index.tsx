import { FC } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Image from 'next/image'
import completeImage from 'public/assets/images/check-star.png'
import stepCheck from 'public/assets/images/B2.png'
import stepBeforeCheck from 'public/assets/images/Stamp-A1.png'
import type { ISahredDay } from 'interfaces/Campaign'
import { StepShare, RewardPieceImage, SmallText } from './style'

const SharedToday: FC<ISahredDay> = (props) => {
  const { isSpecial, isCompleted, title, img, max } = props
  if (max && img) {
    return (
      <div className='align-items-center justify-content-center text-center'>
        <StepShare
          className={classNames(
            'd-flex flex-column align-items-center justify-content-center rounded-circle text-center text-muted lh-1',
            isSpecial && 'complete-StepShare'
          )}
        >
          {isSpecial && (
            <div className='opacity-100 pt-2 p-1'>
              <Image src={completeImage} />
            </div>
          )}
          {!isSpecial && (
            <div className='text-center text-muted lh-1 small'>
              <RewardPieceImage
                src={`/assets/images/${img}`}
                className=' start-0 w-50 h-auto'
              />
            </div>
          )}
        </StepShare>

        <SmallText className='text-primary'>{title}</SmallText>
      </div>
    )
  }
  return (
    <div className='align-items-center justify-content-center text-center'>
      <StepShare
        className={classNames(
          'd-flex flex-column align-items-center justify-content-center rounded-circle text-center text-muted lh-1',
          isCompleted && 'complete-StepShare'
        )}
      >
        {isCompleted && (
          <div className='opacity-100 pt-2 p-1'>
            <Image src={stepCheck} />
          </div>
        )}
        {!isCompleted && (
          <div className='opacity-100 pt-2 p-1'>
            <Image src={stepBeforeCheck} />
          </div>
        )}
      </StepShare>
      <SmallText className='text-primary'>{title}</SmallText>
    </div>
  )
}

SharedToday.defaultProps = {
  isSpecial: false,
  isCompleted: false,
  title: '',
  img: undefined,
  max: 0
}
SharedToday.propTypes = {
  isSpecial: PropTypes.bool,
  isCompleted: PropTypes.bool,
  title: PropTypes.string,
  img: PropTypes.string,
  max: PropTypes.number
}

export default SharedToday
