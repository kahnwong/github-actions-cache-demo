import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { LOGOUT_REDIRECT_PATH } from 'config/constant'
import { IUser } from 'interfaces/User'

interface IWrapperProps {
  user?: IUser | null
  isLoggedIn?: boolean
}

const withPrivate = (Component: NextPage) => {
  const Wrapper: NextPage<IWrapperProps> = (props) => {
    const { isLoggedIn, user } = props
    const { replace } = useRouter()

    useEffect(() => {
      if (!isLoggedIn && isEmpty(user)) {
        replace(LOGOUT_REDIRECT_PATH)
      }
    }, [isLoggedIn, user])

    return <Component {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    // Server-side
    if (ctx.req) {
      if (!ctx.req.isLoggedIn && isEmpty(ctx.req.user)) {
        ctx.res?.writeHead(307, { Location: LOGOUT_REDIRECT_PATH })
        ctx.res?.end()
      }
    }

    let initialProps = {}
    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx)
    }
    return {
      ...initialProps,
      user: ctx.req?.user,
      isLoggedIn: ctx.req?.isLoggedIn
    }
  }

  Wrapper.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    // @ts-ignore
    user: PropTypes.shape({}).isRequired
  }

  return Wrapper
}

export default withPrivate
