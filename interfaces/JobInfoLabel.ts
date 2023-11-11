export interface ILabel {
  id?: number | null
  titleTh?: string | null
  titleEn?: string | null
  titleCn?: string | null
  descriptionTh?: string | null
  descriptionEn?: string | null
  descriptionCn?: string | null
  colorCode?: string | null
}

export interface IJobInfoLabel {
  id: number
  label: ILabel
}
