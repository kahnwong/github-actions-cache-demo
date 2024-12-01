import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'components/Button'
import { FiPhone, FiShare, FiMinusCircle } from 'react-icons/fi'
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { deleteFavoriteJob, postFavoriteJob } from 'services/favoriteJob'
import toast from 'react-hot-toast'
import hotDeal from 'public/assets/images/greenStar.png'
import heartUnFavorite from 'public/assets/images/heart-unfavorite.png'
import heartFavorite from 'public/assets/images/heart-favorite.png'
import location from 'public/assets/icons/location.png'
import bed from 'public/assets/icons/bed.png'
import bath from 'public/assets/icons/bath.png'
import stair from 'public/assets/icons/stair.png'

import {
  usePropertyModalContext,
  PROPERTY_MODAL_ACTIONS
} from 'contexts/propertyModalContext'
import { IJob, IJobCard } from 'interfaces/Job'
import {
  CardButtonGroupWrapper,
  CardTitleWrapper,
  CardSoldOutWrapper,
  FavoriteButton,
  FavoriteSoldOut,
  FavoriteBorder,
  LabelTag,
  DetailBox
} from './style'
import formatNumber from '../../utils/formatNumber'
import getEarnLabel from '../../utils/getEarnLabel'
import { useUser } from '../../contexts/userContext'
import { getLngFlex, getLngFlexArr } from '../../utils/getLng'

