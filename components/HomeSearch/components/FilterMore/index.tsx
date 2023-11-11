import { FC, useState, useEffect } from 'react'
import { Row, Col, Container, Button, Form } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import {
  getDeveloperName,
  getProjectDistrict,
  getProjectProvince,
  getProjectSubdistrict
} from 'services/job'
import {
  IDeveloper,
  IDistrict,
  IProvince,
  ISubdistrict
} from 'interfaces/JobLocation'
import { getLng, getLngArr } from 'utils/getLng'
import DropdownContainer from '../DropdownContainer'
import { SORT_PRICE } from '../../../PropertyListByType/constants'
import { formatPriceToUnit } from '../../../../utils/formatPriceToUnit'
import sortItem from '../../../../utils/sortItem'

interface IInputLocationAll {
  provinceId?: number | null
  districtId?: number | null
  subdistrictId?: number | null
  developerId?: number | null
  priceName?: string
  minPrice?: string
  maxPrice?: string
}

interface IFilterList {
  totalLocateLength: number
  onSubmitFilter: Function
  filterAll: IInputLocationAll
  locale?: string | undefined
}

interface IDeveloperOption extends IDeveloper {
  value: number
}

interface IProvinceOptions extends IProvince {
  value: number
}

interface IDistrictOptions extends IDistrict {
  value: number
}

interface ISubdistrictOptions extends ISubdistrict {
  value: number
}

