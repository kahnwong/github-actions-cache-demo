import axios from 'axios'
import NextApp from 'next/app'
import nookies from 'nookies'
import { isEmpty } from 'lodash'
import { SSRProvider } from 'react-bootstrap'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import type { AppContext, AppProps } from 'next/app'
import type { IUser } from 'interfaces/User'

import PDPAPopup from 'components/PDPAPopup'
import usePDPA from 'hooks/usePDPA'
import { getPDPA } from 'services/pdpa'
import { UserContext, useUserReducer } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import { getUserSSR } from 'services/user'
import { HOUR } from 'config/constant'

// @ts-ignore
import '@company/globals.scss'

declare module 'http' {
  // eslint-disable-next-line no-unused-vars
  interface IncomingMessage {
    user: IUser
    isLoggedIn: boolean
  }
}

interface IAppProps extends AppProps {
  user: IUser
  isLoggedIn: boolean
}

axios.defaults.withCredentials = true

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false }
  }
})

const App = (appProps: IAppProps) => {
  const { Component, pageProps, user, isLoggedIn } = appProps

  const userReducer = useUserReducer()
  const {
    state: { user: userState, isLoggedIn: isLoggedInState },
    dispatch
  } = userReducer

  const { isShowPDPA, onHidePDPA, submitState } = usePDPA({
    user: userState as IUser,
    isLoggedIn: isLoggedInState,
    dispatch
  })
  useEffect(() => {
    queryClient.prefetchQuery(['PDPA'], () => getPDPA(), {
      staleTime: 24 * HOUR,
      cacheTime: 24 * HOUR
    })
  }, [])

  useEffect(() => {
    if (isLoggedIn && !isEmpty(user)) {
      dispatch({ type: IUserDispatch.LOGIN, payload: { user } })
    }
  }, [isLoggedIn, user])

  return (
    <QueryClientProvider client={queryClient}>
      <SSRProvider>
        <UserContext.Provider value={userReducer}>
          <Component
            {...pageProps}
            user={user || userState}
            isLoggedIn={isLoggedIn || isLoggedInState}
          />
          <PDPAPopup
            show={isShowPDPA}
            onAccept={() => onHidePDPA()}
            onReject={() => onHidePDPA(true)}
            submitState={submitState}
          />
        </UserContext.Provider>
      </SSRProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  let isLoggedIn = false
  let user = null
  // Server-side

  if (appContext.ctx.req) {
    const cookies = nookies.get(appContext.ctx)
    try {
      const userData = await getUserSSR(appContext.ctx.req, cookies)
      if (!isEmpty(userData) && userData) {
        isLoggedIn = true
        user = userData
        // eslint-disable-next-line no-param-reassign
        appContext.ctx.req.isLoggedIn = isLoggedIn
        // eslint-disable-next-line no-param-reassign
        appContext.ctx.req.user = userData
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log('unauthorized')
        } else {
          console.error(error.response?.statusText)
        }
      } else {
        console.error(error)
      }
    }
  }

  const appProps = await NextApp.getInitialProps(appContext)

  return { ...appProps, user, isLoggedIn }
}

export default App
