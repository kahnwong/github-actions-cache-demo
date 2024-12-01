import { FC, useEffect, useState, useCallback } from 'react'
// import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import PrivateLayout from 'layouts/PrivateLayout'
import { getJobFavoriteByFilter } from 'services/job'
import PropertyCardList from 'components/PropertyCardList'
import { Container } from 'react-bootstrap'
import { useRouter } from 'next/router'
import PropertyModal from 'components/PropertyModal'
import PropertyModalContextProvider from 'contexts/propertyModalContext'
import Pagination from 'components/Pagination'
import Head from 'next/head'
import { DEFAULT_PAGINATION } from 'config/constant'
import { IJobFilter } from 'interfaces/Job'
import { SORT_KEYS, HEADER_SUBTITLE } from './constants'
import FilterList from './components/FilterList'
import SortList from './components/SortList'
import { getLng } from '../../utils/getLng'

// const PrivateLayout: any = dynamic(() => import('layouts/PrivateLayout'), {
//   ssr: false
// })

type TJobType =
  | ''
  | 'Exclusive'
  | 'Non-Exclusive'
  | 'NPA'
  | 'Rental'
  | 'For-Sell'

interface IPropertyListByType {
  jobType: TJobType
  title: string
  locale: string | undefined
}

interface IPaginationState {
  total: number
  lastPage: number
  currentPage: number
  skip: number
  take: number
}

const PropertyListByFavorite: FC<IPropertyListByType> = ({
  jobType,
  title,
  locale
}) => {
  const { push, query, isReady } = useRouter()
  const [clickFavorite, setClickFavorite] = useState(0)
  const [queryStack, setQueryStack] = useState<IJobFilter>({})
  const [pagination, setPagination] = useState<IPaginationState>({
    currentPage: 0,
    lastPage: 0,
    skip: 0,
    take: 0,
    total: 0
  })

  const tHeadTitle =
    HEADER_SUBTITLE && getLng(HEADER_SUBTITLE, locale?.toUpperCase() || 'TH')
  const { data, isLoading, isError } = useQuery(
    [
      'job_with_share',
      jobType,
      { ...DEFAULT_PAGINATION, ...query, clickFavorite }
    ],
    () =>
      getJobFavoriteByFilter({
        jobType,
        ...DEFAULT_PAGINATION,
        ...query,
        ...(!query?.startingPrice && !query?.updatedDate
          ? { updatedDate: 'desc' }
          : {})
      }),
    { enabled: isReady }
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

  const handlePaginate = useCallback(
    (number: number) => {
      const take = query?.take ? +query.take : DEFAULT_PAGINATION.take
      setQueryStack((previousQueryStack: any) => ({
        ...previousQueryStack,
        skip: (number - 1) * take
      }))
      push({
        query: { ...query, skip: (number - 1) * take }
      })
    },
    [query]
  )

  const handleSubmitFilter = useCallback(
    (filters: IJobFilter) => {
      const newFilter = filters?.skip ? filters : { ...filters, skip: 0 }
      push({
        query: clearEmptyObjValue({ ...query, ...newFilter })
      })
      setQueryStack((previousQueryStack: any) => ({
        ...previousQueryStack,
        ...newFilter
      }))
    },
    [query]
  )

  const handleSort = (sortObj: object) => {
    const queryObj = {
      ...prepareObjSort({ ...query }),
      ...sortObj,
      skip: 0
    }
    push({
      query: clearEmptyObjValue(queryObj)
    })
    setQueryStack(queryObj)
  }

  const handleShowFavorite = (status: boolean) => {
    if (status) {
      if (pagination.currentPage === pagination.lastPage) {
        const getLastPage = (pagination.total - 1) % 10
        pagination.currentPage =
          getLastPage !== 0 || pagination.currentPage === 1
            ? pagination.currentPage
            : pagination.currentPage - 1
      }

      const take = query?.take ? +query.take : DEFAULT_PAGINATION.take
      const skip = ((pagination.currentPage - 1) * take).toString()
      const clickFavoriteTotal =
        queryStack?.skip?.toString() === skip
          ? clickFavorite + 1
          : clickFavorite

      // set trigger for load query
      setClickFavorite(clickFavoriteTotal)

      handleSubmitFilter({
        skip: parseInt(skip, 10)
      })
    }
  }

  useEffect(() => {
    if (data && isReady) {
      const take = query?.take ? +query.take : DEFAULT_PAGINATION.take
      const skip = query?.skip ? +query.skip : DEFAULT_PAGINATION.skip
      const count = data?.data?.count ? data?.data?.count : 0
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

  useEffect(() => {
    setQueryStack({
      jobTypeId: null,
      propertyTypeId: null,
      ...(query.startingPrice ? {} : { updatedDate: 'desc' }),
      ...DEFAULT_PAGINATION,
      ...query,
      skip: 0
    })
    setClickFavorite(0)
  }, [isReady])
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PropertyModalContextProvider>
        <PrivateLayout useBackButton title={title}>
          <Container className='my-4'>
            <h2 className='d-none d-main-flex'>{title}</h2>
            <div className='d-flex gap-3 gap-main-5 flex-column flex-main-row justify-content-between mb-3'>
              <small>
                {tHeadTitle('headerTitle')}{' '}
                {!isLoading ? pagination.total : '...'} {tHeadTitle('project')}
              </small>
              <div className='d-flex flex-main-row justify-content-between gap-main-3'>
                <FilterList
                  jobTypeId={Number(query?.jobTypeId) || null}
                  propertyTypeId={Number(query?.propertyTypeId) || null}
                  onSubmitFilter={handleSubmitFilter}
                  locale={locale}
                />
                <SortList
                  unitLocalSalePrice={query?.unitLocalSalePrice?.toString()}
                  createdDate={query?.createdDate?.toString()}
                  onHandleSort={handleSort}
                  locale={locale}
                />
              </div>
            </div>
            <div>
              {!isLoading && (
                <PropertyCardList
                  items={data?.data?.payload}
                  isLoading={isLoading}
                  isError={isError}
                  isShowUnFavorite={false}
                  onHandleShowFavorite={handleShowFavorite}
                  locale={locale}
                />
              )}
            </div>
            <div className='d-flex justify-content-center mt-4'>
              <Pagination
                onPaginate={handlePaginate}
                total={
                  data?.data?.count
                    ? parseInt(data?.data?.count.toString(), 10)
                    : 0
                }
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
PropertyListByFavorite.defaultProps = {
  locale: ''
}
PropertyListByFavorite.propTypes = {
  jobType: PropTypes.oneOf<TJobType>([
    '',
    'Exclusive',
    'Non-Exclusive',
    'NPA',
    'Rental'
  ]).isRequired,
  title: PropTypes.string.isRequired,
  locale: PropTypes.string
}

export default PropertyListByFavorite
