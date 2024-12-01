export interface ICampaignCurrent {
  id: number
  startDate: string
  endDate: string
  achievementMax: number
  type: string
}
export interface ISahredDay {
  step: number
  title?: string
  max?: number
  min?: number
  img?: string
  isCompleted?: boolean
  isSpecial?: boolean
}
