import { FC, useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { FiChevronDown } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import {
  FilterBox,
  SearchBox,
  SearchButton,
  SearchDesktop,
  SearchMobile,
  SearchMobileBox,
  TextHeader
} from './style'
import FilterType from './components/FilterType'
import { IJobFilter } from '../../interfaces/Job'
import DropdownZoneList from './components/DropdownZoneList'
import SearchProject from './components/SearchProject'
import FilterMore from './components/FilterMore'
import SearchAreaMobileModal from '../PropertyListByType/components/SearchAreaMobileModal'
import { ButtonModal } from '../PropertyListByType/components/SearchAreaMobile/style'
import { useUser } from '../../contexts/userContext'

interface IProps {}

interface IObjectKeys {
  [key: string]: string | number | undefined | null
}
interface IFilterMobile extends IObjectKeys {
  projectName?: string
  propertyTypeId?: number | null
  priceName?: string
  minPrice?: string
  maxPrice?: string
  provinceId?: number | null
  districtId?: number | null
  developerId?: number | null
  locateFilterNo?: string
  zoneId?: number | null
}

const HomeSearch: FC<IProps> = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const {
    state: { language }
  } = useUser()
  const localeLng = language?.toUpperCase() || 'TH'

  const filterAll = {
    projectName: '',
    propertyTypeId: null,
    zoneId: null,
    provinceId: null,
    districtId: null,
    subdistrictId: null,
    developerId: null,
    priceName: '',
    minPrice: '',
    maxPrice: ''
  }
  const [queryStack, setQueryStack] = useState<IJobFilter>({ ...filterAll })
  const [show, setShow] = useState(false)
  // const [totalSelectFilter, setTotalSelectFilter] = useState('')
  const [countLocation, setCountLocation] = useState(0)
  const clearEmptyObjValue = (obj: object) =>
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value) {
        // @ts-ignore
        acc[key] = value
      }
      return acc
    }, {})

  const handleSubmitFilter = useCallback(
    (filters) => {
      setQueryStack((previousQueryStack: IJobFilter) => ({
        ...previousQueryStack,
        ...filters
      }))
    },
    [queryStack]
  )

  const handleSearch = () => {
    const searchProjectZone = {
      zoneId: queryStack?.zoneId !== -1 ? queryStack?.zoneId : null
    }
    delete queryStack?.priceName
    delete queryStack?.projectZone

    push({
      pathname: '/property-search',
      query: clearEmptyObjValue({
        ...queryStack,
        ...searchProjectZone
      })
    })
  }
  const countFilterMobile = () => {
    const newFilter: IFilterMobile = {
      projectName: queryStack?.projectName,
      zoneId: queryStack?.zoneId,
      propertyTypeId: queryStack?.propertyTypeId,
      provinceId: queryStack?.provinceId,
      districtId: queryStack?.districtId,
      subdistrictId: queryStack?.subdistrictId,
      developerId: queryStack?.developerId,
      priceName: queryStack?.priceName,
      minPrice: queryStack?.minPrice,
      maxPrice: queryStack?.maxPrice
    }

    let total = 0
    Object.keys(newFilter)?.forEach((key) => {
      if (
        newFilter[key] &&
        newFilter[key] !== undefined &&
        key !== 'projectName' &&
        key !== 'priceName'
      ) {
        total += 1
      }
    })
    if (newFilter?.minPrice && newFilter?.maxPrice) {
      total -= 1
    }
    return total
  }
  useEffect(() => {
    const newFilter: IFilterMobile = {
      provinceId: queryStack?.provinceId,
      districtId: queryStack?.districtId,
      subdistrictId: queryStack?.subdistrictId,
      developerId: queryStack?.developerId,
      minPrice: queryStack?.minPrice,
      maxPrice: queryStack?.maxPrice
    }
    let total = 0
    Object.keys(newFilter)?.forEach((key) => {
      if (
        newFilter[key] &&
        newFilter[key] !== undefined &&
        key !== 'projectName' &&
        key !== 'priceName'
      ) {
        total += 1
      }
    })
    if (newFilter?.minPrice && newFilter?.maxPrice) {
      total -= 1
    }
    setCountLocation(total)
  }, [
    queryStack?.minPrice,
    queryStack?.maxPrice,
    queryStack?.provinceId,
    queryStack?.districtId,
    queryStack?.subdistrictId,
    queryStack?.developerId,
    queryStack?.zoneId
  ])

  return (
    <>
      <SearchDesktop>
        <SearchBox>
          <TextHeader>{t('homePage.homeSearch.headTitle')}</TextHeader>
          <Col xs={12} className='mt-3'>
            <SearchProject
              placeholder={t('propertyType.searchArea.projectPlaceholder')}
              projectName={queryStack?.projectName || ''}
              onSearch={handleSearch}
              onSubmitFilter={handleSubmitFilter}
            />
          </Col>
          <Col xs={12}>
            <FilterBox>
              <Col
                xs={4}
                className='text-white align-items-center d-flex justify-content-center'
              >
                <FilterType
                  propertyTypeId={queryStack?.propertyTypeId}
                  onSubmitFilter={handleSubmitFilter}
                  locale={localeLng}
                />
              </Col>
              |
              <Col
                xs={4}
                className='text-white align-items-center d-flex justify-content-center'
              >
                <DropdownZoneList
                  titleText={t('propertyType.searchArea.zoneHeaderTitle')}
                  projectZone={queryStack?.projectZone}
                  onSubmitFilter={handleSubmitFilter}
                  locale={localeLng}
                />
              </Col>
              |
              <Col
                xs={4}
                className='text-white align-items-center d-flex justify-content-center'
              >
                <FilterMore
                  totalLocateLength={countLocation}
                  filterAll={queryStack}
                  onSubmitFilter={handleSubmitFilter}
                  locale={localeLng}
                />
              </Col>
            </FilterBox>
          </Col>
        </SearchBox>
      </SearchDesktop>
      <SearchMobile>
        <Container className='mt-4'>
          <SearchMobileBox>
            <Row className='px-xs-1 px-sm-3'>
              <TextHeader>{t('homePage.homeSearch.headTitle')}</TextHeader>
              <Col xs={12} className='my-2'>
                <SearchProject
                  placeholder={t('propertyType.searchArea.projectPlaceholder')}
                  projectName={queryStack?.projectName || ''}
                  onSearch={handleSearch}
                  onSubmitFilter={handleSubmitFilter}
                />
              </Col>
              <Col xs={6} className='pe-1'>
                <ButtonModal key={0} onClick={() => setShow(true)}>
                  {t('propertyType.searchArea.locationFilterPlaceholder')}
                  <div className='text-right'>
                    <span className='fs-14 text-secondary fw-bold'>
                      {countFilterMobile() > 0
                        ? `(${countFilterMobile()})`
                        : ''}
                    </span>

                    <FiChevronDown />
                  </div>
                </ButtonModal>
              </Col>
              <Col xs={6} className='ps-1'>
                <SearchButton onClick={handleSearch}>
                  {t('global.button.search')}
                </SearchButton>
              </Col>
            </Row>
          </SearchMobileBox>
        </Container>
      </SearchMobile>
      <SearchAreaMobileModal
        isShow={show}
        setShow={setShow}
        onSubmitFilter={handleSubmitFilter}
        // setTotalSelectFilter={setTotalSelectFilter}
        // isMobile
        filterSearch={{
          propertyTypeId: queryStack?.propertyTypeId,
          minPrice: queryStack?.minPrice,
          maxPrice: queryStack?.maxPrice,
          provinceId: queryStack?.provinceId,
          districtId: queryStack?.districtId,
          subdistrictId: queryStack?.subdistrictId,
          developerId: queryStack?.developerId,
          projectZone: queryStack?.projectZone,
          zoneId: queryStack?.zoneId
        }}
        locale={localeLng}
      />
    </>
  )
}

HomeSearch.propTypes = {}

export default HomeSearch
