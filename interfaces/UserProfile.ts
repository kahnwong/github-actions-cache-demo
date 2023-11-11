import { INameLang } from './Global'

export interface IOccupation {
  readonly value: number
  readonly label: string
}

export interface IGender {
  label: string
  name: string
  value: any
}
interface IZone extends INameLang {
  id: number
}
interface IInterestPropertyType extends INameLang {
  id: number
}
interface IAgentInfoZone {
  id: number
  zone: IZone
}
interface IInterestProperty {
  id: number
  interestPropertyType: IInterestPropertyType
}
interface ICareer extends INameLang {
  id: number
}

interface IUserProfile {
  id: number
  ssoid: string
  baaniaid: string
  name: string
  class: number
  company: string
  contactPhone?: string
  loginEmail?: string
  contactEmail?: string
  fbName?: string
  gender: 'M' | 'F' | null
  birthday?: Date | string
  areYouBroker?: string
  brokerYear?: Date | string
  username?: string
  password?: string
  fbid?: string | null
  picture?: string
  createdate: Date | string | null
  agentinfoZone: IAgentInfoZone[]
  interestProperty: IInterestProperty[]
  career: ICareer
  occupationOth?: string
  count: number
  todayStamp: false
  todayShare: number
  achievementShare: number
  profileFilled?: boolean
  interestFilled?: boolean
  pdpaAccept: true
}

export type { IUserProfile }
