import { INameLang } from './Global'

interface IProjectZoneOption {
  readonly value: number | null
  readonly label: string
  readonly nameTh?: string
  readonly nameEn?: string
  readonly nameCn?: string
  readonly color?: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

interface IGroupedOption {
  readonly label?: string
  readonly options: readonly IProjectZoneOption[]
}
interface IProjectZone extends INameLang {
  id: number
}
interface IProjectGetZone extends INameLang {
  id: number
  zone: IProjectZone[]
}

interface IAllZone {
  id: number
  zone: IProjectZone
}

export type {
  IProjectZoneOption,
  IGroupedOption,
  IProjectZone,
  IProjectGetZone,
  IAllZone
}
