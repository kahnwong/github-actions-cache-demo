import { FC } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
// import CouponCard from 'components/CouponCard'
// import CouponImage from 'public/assets/images/coupon/coupon.jpeg'
// import { COUPON_CARD_DETAILS, COUPON_CONDITONS } from 'config/coupon'

const CouponSection: FC = () => {
  const { t } = useTranslation()
  return (
    <Row md={1} lg={2} className='w-100 m-0'>
      <Col className='p-0'>
        {/* <CouponCard
        // bannerurl={CouponImage}
        projectName={COUPON_CARD_DETAILS.projectName}
        startingPrice={COUPON_CARD_DETAILS.startingPrice}
        jobtype={COUPON_CARD_DETAILS.jobtype}
        propertytype={COUPON_CARD_DETAILS.propertytype}
        fb={COUPON_CARD_DETAILS.fb}
        tw={COUPON_CARD_DETAILS.tw}
        line={COUPON_CARD_DETAILS.line}
        c={COUPON_CARD_DETAILS.c}
        sharequote={COUPON_CARD_DETAILS.sharequote}
      /> */}
      </Col>
      <Col className='d-none d-main-block'>
        <div className='fw-bold display-8 text-dark mb-2'>
          {t('couponSection.headerTitle')}
        </div>
        <ul>
          {/* {COUPON_CONDITONS.map((condition) => (
          <li key={condition} className='lh-base fw-light display-11'>
            {condition}
          </li>
        ))} */}
        </ul>
      </Col>
    </Row>
  )
}

export default CouponSection
