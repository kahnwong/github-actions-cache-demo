import type {
  IInterestPropertySave,
  IInterest,
  IInterestGetZone,
  IBrokerQuestionnaire
} from 'interfaces/Interest'
import { fetcher, IResponse, USER } from './_base'
import { IBrokerList } from '../pages/interest/constants'

interface IInterestZoneSave {
  readonly zone?: number
}
interface IUpdateUserInterest {
  areYouBroker?: string
  brokerYear?: any
  agentinfoZone: IInterestZoneSave[]
  interestProperty: []
  brokerQuestionnaire: IBrokerQuestionnaire
}
export const updateUserInterest = (data: Partial<IInterest>) =>
  fetcher.patch<IResponse<IUpdateUserInterest>>(`${USER}/interested`, data)

export const getUserInterestPropertyType = () =>
  fetcher.get<IResponse<IInterestPropertySave[]>>(
    `${USER}/interested_propertytype`
  )

export const getUserInterestZone = () =>
  fetcher.get<IResponse<IInterestGetZone[]>>(`${USER}/zone`)

export const getUserQuestionnaire = () =>
  fetcher.get<IResponse<IBrokerList[]>>(`${USER}/broker_questionnaire`)
