import { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'

import { useUser } from 'contexts/userContext'
import { MIN_TODAY_SHARE, TOTAL_STAMP } from 'config/stamp'
import { useQuery } from 'react-query'
import { getCampaignCurrent } from 'services/campaign'
import type { ICampaignCurrent, ISahredDay } from 'interfaces/Campaign'
import { IStampReward } from 'interfaces/Reward'

import StampPiece from '../StampPiece'
import SharedToday from '../SharedToday'

interface IProps {
  stampContent: IStampReward
}
const StampBody: FC<IProps> = (props) => {
  const { stampContent } = props
  const {
    state: { user, stampCount }
  } = useUser()

  const { data: campaigmList } = useQuery(['CAMPAIGN'], () =>
    getCampaignCurrent()
  )

  const [campaign, setCampaing] = useState<ISahredDay[]>()

  const days = Array.from({ length: TOTAL_STAMP }, (_, index) => {
    const foundReward = stampContent.stampPrizes.find(
      (reward) => reward.day === index + 1
    )
    if (foundReward) return foundReward
    return {
      id: 15,
      titleTH: '',
      titleEN: '',
      titleCN: '',
      imageTH: '',
      imageEN: '',
      imageCN: '',
      day: index + 1
    }
  })

  useEffect(() => {
    let stepShare: any
    if (campaigmList?.data?.payload) {
      const achivmentList: ICampaignCurrent = campaigmList?.data.payload
      const achivmentMax: number = achivmentList?.achievementMax || 0
      const normal: number = MIN_TODAY_SHARE - achivmentMax
      stepShare = Array.from({ length: MIN_TODAY_SHARE }, (_, index) => {
        const num = `ครั้งที่ ${index + 1}`
        if (index >= normal) {
          return {
            step: index + 1,
            max: achivmentMax,
            title: achivmentList?.type,
            img: '/stars.png',
            min: normal
          }
        }
        return {
          step: index + 1,
          max: achivmentMax,
          title: num,
          img: null,
          min: 0
        }
      })
    } else {
      stepShare = Array.from({ length: MIN_TODAY_SHARE }, (_, index) => {
        const num = `ครั้งที่ ${index + 1}`
        return {
          step: index + 1,
          max: 0,
          title: num,
          img: null,
          min: 0
        }
      })
    }
    setCampaing(stepShare)
  }, [campaigmList?.data])

  return (
    <div className='overflow-hidden'>
      <div className='bg-secondary text-white'>
        <h6 className='text-white px-3 px-main-5 p-2'>
          สะสมแสตมป์ครบ <span>{stampCount}</span> วัน
        </h6>
        {/* <div className='pb-3 pb-main-5 d-flex flex-column flex-main-row justify-content-start justify-content-main-between align-items-main-center'>
          <h5>
            สะสมแสตมป์ครบ <span className='text-primary'>{stampCount}</span> วัน
          </h5>
          <div className='small'>
            แชร์แล้ววันนี้{' '}
            <span className='text-warning'>
              {user && user?.todayShare >= MIN_TODAY_SHARE
                ? `${MIN_TODAY_SHARE}/${MIN_TODAY_SHARE}`
                : `${user?.todayShare}/${MIN_TODAY_SHARE}`}
            </span>{' '}
            ครั้ง
          </div>
        </div> */}
      </div>
      <div className='px-3 pt-3  px-main-5'>
        <span className='text-primary'>แชร์แล้ววันนี้</span>
        <Row xs={5} className='py-3'>
          {campaign?.map(({ step, max, min, img, title }) => (
            <Col
              key={step}
              className='text-center align-items-center justify-content-center'
            >
              <SharedToday
                step={step}
                isCompleted={
                  (user?.todayShare || 0) - (user?.achievementShare || 0) >=
                  step
                    ? true
                    : (user?.todayShare || 0) - (max || 0) >= step
                }
                title={title}
                max={max}
                img={img}
                isSpecial={(user?.achievementShare || 0) + (min || 0) >= step}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className='px-3 pt-3 pb-5 px-main-5 pt-2'>
        <span className='text-secondary'>สแตมป์รับของรางวัล</span>
        <Row xs={5} className='pt-3 gy-3 gy-main-4'>
          {days.map((day) => (
            <Col key={day.day}>
              <StampPiece
                day={day.day}
                isCompleted={stampCount >= day.day}
                isWaiting={
                  (user?.todayShare || 0) < MIN_TODAY_SHARE
                    ? stampCount + 1 === day.day
                    : false
                }
                name={day.titleTH}
                price={day.titleTH}
                image={day.imageTH}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}
StampBody.propTypes = {
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

export default StampBody
