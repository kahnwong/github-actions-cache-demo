import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container, Button } from 'react-bootstrap'
import {
  LOCATIONS,
  PROPERTY_TYPES
} from 'components/PropertyListByType/constants'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import FilterItem from '../FilterItem'
import DropdownContainer from '../DropdownContainer'

interface IFilterList {
  provinceName?: string
  propertyType?: string
  onSubmitFilter: Function
}

const FilterList: FC<IFilterList> = ({
  provinceName,
  propertyType,
  onSubmitFilter
}) => {
  const { t } = useTranslation()
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [filters, setFilters] = useState({ provinceName, propertyType })

  const haveFilter = provinceName || propertyType

  const handleSubmit = () => {
    onSubmitFilter(filters)
    onClose()
  }

  const handleSetFilters = (fillter: object) => {
    setFilters((previousFilter) => ({ ...previousFilter, ...fillter }))
  }

  const handleClearFilters = () => {
    setFilters({ provinceName: '', propertyType: '' })
  }

  useEffect(() => {
    setFilters({ provinceName, propertyType })
  }, [provinceName, propertyType])

  useEffect(() => {
    // if close dropdown but not hit submit then set filter to previous value
    if (
      !isOpen &&
      (filters.propertyType !== propertyType ||
        filters.provinceName !== provinceName)
    ) {
      setFilters({ provinceName, propertyType })
    }
  }, [isOpen, provinceName, propertyType])

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      textList={[provinceName, propertyType]}
    >
      <Container className='px-3 py-2'>
        <div className='display-12 mb-2 px-1'>
          {t('propertyType.filterList.area')}
        </div>
        <Row xs={2} className='m-0'>
          {LOCATIONS.map(({ value, title }) => (
            <Col
              className='mb-2 px-1'
              key={value}
              onClick={() => handleSetFilters({ provinceName: value })}
            >
              <FilterItem
                title={title}
                isActive={filters.provinceName === value}
              />
            </Col>
          ))}
        </Row>
        <div className='display-12 mb-2  px-1'>
          {t('propertyType.filterList.type')}
        </div>
        <Row xs={2} className='m-0'>
          {PROPERTY_TYPES.map(({ value, title }) => (
            <Col
              key={title}
              className='mb-2 px-1'
              onClick={() => handleSetFilters({ propertyType: value })}
            >
              <FilterItem
                title={title}
                isActive={filters.propertyType === value}
              />
            </Col>
          ))}
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
  provinceName: '',
  propertyType: ''
}
FilterList.propTypes = {
  provinceName: PropTypes.string,
  propertyType: PropTypes.string,
  onSubmitFilter: PropTypes.func.isRequired
}
export default FilterList
