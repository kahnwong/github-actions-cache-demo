import {
  IDescLang,
  IMageLang,
  IMenuLang,
  INameLang,
  ITitleLang
} from './Global'
import { IUserInterestZone } from './Interest'
import { TJobType } from './JobPropertyTypeList'
import { ILanguage } from './Language'
import { IUserPropertyType } from './User'

export interface IUnitVirtualTours {
  id: number
  thumbnailImageUrl?: string | null
  topic?: string | null
  description?: string | null
  url?: string | null
}
export interface IUnitGalleries {
  id: number
  imageUrl?: string | null
  imageAlt?: string | null
}
export interface IUnitPlans {
  id: number
  name?: string | null
  imageUrl?: string | null
}
export interface IUnits extends INameLang {
  id: number
  status: string
  landAreaSqwa?: number | null
  usableAreaSqm?: number | null
  bedRoomCount?: number | null
  bathRoomCount?: number | null
  parkingLotCount?: number | null
  totalUnitCount?: number | null
  floorCount?: number | null
  localStartingPrice?: number | null
  localPromotionPrice?: number | null
  globalStartingPrice?: number | null
  globalPromotionPrice?: number | null
  propertyType?: IUserPropertyType
  unitVirtualTours?: IUnitVirtualTours[] | null
  unitGalleries?: IUnitGalleries[] | null
  unitPlans?: IUnitPlans[] | null
}
interface IUserBy {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  lastLogin: string
}
export interface IJobinfoGallery {
  id: number
  imageUrl?: string
  imageAlt?: string
}
export interface IJobinfoAbout {
  id: number
  projectOverviewTh?: string
  projectOverviewEn?: string
  projectOverviewCn?: string
  subImageUrl?: string
}
export interface IJobinfoPayOff {
  id: number
  monthlyRental?: number | null
  monthlyRentalRemarkTh?: string | null
  monthlyRentalRemarkEn?: string | null
  monthlyRentalRemarkCn?: string | null
  yieldRatePercentage?: number | null
  yieldRateRemarkTh?: string | null
  yieldRateRemarkEn?: string | null
  yieldRateRemarkCn?: string | null
}
export interface IFacilityType extends INameLang {
  id: number
  isActive: boolean
  iconUrl: string
}
export interface IJobinfoFacility {
  id: number
  otherFacilityNameTh?: string
  otherFacilityNameEn?: string
  otherFacilityNameCn?: string
  otherFacilityIsActive?: boolean | null
  facilityType: IFacilityType
}
interface ILabel extends ITitleLang {
  id: number
  descriptionTh?: string
  descriptionEn?: string
  descriptionCn?: string
  colorCode?: string
}
interface IJobinfoLabel {
  id: number
  label: ILabel
}
interface IModule extends INameLang {
  id: number
  title?: string
}
export interface IJobinfoModule {
  id: number
  order: number
  isActive: boolean
  module: IModule
}
export interface IJobinfoVirtualTour {
  id: number
  thumbnailImageUrl?: string | null
  topic?: string | null
  description?: string | null
  url?: string | null
}
export interface IJobinfoRenovate extends ITitleLang {
  id: number
  beforeImageUrl?: string
  afterImageUrl?: string
}
export interface IJobinfoVideo {
  id: number
  youtubeUrlTh?: string | null
  youtubeUrlEn?: string | null
  youtubeUrlCn?: string | null
}
interface IBrochureType {
  id: number
  // name: 'PDF' | 'IMAGE'
  name: string
}

export interface IJobinfoBrochure {
  id: number
  name: string
  url: string
  brochureType: IBrochureType
  language: ILanguage
}
interface IPoiType extends INameLang {
  id: number
  isActive: true
  iconUrl?: string
}
interface IDistanceType extends INameLang {
  id: number
}
export interface IJobinfoPoi extends INameLang {
  id: number
  latitude?: string
  longitude?: string
  distance: number
  imageUrl?: string
  poiType: IPoiType
  distanceType: IDistanceType
}
export interface IPlanType {
  id: number
  name: string
}
export interface IJobinfoPlan extends INameLang {
  id: number
  descriptionTh?: string | null
  descriptionEn?: string | null
  descriptionCn?: string | null
  imageUrl?: string
  planType: IPlanType
}
export interface IJobType extends ITitleLang, IDescLang, IMageLang, IMenuLang {
  id: number
  type: TJobType
  status: string
  shareFee: number
  commissionPercentage: number
  order: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}
