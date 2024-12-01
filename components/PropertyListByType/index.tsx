import { DEFAULT_PAGINATION } from 'config/constant'
import { jobDataToCardList } from 'utils/jobDataToCardList'

import { FC, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { IJobTypeHeader } from 'interfaces/JobPropertyTypeList'

import { getJobByFilter } from 'services/job'

import PropertyModalContextProvider from 'contexts/propertyModalContext'

import Pagination from 'components/Pagination'
import PropertyCardList from 'components/PropertyCardList'
import PropertyModal from 'components/PropertyModal'
import { SORT_KEYS } from './constants'
import SortList from './components/SortList'
import SearchArea from './components/SearchArea'
import { getLng } from '../../utils/getLng'

const PrivateLayout: any = dynamic(() => import('layouts/PrivateLayout'), {
  ssr: false
})

interface IPaginationState {
  total: number
  lastPage: number
  currentPage: number
  skip: number
  take: number
}

interface IHeadTitle {
  headTitle: IJobTypeHeader
  locale: string | undefined
}

const PropertyListByType: FC<IHeadTitle> = ({ headTitle, locale }) => {
  const { push, query, isReady } = useRouter()
  const [pagination, setPagination] = useState<IPaginationState>({
    currentPage: 0,
    lastPage: 0,
    skip: 0,
    take: 0,
    total: 0
  })

  const tHeadTitle =
    headTitle && getLng(headTitle, locale?.toUpperCase() || 'TH')

  const isRandom =
    Object.keys(query).length === 1 && Object.keys(query)[0] === 'slug'
      ? { random: true }
      : { random: undefined }
  const newQuery = { ...query }
  delete newQuery?.slug
  const payload = {
    jobTypeId: headTitle.id as any,
    ...newQuery,
    ...isRandom,
    take: query?.take ? +query.take : 12,
    skip: query?.skip ? +query.skip : 0
  }

  const { data, isLoading, isError } = useQuery(
    ['job_with_share', headTitle.id, { ...DEFAULT_PAGINATION, ...query }],
    () =>
      getJobByFilter({
        ...payload
      }),
    { enabled: isReady }
  )

  const cleanEmptyJob = jobDataToCardList(data?.data?.payload)

  const handlePaginate = useCallback(
    (number) => {
      const take = query?.take ? +query.take : 12
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
      const take = query?.take ? +query.take : 12
      const skip = query?.skip ? +query.skip : DEFAULT_PAGINATION.skip
      const count = data?.data?.count ? data?.data?.count : 0
      setPagination((previousPagination: any) => ({
        ...previousPagination,
        skip,
        take,
        total: data?.data?.count,
        lastPage: Math.ceil(count / take),
        currentPage: Math.ceil((skip + 1) / take)
      }))
    }
  }, [data, query.skip, query.take && isReady])

  return (
    <>
      <Head>
        <title>{tHeadTitle('title')}</title>
      </Head>
      <PropertyModalContextProvider>
        <PrivateLayout useBackButton title={tHeadTitle('title') || ''}>
          <SearchArea jobTypeId={headTitle.id || null} locale={locale} />

          <Container className='my-4'>
            {tHeadTitle('title') && (
              <h2 className='d-none d-main-flex'>{tHeadTitle('title')}</h2>
            )}
            <div className='d-flex gap-3 gap-main-5 flex-column flex-main-row justify-content-between mb-3'>
              <small>{tHeadTitle('desc')}</small>
              <div className='d-flex flex-main-row justify-content-between gap-main-3'>
                {/* <FilterList */}
                {/*  provinceName={queryStack?.provinceName} */}
                {/*  propertyType={queryStack?.propertyType} */}
                {/*  onSubmitFilter={handleSubmitFilter} */}
                {/* /> */}
                <SortList
                  unitLocalSalePrice={query?.unitLocalSalePrice?.toString()}
                  createdDate={query?.createdDate?.toString()}
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
              {headTitle.image && (
                <div className='pb-4'>
                  <div className='rounded overflow-hidden d-main-block position-relative'>
                    <Image
                      src={headTitle.image}
                      alt={tHeadTitle('title') || ''}
                      layout='responsive'
                      objectFit='contain'
                      width={500}
                      height={167}
                    />
                  </div>
                </div>
              )}
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
                    ? parseInt(data?.data.count.toString(), 10)
                    : 0
                }
                // perPage={pagination.take}
                currentPage={pagination?.currentPage}
                lastPage={pagination?.lastPage}
              />
            </div>
          </Container>
          <PropertyModal />
        </PrivateLayout>
      </PropertyModalContextProvider>
    </>
  )
}

PropertyListByType.defaultProps = {
  locale: ''
}
PropertyListByType.propTypes = {
  headTitle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titleTH: PropTypes.string.isRequired,
    titleEN: PropTypes.string.isRequired,
    titleCN: PropTypes.string.isRequired,
    descTH: PropTypes.string.isRequired,
    descEN: PropTypes.string.isRequired,
    descCN: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  locale: PropTypes.string
}

export default PropertyListByType
