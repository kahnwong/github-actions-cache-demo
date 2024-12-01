/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { IUser } from 'interfaces/User'
import { Dispatch } from 'react'

export enum IUserDispatch {
  LOGIN = 'login',
  LOGOUT = 'logout',
  UPDATE_STAMP = 'update_stamp',
  UPDATE_PROFILE = 'update_profile',
  UPDATE_SHARE = 'update_share',
  UPDATE_PDPA = 'update_pdpa',
  VISIT = 'visit',
  UPDATE_ACHIEVEMENT = 'update_achievement',
  TODAY_STAMP = 'today_stamp',
  CHANGE_LANGUAGE = 'change_language'
}

export interface IUserState {
  user: IUser | null
  isLoggedIn: boolean
  stampCount: number
  isVisit: boolean
  language: string
}

export type IUserAction =
  | { type: IUserDispatch.LOGIN; payload: { user: IUser } }
  | { type: IUserDispatch.LOGOUT }
  | { type: IUserDispatch.UPDATE_PROFILE; payload: { data: Partial<IUser> } }
  | { type: IUserDispatch.UPDATE_SHARE; payload?: { isCoupon?: boolean } }
  | { type: IUserDispatch.UPDATE_STAMP; payload?: { count?: number } }
  | { type: IUserDispatch.UPDATE_PDPA; payload: { isAccepted: boolean } }
  | { type: IUserDispatch.VISIT }
  | { type: IUserDispatch.UPDATE_ACHIEVEMENT; payload?: { count?: number } }
  | { type: IUserDispatch.TODAY_STAMP }
  | { type: IUserDispatch.CHANGE_LANGUAGE; payload?: { lng: string } }

export interface IUserContext {
  state: IUserState
  dispatch: Dispatch<IUserAction>
}
