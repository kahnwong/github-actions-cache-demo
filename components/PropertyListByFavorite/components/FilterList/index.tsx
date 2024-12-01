import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container, Button } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import FilterItem from 'components/PropertyListByFavorite/components/FilterItem'
import DropdownContainer from 'components/PropertyListByFavorite/components/DropdownContainer'
import { useQuery } from 'react-query'
import { getLngFlex } from '../../../../utils/getLng'
import { getJobType } from '../../../../services/jobType'
import { getPropertyType } from '../../../../services/job'

interface IFilterList {
  jobTypeId?: number | null
  propertyTypeId?: number | null
  onSubmitFilter: Function
  locale?: string | undefined
}
interface IPropertyTypeOption {
  id?: number | null
  nameTh?: string
  nameEn?: string
  nameCn?: string
}

interface IJobTypeTypeOption {
  id?: number | null
  menuTH?: string
  menuEN?: string
  menuCN?: string
}
const FilterList: FC<IFilterList> = ({
  jobTypeId,
  propertyTypeId,
  onSubmitFilter,
  locale
}) => {
  const { t } = useTranslation()
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  // const [filters, setFilters] = useState({ jobType, propertyType })
  const [filters, setFilters] = useState({ jobTypeId, propertyTypeId })
  const [allPropertyType, setAllPropertyType] = useState<IPropertyTypeOption[]>(
    []
  )

  const [allJobType, setAllJobType] = useState<IJobTypeTypeOption[]>([])

  const { data: itemsPropertyType } = useQuery(['property_type'], () =>
    getPropertyType()
  )

  const tFilterProperty = getLngFlex(
    { ...allPropertyType.find((item) => item.id === filters?.propertyTypeId) },
    locale?.toUpperCase(),
    true
  )

  useEffect(() => {
    const optionsPropertyType =
      (itemsPropertyType?.data?.payload as unknown as IPropertyTypeOption[]) ||
      []

    setAllPropertyType([
      {
        id: null,
        nameTh: 'ทั้งหมด',
        nameEn: 'All',
        nameCn: 'All'
      },
      ...optionsPropertyType
    ])
  }, [itemsPropertyType, locale])

  const handleSubmit = () => {
    onSubmitFilter(filters)
    onClose()
  }

  const { data: dataJobType } = useQuery([], () => getJobType(), {})

  useEffect(() => {
    const optionsJobType =
      (dataJobType?.data?.payload as unknown as IJobTypeTypeOption[]) || []

    setAllJobType([
      {
        id: null,
        menuTH: 'ทั้งหมด',
        menuEN: 'All',
        menuCN: 'All'
      },
      ...optionsJobType
    ])
  }, [dataJobType, locale])

  const tFilterJob = getLngFlex(
    { ...allJobType.find((item) => item.id === filters?.jobTypeId) },
    locale?.toUpperCase()
  )

  const handleSetFilters = (fillter: object) => {
    setFilters((previousFilter) => ({ ...previousFilter, ...fillter }))
  }
  const handleSetPropertyType = (propertyId: number | null) => {
    handleSetFilters({ propertyTypeId: propertyId })
  }

  const handleSetJobType = (jobtypeId: number | null) => {
    handleSetFilters({ jobTypeId: jobtypeId })
  }

  const handleClearFilters = () => {
    setFilters({ jobTypeId: null, propertyTypeId: null })
  }

  useEffect(() => {
    setFilters({ jobTypeId, propertyTypeId })
  }, [jobTypeId, propertyTypeId])

  useEffect(() => {
    // if close dropdown but not hit submit then set filter to previous value
    if (
      !isOpen &&
      (filters.propertyTypeId !== propertyTypeId ||
        filters.jobTypeId !== jobTypeId)
    ) {
      setFilters({ jobTypeId, propertyTypeId })
    }
  }, [isOpen, jobTypeId, propertyTypeId])

  const renderJobType = () =>
    filters.jobTypeId === null ? '' : tFilterJob('menu')

  const renderPropertyType = () =>
    filters.propertyTypeId === null ? '' : tFilterProperty('name')

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!filters.jobTypeId || !!filters.propertyTypeId}
      textList={[renderJobType(), renderPropertyType()]}
    >
      <Container className='px-2 py-2'>
        <div className='display-12 mb-2 px-1'>
          {t('propertyFavorite.filterList.titleType')}
        </div>
        <Row xs={2} className='m-0'>
          {allJobType?.map((jobType) => {
            const tJobTypeName = getLngFlex(
              { ...jobType },
              locale?.toUpperCase()
            )
            return (
              <Col
                key={jobType.id}
                className='mb-2'
                onClick={() => handleSetJobType(jobType?.id!)}
              >
                {jobType.id === null && !filters.jobTypeId ? (
                  <FilterItem title={tJobTypeName('menu')} isActive />
                ) : (
                  <FilterItem
                    title={tJobTypeName('menu')}
                    isActive={filters.jobTypeId === jobType?.id}
                  />
                )}
              </Col>
            )
          })}
        </Row>
        <div className='display-12 mb-2  px-1'>
          {t('propertyFavorite.filterList.titleProperTyType')}
        </div>
        <Row xs={2} className='m-0'>
          {allPropertyType?.map((property) => {
            const tPropertyName = getLngFlex(
              { ...property },
              locale?.toUpperCase(),
              true
            )
            return (
              <Col
                key={property.id}
                className='mb-2'
                onClick={() => handleSetPropertyType(property?.id!)}
              >
                {property.id === null && !filters.propertyTypeId ? (
                  <FilterItem title={tPropertyName('name')} isActive />
                ) : (
                  <FilterItem
                    title={tPropertyName('name')}
                    isActive={filters.propertyTypeId === property?.id}
                  />
                )}
              </Col>
            )
          })}
        </Row>
        <div className='d-flex justify-content-center'>
          <Button
            size='sm'
            onClick={handleClearFilters}
            variant='light'
            className='w-100 me-1 py-2'
          >
            {t('global.button.clear')}
          </Button>
          <Button
            size='sm'
            onClick={handleSubmit}
            variant='primary'
            className='w-100 py-2'
          >
            {t('global.button.ok')}
          </Button>
        </div>
      </Container>
    </DropdownContainer>
  )
}

FilterList.defaultProps = {
  jobTypeId: null,
  propertyTypeId: null,
  locale: ''
}
FilterList.propTypes = {
  jobTypeId: PropTypes.number,
  propertyTypeId: PropTypes.number,
  onSubmitFilter: PropTypes.func.isRequired,
  locale: PropTypes.string
}
export default FilterList
