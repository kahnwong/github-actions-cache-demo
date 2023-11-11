import { IJobInfoLabel } from './JobInfoLabel'

interface ICouponCard {
  bannerurl?: string | null
  projectName?: string | null
  projectNameTh?: string | null
  projectNameEn?: string | null
  projectNameCn?: string | null
  unitLocalStartingPrice?: number | null
  unitLocalPromotionPrice?: number | null
  unitGlobalStartingPrice?: number | null
  unitGlobalPromotionPrice?: number | null
  unitLocalSalePrice?: number | null
  unitBedRoomCount?: number | null
  unitBathRoomCount?: number | null
  unitUsableAreaSqm?: number | null
  unitLandAreaSqwa?: number | null
  unitFloorCount?: number | null
  jobinfoLabels?: IJobInfoLabel[]
  jobtype?: string | null
  propertytype?: string | null
  fb: string
  tw: string
  line: string
  copyLink: string
  shareQuoteTh?: string | null
  shareQuoteEn?: string | null
  shareQuoteCn?: string | null
  seoImageUrlTh?: string | null
  seoImageUrlEn?: string | null
  seoImageUrlCn?: string | null
  shareFee?: number | null
  sharePrice?: number | null
  globalSharePrice?: number | null
  commissionPercentage?: number | null
  commissionPrice?: number | null
  globalCommissionPrice?: number | null
  pricePerUnitUsableAreaSqm?: number | null
  zoneNameTh?: string | null
  zoneNameEn?: string | null
  zoneNameCn?: string | null
  redirectExternalUrl?: string | null
  redirectType?: string | null
  addressDetail?: string
  subdistrictNameTh?: string | null
  subdistrictNameEn?: string | null
  subdistrictNameCn?: string | null
  districtNameTh?: string | null
  districtNameEn?: string | null
  districtNameCn?: string | null
  provinceNameTh?: string | null
  provinceNameCn?: string | null
  provinceNameEn?: string | null
  postcode?: string
  unitPropertyTypeNameTh?: string | null
  unitPropertyTypeNameEn?: string | null
  unitPropertyTypeNameCn?: string | null
}

interface IJobCard extends ICouponCard {
  id: number
  downloadLink?: string | null
  projectFullAddress: string
  isSoldOut: boolean
  achievementtype?: string
  favorite?: boolean
}
interface IJob extends IJobCard {
  status: string
  isHighlight: number
  projectId: string
  bedroomCount?: any
  bathroomCount?: any
  usableArea?: any
  projectZone: string
  districtId: number | null
  subdistrictId: number | null
  provinceId: number | null
  projectStatus: string
  developerName: string
  thumbnailurl: string
  baseurl: string
  sharequoteenc: string
  baaniaurl: string
  createdDate: Date
  suggestedquote: string
  sharetotal: string
  shareFee?: number | null
}

interface IInputPrice {
  minPrice?: string
  maxPrice?: string
}

interface IJobFilter {
  jobType?: string
  jobTypeId?: number | null
  highlight?: string
  maxHighlight?: string
  minHighlight?: string
  propertyType?: any
  propertyTypeId?: number | null
  provinceId?: number | null
  startingPrice?: 'asc' | 'desc' | ''
  createdDate?: 'asc' | 'desc' | ''
  skip?: number
  take?: number
  projectName?: string
  zoneId?: number | null
  projectZone?: string
  isSoldOut?: boolean
  districtId?: number | null
  subdistrictId?: number | null
  developerId?: number | null
  minPrice?: string
  maxPrice?: string
  shareFee?: 'asc' | 'desc' | ''
  updatedDate?: 'asc' | 'desc' | ''
  priceName?: string
  priceMinMax?: IInputPrice
  random?: boolean
}

interface IJobRecommend {
  payload: IJob[]
  count: number
  test: string
}

export type { IJob, IJobCard, ICouponCard, IJobFilter, IJobRecommend }
