import { FC, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { getLngArr } from 'utils/getLng'
import { SORTS } from 'components/PropertyListByFavorite/constants'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import FilterItem from '../FilterItem'
import DropdownContainer from '../DropdownContainer'

interface ISortList {
  unitLocalSalePrice?: string
  createdDate?: string
  onHandleSort: Function
  locale: string | undefined
}
const SortList: FC<ISortList> = ({
  unitLocalSalePrice,
  createdDate,
  onHandleSort,
  locale
}) => {
  const { t } = useTranslation()
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [label, setLabel] = useState('')
  const tSortBy = SORTS && getLngArr(SORTS, locale?.toUpperCase() || 'TH')

  useEffect(() => {
    const handleLabel = () => {
      if (unitLocalSalePrice) {
        setLabel(
          unitLocalSalePrice === 'asc'
            ? t('global.sort.startingPriceAsc')
            : t('global.sort.startingPriceDesc')
        )
      } else {
        setLabel(t('global.sort.createdDateDesc'))
      }
    }
    handleLabel()
  }, [unitLocalSalePrice, createdDate])

  const handleSubmit = (sortObj: object) => {
    onHandleSort(sortObj)
    onClose()
  }

  const handleActive = (key: string, value: string): boolean => {
    if (
      unitLocalSalePrice &&
      key === 'unitLocalSalePrice' &&
      value === unitLocalSalePrice
    ) {
      return true
    }
    return key === 'createdDate' && !unitLocalSalePrice
  }

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter
      textList={[label]}
      isSort
    >
      <Container className='px-3 py-2'>
        <div className='display-12 mb-2 px-1'>{t('global.sort.by')}</div>
        <Row xs={1} className='m-0'>
          {SORTS.map(({ value, key }, index) => {
            const isActive = handleActive(key, value)
            return (
              <Col
                className='mb-2 px-1'
                key={`col-${index.toString()}`}
                onClick={() => handleSubmit({ [key]: value })}
                style={{ width: '250px' }}
              >
                <FilterItem
                  title={tSortBy('title', index)}
                  isActive={isActive}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </DropdownContainer>
  )
}

SortList.defaultProps = {
  unitLocalSalePrice: '',
  createdDate: '',
  locale: ''
}

SortList.propTypes = {
  unitLocalSalePrice: PropTypes.string,
  createdDate: PropTypes.string,
  onHandleSort: PropTypes.func.isRequired,
  locale: PropTypes.string
}

export default SortList
