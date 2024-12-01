import axios from 'axios'
import { END_POINT } from 'config/environment'
import { logout } from 'services/authenticate'
import { LOGOUT_REDIRECT_PATH } from 'config/constant'
// import nookies from 'nookies'

export interface IResponse<Payload = {}> {
  status: number
  payload: Payload
  count?: number
}

export const fetcher = axios.create({
  baseURL: END_POINT,
  withCredentials: true
})

export const fetcherServerSide = axios.create({
  baseURL: END_POINT,
  withCredentials: true
})

// Add a request interceptor
fetcher.interceptors.request.use(
  (request: any) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        request.headers.Authorization = token
      }
    }
    return request
  },
  async (error) => {
    if (
      error.request?.status === 401 ||
      error.response?.data?.message?.replace(/\s/, '') === 'jwtexpired'
    ) {
      await logout()
      window.location.href = LOGOUT_REDIRECT_PATH
    }
    throw error
  }
)
// Handle Unauthorized 401 error
fetcher.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.message?.replace(/\s/, '') === 'jwtexpired'
    ) {
      await logout()
      window.location.href = LOGOUT_REDIRECT_PATH
    } else {
      return error.response?.data
    }
    throw error
  }
)

export const AUTHENTICATE = `${END_POINT}/authenticate`
export const JOB_WITH_SHARE = '/job_with_share'
export const JOB_TYPE = '/job_type'
export const JOB_INFO = '/job_info'
export const USER = '/user'
export const STAMP = '/stamp'
export const SHARE = '/share'
export const APPOINTMENT = '/appointment'
export const PDPA = '/pdpa'
export const PERFORMANCE = '/performance'
export const CAMPAIGN = '/campaign'
export const POPUP_CURRENT = '/popup'
export const HIGHLIGHT_CURRENT = '/highlight/current'
export const FAVORITE_JOB = '/favorite_job'
export const RECOMMEND = '/recommend'
export const LANDING_PAGE_ADMIN = '/admin/jobinfo'
export const LANDING_PAGE = '/job_info/landing_page'
export const CONTACT = '/drop'
