import { IJobInfoLabel } from './JobInfoLabel'

interface ICouponCard {
  bannerurl?: string | null
  projectName?: string
  projectNameTh?: string | null
  projectNameEn?: string | null
  projectNameCn?: string | null
  unitLocalStartingPrice?: number | null
  unitLocalPromotionPrice: number | null
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
  unitGlobalPromotionPrice?: number | null
  unitLocalSalePrice?: number | null
}

interface IJobCard extends ICouponCard {
  id: number
  downloadLink?: string | null
  projectFullAddress: string
  isSoldOut: boolean
  achievementtype?: string
}

interface INewJobShare {
  id: number
  jobId: number
  fb: string
  tw: string
  line: string
  copyLink: string
}

interface ICampaign {
  id: number
  startDate: Date
  endDate: Date
  achievementMax: number
  type: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: any
}

interface IJobCampaign {
  id: number
  createdAt: Date
  updatedAt: Date
  campaign: ICampaign
}

interface IJobdownload {
  id: number
  jobId: number
  sequence: number
  downloadLink: string
}

interface IPropertyType {
  id: number
  isActive: boolean
  nameCn: string | null
  nameEn: string | null
  nameTh: string | null
}

interface IUnit {
  id: number
  status: 'PUBLIC' | 'HIDE' | null
  nameTh: string | null
  nameEn: string | null
  nameCn: string | null
  landAreaSqwa: number | null
  usableAreaSqm: number | null
  bedRoomCount: number | null
  bathRoomCount: number | null
  parkingLotCount: number | null
  totalUnitCount: number | null
  floorCount: number | null
  localStartingPrice: number | null
  localPromotionPrice: number | null
  globalStartingPrice: number | null
  globalPromotionPrice: number | null
  localSalePrice: number | null
  isChosenByMinLocalPromotionPrice: boolean | null
  propertyType: IPropertyType
}

interface IProjectCard {
  shareFee: number | null
  commissionPercentage: number | null
  sharePrice: number | null
  globalSharePrice: number | null
  commissionPrice: number | null
  globalCommissionPrice: number | null
  downloadLink: string
  pricePerUnitUsableAreaSqm: number | null
}

interface IDistrict {
  districtCode?: number | null
  id?: number | null
  nameTh?: number | null
  nameEn?: number | null
  nameCn?: number | null
  provinceCode?: number | null
}

interface ISubdistrict {
  districtCode?: number | null
  id?: number | null
  nameCn?: number | null
  nameEn?: number | null
  nameTh?: number | null
  subdistrictCode?: number | null
}

interface IProvince {
  id?: number | null
  nameTh?: number | null
  nameEn?: number | null
  nameCn?: number | null
  provinceCode?: number | null
}

interface IJob {
  shareFee: number
  id: number
  propertytype: string
  status: string
  jobtype: string
  isHighlight: number
  isSoldOut: boolean
  projectId: string
  projectName: string
  bedroomCount?: any
  bathroomCount?: any
  usableArea?: any
  projectZone: string
  district: IDistrict
  subdistrict: ISubdistrict
  province: IProvince
  projectFullAddress: string
  latitude?: any
  longitude?: any
  salesGalleryAddress: string
  projectStatus: string
  startingPrice: number
  developerName: string
  thumbnailurl: string
  baseurl: string
  sharequote: string
  shareQuoteTh?: string | null
  shareQuoteEn?: string | null
  shareQuoteCn?: string | null
  sharequoteenc: string
  baaniaurl: string
  createdDate: Date
  suggestedquote: string
  bannerurl: string
  projectNameTh: string | null
  projectNameEn: string | null
  projectNameCn: string | null
  units: IUnit[]
  localStartingPrice: number | null
  localPromotionPrice: number | null
  globalStartingPrice: number | null
  globalPromotionPrice: number | null
  isChosenByMinLocalPromotionPrice: boolean | null
  jobdownloads: IJobdownload[]
  newjobshare: INewJobShare
  jobCampaigns?: IJobCampaign[]
  seoImageUrlTh?: string | null
  seoImageUrlEn?: string | null
  seoImageUrlCn?: string | null
  addressDetail?: string | null
  postcode?: string | null
}

export interface IHighlightInfo {
  id: number
  name: string
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  imageTH: string
  imageEN: string
  imageCN: string
  urlTH: string
  urlEN: string
  urlCN: string
  status: string
  isJob: boolean
  job: IJob
  projectCard: IProjectCard
}

interface IJobHighlight {
  id: number
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
  deletedAt?: any
  highlightInfos: IHighlightInfo[]
}

export type {
  IJobHighlight,
  IJob,
  IJobCard,
  ICouponCard,
  IJobCampaign,
  IJobdownload
}
