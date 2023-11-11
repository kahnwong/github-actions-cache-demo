import { IJobType, IJobTypeFilter } from 'interfaces/MenuJobType'
import { fetcher, IResponse, JOB_TYPE } from './_base'

export const getMenuByJobType = (params: IJobTypeFilter = {}) =>
  fetcher.get<IResponse<IJobType[]>>(JOB_TYPE, { params })
