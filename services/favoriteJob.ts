import { IJob } from 'interfaces/Job'
import { fetcher, IResponse, FAVORITE_JOB } from './_base'

export const postFavoriteJob = (data: Partial<IJob>) =>
  fetcher.post<IResponse<IJob>>(`${FAVORITE_JOB}`, data)

export const deleteFavoriteJob = (jobId: number) =>
  fetcher.delete<IResponse>(`${FAVORITE_JOB}/${jobId}`)
