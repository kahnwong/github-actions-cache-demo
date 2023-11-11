import { IDescLang, IMageLang, IMenuLang, ITitleLang } from './Global'

interface INavbarMenu extends IMenuLang {
  id: number
  label: string
  link: string
  icon: string
}

interface INavBarToggleMenu extends INavbarMenu {
  onClick?(): void
}

interface IJobType extends ITitleLang, IDescLang, IMageLang, IMenuLang {
  id: number
  type: string
  status?: string
  shareFee?: number
  order?: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

interface IJobTypeFilter {
  orderBy?: 'ASC' | 'DESC' | ''
}

export type { INavbarMenu, INavBarToggleMenu, IJobType, IJobTypeFilter }