interface IBrand extends INameLang {
  id: number
  logoUrl?: string
}
interface IDeveloper {
  id: number
  companyNameTh?: string
  companyNameEn?: string
  companyNameCn?: string
  shortNameTh?: string
  shortNameEn?: string
  shortNameCn?: string
  businessRegistrationNumber?: string
  logoUrl?: string
}
interface IJobinfoCondition extends INameLang {
  id: number
}
interface IProvince {
  id: number
  provinceCode?: string
}
interface IDistrict extends INameLang {
  id: number
  districtCode?: string
  provinceCode?: string
}
interface ISubdistrict extends INameLang {
  id: number
  subdistrictCode?: string
  districtCode?: string
}
export interface IJobInfoProjectInfo {
  projectFullAddress?: string | null
  constructionEndDate?: string | null
  parkingLotDetail?: string | null
  totalUnitDetail?: string | null
  projectAreaRai?: number | null
  projectAreaNgan?: number | null
  projectAreaSqwa?: number | null
  developer?: IDeveloper | null
  projectDescriptionTh?: string | null
  projectDescriptionEn?: string | null
  projectDescriptionCn?: string | null
}
export interface IJobInfo extends IJobInfoProjectInfo {
  id: number
  propertytype?: string
  status?: string
  publicStatus?: string
  jobtype?: string
  isHighlight?: number
  isSoldOut?: false
  projectId?: number
  projectName?: string
  bedroomCount?: number
  bathroomCount?: number
  usableArea?: number
  projectZone?: string
  projectDistrictName?: string
  projectSubdistrictName?: string
  projectProvinceName?: string
  latitude?: string
  longitude?: string
  salesGalleryAddress?: string
  projectStatus?: number
  startingPrice?: number
  developerName?: string
  thumbnailurl?: string
  baseurl?: string
  sharequote?: string
  sharequoteenc?: string
  baaniaurl?: string
  createdDate?: string
  updatedDate?: string
  deletedDate?: null
  suggestedquote?: string
  bannerurl?: string
  redirectType?: string
  redirectExternalUrl?: string
  saleStatus?: string
  otherShareFee?: null
  otherCommissionPercentage?: null
  themeColorCode?: string
  projectNameTh?: string
  projectNameEn?: string
  projectNameCn?: string
  projectLogoUrl?: string
  shareQuoteTh?: string
  shareQuoteEn?: string
  shareQuoteCn?: string
  constructionStartDate?: string
  otherZoneName?: string
  addressDetail?: string
  provinceCode?: number
  districtCode?: number
  subdistrictCode?: number
  postcode?: string
  projectDescriptionTh?: string
  projectDescriptionEn?: string
  projectDescriptionCn?: string
  mainImageUrlTh?: string
  mainImageUrlEn?: string
  mainImageUrlCn?: string
  seoImageUrlTh?: string
  seoImageUrlEn?: string
  seoImageUrlCn?: string
  seoJobTitleTh?: string
  seoJobTitleEn?: string
  seoJobTitleCn?: string
  seoJobDescriptionTh?: string
  seoJobDescriptionEn?: string
  seoJobDescriptionCn?: string
  googleMapsUrl?: string
  streetViewUrl?: string
  mapImageUrlTh?: string
  mapImageUrlEn?: string
  mapImageUrlCn?: string
  uuid?: string
  zone?: IUserInterestZone
  units?: IUnits[]
  createdBy?: IUserBy
  updatedBy?: IUserBy
  jobinfoGalleries?: IJobinfoGallery[]
  jobinfoAbout?: IJobinfoAbout
  jobinfoPayOff?: IJobinfoPayOff
  jobinfoFacilities?: IJobinfoFacility[]
  jobinfoLabels?: IJobinfoLabel[]
  jobinfoModules?: IJobinfoModule[]
  jobinfoVirtualTours?: IJobinfoVirtualTour[]
  jobinfoRenovates?: IJobinfoRenovate[]
  jobinfoVideos?: IJobinfoVideo[]
  jobinfoBrochures?: IJobinfoBrochure[]
  jobinfoPois?: IJobinfoPoi[]
  jobinfoPlans?: IJobinfoPlan[]
  jobType?: IJobType
  brand?: IBrand
  jobinfoCondition?: IJobinfoCondition
  province?: IProvince
  district?: IDistrict
  subdistrict?: ISubdistrict
}
export interface IJobInfoSeo {
  projectName: string
  seoJobDescription: string
  seoImageUrl: string
  seoJobTitle: string
}
export interface IJobInfoPage {
  projectLogoUrl?: string
}

export interface IJobinfoAboutComponent {
  projectOverview?: string
  subImageUrl?: string
}
export interface IJobinfoProjectInfoComponent {
  constructionEndDate?: string
  developerName?: string
  projectFullAddress?: string
  projectAreaRai?: number
  projectAreaNgan?: number
  projectAreaSqwa?: number
  totalUnitDetail?: string
  parkingLotDetail?: string
  projectDescription?: string
}
export interface IJobinfoFacilityComponent {
  id: number
  name?: string
  image?: string
}
export interface IJobinfoPlanComponent {
  name?: string
  description?: string
  imageUrl?: string
}
export interface IJobinfoPoiComponent {
  latitude?: string
  longitude?: string
  googleMapsUrl?: string
  streetViewUrl?: string
  mapImageUrl?: string
  dataPoi?: IJobinfoPoi[]
}
export interface IJobinfoVideoComponent {
  id: number
  youtubeUrl?: string
}
export interface IUnitsButton {
  id: number
  name: string
}
export interface IUnitsComponent {
  id: number
  name?: string
  landAreaSqwa?: number
  usableAreaSqm?: number
  bedRoomCount?: number
  bathRoomCount?: number
  parkingLotCount?: number
  localStartingPrice?: number | null
  localPromotionPrice?: number | null
  globalStartingPrice?: number | null
  globalPromotionPrice?: number | null
}
