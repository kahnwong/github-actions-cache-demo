import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'

import PrivateLayout from 'layouts/PrivateLayout'
import Head from 'next/head'
import { Container } from 'react-bootstrap'

import { useUser } from 'contexts/userContext'

import { useState, useCallback } from 'react'

import withPrivate from 'hocs/withPrivate'
import PopupAlert from './components/PopupAlert'
import FilterList from './components/FilterList'
import PerformanceDetailList from './performanceDetail'

const PerformanceDashboard: NextPage = () => {
  const { t } = useTranslation()
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const handleSubmitFilter = useCallback(
    (filters) => {
      setYear(filters.year)
      setMonth(filters.month)
    },
    [year, month]
  )

  const {
    state: { user, language }
  } = useUser()

  return (
    <PrivateLayout
      useBackButton
      title='Performance Dashboard'
      className='bg-light'
    >
      <Head>
        <title> {t('performanceDashboard.headerTitle')}</title>
      </Head>
      {user && (
        <PopupAlert
          profileFilled={user?.profileFilled || false}
          interestFilled={user?.interestFilled || false}
        />
      )}
      <Container className='border rounded-3 px-4 pt-3 mt-1 bg-white'>
        <h2 className='d-none d-main-flex'>
          {t('performanceDashboard.headerTitle')}
        </h2>
        <div className='d-flex flex-column flex-main-row justify-content-between mb-3'>
          <p className='small'>{t('performanceDashboard.headerSubTitle')}</p>
          <div className='d-flex flex-main-row justify-content-between '>
            <FilterList
              year={year}
              month={month}
              onSubmitFilter={handleSubmitFilter}
            />
          </div>
        </div>
      </Container>

      <div className='p-0 pb-4'>
        {user && (
          <PerformanceDetailList
            year={year}
            month={month}
            startDate={new Date(year, month - 1, 1, 0, 0, 0, 0)}
            endDate={new Date(year, month, 1, 0, 0, 0, 0)}
            skip={0}
            take={10}
            profileFilled={user?.profileFilled || false}
            interestFilled={user?.interestFilled! || false}
            locale={language}
          />
        )}
      </div>
    </PrivateLayout>
  )
}
export default withPrivate(PerformanceDashboard)
