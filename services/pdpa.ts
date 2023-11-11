import { fetcher, IResponse, PDPA } from './_base'

export interface IPDPASubmit {
  success: boolean
}

export interface IPDPACheck {
  id: number
  versionNumber: string
  name: string
  privacyTh: string
  termTh: string
  privacyEn: string
  termEn: string
  createdAt: string
}

export const submitPDPA = () =>
  fetcher.post<IResponse<IPDPASubmit>>(`${PDPA}/submit`)

export const getPDPA = () => fetcher.get<IResponse<IPDPACheck>>(`${PDPA}/check`)
