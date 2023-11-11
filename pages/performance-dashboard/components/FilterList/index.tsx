import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Row, Col, Container, Button } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import { useUser } from 'contexts/userContext'

import { YEARS, MONTHS, MONTHS_EN, MONTHS_CN } from '../../constants'
import FilterItem from '../FilterItem'
import DropdownContainer from '../DropdownContainer'

interface IFilterList {
  year?: number
  month?: number
  onSubmitFilter: Function
}

const FilterList: FC<IFilterList> = ({ year, month, onSubmitFilter }) => {
  const { t } = useTranslation()
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [filters, setFilters] = useState({ year, month })

  const haveFilter = year || month

  const {
    state: { language }
  } = useUser()
  const handleSubmit = () => {
    onSubmitFilter(filters)
    onClose()
  }

  const handleSetFilters = (filter: object) => {
    setFilters((previousFilter) => ({ ...previousFilter, ...filter }))
  }

  const handleClearFilters = () => {
    setFilters({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    })
  }

  const getMonthList = () => {
    switch (language) {
      case 'th':
        return MONTHS
      case 'en':
        return MONTHS_EN
      case 'cn':
        return MONTHS_CN
      default:
        return MONTHS
    }
  }

  useEffect(() => {
    // if close dropdown but not hit submit then set filter to previous value
    if (!isOpen && (filters.month !== month || filters.year !== year)) {
      setFilters({ year, month })
    }
  }, [isOpen, year, month])

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      textList={[year, month]}
    >
      <Container className='px-2 py-2'>
        <div className='display-9 mb-2 px-1'>{t('global.year')}</div>
        <Row xs={2} className='m-0'>
          {YEARS.map(({ value, title }) => (
            <Col
              className='mb-2 px-1'
              key={value}
              onClick={() => handleSetFilters({ year: value })}
            >
              <FilterItem title={title} isActive={filters.year === value} />
            </Col>
          ))}
        </Row>
        <div className='display-9 mb-2  px-1'>{t('global.month')}</div>
        <Row xs={3} className='m-0'>
          {getMonthList().map(({ value, title }) => (
            <Col
              key={title}
              className='text-center mb-2 px-1 '
              onClick={() => handleSetFilters({ month: value })}
            >
              <FilterItem title={title} isActive={filters.month === value} />
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
  year: new Date().getFullYear(),
  month: new Date().getMonth()
}
FilterList.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  onSubmitFilter: PropTypes.func.isRequired
}
export default FilterList
