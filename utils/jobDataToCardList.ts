import { IJob } from 'interfaces/Job'
import { getLngArr } from './getLng'

const jobDataToCardList = (payload: IJob[] | undefined, language = 'TH') => {
  const tItemJob = payload && getLngArr(payload, language?.toUpperCase(), true)
  return payload?.map((itemJob: IJob, idx) => ({
    id: itemJob?.id,
    bannerurl: itemJob?.bannerurl || '',
    jobtype: itemJob?.jobtype ? itemJob?.jobtype : '',
    isSoldOut: itemJob?.isSoldOut,
    downloadLink: itemJob?.downloadLink ? itemJob?.downloadLink : '',
    propertytype: tItemJob
      ? tItemJob('unitPropertyTypeName', idx)
      : '' || itemJob?.unitPropertyTypeNameTh || '',
    projectFullAddress: itemJob?.projectFullAddress
      ? itemJob?.projectFullAddress
      : '',
    fb: itemJob?.fb ? itemJob?.fb : '',
    tw: itemJob?.tw ? itemJob?.tw : '',
    line: itemJob?.line ? itemJob?.line : '',
    copyLink: itemJob?.copyLink ? itemJob?.copyLink : '',
    shareQuoteTh: itemJob?.shareQuoteTh ? itemJob?.shareQuoteTh : null,
    shareQuoteEn: itemJob?.shareQuoteEn ? itemJob?.shareQuoteEn : null,
    shareQuoteCn: itemJob?.shareQuoteCn ? itemJob?.shareQuoteCn : null,
    achievementtype: itemJob?.achievementtype ? itemJob?.achievementtype : '',
    favorite: itemJob?.favorite ? itemJob?.favorite : false,
    shareFee: itemJob?.shareFee ? itemJob?.shareFee : 2500,
    unitLocalStartingPrice: itemJob?.unitLocalStartingPrice
      ? itemJob?.unitLocalStartingPrice
      : null,
    unitLocalPromotionPrice: itemJob?.unitLocalPromotionPrice
      ? itemJob?.unitLocalPromotionPrice
      : null,
    unitLocalSalePrice: itemJob?.unitLocalSalePrice || null,
    projectNameTh: itemJob?.projectNameTh ? itemJob?.projectNameTh : null,
    projectNameEn: itemJob?.projectNameEn ? itemJob?.projectNameEn : null,
    projectNameCn: itemJob?.projectNameCn ? itemJob?.projectNameCn : null,
    districtId: itemJob?.districtId || null,
    subdistrictId: itemJob?.subdistrictId || null,
    provinceId: itemJob?.provinceId || null,
    subdistrictNameTh: itemJob?.subdistrictNameTh || '',
    subdistrictNameEn: itemJob?.subdistrictNameEn || '',
    subdistrictNameCn: itemJob?.subdistrictNameCn || '',
    districtNameTh: itemJob?.districtNameTh || '',
    districtNameEn: itemJob?.districtNameEn || '',
    districtNameCn: itemJob?.districtNameCn || '',
    provinceNameTh: itemJob?.provinceNameTh || '',
    provinceNameCn: itemJob?.provinceNameCn || '',
    provinceNameEn: itemJob?.provinceNameEn || '',
    addressDetail: itemJob?.addressDetail || '',
    postcode: itemJob?.postcode || '',
    unitBedRoomCount: itemJob?.unitBedRoomCount
      ? itemJob?.unitBedRoomCount
      : null,
    unitBathRoomCount: itemJob?.unitBathRoomCount
      ? itemJob?.unitBathRoomCount
      : null,
    unitUsableAreaSqm: itemJob?.unitUsableAreaSqm
      ? itemJob?.unitUsableAreaSqm
      : null,
    unitLandAreaSqwa: itemJob?.unitLandAreaSqwa
      ? itemJob?.unitLandAreaSqwa
      : null,
    unitFloorCount: itemJob?.unitFloorCount ? itemJob?.unitFloorCount : null,
    jobinfoLabels: itemJob?.jobinfoLabels ? itemJob?.jobinfoLabels : [],
    seoImageUrlTh: itemJob?.seoImageUrlTh ? itemJob?.seoImageUrlTh : null,
    seoImageUrlEn: itemJob?.seoImageUrlCn ? itemJob?.seoImageUrlCn : null,
    seoImageUrlCn: itemJob?.seoImageUrlCn ? itemJob?.seoImageUrlCn : null,
    sharePrice: itemJob?.sharePrice ? itemJob?.sharePrice : null,
    globalSharePrice: itemJob?.globalSharePrice
      ? itemJob?.globalSharePrice
      : null,
    commissionPercentage: itemJob?.commissionPercentage
      ? itemJob?.commissionPercentage
      : null,
    commissionPrice: itemJob?.commissionPrice ? itemJob?.commissionPrice : null,
    globalCommissionPrice: itemJob?.globalCommissionPrice
      ? itemJob?.globalCommissionPrice
      : null,
    pricePerUnitUsableAreaSqm: itemJob?.pricePerUnitUsableAreaSqm
      ? itemJob?.pricePerUnitUsableAreaSqm
      : null,
    zoneNameTh: itemJob?.zoneNameTh ? itemJob?.zoneNameTh : null,
    zoneNameEn: itemJob?.zoneNameEn ? itemJob?.zoneNameEn : null,
    zoneNameCn: itemJob?.zoneNameCn ? itemJob?.zoneNameCn : null,
    redirectExternalUrl: itemJob?.redirectExternalUrl
      ? itemJob?.redirectExternalUrl
      : null,
    unitPropertyTypeNameTh: itemJob?.unitPropertyTypeNameTh
      ? itemJob?.unitPropertyTypeNameTh
      : null,
    unitPropertyTypeNameEn: itemJob?.unitPropertyTypeNameEn
      ? itemJob?.unitPropertyTypeNameEn
      : null,
    unitPropertyTypeNameCn: itemJob?.unitPropertyTypeNameCn
      ? itemJob?.unitPropertyTypeNameCn
      : null
  }))
}

export { jobDataToCardList }
