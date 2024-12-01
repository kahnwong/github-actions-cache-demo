import type { IInsertShare, IUpdateShare } from 'interfaces/Share'
import { fetcher, IResponse, SHARE } from './_base'

export const insertShare = async (data: IUpdateShare) =>
  fetcher.post<IResponse<IInsertShare>>(SHARE, data)
