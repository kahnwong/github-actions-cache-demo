import { FC, useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getPropertyType } from 'services/job'
import FilterItem from '../FilterItem'
import DropdownListContainer from '../DropdownListContainer'
import { getLngFlex } from '../../../../utils/getLng'

interface IPropertyTypeOption {
  id?: string | number | null
  nameTh?: string
  nameEn?: string
  nameCn?: string
}
interface IFilterList {
  placeholder?: string
  titleText?: string
  propertyTypeId?: number | null
  sizeWidth?: string
  setFilterSelect: Function
  locale?: string | undefined
}

const DropdownButtonList: FC<IFilterList> = ({
  placeholder,
  titleText,
  propertyTypeId,
  sizeWidth,
  setFilterSelect,
  locale
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [filters, setFilters] = useState({ propertyTypeId })
  const haveFilter = propertyTypeId
  const [allPropertyType, setAllPropertyType] = useState<IPropertyTypeOption[]>(
    []
  )
  const { data: itemsPropertyType } = useQuery(['property_type'], () =>
    getPropertyType()
  )

  const tFilterProperty = getLngFlex(
    { ...allPropertyType.find((item) => item.id === filters?.propertyTypeId) },
    locale?.toUpperCase(),
    true
  )

  const setDataValue = (property: IPropertyTypeOption) => {
    setFilterSelect({ propertyTypeId: property.id })

    onClose()
  }

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
    // if close dropdown but not hit submit then set filter to previous value
    if (!isOpen && filters.propertyTypeId !== propertyTypeId) {
      setFilters({ propertyTypeId })
    }
  }, [isOpen, propertyTypeId])

  useEffect(() => {
    if (filters.propertyTypeId !== propertyTypeId) {
      setFilters({ propertyTypeId })
    }
  }, [propertyTypeId])

  return (
    <DropdownListContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      textList={[tFilterProperty('name') ? tFilterProperty('name') : '']}
      placeholder={placeholder}
      sizeWidth={sizeWidth}
    >
      <Container className='px-3 py-2'>
        <div className='display-12 mb-2  px-1'>{titleText}</div>
        <Row xs={2} className='m-0'>
          {allPropertyType?.map((property) => {
            const tPropertyName = getLngFlex(
              { ...property },
              locale?.toUpperCase(),
              true
            )
            return (
              <Col
                key={property?.id}
                className='mb-2 px-1'
                onClick={() => setDataValue(property)}
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
    </DropdownListContainer>
  )
}

DropdownButtonList.defaultProps = {
  placeholder: '',
  titleText: '',
  propertyTypeId: null,
  sizeWidth: '',
  locale: ''
}
DropdownButtonList.propTypes = {
  placeholder: PropTypes.string,
  titleText: PropTypes.string,
  sizeWidth: PropTypes.string,
  setFilterSelect: PropTypes.func.isRequired,
  locale: PropTypes.string
}
export default DropdownButtonList
