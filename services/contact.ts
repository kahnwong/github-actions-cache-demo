import { IContactRequest } from 'interfaces/Contact'
import { fetcher, IResponse, CONTACT } from './_base'

export const postContact = (data: IContactRequest) =>
  fetcher.post<IResponse<any>>(`${CONTACT}`, data)
