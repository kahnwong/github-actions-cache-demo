import { IPopupCheck } from 'interfaces/PopupPromote'
import { fetcher, IResponse, POPUP_CURRENT } from './_base'

export const getPopupCurrent = () =>
  fetcher.get<IResponse<IPopupCheck[]>>(`${POPUP_CURRENT}/current`)
