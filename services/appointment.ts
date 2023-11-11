import { IAppointment } from 'interfaces/AppointmentList'
import { APPOINTMENT, fetcher, IResponse } from './_base'

export const getAppointment = (status: string) =>
  fetcher.get<IResponse<IAppointment[]>>(`${APPOINTMENT}/${status}`)
