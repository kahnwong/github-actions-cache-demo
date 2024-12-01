import { IHighlightInfo } from 'interfaces/WeeklyHighlight'
import { fetcher, HIGHLIGHT_CURRENT, IResponse } from './_base'

export const getWeeklyHighlight = () =>
  fetcher.get<IResponse<IHighlightInfo[]>>(HIGHLIGHT_CURRENT)
