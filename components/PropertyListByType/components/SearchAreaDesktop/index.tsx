import { FC, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { IPropertyListById } from 'interfaces/JobPropertyTypeList'
import SearchProject from '../SearchProject'
import { Wrapper, WrapperButton, WrapperLink } from './style'
import DropdownButtonList from '../DropdownButtonList'
import DropdownPriceList from '../DropdownPriceList'
import DropdownZoneList from '../DropdownZoneList'
import DropdownLocationList from '../DropdownLocationList'

interface IObjectKeys {
  [key: string]: string | number | null | undefined
}
interface IFilter extends IObjectKeys {
  totalSelectFilter?: string
  projectName?: string
  propertyTypeId?: number | null
  minPrice?: string
  maxPrice?: string
  provinceId?: number | null
  districtId?: number | null
  subdistrictId?: number | null
  developerId?: number | null
  zoneId?: number | null
}
interface IFilterList extends IPropertyListById {
  onSubmitFilter: Function
  filterSearch?: IFilter
  onClearData: () => void
  onSetFilter: Function
  locale?: string | undefined
}
const SearchAreaDesktop: FC<IFilterList> = ({
  jobTypeId,
  onSubmitFilter,
  filterSearch,
  onClearData,
  onSetFilter,
  locale
}) => {
  const { t } = useTranslation()
  const [priceObjData, setPriceObjData] = useState({
    priceName: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleSubmitFilters = () => {
    onSubmitFilter()
  }

  const clearObjValue = () => {
    onClearData()
  }

  const handleSubmitFilter = useCallback(
    (filters) => {
      onSetFilter((previousQueryStack: any) => ({
        ...previousQueryStack,
        ...filters
      }))
    },
    [filterSearch]
  )

  const countFilterLocation = () => {
    const prov = filterSearch?.provinceId ? 1 : 0
    const dist = filterSearch?.districtId ? 1 : 0
    const subDist = filterSearch?.subdistrictId ? 1 : 0
    const develop = filterSearch?.developerId ? 1 : 0
    return prov + dist + subDist + develop
  }

  useEffect(() => {
    const isPriceMinMax = {
      priceName: '',
      minPrice: filterSearch?.minPrice ? filterSearch?.minPrice : '',
      maxPrice: filterSearch?.maxPrice ? filterSearch?.maxPrice : ''
    }
    setPriceObjData(isPriceMinMax)
  }, [filterSearch?.minPrice, filterSearch?.maxPrice])

  useEffect(() => {}, [locale])
  return (
    <Wrapper>
      <div className='col-12 mt-2  pb-3 justify-content-between d-flex flex-main-row'>
        <Row className='mt-2 px-0 col-sm-12'>
          <Col className='py-1 ps-3 col-12 col-sm-3'>
            <SearchProject
              placeholder={t('propertyType.searchArea.projectPlaceholder')}
              jobTypeId={jobTypeId || null}
              projectName={filterSearch?.projectName}
              setFilterSelect={handleSubmitFilter}
            />
          </Col>
          <Col className='px-1 py-1'>
            <DropdownButtonList
              placeholder={t('propertyType.searchArea.projectTypePlaceholder')}
              titleText={t('propertyType.searchArea.projectHeaderTitle')}
              propertyTypeId={filterSearch?.propertyTypeId}
              setFilterSelect={handleSubmitFilter}
              sizeWidth='150px'
              locale={locale}
            />
          </Col>
          <Col className='px-1 py-1'>
            <DropdownZoneList
              placeholder={t('propertyType.searchArea.zonePlaceholder')}
              titleText={t('propertyType.searchArea.zoneHeaderTitle')}
              zoneId={filterSearch?.zoneId}
              setFilterSelect={handleSubmitFilter}
              sizeWidth='120px'
              locale={locale}
            />
          </Col>
          <Col className='px-1 py-1'>
            <DropdownPriceList
              placeholder={t('propertyType.searchArea.pricePleaceholder')}
              titleText={t('propertyType.searchArea.pricePleaceholder')}
              priceMinMax={priceObjData}
              setFilterSelect={handleSubmitFilter}
              sizeWidth='100px'
              locale={locale}
            />
          </Col>
          <Col className='px-1 py-1'>
            <DropdownLocationList
              placeholder={t(
                'propertyType.searchArea.locationFilterPlaceholder'
              )}
              titleText=''
              totalSelectedFilter={countFilterLocation()}
              locateFilterAll={{
                provinceId: filterSearch?.provinceId,
                districtId: filterSearch?.districtId,
                subdistrictId: filterSearch?.subdistrictId,
                developerId: filterSearch?.developerId
              }}
              onSubmitFilter={handleSubmitFilter}
              notShowSectionTitle
              locale={locale}
            />
          </Col>
          <Col className='px-1 py-1 align-self-center'>
            <WrapperButton
              size='sm'
              className='w-100 py-2'
              onClick={handleSubmitFilters}
            >
              {t('global.button.search')}
            </WrapperButton>
          </Col>
          <Col className='ps-0 pe-0 py-1 align-self-center'>
            <WrapperLink
              role='button'
              variant='link'
              size='sm'
              onClick={clearObjValue}
            >
              {t('global.button.clearData')}
            </WrapperLink>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

SearchAreaDesktop.defaultProps = {
  jobTypeId: null,
  filterSearch: {
    projectName: '',
    propertyTypeId: null,
    minPrice: '',
    maxPrice: '',
    provinceId: null,
    districtId: null,
    subdistrictId: null,
    developerId: null
  },
  locale: ''
}
SearchAreaDesktop.propTypes = {
  jobTypeId: PropTypes.number,
  onSubmitFilter: PropTypes.func.isRequired,
  filterSearch: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    propertyTypeId: PropTypes.number,
    minPrice: PropTypes.string.isRequired,
    maxPrice: PropTypes.string.isRequired,
    provinceId: PropTypes.number,
    districtId: PropTypes.number,
    subdistrictId: PropTypes.number,
    developerId: PropTypes.number,
    zoneId: PropTypes.number
  }),
  onSetFilter: PropTypes.func.isRequired,
  locale: PropTypes.string
}

export default SearchAreaDesktop
