import axios from 'axios'

import type { IncomingMessage } from 'http'
import type { IUser, IUserCareer, ICareer } from 'interfaces/User'

import { COOKIE_NAME } from 'config/constant'
import { fetcher, fetcherServerSide, IResponse, USER } from './_base'

interface IUpdateUser {
  id: number
  contactPhone?: string
  phone?: string
  contactEmail?: string
  loginEmail?: string
  gender?: any
  career?: ICareer
  careerOther?: string
  birthday?: string
}

export const getUserSSR = async (req: IncomingMessage, cookies: any) => {
  try {
    if (!cookies?.[COOKIE_NAME]) return null
    const token = JSON.parse(cookies?.[COOKIE_NAME]).token as string
    axios.defaults.headers.common.authorization = token

    const response = await fetcherServerSide.get<IResponse<IUser>>(USER, {
      headers: { Authorization: token }
    })
    return response.data.payload
  } catch (error) {
    return null
  }
}

export const updateUser = (data: Partial<IUser>, id: number) =>
  fetcher.patch<IResponse<IUpdateUser>>(`${USER}/${id}`, data)

export const updateUserProfile = (data: Partial<IUser>) =>
  fetcher.patch<IResponse<IUpdateUser>>(`${USER}`, data)

export const getUserCareer = () =>
  fetcher.get<IResponse<IUserCareer[]>>(`${USER}/career`)
