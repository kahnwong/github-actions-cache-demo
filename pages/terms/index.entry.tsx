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
import { termsLng } from './constants'

const PageHead: FC = ({ children }) => (
  <Head>
    <title>{children}</title>
  </Head>
)

const Terms: NextPage = () => {
  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'
  const t = termsLng && getLng(termsLng, lng.toUpperCase())

  const { data, isLoading } = useQuery(['PDPA'], () => getPDPA(), {
    staleTime: 24 * HOUR,
    cacheTime: 24 * HOUR
  })

  if (isLoading) {
    return (
      <PrivateLayout>
        <PageHead>{t('headerTitle')}</PageHead>
        <Container>
          <h1 className='mt-3'>{t('headerTitle')}</h1>
          <div className='pdpa-content'>{t('loadingMessage')}</div>
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

  const termContent =
    lng === 'th' ? data?.data.payload.termTh : data?.data.payload.termEn

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
          dangerouslySetInnerHTML={{ __html: termContent || '' }}
        />
      </Container>
    </PrivateLayout>
  )
}

export default Terms
