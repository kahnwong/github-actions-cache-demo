/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Dispatch, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import type { IUser } from 'interfaces/User'

import { logout } from 'services/authenticate'
import { submitPDPA } from 'services/pdpa'
import { IUserAction, IUserDispatch } from 'contexts/userContext/type'
import { HIDE_PDPA_PAGES, LOGOUT_REDIRECT_PATH } from 'config/constant'

interface IParams {
  user: IUser
  isLoggedIn: boolean
  dispatch: Dispatch<IUserAction>
}

export enum ESubmit {
  NO_SUBMIT,
  SUBMITTING,
  SUBMITTED
}

const usePDPA = (params: IParams) => {
  // NOTE: pass [user], [isLoggedin], and [dispatch] because the context hook isn't changed when this hook is called in [_app]
  const { user, isLoggedIn, dispatch } = params
  const { pathname, push } = useRouter()

  const [isShowPDPA, setIsShowPDPA] = useState(false)
  const [submitState, setSubmitState] = useState(ESubmit.NO_SUBMIT)

  const onShowPDPA = () => {
    setIsShowPDPA(true)
  }

  const onHidePDPA = async (isRejected: boolean = false) => {
    setSubmitState(ESubmit.SUBMITTING)
    if (isRejected) {
      await logout()
      await push(LOGOUT_REDIRECT_PATH)
      dispatch({ type: IUserDispatch.LOGOUT })
      setSubmitState(ESubmit.NO_SUBMIT)
    } else {
      try {
        await submitPDPA()
        dispatch({
          type: IUserDispatch.UPDATE_PDPA,
          payload: { isAccepted: true }
        })
        setSubmitState(ESubmit.SUBMITTED)
      } catch (error) {
        setSubmitState(ESubmit.NO_SUBMIT)
      }
    }
    setIsShowPDPA(false)
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (HIDE_PDPA_PAGES.includes(pathname)) {
        setIsShowPDPA(false)
      } else if (!user.pdpaAccept) {
        onShowPDPA()
      }
    }
  }, [pathname, isLoggedIn])

  return {
    isShowPDPA,
    onShowPDPA,
    onHidePDPA,
    submitState
  }
}

export default usePDPA
