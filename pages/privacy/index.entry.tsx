/* eslint-disable react/no-danger */
import { FC } from 'react'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'

import type { NextPage } from 'next'

import PrivateLayout from 'layouts/PrivateLayout'
import { getPDPA } from 'services/pdpa'
import { getLng } from 'utils/getLng'

import { HOUR } from 'config/constant'
import { privacyLng } from './constants'

const PageHead: FC = ({ children }) => (
  <Head>
    <title>{children}</title>
  </Head>
)

const Privacy: NextPage = () => {
  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'

  const t = privacyLng && getLng(privacyLng, lng.toUpperCase())

  const { data, isLoading } = useQuery(['PDPA'], () => getPDPA(), {
    staleTime: 24 * HOUR,
    cacheTime: 24 * HOUR
  })

  if (isLoading) {
    return (
      <PrivateLayout>
        <PageHead />
        <Container>
          <h1 className='mt-3'>{t('headerTitle')}</h1>
          <div className='pdpa-content'>{t('headerTitle')}</div>
        </Container>
      </PrivateLayout>
    )
  }

  const dateString = new Date(
    data?.data.payload.createdAt as string
  ).toLocaleDateString(lng, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const privacyContent =
    lng === 'th' ? data?.data.payload.privacyTh : data?.data.payload.privacyEn

  return (
    <PrivateLayout>
      <PageHead>{t('headerTitle')}</PageHead>
      <Container>
        <h1 className='mt-3'>{t('headerTitle')}</h1>
        <small>
          {t('lastUpdate')} {dateString} ({data?.data.payload.versionNumber})
        </small>
        <hr />
        <div
          className='pdpa-content'
          dangerouslySetInnerHTML={{
            __html: privacyContent || ''
          }}
        />
      </Container>
    </PrivateLayout>
  )
}

export default Privacy
