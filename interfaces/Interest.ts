import { INameLang } from './Global'

export interface IInterestProperty {
  readonly value: number
  readonly label: string
}
interface IInterestZoneLabel {
  readonly value?: number
  readonly label?: string
  readonly zone?: number
}
export interface IInterestPropertyTypeValue {
  readonly interestPropertyType: number
}
export interface IInterestPropertySave extends INameLang {
  id: number
}
export interface IUserInterestZone extends INameLang {
  id: number
}

export interface IInterestZoneOption {
  readonly value: number
  readonly id?: number
  readonly label: string
  readonly nameTh?: string
  readonly nameEn?: string
  readonly nameCn?: string
  readonly color?: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export interface IGroupedOption {
  readonly label: string
  readonly options: readonly IInterestZoneOption[]
}
interface IInterestZone extends INameLang {
  id: number
}
export interface IInterestGetZone extends INameLang {
  id: number
  zone: IInterestZone[]
}

export interface IBrokerQuestionnaire {
  id: number | string
  nameTh?: string
  nameEn?: string
  nameCn?: string
}

export interface IInterest {
  areYouBroker?: string
  brokerYear?: any
  agentinfoZone: IInterestZoneLabel[]
  interestProperty: number[] | string[] | null
  brokerQuestionnaire?: IBrokerQuestionnaire
}