interface IJobCardFunction extends IJobCard {
  onHandleShowFavorite: Function
}
const PropertyCard: FC<IJobCardFunction> = ({
  id,
  bannerurl,
  unitLocalStartingPrice,
  unitLocalPromotionPrice,
  unitGlobalStartingPrice,
  unitGlobalPromotionPrice,
  jobtype,
  isSoldOut,
  downloadLink,
  propertytype,
  projectFullAddress,
  fb,
  tw,
  line,
  copyLink,
  shareQuoteTh,
  shareQuoteEn,
  shareQuoteCn,
  achievementtype,
  favorite,
  onHandleShowFavorite,
  shareFee,
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
  zoneNameCn,
  redirectExternalUrl,
  unitLocalSalePrice
}) => {
  const {
    state: { user, language }
  } = useUser()
  const { t } = useTranslation()
  const { dispatch } = usePropertyModalContext()

  const { earnLabel } = getEarnLabel(jobtype as string)
  const dataDispatch = {
    id,
    bannerurl,
    jobtype,
    isSoldOut,
    downloadLink,
    propertytype,
    projectFullAddress,
    fb,
    tw,
    line,
    copyLink,
    shareQuoteTh,
    shareQuoteEn,
    shareQuoteCn,
    achievementtype,
    favorite,
    shareFee,
    unitLocalStartingPrice,
    unitLocalPromotionPrice,
    unitGlobalStartingPrice,
    unitGlobalPromotionPrice,
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
    zoneNameCn,
    redirectExternalUrl,
    unitLocalSalePrice
  }

  const [newFavorite, setNewFavorite] = useState(favorite)
  const [eleFavorite, setSleFavorite] = useState(
    document.getElementById(`eleCard${id?.toString()}`)
  )
  const updateFavoriteJob = useMutation(
    ({ data }: { data: Partial<IJob> }) => postFavoriteJob(data),
    {
      onSuccess: (response) => {
        if (response?.data?.status === 200) {
          toast.success(t('propertyCard.successAddFavorite'))
          setNewFavorite(true)
        } else {
          toast.error(t('propertyCard.unSuccessAddFavorite'))
        }
      },
      onError: () => {
        toast.error(t('propertyCard.errorAddFavorite'))
      },
      onSettled: () => {
        setTimeout(() => {
          eleFavorite?.classList.remove('pe-none')
        }, 1000)
      }
    }
  )
  const removeFavoriteJob = useMutation(
    (valJobId: number) => deleteFavoriteJob(valJobId),
    {
      onSuccess: (response) => {
        if (response?.data?.status === 200) {
          toast.success(t('propertyCard.successRemoveAddFavorite'), {
            icon: <FiMinusCircle color='#dc3545' fontSize='1.25em' />
          })
          onHandleShowFavorite(true)
        } else {
          toast.error(t('propertyCard.errorRemoveAddFavorite'), {
            icon: <FiMinusCircle color='#dc3545' fontSize='1.25em' />
          })
        }
        setNewFavorite(false)
        onHandleShowFavorite(false)
      },
      onError: () => {
        toast.error(t('propertyCard.errorRemoveAddFavorite'), {
          icon: <FiMinusCircle color='#dc3545' fontSize='1.25em' />
        })
      },
      onSettled: () => {
        setTimeout(() => {
          eleFavorite?.classList.remove('pe-none')
        }, 1000)
      }
    }
  )

  const addFavoriteJob = (
    valueJobId: number,
    favoriteStatus: boolean | undefined
  ) => {
    if (eleFavorite != null) {
      eleFavorite.classList.add('pe-none')
      if (!favoriteStatus) {
        updateFavoriteJob.mutate({
          data: {
            id: valueJobId
          }
        })
      } else {
        removeFavoriteJob.mutate(valueJobId)
      }
    }
  }
  const tLabel = getLngFlexArr(jobinfoLabels, language.toUpperCase(), true)

  const tProjectName = getLngFlex(
    { projectNameTh, projectNameEn, projectNameCn },
    language.toUpperCase(),
    true
  )

  const tZoneName = getLngFlex(
    { zoneNameTh, zoneNameEn, zoneNameCn },
    language.toUpperCase(),
    true
  )

  const getLocalPrice = () => {
    if (unitLocalPromotionPrice) {
      return (
        <>
          <div className='my-1 fw-light display-10 text-grey-1 text-decoration-line-through'>
            {`฿${formatNumber(+unitLocalStartingPrice!)}`}
          </div>
          <div className='display-9 mt-1 fw-700'>
            {`฿${formatNumber(+unitLocalPromotionPrice!)}`}
          </div>
        </>
      )
    }
    return (
      <div className='display-9 my-1 fw-700'>
        {`฿${formatNumber(+unitLocalStartingPrice!)}`}
      </div>
    )
  }

  const getGlobalPrice = () => {
    if (unitGlobalPromotionPrice) {
      return (
        <>
          <div className='my-1 fw-light display-11 text-grey-1 text-decoration-line-through'>
            {`฿${formatNumber(+unitGlobalPromotionPrice!)}`}
          </div>
          <div className='display-9 mt-1 fw-700'>
            {`฿${formatNumber(+unitGlobalStartingPrice!)}`}
          </div>
        </>
      )
    }
    if (unitGlobalStartingPrice) {
      return (
        <div className='display-9 my-1 fw-700'>
          {`฿${formatNumber(+unitGlobalStartingPrice)}`}
        </div>
      )
    }
    return getLocalPrice()
  }

  const getPrice = () => {
    if (language === 'th') {
      return getLocalPrice()
    }

    return getGlobalPrice()
  }

  const getCommissionPrice = () => (
    <>
      <div className='text-primary fw-bold display-12'>
        {t('propertyCard.commissionPrice')}
      </div>
      <div className='text-primary fw-bold display-9 my-1'>
        {language === 'th' || !unitGlobalStartingPrice
          ? `฿${formatNumber(+commissionPrice!)}`
          : `฿${formatNumber(+globalCommissionPrice!)}`}
      </div>
      <div className='text-primary fw-bold display-12'>
        {t('propertyCard.earn')} {commissionPercentage}%
      </div>
    </>
  )

  const getSharePrice = () => (
    <>
      <div className='text-tertiary fw-bold display-12'>{earnLabel}</div>
      <div className='text-tertiary fw-bold display-9'>
        {language === 'th' || !unitGlobalStartingPrice
          ? `฿${formatNumber(+sharePrice!)}++`
          : `฿${formatNumber(+globalSharePrice!)}++`}
      </div>
    </>
  )

  useEffect(() => {
    setSleFavorite(document.getElementById(`eleCard${id?.toString()}`))
    setNewFavorite(favorite)
  }, [id, favorite])
  return (
    <Card
      id={`eleCard${id}`}
      className='h-100 overflow-hidden position-relative'
    >
      <div className='ratio ratio-fb'>
        {bannerurl && (
          <Image
            loader={() => bannerurl}
            src={bannerurl}
            layout='fill'
            objectFit='cover'
            role='button'
            onClick={() =>
              dispatch({
                type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
                payload: { modalType: 'information', data: dataDispatch }
              })
            }
          />
        )}
      </div>

      <FavoriteButton
        className='position-absolute end-0 px-2 mx-2'
        onClick={() => addFavoriteJob(id, newFavorite)}
        style={isSoldOut && newFavorite ? FavoriteSoldOut : { FavoriteBorder }}
      >
        <Image
          src={newFavorite ? heartFavorite : heartUnFavorite}
          height='22'
          width='22'
          aria-label='favorite'
          alt='favorite'
        />
      </FavoriteButton>

      <Row className='col-9 position-absolute start-0 m-2 m-md-3 d-flex gap-1'>
        {jobinfoLabels?.map((label, index) => (
          <OverlayTrigger
            placement='top'
            overlay={<Tooltip> {tLabel('title', index, 'label')}</Tooltip>}
            delay={{ show: 300, hide: 0 }}
            key={label.id}
          >
            <LabelTag theme={label.label.colorCode} key={label.id}>
              {tLabel('title', index, 'label')}
            </LabelTag>
          </OverlayTrigger>
        ))}
      </Row>
      {achievementtype && (
        <span
          className='position-absolute end-0'
          style={{ top: '60px', marginRight: '10px' }}
        >
          <Image
            src={hotDeal}
            height='35'
            width='35'
            aria-label='hot'
            alt='hot'
          />
        </span>
      )}

      <Card.Body className='d-flex flex-column' style={{ color: '#2F4858' }}>
        <CardTitleWrapper
          role='button'
          onClick={() => {
            dispatch({
              type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
              payload: { modalType: 'information', data: dataDispatch }
            })
          }}
        >
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip>{tProjectName('projectName')}</Tooltip>}
            delay={{ show: 300, hide: 0 }}
          >
            <span className='d-none d-lg-block text-overflow'>
              {tProjectName('projectName')}
            </span>
          </OverlayTrigger>
          <span className='d-block d-lg-none'>
            {tProjectName('projectName')}
          </span>
        </CardTitleWrapper>
        <Row className='display-11 my-2 text-grey-1 fw-400' style={DetailBox}>
          <Col>
            <Row className='gap-3'>
              <Col xs={12} className='d-flex align-items-center'>
                <Image
                  src={location}
                  height='16'
                  width='16'
                  objectFit='cover'
                  aria-label='location'
                  alt='location'
                />
                <span className='ms-2'>{tZoneName('zoneName')}</span>
              </Col>

              <Col xs='auto' className='d-flex align-items-center pe-0'>
                <Image
                  src={bed}
                  height='16'
                  width='16'
                  aria-label='location'
                  alt='location'
                />
                <span className='ms-2'>
                  {unitBedRoomCount || '-'} {t('propertyCard.bedroom')}
                </span>
              </Col>

              <Col xs='auto' className='d-flex align-items-center px-0'>
                <Image
                  src={bath}
                  height='16'
                  width='16'
                  aria-label='location'
                  alt='location'
                />
                <span className='ms-2'>
                  {unitBathRoomCount || '-'} {t('propertyCard.bathroom')}
                </span>
              </Col>

              {propertytype !== 'คอนโด' && unitFloorCount && (
                <Col xs='auto' className='d-flex align-items-center px-xl-0'>
                  <Image
                    src={stair}
                    height='16'
                    width='16'
                    aria-label='location'
                    alt='location'
                  />
                  <span className='ms-2'>
                    {unitFloorCount} {t('propertyCard.floor')}
                  </span>
                </Col>
              )}
            </Row>

            <Row className='mt-3 gap-1'>
              <Col xs='auto' className='pe-0'>
                {t('propertyCard.usableArea')}: {unitUsableAreaSqm || '-'}{' '}
                {t('propertyCard.sqm')}
              </Col>

              {propertytype !== 'คอนโด' && (
                <Col xs='auto' className='pe-0'>
                  {t('propertyCard.landArea')}: {unitLandAreaSqwa || '-'}{' '}
                  {t('propertyCard.sqw')}
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <hr className='my-2' />
        <div className='d-flex mt-2' style={{ width: '100%' }}>
          <Col xs={6} className='display-12'>
            <div className='fw-400'>{t('propertyCard.startingPrice')}</div>
            {getPrice()}
          </Col>
          <Col xs={1} style={{ borderLeft: '1px solid #EEEEEE' }} />

          <Col xs={6} md={5}>
            {!isSoldOut &&
              (user?.brokerQuestionnaire?.id === 1 ||
                user?.brokerQuestionnaire?.id === 2) &&
              getCommissionPrice()}

            {!isSoldOut &&
              (user?.brokerQuestionnaire?.id === 3 ||
                user?.brokerQuestionnaire?.id === 4) &&
              getSharePrice()}
          </Col>
        </div>
      </Card.Body>
      {!isSoldOut && (
        <CardButtonGroupWrapper>
          <Row>
            <Col xs={6} className='p-0'>
              <Button
                style={{ border: 'none' }}
                onClick={() =>
                  dispatch({
                    type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
                    payload: {
                      modalType: 'appointment',
                      data: dataDispatch
                    }
                  })
                }
              >
                <FiPhone className='me-2' />
                {t('propertyCard.appointment')}
              </Button>
            </Col>
            <Col xs={6} className='p-0'>
              <Button
                style={{ backgroundColor: '#6C757D', border: 'none' }}
                onClick={() =>
                  dispatch({
                    type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
                    payload: { modalType: 'share', data: dataDispatch }
                  })
                }
              >
                <FiShare className='me-2' />
                {t('propertyCard.share')}
              </Button>
            </Col>
          </Row>
        </CardButtonGroupWrapper>
      )}
      {isSoldOut && (
        <CardSoldOutWrapper>
          <span>{t('propertyCard.soldOut')}</span>
        </CardSoldOutWrapper>
      )}
    </Card>
  )
}

PropertyCard.defaultProps = {
  achievementtype: '',
  favorite: false,
  unitLocalStartingPrice: null,
  unitLocalPromotionPrice: null,
  unitGlobalStartingPrice: null,
  unitGlobalPromotionPrice: null,
  projectNameTh: null,
  projectNameEn: null,
  projectNameCn: null
}
PropertyCard.propTypes = {
  id: PropTypes.number.isRequired,
  bannerurl: PropTypes.string.isRequired,
  projectNameTh: PropTypes.string,
  projectNameEn: PropTypes.string,
  projectNameCn: PropTypes.string,
  unitLocalStartingPrice: PropTypes.number,
  unitLocalPromotionPrice: PropTypes.number,
  unitGlobalStartingPrice: PropTypes.number,
  unitGlobalPromotionPrice: PropTypes.number,
  jobtype: PropTypes.string.isRequired,
  isSoldOut: PropTypes.bool.isRequired,
  downloadLink: PropTypes.string.isRequired,
  propertytype: PropTypes.string.isRequired,
  projectFullAddress: PropTypes.string.isRequired,
  copyLink: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  fb: PropTypes.string.isRequired,
  tw: PropTypes.string.isRequired,
  shareQuoteTh: PropTypes.string.isRequired,
  shareQuoteEn: PropTypes.string.isRequired,
  shareQuoteCn: PropTypes.string.isRequired,
  achievementtype: PropTypes.string,
  favorite: PropTypes.bool,
  shareFee: PropTypes.number.isRequired
}

export default PropertyCard
