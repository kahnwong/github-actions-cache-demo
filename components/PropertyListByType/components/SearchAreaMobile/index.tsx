import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { IPropertyListById } from 'interfaces/JobPropertyTypeList'
import { FiChevronDown } from 'react-icons/fi'
import SearchProject from '../SearchProject'
import { ButtonModal, Wrapper, WrapperButton } from './style'
import SearchAreaMobileModal from '../SearchAreaMobileModal'
import { WrapperLink } from '../SearchAreaDesktop/style'

interface IObjectKeys {
  [key: string]: string | number | undefined | null
}
interface IFilter extends IObjectKeys {
  projectName?: string
  propertyTypeId?: number | null
  priceName?: string
  minPrice?: string
  maxPrice?: string
  provinceId?: number | null
  districtId?: number | null
  subdistrictId?: number | null
  developerId?: number | null
  locateFilterNo?: string
  projectZone?: string
  zoneId?: number | null
}
interface IFilterList extends IPropertyListById {
  onSubmitFilter: Function
  filterSearch?: IFilter
  onClearData: () => void
  onSetFilter: Function
  locale?: string | undefined
}
const SearchAreaMobile: FC<IFilterList> = ({
  jobTypeId,
  onSubmitFilter,
  filterSearch,
  onClearData,
  onSetFilter,
  locale
}) => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  const clearObjValue = () => {
    setShow(false)
    onClearData()
  }

  const handleSubmitFilters = () => {
    onSubmitFilter()
  }

  const handleSubmitFilterModal = (filters: object) => {
    onSetFilter((previousFilter: IFilter) => ({
      ...previousFilter,
      ...filters
    }))
  }

  const countFilterMobile = () => {
    const newFilter = { ...filterSearch }
    let total = 0
    Object.keys(newFilter)?.forEach((key) => {
      if (
        newFilter[key] &&
        newFilter[key] !== undefined &&
        !['projectName', 'projectZone'].includes(key)
      ) {
        total += 1
      }
    })
    if (newFilter?.minPrice && newFilter?.maxPrice) {
      total -= 1
    }
    return total
  }

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setShow(false)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <Wrapper>
      <div className='col-12 mt-2  pb-3 justify-content-between d-flex flex-main-row '>
        <Row className='mt-2 px-0 col-sm-12'>
          <Col className='py-1 px-1 col-12'>
            <SearchProject
              placeholder={t('propertyType.searchArea.projectPlaceholder')}
              jobTypeId={jobTypeId || null}
              projectName={filterSearch?.projectName}
              setFilterSelect={handleSubmitFilterModal}
            />
          </Col>
          <Col className='px-1 py-1  col-6'>
            <ButtonModal
              key={0}
              className='me-2 mb-2'
              onClick={() => setShow(true)}
            >
              {t('propertyType.searchArea.locationFilterPlaceholder')}
              <div className='text-right'>
                <span className='fs-14 text-secondary fw-bold'>
                  {countFilterMobile() > 0 ? `(${countFilterMobile()})` : ''}
                </span>

                <FiChevronDown />
              </div>
            </ButtonModal>
          </Col>
          <Col className='px-1 py-1 col-6'>
            <div className='col-12'>
              <WrapperButton
                size='sm'
                className='w-100 py-2'
                onClick={handleSubmitFilters}
              >
                {t('global.button.search')}
              </WrapperButton>
            </div>
            <div className='col-12'>
              <Col className='px-1 pt-3 d-flex justify-content-center'>
                <WrapperLink
                  role='button'
                  variant='link'
                  size='sm'
                  onClick={clearObjValue}
                >
                  {t('global.button.submit')}
                </WrapperLink>
              </Col>
            </div>
          </Col>
        </Row>
      </div>
      <SearchAreaMobileModal
        isShow={show}
        setShow={setShow}
        onSubmitFilter={handleSubmitFilterModal}
        filterSearch={{
          propertyTypeId: filterSearch?.propertyTypeId,
          minPrice: filterSearch?.minPrice,
          maxPrice: filterSearch?.maxPrice,
          provinceId: filterSearch?.provinceId,
          districtId: filterSearch?.districtId,
          subdistrictId: filterSearch?.subdistrictId,
          developerId: filterSearch?.developerId,
          projectZone: filterSearch?.projectZone,
          zoneId: filterSearch?.zoneId
        }}
        locale={locale}
      />
    </Wrapper>
  )
}

SearchAreaMobile.defaultProps = {
  jobTypeId: null,
  filterSearch: undefined,
  locale: ''
}
SearchAreaMobile.propTypes = {
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
    projectZone: PropTypes.string.isRequired,
    zoneId: PropTypes.number
  }),
  onSetFilter: PropTypes.func.isRequired,
  locale: PropTypes.string
}

export default SearchAreaMobile
