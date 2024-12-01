import axios from 'axios'
import { destroyCookie } from 'nookies'

import type { IUser } from 'interfaces/User'

import { COOKIE_NAME } from 'config/constant'
import { AUTHENTICATE, IResponse } from './_base'

export interface IReqLogin {
  email: string
  password: string
}
type fb = typeof window.FB
export interface IReqFacebookLogin {
  profile: unknown
  tokenDetail: fb.StatusResponse['authResponse']
}

export const login = async (data: IReqLogin) => {
  try {
    const response = await axios.post<IResponse<IUser>>(
      `${AUTHENTICATE}/login`,
      data
    )
    return response.data.payload
  } catch (error) {
    return null
  }
}

export const loginFacebook = async (data: IReqFacebookLogin) => {
  try {
    const response = await axios.post<IResponse<IUser>>(
      `${AUTHENTICATE}/login_fb`,
      data
    )
    return response
  } catch (error) {
    return null
  }
}

export const loginGoogle = async (data: any) => {
  try {
    const response = await axios.post(`${AUTHENTICATE}/login_firebase `, data)
    return response
  } catch (error) {
    return null
  }
}

export const logout = async () => {
  const response = await axios.delete<IResponse<{ msg: string }>>(
    `${AUTHENTICATE}/logout`
  )
  localStorage.removeItem('token')
  destroyCookie(null, COOKIE_NAME)
  return response
}
