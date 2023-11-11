import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getPropertyType } from 'services/job'
import FilterItem from '../FilterItem'
import DropdownContainer from '../DropdownContainer'
import { getLngFlex } from '../../../../utils/getLng'
import { useUser } from '../../../../contexts/userContext'

interface IPropertyTypeOption {
  id?: number | null
  nameTh?: string
  nameEn?: string
  nameCn?: string
}

interface IFilterList {
  propertyTypeId?: number | null
  onSubmitFilter: Function
  locale: string | undefined
}

const FilterList: FC<IFilterList> = ({
  propertyTypeId,
  onSubmitFilter,
  locale
}) => {
  const { t } = useTranslation()
  const { isOpen, onToggle } = useDisclosure(false)
  const [filters, setFilters] = useState({ propertyTypeId })
  const [allPropertyType, setAllPropertyType] = useState<IPropertyTypeOption[]>(
    []
  )
  const { data: itemsPropertyType } = useQuery(['property_type'], () =>
    getPropertyType()
  )

  const {
    state: { language }
  } = useUser()

  const tFilterProperty = getLngFlex(
    { ...allPropertyType.find((item) => item.id === filters?.propertyTypeId) },
    language.toUpperCase(),
    true
  )

  const haveFilter = propertyTypeId

  const handleSubmit = () => {
    onSubmitFilter(filters)
    // onClose()
  }

  const handleSetFilters = (filter: object) => {
    setFilters((previousFilter) => ({ ...previousFilter, ...filter }))
  }

  // const handleClearFilters = () => {
  //   setFilters({ propertyType: '' })
  // }

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

  useEffect(() => {
    handleSubmit()
  }, [filters])

  useEffect(() => {
    setFilters({ propertyTypeId })
  }, [propertyTypeId])

  useEffect(() => {
    // if close dropdown but not hit submit then set filter to previous value
    if (!isOpen && filters.propertyTypeId !== propertyTypeId) {
      setFilters({ propertyTypeId })
    }
  }, [isOpen, propertyTypeId])

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      textList={tFilterProperty('name')}
      defaultText={t('propertyType.searchArea.projectTypePlaceholder')}
    >
      <Container className='px-3 py-2'>
        <div className='display-12 mb-2 px-1'>
          {t('propertyType.searchArea.projectHeaderTitle')}
        </div>
        <Row xs={2} className='m-0'>
          {allPropertyType?.map((property) => {
            const tPropertyName = getLngFlex(
              { ...property },
              language.toUpperCase(),
              true
            )
            return (
              <Col
                key={property?.id}
                className='mb-2 px-1'
                onClick={() =>
                  handleSetFilters({ propertyTypeId: property.id })
                }
              >
                <FilterItem
                  title={tPropertyName('name')}
                  isActive={filters?.propertyTypeId === property.id}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </DropdownContainer>
  )
}

FilterList.defaultProps = {
  propertyTypeId: null,
  locale: ''
}
FilterList.propTypes = {
  onSubmitFilter: PropTypes.func.isRequired,
  locale: PropTypes.string
}
export default FilterList
