import { IJobInfo } from 'interfaces/JobInfo'
import { LANDING_PAGE, LANDING_PAGE_ADMIN, fetcher, IResponse } from './_base'

export const getJobInfoAdmin = (id: string, token: string) =>
  fetcher
    .get<IResponse<IJobInfo>>(`${LANDING_PAGE_ADMIN}/${id}`, {
      headers: {
        Authorization: token
      }
    })
    .catch((error) => error)

export const getJobInfo = (id: string) =>
  fetcher.get<IResponse<IJobInfo>>(`${LANDING_PAGE}/${id}`)
