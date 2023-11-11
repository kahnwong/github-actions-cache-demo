import type { ICampaignCurrent } from 'interfaces/Campaign'
import { fetcher, IResponse, CAMPAIGN } from './_base'

export const getCampaignCurrent = () =>
  fetcher.get<IResponse<ICampaignCurrent>>(`${CAMPAIGN}/current`)
