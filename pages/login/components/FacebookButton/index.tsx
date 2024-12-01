import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Script from 'next/script'
import { useRouter } from 'next/router'
import nookies from 'nookies'
// types
import type { FC } from 'react'
// icons
import { SiFacebook } from 'react-icons/si'

import { FACEBOOK_APP_ID } from 'config/environment'

import { loginFacebook } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import { COOKIE_NAME, DAYS } from 'config/constant'

import { StyledButton } from './style'

interface IProps {
  isDisabled?: boolean
}

const FacebookButton: FC<IProps> = (props) => {
  const { t } = useTranslation()
  const { isDisabled } = props
  const { push } = useRouter()
  const { dispatch } = useUser()

  const [isLoading, setIsLoading] = useState(false)
  // TODO: fix type login response
  const handleLoginFacebook = (loginResponse: any) => {
    setIsLoading(true)
    if (loginResponse.status === 'connected') {
      window.FB.api('/me?fields=name,email,picture', async (profileRespose) => {
        const requestLoginData = {
          profile: profileRespose,
          tokenDetail: loginResponse.authResponse
        }
        const res = await loginFacebook(requestLoginData)
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
    } else {
      console.error(loginResponse.status)
    }
    setIsLoading(false)
  }

  const onLogin = () => {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        handleLoginFacebook(response)
      } else {
        window.FB.login(handleLoginFacebook, { scope: 'public_profile,email' })
      }
    })
  }

  useEffect(() => {
    if (window) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: FACEBOOK_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v13.0'
        })
      }
    }
  }, [])

  return (
    <>
      <Script src='https://connect.facebook.net/th_TH/sdk.js' />
      <StyledButton
        disabled={isDisabled || isLoading}
        className={classNames(
          'd-flex justify-content-center align-items-center py-3',
          isDisabled && 'opacity-50'
        )}
        onClick={onLogin}
      >
        <SiFacebook size={24} className='me-2' />
        {t('login.continueWithFacebook')}
      </StyledButton>
    </>
  )
}

FacebookButton.defaultProps = {
  isDisabled: false
}
FacebookButton.propTypes = {
  isDisabled: PropTypes.bool
}

export default FacebookButton
