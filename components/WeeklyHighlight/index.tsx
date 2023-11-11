import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  IHighlightInfo,
  IJobCard,
  IJobCampaign
} from 'interfaces/WeeklyHighlight'
import {
  usePropertyModalContext,
  PROPERTY_MODAL_ACTIONS
} from 'contexts/propertyModalContext'
import hotDeal from 'public/assets/images/greenStar.png'
import Section from 'components/Section'
import LoadingScreen from 'components/LoadingScreen'
import { useQuery } from 'react-query'
import { useUser } from 'contexts/userContext'
import { getLng, getLngArr } from 'utils/getLng'
import { getWeeklyHighlight } from '../../services/weeklyHighlight'
import { CarouselHighlight } from './style'

const WeeklyHighlight: FC = () => {
  const {
    state: { language }
  } = useUser()
  const {
    data: items,
    isLoading,
    isError
  } = useQuery(['highlight_current'], () => getWeeklyHighlight())

  const { dispatch } = usePropertyModalContext()
  const [highlight, setHighlight] = useState<IJobCard[]>([])

  useEffect(() => {
    const itemInfo = items?.data?.payload
    if (itemInfo && itemInfo?.length > 0) {
      const tItemInfo =
        itemInfo && getLngArr(itemInfo, language?.toUpperCase() || 'TH')
      const jobHighlight: IJobCard[] = itemInfo.map(
        (item: IHighlightInfo, index) => {
          const itemJob = item?.job
          if (item?.isJob && itemJob) {
            const campaignType = itemJob?.jobCampaigns?.map(
              (camp: IJobCampaign) => camp?.campaign
            )
            const tJob =
              itemJob && getLng(itemJob, language?.toUpperCase() || 'TH', true)
            const tJobDistrict =
              itemJob?.district &&
              getLng(itemJob?.district, language?.toUpperCase() || 'TH', true)
            const tJobSubDistrict =
              itemJob?.subdistrict &&
              getLng(
                itemJob?.subdistrict,
                language?.toUpperCase() || 'TH',
                true
              )
            const tJobProvince =
              itemJob?.province &&
              getLng(itemJob?.province, language?.toUpperCase() || 'TH', true)

            const fullAddress = `${itemJob?.addressDetail || ''} ${
              tJobSubDistrict('name') || itemJob?.subdistrict?.nameTh || ''
            } ${tJobDistrict('name') || itemJob?.district?.nameTh || ''}  ${
              tJobProvince('name') || itemJob?.province?.nameTh || ''
            } ${itemJob?.postcode || ''}`

            const tPropertyType = getLng(
              itemJob?.units[0]?.propertyType,
              language?.toUpperCase() || 'TH',
              true
            )

            return {
              id: itemJob?.id,
              bannerurl: tJob('seoImageUrl') || itemJob?.seoImageUrlTh || '',
              startingPrice: itemJob?.startingPrice,
              jobtype: itemJob?.jobtype,
              isSoldOut: itemJob?.isSoldOut,
              downloadLink: item.projectCard.downloadLink || '',
              propertytype: tPropertyType('name') || '',
              projectFullAddress: fullAddress,
              copyLink: itemJob?.newjobshare?.copyLink,
              line: itemJob?.newjobshare?.line,
              fb: itemJob?.newjobshare?.fb,
              tw: itemJob?.newjobshare?.tw,
              shareQuoteTh: itemJob?.shareQuoteTh,
              shareQuoteEn: itemJob?.shareQuoteEn,
              shareQuoteCn: itemJob?.shareQuoteCn,
              achievementtype:
                (campaignType as any)?.length > 0
                  ? (campaignType as any)[0]?.type
                  : '',
              shareFee: item?.projectCard?.shareFee || 2500,
              projectNameTh: itemJob?.projectNameTh,
              projectNameEn: itemJob?.projectNameEn,
              projectNameCn: itemJob?.projectNameCn,
              unitLocalPromotionPrice: itemJob?.units[0].localPromotionPrice,
              unitGlobalPromotionPrice: itemJob?.units[0].globalPromotionPrice,
              sharePrice: item?.projectCard?.sharePrice,
              globalSharePrice: item?.projectCard?.globalSharePrice,
              commissionPercentage: item?.projectCard?.commissionPercentage,
              commissionPrice: item?.projectCard?.commissionPrice,
              globalCommissionPrice: item?.projectCard?.globalCommissionPrice,
              pricePerUnitUsableAreaSqm:
                item?.projectCard?.pricePerUnitUsableAreaSqm || 0,
              unitLocalSalePrice: itemJob?.units[0].localSalePrice
            }
          }

          return {
            id: 0,
            bannerurl: tItemInfo('image', index) || item?.imageTH || '',
            startingPrice: 0,
            jobtype: '',
            isSoldOut: false,
            downloadLink: tItemInfo('url', index) || '',
            propertytype: 'Event',
            projectFullAddress: '',
            copyLink: '',
            line: '',
            fb: '',
            tw: '',
            shareQuoteTh: '',
            shareQuoteEn: '',
            shareQuoteCn: '',
            achievementtype: '',
            shareFee: 2500,
            globalSharePrice: 0,
            projectNameTh: '',
            projectNameEn: '',
            projectNameCn: '',
            unitLocalStartingPrice: 0,
            unitLocalPromotionPrice: 0,
            unitGlobalPromotionPrice: 0,
            commissionPercentage: 0,
            commissionPrice: 0,
            globalCommissionPrice: 0,
            pricePerUnitUsableAreaSqm: null,
            unitLocalSalePrice: 0
          }
        }
      )
      setHighlight(jobHighlight)
    }
  }, [items?.data, language])

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} isError={isError} />
  }
  return (
    <div>
      {highlight?.length > 0 && (
        <Section title='Weekly Highlight' className='bg-light'>
          <CarouselHighlight>
            {highlight?.map(
              (
                {
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
                  shareFee,
                  sharePrice,
                  globalSharePrice,
                  projectNameTh,
                  projectNameEn,
                  projectNameCn,
                  commissionPercentage,
                  commissionPrice,
                  globalCommissionPrice,
                  unitLocalPromotionPrice,
                  unitGlobalPromotionPrice,
                  pricePerUnitUsableAreaSqm,
                  unitLocalSalePrice
                },
                index
              ) => (
                <CarouselHighlight.Item key={`highlight-${index.toString()}`}>
                  <div className='ratio ratio-fb'>
                    {bannerurl && (
                      <Image
                        src={bannerurl}
                        layout='fill'
                        objectFit='cover'
                        role='button'
                        onClick={() =>
                          propertytype === 'Event'
                            ? window.open(downloadLink || '', '_blank')
                            : dispatch({
                                type: PROPERTY_MODAL_ACTIONS.OPEN_MODAL,
                                payload: {
                                  modalType:
                                    propertytype === 'คูปอง'
                                      ? 'information-coupon'
                                      : 'information',
                                  data: {
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
                                    shareFee,
                                    globalSharePrice,
                                    projectNameTh,
                                    projectNameEn,
                                    projectNameCn,
                                    commissionPercentage,
                                    commissionPrice,
                                    globalCommissionPrice,
                                    unitLocalPromotionPrice,
                                    unitGlobalPromotionPrice,
                                    sharePrice,
                                    pricePerUnitUsableAreaSqm,
                                    unitLocalSalePrice
                                  }
                                }
                              })
                        }
                      />
                    )}
                    {achievementtype && (
                      <div style={{ display: 'contents' }}>
                        <span
                          className='position-absolute mx-4 my-2 end-0'
                          style={{ top: '5px', width: 'auto' }}
                        >
                          <Image
                            src={hotDeal}
                            height='35'
                            width='35'
                            aria-label='hot'
                            alt='hot'
                          />
                        </span>
                      </div>
                    )}
                  </div>
                </CarouselHighlight.Item>
              )
            )}
          </CarouselHighlight>
        </Section>
      )}
    </div>
  )
}

export default WeeklyHighlight
