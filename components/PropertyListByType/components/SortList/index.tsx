import { FC, useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { SORTS } from 'components/PropertyListByType/constants'
import useDisclosure from 'hooks/useDisclosure'
import { getLngArr } from 'utils/getLng'
import PropTypes from 'prop-types'
import FilterItem from '../FilterItem'
import DropdownContainer from '../DropdownContainer'

interface ISortList {
  unitLocalSalePrice?: string
  createdDate?: string
  sharePrice?: string
  commissionPrice?: string
  updatedDate?: string
  onHandleSort: Function
  locale?: string | undefined
  shareFee?: string
  startingPrice?: string
  commissionPercentage?: string
}
const SortList: FC<ISortList> = ({
  unitLocalSalePrice,
  createdDate,
  sharePrice,
  commissionPrice,
  updatedDate,
  onHandleSort,
  locale,
  shareFee,
  startingPrice,
  commissionPercentage
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
            ? t('global.sort.unitLocalSalePriceAsc')
            : t('global.sort.unitLocalSalePriceDesc')
        )
      } else if (shareFee) {
        setLabel(
          shareFee === 'asc'
            ? t('global.sort.shareFeeAsc')
            : t('global.sort.shareFeeDesc')
        )
      } else if (startingPrice) {
        setLabel(
          startingPrice === 'asc'
            ? t('global.sort.startingPriceAsc')
            : t('global.sort.startingPriceDesc')
        )
      } else if (updatedDate) {
        setLabel(
          updatedDate === 'desc'
            ? t('global.sort.updatedDateDesc')
            : t('global.sort.updatedDateAsc')
        )
      } else if (sharePrice) {
        setLabel(
          sharePrice === 'asc'
            ? t('global.sort.sharePriceAsc')
            : t('global.sort.sharePriceDesc')
        )
      } else if (commissionPrice) {
        setLabel(
          commissionPrice === 'asc'
            ? t('global.sort.commissionPriceAsc')
            : t('global.sort.commissionPriceDesc')
        )
      } else if (createdDate) {
        setLabel(
          createdDate === 'desc'
            ? t('global.sort.createdDateDesc')
            : t('global.sort.createdDateAsc')
        )
      } else if (commissionPercentage) {
        setLabel(
          commissionPercentage === 'asc'
            ? t('global.sort.commissionPercentageAsc')
            : t('global.sort.commissionPercentageDesc')
        )
      } else {
        setLabel('')
      }
    }
    handleLabel()
  }, [
    unitLocalSalePrice,
    createdDate,
    sharePrice,
    commissionPrice,
    updatedDate,
    locale,
    commissionPercentage
  ])

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
    if (createdDate && key === 'createdDate' && value === createdDate) {
      return true
    }
    if (sharePrice && key === 'sharePrice' && value === sharePrice) {
      return true
    }
    if (updatedDate && key === 'updatedDate' && value === updatedDate) {
      return true
    }
    if (
      commissionPrice &&
      key === 'commissionPrice' &&
      value === commissionPrice
    ) {
      return true
    }
    if (
      commissionPercentage &&
      key === 'commissionPercentage' &&
      value === commissionPercentage
    ) {
      return true
    }
    return false
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
                key={`sort-${index.toString()}`}
                onClick={() => handleSubmit({ [key]: value })}
              >
                <FilterItem
                  title={tSortBy('label', index)}
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
  sharePrice: '',
  commissionPrice: '',
  updatedDate: '',
  locale: '',
  shareFee: '',
  startingPrice: '',
  commissionPercentage: ''
}

SortList.propTypes = {
  unitLocalSalePrice: PropTypes.string,
  createdDate: PropTypes.string,
  sharePrice: PropTypes.string,
  commissionPrice: PropTypes.string,
  updatedDate: PropTypes.string,
  onHandleSort: PropTypes.func.isRequired,
  locale: PropTypes.string,
  commissionPercentage: PropTypes.string
}

export default SortList
