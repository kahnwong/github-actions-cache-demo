import { FC } from 'react'
import classNames from 'classnames'
import { firebaseApp } from 'config/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { loginGoogle } from 'services/authenticate'
import { useRouter } from 'next/router'
import { IUserDispatch } from 'contexts/userContext/type'
import { useUser } from 'contexts/userContext'
import nookies from 'nookies'
import { useTranslation } from 'react-i18next'

import { COOKIE_NAME, DAYS } from 'config/constant'
import Image from 'next/image'
import googleSVG from 'public/assets/icons/logo-google.svg'
import { StyledButton, StyledText } from './style'
import { failedAlert } from '../Alert'

const GoogleButton: FC = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const { dispatch } = useUser()

  const provider = new GoogleAuthProvider()

  const auth = getAuth(firebaseApp)

  const isLineBrowser = () => {
    const ua = navigator.userAgent
    return /Line/i.test(ua)
  }

  const onLogin = () => {
    if (isLineBrowser()) {
      failedAlert(
        {
          title:
            'ไม่สามารถใช้ Google Login ผ่าน Line Browser ได้ กรุณาเปิดใน Google Chrome หรือ Safari'
        },
        { small: true }
      )
    } else {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const res = await loginGoogle(result)
          if (res?.status === 200) {
            dispatch({
              type: IUserDispatch.LOGIN,
              payload: { user: res?.data.payload }
            })
            localStorage.setItem('token', res?.data.payload.token)
            const token = { token: res?.data.payload.token }
            nookies.set(undefined, COOKIE_NAME, JSON.stringify(token), {
              maxAge: 30 * DAYS
            })
            push('/')
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }
  return (
    <StyledButton
      onClick={onLogin}
      className={classNames(
        'd-flex justify-content-center align-items-center py-3'
      )}
    >
      <Image src={googleSVG} alt='Google Login' />
      <StyledText>{t('login.continueWithGoogle')}</StyledText>
    </StyledButton>
  )
}

export default GoogleButton
