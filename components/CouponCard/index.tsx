import { FC } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'components/Button'
import { FiShare } from 'react-icons/fi'
import { SiLine } from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import { Card } from 'react-bootstrap'
import { CONTACT_LINE } from 'config/contact'

import {
  PROPERTY_MODAL_ACTIONS,
  usePropertyModalContext
} from 'contexts/propertyModalContext'
import { ICouponCard } from 'interfaces/Job'
import { CouponCardButtonGroupWrapper, CouponCardTitleWrapper } from './style'
import formatNumber from '../../utils/formatNumber'
import getEarnLabel from '../../utils/getEarnLabel'
import { useUser } from '../../contexts/userContext'
import { getLngFlex } from '../../utils/getLng'

const CouponCard: FC<ICouponCard> = ({
  bannerurl,
  projectName,
  jobtype,
  propertytype,
  fb,
  tw,
  line,
  copyLink,
  shareQuoteTh,
  shareQuoteEn,
  shareQuoteCn,
  unitLocalStartingPrice,
  unitLocalPromotionPrice,
  projectNameTh,
  projectNameEn,
  projectNameCn,
  unitBedRoomCount,
  unitBathRoomCount,
  unitUsableAreaSqm,
  unitLandAreaSqwa,
  unitFloorCount,
  jobinfoLabels,
  seoImageUrlTh,
  sharePrice,
  globalSharePrice,
  commissionPercentage,
  commissionPrice,
  globalCommissionPrice,
  pricePerUnitUsableAreaSqm,
  zoneNameTh,
  zoneNameEn,
  zoneNameCn
}) => {
  const { t } = useTranslation()
  const { dispatch } = usePropertyModalContext()

  const { earnLabel } = getEarnLabel(jobtype as string)

  const {
    state: { language }
  } = useUser()

  const tProjectName = getLngFlex(
    { projectNameTh, projectNameEn, projectNameCn },
    language.toUpperCase(),
    true
  )

  const couponDataDispatch = {
    bannerurl,
    projectName,
    jobtype,
    propertytype,
    fb,
    tw,
    line,
    copyLink,
    shareQuoteTh,
    shareQuoteEn,
    shareQuoteCn,
    downloadLink: '',
    id: 67,
    isSoldOut: false,
    projectFullAddress: '',
    shareFee: 0,
    unitLocalStartingPrice,
    unitLocalPromotionPrice,
    projectNameTh,
    projectNameEn,
    projectNameCn,
    unitBedRoomCount,
    unitBathRoomCount,
    unitUsableAreaSqm,
    unitLandAreaSqwa,
    unitFloorCount,
    jobinfoLabels,
    seoImageUrlTh,
    sharePrice,
    globalSharePrice,
    commissionPercentage,
    commissionPrice,
    globalCommissionPrice,
    pricePerUnitUsableAreaSqm,
    zoneNameTh,
    zoneNameEn,
    zoneNameCn
  }

  return (
    <Card className='h-100 overflow-hidden poistion-relative'>
      <div className='ratio ratio-fb'>
        {bannerurl && (
          <Image
            src={bannerurl}
            layout='fill'
            objectFit='cover'
            role='button'
            onClick={() =>
              dispatch({
                type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
                payload: {
                  modalType: 'information-coupon',
                  data: couponDataDispatch
                }
              })
            }
          />
        )}
      </div>
      <Card.Body className='d-flex flex-column justify-content-between'>
        <CouponCardTitleWrapper
          role='button'
          onClick={() =>
            dispatch({
              type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
              payload: {
                modalType: 'information-coupon',
                data: couponDataDispatch
              }
            })
          }
        >
          {tProjectName('projectName')}
        </CouponCardTitleWrapper>
        <div className='mb-1 small fw-light display-12 mb-2'>
          {`฿${formatNumber(+unitLocalStartingPrice!)}`}
        </div>
        <div className='d-flex flex-column flex-main-row justify-content-between'>
          <div className='d-flex flex-main-column flex-main-row align-items-center align-items-main-start mb-3 mb-main-0'>
            <div className='text-primary fw-light display-12'>{earnLabel}</div>
            <div className='text-primary fw-bold display-9 ms-2 ms-main-0'>
              {`฿${formatNumber(+sharePrice!)}++`}
            </div>
          </div>
          <CouponCardButtonGroupWrapper>
            <a
              href={`https://line.me/R/ti/p/${CONTACT_LINE}`}
              target='_blank'
              rel='noreferrer'
            >
              <Button variant='secondary' size='sm'>
                <SiLine className='me-2' size={20} />
                {t('couponCard.addFriend')}
              </Button>
            </a>

            <Button
              variant='primary'
              size='sm'
              onClick={() =>
                dispatch({
                  type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
                  payload: {
                    modalType: 'share-coupon',
                    data: couponDataDispatch
                  }
                })
              }
            >
              <FiShare className='me-2' />
              {t('couponCard.share')}
            </Button>
          </CouponCardButtonGroupWrapper>
        </div>
      </Card.Body>
    </Card>
  )
}

CouponCard.defaultProps = {
  unitLocalStartingPrice: null
}
CouponCard.propTypes = {
  // TODO: fix banner url type not sure how to use type of StaticImport' in react propTypes (use any for remove warning in console)
  // eslint-disable-next-line react/forbid-prop-types
  bannerurl: PropTypes.any.isRequired,
  projectNameTh: PropTypes.string.isRequired,
  projectNameEn: PropTypes.string.isRequired,
  projectNameCn: PropTypes.string.isRequired,
  unitLocalStartingPrice: PropTypes.number,
  jobtype: PropTypes.string.isRequired,
  propertytype: PropTypes.string.isRequired,
  fb: PropTypes.string.isRequired,
  tw: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  copyLink: PropTypes.string.isRequired,
  shareQuoteTh: PropTypes.string.isRequired,
  shareQuoteEn: PropTypes.string.isRequired,
  shareQuoteCn: PropTypes.string.isRequired,
  sharePrice: PropTypes.number.isRequired
}

export default CouponCard
