import { DEFAULT_PAGINATION } from 'config/constant'
import { jobDataToCardList } from 'utils/jobDataToCardList'

import { FC, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { getJobByFilter } from 'services/job'

import PropertyModalContextProvider from 'contexts/propertyModalContext'

import { SORT_KEYS } from 'components/PropertyListByType/constants'

import Pagination from 'components/Pagination'
import PropertyModal from 'components/PropertyModal'
import PropertyCardList from 'components/PropertyCardList'
import SortList from 'components/PropertyListByType/components/SortList'
import SearchArea from '../PropertyListByType/components/SearchArea'
import Recommend from '../Recommend'
import { propertySearchList } from './constants'

import { getLng } from '../../utils/getLng'

const PrivateLayout: any = dynamic(() => import('layouts/PrivateLayout'), {
  ssr: false
})

interface IPropertyListByType {
  jobTypeId?: number | null
  title: string
  locale?: string | undefined
}

interface IPaginationState {
  total: number
  lastPage: number
  currentPage: number
  skip: number
  take: number
}

const PropertyListSearch: FC<IPropertyListByType> = ({
  jobTypeId,
  title,
  locale
}) => {
  const t =
    propertySearchList && getLng(propertySearchList, locale?.toUpperCase())
  const { push, query, isReady } = useRouter()
  // const [queryStack, setQueryStack] = useState<IJobFilter>({})
  const [pagination, setPagination] = useState<IPaginationState>({
    currentPage: 0,
    lastPage: 0,
    skip: 0,
    take: 0,
    total: 0
  })
  const { data, isLoading, isError } = useQuery(
    ['job_with_share', jobTypeId, { ...DEFAULT_PAGINATION, ...query }],
    () =>
      getJobByFilter({
        jobTypeId,
        ...DEFAULT_PAGINATION,
        ...query
      }),
    { enabled: isReady }
  )

  const cleanEmptyJob = jobDataToCardList(data?.data?.payload)

  const handlePaginate = useCallback(
    (number) => {
      const take = query?.take ? +query.take : DEFAULT_PAGINATION.take
      push({
        query: { ...query, skip: (number - 1) * take }
      })
    },
    [query]
  )

  const clearEmptyObjValue = (obj: object) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value) {
        // @ts-ignore
        acc[key] = value
      }
      return acc
    }, {})

  const prepareObjSort = (obj: object) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (SORT_KEYS.includes(key)) {
        return acc
      }
      // @ts-ignore
      acc[key] = value
      return acc
    }, {})

  const handleSort = (sortObj: object) => {
    const queryObj = {
      ...prepareObjSort({ ...query }),
      ...sortObj,
      skip: 0
    }
    push({
      query: clearEmptyObjValue(queryObj)
    })
  }

  useEffect(() => {
    if (data && isReady) {
      const take = query?.take ? +query.take : DEFAULT_PAGINATION.take
      const skip = query?.skip ? +query.skip : DEFAULT_PAGINATION.skip
      const count = data?.data?.count ? data.data.count : 0
      setPagination((previousPagination: any) => ({
        ...previousPagination,
        total: data?.data?.count,
        lastPage: Math.ceil(count / take),
        currentPage: Math.ceil((skip + 1) / take),
        skip,
        take
      }))
    }
  }, [data, query.skip, query.take, isReady])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PropertyModalContextProvider>
        <PrivateLayout useBackButton title={title}>
          <SearchArea jobTypeId={jobTypeId || null} locale={locale} />
          <Container className='my-4'>
            <div className='d-flex gap-3 gap-main-5 flex-column flex-main-row justify-content-between mb-3'>
              <div className='col-12 col-md-8'>
                <div>
                  <span className='fs-2 fw-bold pe-2 text-dark'>{title}</span>
                  <span className='col text-dark'>
                    {query?.projectName !== undefined
                      ? `"${query?.projectName}"`
                      : ''}
                  </span>
                </div>
                <div className='pt-2'>
                  <small className='mt-3'>
                    {t('totalNumber')}
                    <span className='text-secondary ps-2 '>
                      {pagination.total} {t('project')}
                    </span>
                  </small>
                </div>
              </div>

              <div className='d-flex flex-main-row justify-content-between gap-main-3'>
                <SortList
                  unitLocalSalePrice={query?.unitLocalSalePrice?.toString()}
                  sharePrice={query?.sharePrice?.toString()}
                  commissionPrice={query?.commissionPrice?.toString()}
                  updatedDate={query?.updatedDate?.toString()}
                  commissionPercentage={query?.commissionPercentage?.toString()}
                  onHandleSort={handleSort}
                  locale={locale}
                />
              </div>
            </div>
            <div>
              <PropertyCardList
                items={cleanEmptyJob}
                isLoading={isLoading}
                isError={isError}
                locale={locale}
              />
            </div>
            <div className='d-flex justify-content-center mt-4'>
              <Pagination
                onPaginate={handlePaginate}
                // onPerPage={handlePerPage}
                total={
                  data?.data?.count
                    ? parseInt(data?.data?.count?.toString(), 10)
                    : 0
                }
                currentPage={pagination?.currentPage}
                lastPage={pagination?.lastPage}
              />
            </div>
          </Container>
          <Recommend />
          <PropertyModal />
        </PrivateLayout>
      </PropertyModalContextProvider>
    </>
  )
}

PropertyListSearch.propTypes = {
  jobTypeId: PropTypes.number,
  title: PropTypes.string.isRequired,
  locale: PropTypes.string
}
PropertyListSearch.defaultProps = {
  locale: '',
  jobTypeId: null
}

export default PropertyListSearch
