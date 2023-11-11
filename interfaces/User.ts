import { INameLang } from './Global'
import { IBrokerQuestionnaire } from './Interest'

export interface IUserOld {
  id: number
  name: string
  email: string
  count: number
  todayShare: number
  phone: string | null
  sent: string
  token: string
  via: 'bn' | 'fb'
  picture?: string
  viaId: string
  pdpaAccept: boolean
  achievementShare: number
  todayStamp: boolean
}

export interface ICareer extends INameLang {
  id: number
}
export interface IOccupation {
  readonly value: number
  readonly label: string
}
export interface IGender {
  labelTH: string
  labelCN: string
  labelEN: string
  name: string
  value?: any
}
interface IZone extends INameLang {
  id: number
}
export interface IUserPropertyType extends INameLang {
  id: number
}
export interface IAgentInfoZone {
  id: number
  zone: IZone
}
export interface IUserInterestProperty {
  id: number
  interestPropertyType: IUserPropertyType
}

export interface IUserCareer extends INameLang {
  id?: number
}

export interface IUser {
  id: number
  ssoid: string
  baaniaid: any
  name: string
  class: number
  company: any
  phone: string
  contactPhone: string
  loginEmail: string
  contactEmail: string
  fbName: any
  gender: any
  birthday: any
  areYouBroker: any
  brokerYear?: any
  username: any
  password: any
  fbid: any
  picture: string
  createdate: string
  agentinfoZone: IAgentInfoZone[]
  interestProperty: IUserInterestProperty[]
  career: ICareer | null
  count: number
  todayStamp: boolean
  todayShare: number
  achievementShare: number
  pdpaAccept: boolean
  token: string
  careerOther?: string
  profileFilled?: boolean
  interestFilled?: boolean
  brokerQuestionnaire: IBrokerQuestionnaire
}
