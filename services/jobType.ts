import { IJobType } from 'interfaces/JobPropertyTypeList'
import { JOB_TYPE, fetcher, IResponse } from './_base'

export const getJobType = () =>
  fetcher.get<IResponse<IJobType[]>>(`${JOB_TYPE}`)