const FilterMore: FC<IFilterList> = ({
  totalLocateLength,
  onSubmitFilter,
  filterAll,
  locale
}) => {
  const { t } = useTranslation()
  const localeLng = locale?.toUpperCase() || 'TH'
  const tSortPrice = SORT_PRICE && getLngArr(SORT_PRICE, localeLng)
  const { isOpen, onToggle, onClose } = useDisclosure(false)

  const [priceTitleName, setPriceName] = useState('')
  const [provinceOptions, setProvinceOptions] = useState<IProvince[]>([])
  const [districtOptions, setDistrictOptions] = useState<IDistrict[]>([])
  const [subdistrictOptions, setSubdistrictOptions] = useState<ISubdistrict[]>(
    []
  )
  const [developOptions, setDeveloperOptions] = useState<IDeveloper[]>([])
  const [developerValue, setDeveloperValue] = useState<IDeveloper | null>(null)
  const [priceValueMin, setPriceValueMin] = useState('')
  const [priceValueMax, setPriceValueMax] = useState('')

  const haveFilter = totalLocateLength
  const { data: itemProvince, isLoading: isProvinceLoading } = useQuery(
    ['province'],
    () => getProjectProvince()
  )
  const { data: itemDeveloper } = useQuery(['developer'], () =>
    getDeveloperName()
  )

  const handleSetFilters = (filter: object) => {
    onSubmitFilter({ ...filter })
  }

  const getDistrict = async (v: number | null, change = false) => {
    if (change) {
      handleSetFilters({
        provinceId: v,
        districtId: null,
        subdistrictId: null
      })
    }
    getProjectDistrict({ provinceId: v }).then((data) => {
      const payloadDistrict = data?.data?.payload
      if (payloadDistrict?.length > 0) {
        const newOptionsDistrict: IDistrictOptions[] = payloadDistrict.map(
          (item: IDistrict, index) => ({
            value: index,
            ...item
          })
        )
        if (newOptionsDistrict) {
          setDistrictOptions(sortItem(newOptionsDistrict, localeLng))
          setSubdistrictOptions([])
        }
      }
    })
  }

  const getSubdistrict = async (v: number | null, change = false) => {
    if (change) {
      handleSetFilters({
        districtId: v,
        subdistrictId: null
      })
    }

    getProjectSubdistrict({ districtId: v }).then((data) => {
      const payloadSubdistrict = data?.data?.payload
      if (payloadSubdistrict?.length > 0) {
        const newOptionsSubdistrict: ISubdistrictOptions[] =
          payloadSubdistrict.map((item: ISubdistrict, index) => ({
            value: index,
            ...item
          }))
        if (newOptionsSubdistrict) {
          setSubdistrictOptions(sortItem(newOptionsSubdistrict, localeLng))
        }
      }
    })
  }

  const onChangeSubdistrict = (v: number) => {
    handleSetFilters({
      subdistrictId: v
    })
  }

  const handleChangeDeveloper = (v: IDeveloper | null) => {
    setDeveloperValue(v)
    handleSetFilters({
      developerId: v?.id
    })
  }

  const handleSelectedPrice = (value: string, qMin: string, qMax: string) => {
    handleSetFilters({ priceName: value, minPrice: qMin, maxPrice: qMax })
    setPriceValueMin('')
    setPriceValueMax('')
  }

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

  const handleMinPrice = (event: any) => {
    const valuePrice = event.target.value
    const allPrice = setDisplayPrice(valuePrice, priceValueMax)

    setPriceValueMin(valuePrice)
    handleSetFilters({
      priceName: allPrice,
      minPrice: valuePrice,
      maxPrice: priceValueMax
    })
  }

  const handleMaxPrice = (event: any) => {
    const valuePrice = event.target.value
    const allPrice = setDisplayPrice(priceValueMin, valuePrice)
    setPriceValueMax(valuePrice)
    handleSetFilters({
      priceName: allPrice,
      minPrice: priceValueMin,
      maxPrice: valuePrice
    })
  }

  const checkMax = () => {
    if (+priceValueMin >= +priceValueMax && priceValueMax !== '') {
      setPriceValueMax('')
      setPriceValueMin('')
      handleSetFilters({
        priceName: '',
        minPrice: '',
        maxPrice: ''
      })
    } else {
      const allPrice = setDisplayPrice(priceValueMin, priceValueMax)
      handleSetFilters({
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
      handleSetFilters({
        priceName: allPrice,
        minPrice: priceValueMin,
        maxPrice: ''
      })
    } else {
      const allPrice = setDisplayPrice(priceValueMin, priceValueMax)
      handleSetFilters({
        priceName: allPrice,
        minPrice: priceValueMin,
        maxPrice: priceValueMax
      })
    }
  }

  const handleSubmit = () => {
    onClose()
  }

  const handleClearFilters = () => {
    setPriceValueMin('')
    setPriceValueMax('')
    setDistrictOptions([])
    setSubdistrictOptions([])
    onSubmitFilter({
      provinceId: null,
      districtId: null,
      subdistrictId: null,
      developerId: null,
      priceName: '',
      minPrice: '',
      maxPrice: ''
    })
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
      setPriceName('')
    }
    return priceTitle
  }

  useEffect(() => {
    // province
    const payloadProvince = itemProvince?.data?.payload as IProvince[]

    if (payloadProvince?.length && !isProvinceLoading) {
      const newOptionsProvince: IProvinceOptions[] = payloadProvince?.map(
        (item: IProvince, index) => ({
          value: index,
          ...item
        })
      )
      // sort province
      setProvinceOptions(sortItem(newOptionsProvince, localeLng))
    }

    // developer
    const payloadDeveloper = itemDeveloper?.data?.payload as IDeveloper[]
    const newOptionsDeveloper: IDeveloperOption[] = payloadDeveloper?.map(
      (item: IDeveloper, index) => ({
        value: index,
        ...item
      })
    )
    setDeveloperOptions(newOptionsDeveloper)
  }, [itemProvince, itemDeveloper])

  useEffect(() => {
    setPriceName('')
    setPriceValueMin('')
    setPriceValueMax('')
    if (filterAll?.minPrice !== '' || filterAll?.maxPrice !== '') {
      const priceTitle = getPriceTitle(filterAll?.minPrice, filterAll?.maxPrice)
      setPriceName(priceTitle.toString())
    }
  }, [filterAll?.minPrice, filterAll?.maxPrice])

  useEffect(() => {
    getDistrict(filterAll?.provinceId || null, true).then()
  }, [filterAll?.provinceId])

  useEffect(() => {
    getSubdistrict(filterAll?.districtId || null).then()
  }, [filterAll?.districtId])

  useEffect(() => {
    setProvinceOptions(sortItem(provinceOptions, localeLng))
    setDistrictOptions(sortItem(districtOptions, localeLng))
    setSubdistrictOptions(sortItem(subdistrictOptions, localeLng))
  }, [localeLng])

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      defaultText={t('global.sort.filter')}
      textList={`${t('global.sort.filter')} (${totalLocateLength})`}
    >
      <Container className='px-1 py-2'>
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <Form.Control
              className='fs-14 text-center remove-arrow'
              placeholder={t('propertyType.price.minPricePlaceholder')}
              type='number'
              value={priceValueMin}
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
              value={priceValueMax}
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
                  checked={priceTitleName === value}
                  onChange={() => handleSelectedPrice(value, qMin, qMax)}
                  type='radio'
                />
              </Form.Group>
            ))}
          </div>
        </Row>
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2 pb-2'>
              {t('propertyType.location.province')}
            </div>
            <Select
              instanceId='mainProvince'
              placeholder={t('propertyType.location.provincePlaceholder')}
              className='bn-form-select-container'
              options={provinceOptions}
              getOptionLabel={(option: IProvince) => {
                const tProvince = getLng(
                  option,
                  locale?.toUpperCase() || 'TH',
                  true
                )

                return tProvince('name')
              }}
              onChange={(e) => getDistrict(e?.id!, true)}
            />
          </Col>
        </Row>
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2 pb-2'>
              {t('propertyType.location.district')}
            </div>
            <Select
              instanceId='mainDistrict'
              placeholder={t('propertyType.location.districtPlaceholder')}
              className='bn-form-select-container'
              isDisabled={!districtOptions.length}
              options={districtOptions}
              getOptionLabel={(option: IDistrict) => {
                const tDistrict = getLng(
                  option,
                  locale?.toUpperCase() || 'TH',
                  true
                )

                return tDistrict('name')
              }}
              onChange={(e) => getSubdistrict(e?.id!, true)}
            />
          </Col>
        </Row>
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2 pb-2'>
              {t('propertyType.location.subDistrict')}
            </div>
            <Select
              instanceId='mainDistrict'
              placeholder={t('propertyType.location.subDistrictPlaceholder')}
              className='bn-form-select-container'
              isDisabled={!subdistrictOptions.length}
              options={subdistrictOptions}
              defaultValue={subdistrictOptions[0]}
              getOptionLabel={(option: ISubdistrict) => {
                const tSubdistrict = getLng(
                  option,
                  locale?.toUpperCase() || 'TH',
                  true
                )

                return tSubdistrict('name')
              }}
              onChange={(e) => onChangeSubdistrict(e?.id!)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2 pb-2'>
              {t('propertyType.location.searchDeveloper')}
            </div>
            <Select
              instanceId='mainDistrict'
              placeholder={t(
                'propertyType.location.searchDeveloperPlaceholder'
              )}
              className='bn-form-select-container'
              options={developOptions}
              getOptionLabel={(option: IDeveloper) => {
                const tDeveloper = getLng(
                  option,
                  locale?.toUpperCase() || 'TH',
                  true
                )
                return tDeveloper('companyName') || option?.companyNameTh
              }}
              value={developerValue}
              onChange={(e) => handleChangeDeveloper(e)}
            />
          </Col>
        </Row>
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
            onClick={handleSubmit}
            variant='primary'
            className='w-100 py-2'
          >
            {t('global.button.submit')}
          </Button>
        </div>
      </Container>
    </DropdownContainer>
  )
}

FilterMore.defaultProps = {
  locale: ''
}
FilterMore.propTypes = {
  totalLocateLength: PropTypes.number.isRequired,
  onSubmitFilter: PropTypes.func.isRequired,
  filterAll: PropTypes.shape({
    provinceId: PropTypes.number,
    districtId: PropTypes.number,
    subdistrictId: PropTypes.number,
    developerId: PropTypes.number,
    priceName: PropTypes.string.isRequired,
    minPrice: PropTypes.string.isRequired,
    maxPrice: PropTypes.string.isRequired
  }).isRequired,
  locale: PropTypes.string
}
export default FilterMore
