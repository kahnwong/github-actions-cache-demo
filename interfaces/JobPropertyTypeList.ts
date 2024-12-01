import { IDescLang, IMageLang, ITitleLang } from './Global'

interface IPropertyTypeList {
  propertyTypeList: []
}

export type TJobType =
  | ''
  | 'Exclusive'
  | 'Non-Exclusive'
  | 'NPA'
  | 'Rental'
  | 'For-Sell'

type TJobTypeId = number | null

interface IPropertyListByType {
  jobType: TJobType
}

interface IPropertyListById {
  jobTypeId?: number | null
}

interface IPropertyTypeOption {
  value: string
  title: string
}

interface IJobType extends ITitleLang, IDescLang, IMageLang {
  id: number
  type: string
  status: string
  menuTH: string
}

interface IJobTypeHeader extends ITitleLang, IDescLang {
  id: number | undefined
  image: string
}

export type {
  IPropertyTypeList,
  IPropertyListByType,
  IPropertyListById,
  IPropertyTypeOption,
  TJobTypeId,
  IJobType,
  IJobTypeHeader
}
