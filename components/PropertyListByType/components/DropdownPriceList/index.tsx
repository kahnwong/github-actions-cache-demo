import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import { formatPriceToUnit, blockCharNotNumber } from 'utils/formatPriceToUnit'
import { getLngArr } from 'utils/getLng'
import { SORT_PRICE } from 'components/PropertyListByType/constants'
import DropdownListContainer from '../DropdownListContainer'

interface IInputPrice {
  priceName?: string
  minPrice?: string
  maxPrice?: string
}

interface IFilterList {
  placeholder?: string
  titleText?: string
  priceMinMax: IInputPrice
  sizeWidth?: string
  setFilterSelect: Function
  locale?: string | undefined
}

const DropdownPriceList: FC<IFilterList> = ({
  placeholder,
  titleText,
  priceMinMax,
  sizeWidth,
  setFilterSelect,
  locale
}) => {
  const { t } = useTranslation()
  const localeLng = locale?.toUpperCase() || 'TH'
  const tSortPrice = SORT_PRICE && getLngArr(SORT_PRICE, localeLng)

  const { isOpen, onToggle, onClose } = useDisclosure()
  const [priceValueMin, setPriceValueMin] = useState('')
  const [priceValueMax, setPriceValueMax] = useState('')
  const [selectPrice, setSelectPrice] = useState({
    priceName: '',
    minPrice: '',
    maxPrice: ''
  })
  const [haveFilter, setHaveFilter] = useState('')
  const [priceInputMinValid, setPriceInputMinValid] = useState('')
  const [priceInputMaxValid, setPriceInputMaxValid] = useState('')
  const resetPrice = { priceName: '', minPrice: '', maxPrice: '' }

  const setDisplayPrice = (minValue: string, maxValue: string) => {
    const min = minValue ? parseInt(minValue, 10) : 0
    const max = maxValue ? parseInt(maxValue, 10) : 0
    const minFormat = formatPriceToUnit(min)
    const maxFormat = formatPriceToUnit(max)
    let allPrice = ''
    if (min > 0 && max > 0) {
      allPrice = `${minFormat}-${maxFormat}`
    } else if (min > 0 && max === 0) {
      allPrice = `${minFormat}`
    } else if (min === 0 && max > 0) {
      allPrice = `${maxFormat}`
    }
    return allPrice
  }

  const closeDropdown = () => {
    onClose()
  }

  const handleSelectedPrice = (value: string, qMin: string, qMax: string) => {
    const min = qMin.toString() ? qMin.toString() : ''
    const max = qMax.toString() ? qMax.toString() : ''
    setSelectPrice({ priceName: value, minPrice: min, maxPrice: max })
    setPriceValueMin('')
    setPriceValueMax('')
    setPriceInputMinValid('')
    setPriceInputMaxValid('')
    setHaveFilter(value)
    setFilterSelect({ priceName: value, minPrice: min, maxPrice: max })
  }
  const handleClearFilters = () => {
    setSelectPrice({ ...resetPrice })
    setPriceValueMin('')
    setPriceValueMax('')
    setHaveFilter('')
    setFilterSelect({ ...resetPrice })
  }

  const handleMinPrice = (event: any) => {
    const valuePrice = event.target.value
    const allPrice = setDisplayPrice(valuePrice, priceValueMax)
    setPriceValueMin(valuePrice)
    setHaveFilter(allPrice)
    setSelectPrice({
      priceName: allPrice,
      minPrice: valuePrice,
      maxPrice: priceValueMax
    })

    setFilterSelect({
      priceName: allPrice,
      minPrice: valuePrice,
      maxPrice: priceValueMax
    })
  }

  const handleMaxPrice = (event: any) => {
    const valuePrice = event.target.value
    const allPrice = setDisplayPrice(priceValueMin, valuePrice)
    setPriceValueMax(valuePrice)
    setHaveFilter(allPrice)
    setSelectPrice({
      priceName: allPrice,
      minPrice: priceValueMin,
      maxPrice: valuePrice
    })

    setFilterSelect({
      priceName: allPrice,
      minPrice: priceValueMin,
      maxPrice: valuePrice
    })
  }

  const checkMax = () => {
    if (+priceValueMin >= +priceValueMax && priceValueMax !== '') {
      setPriceValueMax('')
      setPriceValueMin('')
      setFilterSelect({
        priceName: '',
        minPrice: '',
        maxPrice: ''
      })
    } else {
      const allPrice = setDisplayPrice(priceValueMin, priceValueMax)
      setFilterSelect({
        priceName: allPrice,
        minPrice: priceValueMin,
        maxPrice: priceValueMax
      })
    }
  }

  const checkMin = () => {
    if (+priceValueMin >= +priceValueMax && priceValueMax !== '') {
      const allPrice = setDisplayPrice(priceValueMin, '')
      setPriceValueMax('')
      setFilterSelect({
        priceName: allPrice,
        minPrice: priceValueMin,
        maxPrice: ''
      })
    } else {
      const allPrice = setDisplayPrice(priceValueMin, priceValueMax)
      setFilterSelect({
        priceName: allPrice,
        minPrice: priceValueMin,
        maxPrice: priceValueMax
      })
    }
  }

  const getPriceTitle = (minValue = '', maxValue = '') => {
    let priceTitle = ''
    const sortEntries = Object.entries(SORT_PRICE)
    for (let i = 0; i < Object.keys(SORT_PRICE).length; i += 1) {
      const compareMin = sortEntries[i][1]?.qMin === minValue
      const compareMax = sortEntries[i][1]?.qMax === maxValue

      if (minValue !== '' && maxValue !== '' && compareMin && compareMax) {
        priceTitle = sortEntries[i][1]?.value
        break
      }
      if (
        minValue !== '' &&
        maxValue === '' &&
        compareMin &&
        sortEntries[i][1]?.qMax === ''
      ) {
        priceTitle = sortEntries[i][1]?.value
        break
      }
      if (
        minValue === '' &&
        maxValue !== '' &&
        compareMax &&
        sortEntries[i][1]?.qMin === ''
      ) {
        priceTitle = sortEntries[i][1]?.value
        break
      }
    }
    if (priceTitle) {
      setPriceValueMin('')
      setPriceValueMax('')
    } else {
      const min = minValue.toString() ? minValue : ''
      const max = maxValue.toString() ? maxValue : ''
      priceTitle = setDisplayPrice(min, max)
      setPriceValueMin(min)
      setPriceValueMax(max)
    }
    return priceTitle
  }

  useEffect(() => {
    if (!isOpen) {
      closeDropdown()
    }
  }, [isOpen])

  useEffect(() => {
    if (priceMinMax.minPrice === '' && priceMinMax.maxPrice === '') {
      handleClearFilters()
    } else {
      const priceTitle = getPriceTitle(
        priceMinMax.minPrice,
        priceMinMax.maxPrice
      )
      const filMin = priceMinMax?.minPrice ? priceMinMax?.minPrice : ''
      const filMax = priceMinMax?.maxPrice ? priceMinMax?.maxPrice : ''
      setHaveFilter(priceTitle)
      setSelectPrice({
        priceName: priceTitle.toString(),
        minPrice: filMin,
        maxPrice: filMax
      })
    }
  }, [priceMinMax?.minPrice, priceMinMax?.maxPrice])

  return (
    <DropdownListContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      textList={[haveFilter]}
      placeholder={placeholder}
      sizeWidth={sizeWidth}
    >
      <Container className='px-1 py-2'>
        <div className='display-12 mb-2  px-2 pb-2'>{titleText}</div>
        <Form>
          <Row className='col-12 mt-2 mx-0'>
            <Col>
              <Form.Control
                className='fs-14 text-center remove-arrow'
                placeholder={t('propertyType.price.minPricePlaceholder')}
                type='number'
                style={{
                  borderColor: priceValueMax ? priceInputMinValid : ''
                }}
                value={priceValueMin}
                onKeyDown={blockCharNotNumber}
                autoFocus
                onChange={(event) => handleMinPrice(event)}
                onBlur={() => checkMin()}
              />
            </Col>
            -
            <Col>
              <Form.Control
                className='fs-14 text-center'
                placeholder={t('propertyType.price.maxPricePlaceholder')}
                type='number'
                style={{
                  borderColor: priceValueMin ? priceInputMaxValid : ''
                }}
                value={priceValueMax}
                onKeyDown={blockCharNotNumber}
                onChange={(event) => handleMaxPrice(event)}
                onBlur={() => checkMax()}
              />
            </Col>
            <div className='list-group-flush pt-2'>
              {SORT_PRICE.map(({ value, qMin, qMax }, index) => (
                <Form.Group
                  className='list-group-item pt-1'
                  controlId={index.toString()}
                  key={`sort-price-${index.toString()}`}
                >
                  <Form.Check
                    className='fs-14'
                    name='groupPrice'
                    key={value}
                    value={value}
                    label={tSortPrice('title', index)}
                    checked={selectPrice.priceName === value}
                    onChange={() => handleSelectedPrice(value, qMin, qMax)}
                    type='radio'
                  />
                </Form.Group>
              ))}
            </div>
          </Row>
        </Form>
        <div className='d-flex justify-content-center pt-2'>
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
            onClick={closeDropdown}
            variant='primary'
            className='w-100 py-2'
          >
            {t('global.button.submit')}
          </Button>
        </div>
      </Container>
    </DropdownListContainer>
  )
}

DropdownPriceList.defaultProps = {
  placeholder: '',
  titleText: '',
  sizeWidth: '',
  locale: ''
}
DropdownPriceList.propTypes = {
  placeholder: PropTypes.string,
  titleText: PropTypes.string,
  priceMinMax: PropTypes.shape({
    priceName: PropTypes.string.isRequired,
    minPrice: PropTypes.string.isRequired,
    maxPrice: PropTypes.string.isRequired
  }).isRequired,
  setFilterSelect: PropTypes.func.isRequired,
  sizeWidth: PropTypes.string,
  locale: PropTypes.string
}
export default DropdownPriceList
