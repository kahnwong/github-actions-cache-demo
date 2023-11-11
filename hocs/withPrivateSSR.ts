import { isEmpty } from 'lodash'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { LOGOUT_REDIRECT_PATH } from 'config/constant'

function withPrivateSSR(gssp: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    if (isEmpty(context.req.user)) {
      return {
        redirect: {
          destination: LOGOUT_REDIRECT_PATH,
          permanent: false
        }
      }
    }
    const getServerSideProps = await gssp(context)
    return getServerSideProps
  }
}

export default withPrivateSSR
