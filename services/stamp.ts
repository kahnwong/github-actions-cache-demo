import { IStampReward } from 'interfaces/Reward'
import { fetcher, IResponse, STAMP } from './_base'

export const getStampById = (agentId?: number) =>
  fetcher.get<IResponse<number>>(STAMP, { params: { agentId } })

export const getStampContent = () =>
  fetcher.get<IResponse<IStampReward>>(`${STAMP}/content/current`)
