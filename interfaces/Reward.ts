import { IDescLang, IMageLang, ITitleLang } from './Global'

export interface IReward {
  day: number
  name: string
  price: string
  title: string
  img: string
}
export interface IStampPrize extends ITitleLang, IMageLang {
  id: number
  day: number
}
export interface IStampReward extends IDescLang {
  id: number
  // titleTH: string
  // titleEN: string
  // titleCN: string
  bannerImgTH: string
  bannerImgEN: string
  bannerImgCN: string
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  // createdBy: string
  // updatedBy: string
  // deletedAt: string
  stampPrizes: IStampPrize[]
}
