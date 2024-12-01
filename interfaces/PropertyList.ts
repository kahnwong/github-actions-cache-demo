import { IJobCard } from './Job'

interface ILoading {
  isLoading?: boolean
  isError?: any
}

interface IPropertyList extends ILoading {
  items?: IJobCard[]
}

export type { IPropertyList, ILoading }
