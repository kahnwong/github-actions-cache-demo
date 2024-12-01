interface IBroker {
  labelTH?: string
  labelEN?: string
  labelCN?: string
  name: string
  id: number | string
  value: string
}
interface IBrokerPeriod {
  yearStart?: string
  yearTotal?: string
}
export interface IBrokerList extends IBroker {
  periodDetail?: IBrokerPeriod[]
}
export interface IZone {
  readonly label: string
  readonly value: string
}
