import PropTypes from 'prop-types'
import { Ratio } from 'react-bootstrap'
import classNames from 'classnames'
import Image from 'next/image'

import type { FC } from 'react'

import stampCompleteImage from 'public/assets/images/stamp/stamp.png'

import { Piece, RewardPieceImage, RewardPieceText, SmallText } from './style'

interface IProps {
  day?: number | null
  isCompleted?: boolean
  isWaiting?: boolean
  name?: string | null
  price?: string | null
  image?: string | null
}

const StampPiece: FC<IProps> = (props) => {
  const { day, isCompleted, isWaiting, name, price, image } = props

  if (name && price && image) {
    return (
      <Ratio aspectRatio='1x1'>
        <Piece
          className={classNames(
            'position-absolute d-flex align-items-center justify-content-center rounded-circle',
            isCompleted && 'complete-piece',
            isWaiting && 'waiting-piece'
          )}
        >
          <div className='text-center text-muted lh-1 small'>
            <RewardPieceImage
              src={image}
              alt={name}
              className='position-absolute start-0 w-100 h-auto'
            />
            <RewardPieceText className='small text-nowrap bg-white position-relative'>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: name
                }}
              />
            </RewardPieceText>
          </div>
        </Piece>
      </Ratio>
    )
  }

  return (
    <Ratio aspectRatio='1x1'>
      <Piece
        className={classNames(
          'd-flex flex-column align-items-center justify-content-center rounded-circle text-center text-muted lh-1',
          isCompleted && 'complete-piece',
          isWaiting && 'waiting-piece'
        )}
      >
        {day && <div className='fs-3'>{day}</div>}
        <SmallText>ดวง</SmallText>
        {isCompleted && (
          <div className='opacity-75'>
            <Image src={stampCompleteImage} layout='fill' />
          </div>
        )}
      </Piece>
    </Ratio>
  )
}

StampPiece.defaultProps = {
  day: null,
  isCompleted: false,
  isWaiting: false,
  name: undefined,
  price: undefined,
  image: undefined
}
StampPiece.propTypes = {
  day: PropTypes.number,
  isCompleted: PropTypes.bool,
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string
}

export default StampPiece
