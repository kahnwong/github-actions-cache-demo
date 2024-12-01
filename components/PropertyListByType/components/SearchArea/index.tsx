import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { IJobFilter } from 'interfaces/Job'
import { IPropertyListById } from 'interfaces/JobPropertyTypeList'
import { DEFAULT_PAGINATION } from 'config/constant'
import { Wrapper } from './style'
import SearchAreaMobile from '../SearchAreaMobile'
import SearchAreaDesktop from '../SearchAreaDesktop'
import { SORT_KEYS } from '../../constants'

interface INewPropertyListById extends IPropertyListById {
  locale?: string | undefined
}

const SearchArea: FC<INewPropertyListById> = ({ jobTypeId, locale }) => {
  const { push, query } = useRouter()
  const [jobFilter, setJobFilter] = useState<IJobFilter>({})

  const prepareObjSort = (obj: object) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (SORT_KEYS.includes(key)) {
        return acc
      }
      // @ts-ignore
      acc[key] = value
      return acc
    }, {})

  const onClearData = () => {
    setJobFilter({})
    prepareObjSort({})
    let orderBy = {}
    if (query?.startingPrice) {
      orderBy =
        query?.startingPrice === 'asc'
          ? { startingPrice: 'asc' }
          : { startingPrice: 'desc' }
    } else if (query?.shareFee) {
      orderBy =
        query?.shareFee === 'asc' ? { shareFee: 'asc' } : { shareFee: 'desc' }
    } else if (query?.updatedDate) {
      orderBy =
        query?.updatedDate === 'asc'
          ? { updatedDate: 'asc' }
          : { updatedDate: 'desc' }
    }
    const slug = query?.slug ? { slug: query?.slug } : {}
    const queryObj = {
      ...slug,
      ...DEFAULT_PAGINATION,
      ...orderBy
    }

    push({
      query: { ...queryObj }
    })
  }

  const handleSubmitFilter = () => {
    let sortBy = {}
    if (query.startingPrice) {
      sortBy = { startingPrice: query.startingPrice }
    } else if (query.createdDate) {
      sortBy = { createdDate: query.createdDate }
    } else if (query.updatedDate) {
      sortBy = { updatedDate: query.updatedDate }
    } else if (query.shareFee) {
      sortBy = { shareFee: query.shareFee }
    }
    const searchPropertyType = jobFilter?.propertyType
      ? { propertyTypeId: jobFilter?.propertyType.id }
      : null
    const searchProjectZone = {
      zoneId: jobFilter?.zoneId !== -1 ? jobFilter?.zoneId : null
    }

    delete jobFilter?.propertyType
    delete jobFilter?.projectZone

    const clearEmptyValue = Object.entries({
      ...jobFilter,
      ...searchPropertyType,
      ...searchProjectZone
    }).reduce((acc, [key, value]) => {
      if (value && !['priceName'].includes(key)) {
        // @ts-ignore
        acc[key] = value
      }

      return acc
    }, {})

    const queryObj = {
      ...DEFAULT_PAGINATION,
      ...clearEmptyValue,
      ...sortBy,
      skip: 0
    }

    push({
      query: { ...queryObj }
    })
  }

  const onSetFilter = (data: IJobFilter) => {
    setJobFilter(data)
  }

  useEffect(() => {
    setJobFilter({
      ...query,
      propertyTypeId: Number(query?.propertyTypeId),
      developerId: Number(query?.developerId),
      zoneId: Number(query?.zoneId),
      provinceId: Number(query?.provinceId),
      districtId: Number(query?.districtId),
      subdistrictId: Number(query?.subdistrictId)
    })
  }, [query])

  return (
    <Wrapper>
      <Container>
        <div className='col-12 mt-2  pb-3 justify-content-between d-flex flex-main-row d-none d-main-flex'>
          <SearchAreaDesktop
            jobTypeId={jobTypeId || null}
            onSubmitFilter={handleSubmitFilter}
            onClearData={onClearData}
            onSetFilter={onSetFilter}
            filterSearch={{
              projectName: jobFilter?.projectName || '',
              propertyTypeId: jobFilter?.propertyTypeId || null,
              minPrice: jobFilter?.minPrice || '',
              maxPrice: jobFilter?.maxPrice || '',
              provinceId: jobFilter?.provinceId || null,
              districtId: jobFilter?.districtId || null,
              subdistrictId: jobFilter?.subdistrictId || null,
              developerId: jobFilter?.developerId || null,
              projectZone: jobFilter?.projectZone || '',
              zoneId: jobFilter?.zoneId || null
            }}
            locale={locale}
          />
        </div>
        <div className='col-12 px-2 mt-2  pb-3 justify-content-between d-flex flex-main-row d-main-none'>
          <SearchAreaMobile
            jobTypeId={jobTypeId}
            onSubmitFilter={handleSubmitFilter}
            onSetFilter={onSetFilter}
            onClearData={onClearData}
            filterSearch={{
              projectName: jobFilter?.projectName || '',
              propertyTypeId: jobFilter?.propertyTypeId || null,
              minPrice: jobFilter?.minPrice || '',
              maxPrice: jobFilter?.maxPrice || '',
              provinceId: jobFilter?.provinceId || null,
              districtId: jobFilter?.districtId || null,
              subdistrictId: jobFilter?.subdistrictId || null,
              developerId: jobFilter?.developerId || null,
              projectZone: jobFilter?.projectZone || '',
              zoneId: jobFilter?.zoneId || null
            }}
            locale={locale}
          />
        </div>
      </Container>
    </Wrapper>
  )
}
SearchArea.defaultProps = {
  jobTypeId: null,
  locale: ''
}

SearchArea.propTypes = {
  jobTypeId: PropTypes.number,
  locale: PropTypes.string
}

export default SearchArea
