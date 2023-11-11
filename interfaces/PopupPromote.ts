import { IMageLang } from './Global'

interface IPopupCheck extends IMageLang {
  id: number
  startDate: string
  endDate: string
  urlTH: string
  urlEN: string
  urlCN: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: Date | null
  createdBy: Date | null
  updatedBy: Date | null
}

interface IPopupCurrent {
  url: string
  image: string
}

export type { IPopupCheck, IPopupCurrent }
