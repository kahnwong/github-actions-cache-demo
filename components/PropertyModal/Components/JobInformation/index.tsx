import { FC, ReactNode, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePropertyModalContext } from 'contexts/propertyModalContext'
import { Row, Col } from 'react-bootstrap'
import Button from 'components/Button'
import Link from 'next/link'
import { FiExternalLink } from 'react-icons/fi'
import { useUser } from 'contexts/userContext'
import { btoa } from 'js-base64'
import { InformationTitleWrapper } from './style'
import DownloadImages from '../DownloadImages'
import ShareQuote from '../ShareQuote'
import formatNumber from '../../../../utils/formatNumber'
import getEarnLabel from '../../../../utils/getEarnLabel'
import { getLngFlex } from '../../../../utils/getLng'

interface IJobFullInformation {
  title: string
  value: ReactNode
  isShow: boolean
}

const JobFullInformation: FC = () => {
  const { t } = useTranslation()
  const [showCommissionPrice, setShowCommissionPrice] = useState(false)
  const {
    state: {
      data: {
        projectNameTh,
        projectNameEn,
        projectNameCn,
        unitGlobalStartingPrice,
        jobtype,
        propertytype,
        projectFullAddress,
        sharePrice,
        globalSharePrice,
        commissionPercentage,
        commissionPrice,
        globalCommissionPrice,
        pricePerUnitUsableAreaSqm,
        id,
        redirectExternalUrl,
        downloadLink,
        unitLocalSalePrice
      }
    }
  } = usePropertyModalContext()

  const {
    state: { user, language }
  } = useUser()

  const httpLink =
    redirectExternalUrl && !!redirectExternalUrl
      ? redirectExternalUrl
      : `${window.location.origin}/a/${id}`
  const copyLink = `${httpLink}?platform=c&ref=${user?.id}`

  const userQuestionnaire = user?.brokerQuestionnaire?.id

  const isCoupon = jobtype === 'Coupon'

  const { earnLabel } = getEarnLabel(jobtype as string)

  const onDownload = (listImage: string[]) => {
    window.open(
      `/download-images?listImage=${btoa(
        JSON.stringify(listImage)
      )}&projectName=${projectNameEn || projectNameTh}`,
      '_blank'
    )
  }

  const tProjectName = getLngFlex(
    { projectNameTh, projectNameEn, projectNameCn },
    language.toUpperCase(),
    true
  )

  const getCommissionPrice = () => {
    if (language === 'th' || !unitGlobalStartingPrice) {
      return `฿${formatNumber(+commissionPrice!)}`
    }
    return `฿${formatNumber(+globalCommissionPrice!)}`
  }

  const getSharePrice = () => {
    if (language === 'th' || !unitGlobalStartingPrice) {
      return `฿${formatNumber(+sharePrice!)}++`
    }
    return `฿${formatNumber(+globalSharePrice!)}++`
  }

  const INFORMATIONS: IJobFullInformation[] = [
    {
      title: isCoupon
        ? t('propertyModal.jobInfomation.coupon')
        : t('propertyModal.jobInfomation.project'),
      value: <div className='fw-bold'>{tProjectName('projectName')}</div>,
      isShow: true
    },
    {
      title: t('propertyModal.jobInfomation.priceTitle'),
      value: (
        <>
          <div className='fw-bold'>
            ฿{formatNumber(unitLocalSalePrice ? unitLocalSalePrice! : 0)}
          </div>
          {!!pricePerUnitUsableAreaSqm && (
            <div className='display-12 mt-1'>
              ฿{formatNumber(pricePerUnitUsableAreaSqm)} /
              {t('propertyModal.jobInfomation.sqm')}
            </div>
          )}
        </>
      ),
      isShow: true
    },
    {
      title: t('propertyModal.jobInfomation.commissionTitle'),
      value:
        userQuestionnaire === 1 || userQuestionnaire === 2 ? (
          <div className='text-primary fw-bold'>
            <div>{getCommissionPrice()}</div>
            <div className='display-12'>
              {t('propertyModal.jobInfomation.earn')} {commissionPercentage}%
            </div>
          </div>
        ) : (
          <div className='d-flex justify-content-end'>
            <div className='text-primary fw-bold'>
              <div className='fw-bold'>
                {showCommissionPrice ? getCommissionPrice() : '฿xxxxx'}
              </div>
              <div className='display-12'>
                {t('propertyModal.jobInfomation.earn')}{' '}
                {showCommissionPrice ? commissionPercentage : 'xx'}%
              </div>
            </div>
            <div className='ms-2'>
              <Button
                variant='outline-primary'
                className='font-size-12 px-2 py-0'
                style={{ borderRadius: 4, width: '50px' }}
                onClick={() => setShowCommissionPrice(!showCommissionPrice)}
              >
                {showCommissionPrice
                  ? t('propertyModal.jobInfomation.hide')
                  : t('propertyModal.jobInfomation.show')}
              </Button>
            </div>
          </div>
        ),
      isShow: true
    },
    {
      title: t('propertyModal.jobInfomation.shareTitle'),
      value: (
        <span className='text-tertiary'>
          <small className='d-block display-12'>{earnLabel}</small>
          {getSharePrice()}
        </span>
      ),
      isShow: userQuestionnaire === 3 || userQuestionnaire === 4
    },
    {
      title: t('propertyModal.jobInfomation.typeTitle'),
      value: <span className='fw-500'>{propertytype}</span>,
      isShow: true
    },
    {
      title: t('propertyModal.jobInfomation.addressTitle'),
      value: <small>{projectFullAddress}</small>,
      isShow: !isCoupon
    },
    {
      title: t('propertyModal.jobInfomation.sentenceTitle'),
      value: <ShareQuote />,
      isShow: true
    },
    {
      title: t('propertyModal.jobInfomation.pictureTitle'),
      value: <DownloadImages onDownload={onDownload} />,
      isShow: !!downloadLink
    }
  ]

  return (
    <div>
      <h5 className='mb-4'>{t('propertyModal.jobInfomation.headerTitle')}</h5>
      <Row>
        {INFORMATIONS.map(
          ({ title, value, isShow }) =>
            isShow && (
              <Fragment key={title}>
                <Col xs={4}>
                  <InformationTitleWrapper className='display-10 fw-bold'>
                    {title}
                  </InformationTitleWrapper>
                </Col>
                <Col xs={8} className='text-end fw-light'>
                  <div>{value}</div>
                </Col>
                <hr className='my-3' />
              </Fragment>
            )
        )}
      </Row>

      {copyLink && user?.id && (
        <div className='d-flex justify-content-center'>
          <Link href={`${copyLink}`}>
            <a target='_blank'>
              <Button
                variant='light'
                className='px-5 d-flex align-items-center fw-500'
              >
                {isCoupon
                  ? t('propertyModal.jobInfomation.viewCouponInfo')
                  : t('propertyModal.jobInfomation.viewProjectInfo')}
                <FiExternalLink className='ms-2' />
              </Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default JobFullInformation
