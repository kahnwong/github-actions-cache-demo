export interface IJob {
  projectName?: string
}

export interface IAppointment extends IJob {
  id: number
  leadName: string
  contactSaleName: string
  appointmentStatus: string
  appointmentDate: string
  finishedDate: string
  createdDate: string
  job: IJob
}

export interface ILoading {
  isLoading?: boolean
  isError?: any
}

export interface IAppointmentList extends ILoading {
  appointment: IAppointment[]
}

export type TAppointmentStatus = 'active' | 'recent'
