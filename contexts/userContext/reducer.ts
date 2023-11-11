import { IUser } from 'interfaces/User'
import { IUserAction, IUserDispatch, IUserState } from './type'

export const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  stampCount: 0,
  isVisit: false,
  language: 'th'
}

const reducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case IUserDispatch.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true
      }
    case IUserDispatch.LOGOUT:
      return initialState
    case IUserDispatch.UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.data
        } as IUser
      }
    case IUserDispatch.UPDATE_SHARE:
      return {
        ...state,
        user: {
          ...state.user,
          todayShare: action.payload?.isCoupon
            ? state.user?.todayShare || 0
            : (state.user?.todayShare || 0) + 1,
          count: (state.user?.count || 0) + 1
        } as IUser
      }
    case IUserDispatch.UPDATE_STAMP:
      return {
        ...state,
        stampCount: action.payload?.count || state.stampCount
      }
    case IUserDispatch.UPDATE_PDPA:
      return {
        ...state,
        user: {
          ...state.user,
          pdpaAccept: action.payload.isAccepted
        } as IUser
      }
    case IUserDispatch.VISIT:
      return {
        ...state,
        isVisit: true
      }
    case IUserDispatch.UPDATE_ACHIEVEMENT:
      return {
        ...state,
        user: {
          ...state.user,
          achievementShare:
            action.payload?.count || state.user?.achievementShare
        } as IUser
      }
    case IUserDispatch.TODAY_STAMP:
      return {
        ...state,
        user: {
          ...state.user,
          todayStamp: true
        } as IUser
      }
    case IUserDispatch.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload?.lng || 'th'
      }
    default:
      // @ts-ignore
      throw new Error(`ACTION: ${action.type} doesn't match with any cases!`)
  }
}

export default reducer
