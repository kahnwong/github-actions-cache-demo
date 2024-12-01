import { fetcher, IResponse, PERFORMANCE } from './_base'

export interface IPerformanceDetail {
  name: string
  jobtype: string
  url: string
  shareTotal: number
  shareFB: number
  shareTW: number
  shareLine: number
  shareCopy: number
  dropTotal: number
  dropFB: number
  dropTW: number
  dropLine: number
  dropCopy: number
}

export interface ITotalShare {
  Line: number
  Twitter: number
  Facebook: number
}

export interface ITotalDrop extends ITotalShare {
  'Copy Link': number
}

export interface IAgentPerformance {
  detail: IPerformanceDetail[]
  totalShare: ITotalShare
  totalDrop: ITotalDrop
}

export const getPerformanceDetail = (params: {
  startDate: Date
  endDate: Date
  skip: number
  take: number
}) =>
  fetcher.get<IResponse<IAgentPerformance>>(
    `${PERFORMANCE}/agent_performance`,
    { params }
  )
