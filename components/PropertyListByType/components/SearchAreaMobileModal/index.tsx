import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Modal, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import {
  getDeveloperName,
  getProjectDistrict,
  getProjectProvince,
  getProjectSubdistrict,
  getPropertyType,
  getZoneList
} from 'services/job'
import { SORT_PRICE } from 'components/PropertyListByType/constants'
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select'
import {
  IAllZone,
  IGroupedOption,
  IProjectGetZone,
  IProjectZone,
  IProjectZoneOption
} from 'interfaces/JobZoneList'
import { blockCharNotNumber, formatPriceToUnit } from 'utils/formatPriceToUnit'
import {
  IDeveloper,
  IDistrict,
  IProvince,
  ISubdistrict
} from 'interfaces/JobLocation'
import { getLng, getLngArr, getLngFlex } from 'utils/getLng'
import { groupBadgeStyles, groupStyles } from '../DropdownZoneList/style'
import FilterItem from '../FilterItem'
import { Wrapper, WrapperBox, WrapperHorizontalLine } from './style'
import { useUser } from '../../../../contexts/userContext'

interface IObjectKeys {
  [key: string]: number | string | undefined | null
}
interface IFilter extends IObjectKeys {
  propertyTypeId?: number | null
  minPrice?: string
  maxPrice?: string
  provinceId?: number | null
  districtId?: number | null
  subdistrictId?: number | null
  developerId?: number | null
  zoneId?: number | null
  locale?: string | undefined
}
interface IFilterList {
  isShow?: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  onSubmitFilter: Function
  filterSearch: IFilter
  locale?: string | undefined
}
interface IPropertyTypeOption {
  id: number | null
  nameTh?: string
  nameEn?: string
  nameCn?: string
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

interface IDeveloperOption extends IDeveloper {
  value: number
}
const SearchAreaMobileModal: FC<IFilterList> = ({
  isShow,
  setShow,
  onSubmitFilter,
  filterSearch,
  locale
}) => {
  const { t } = useTranslation()
  const localeLng = locale?.toUpperCase() || 'TH'
  const tSortPrice = SORT_PRICE && getLngArr(SORT_PRICE, localeLng)
  const [allPropertyType, setAllPropertyType] = useState<IPropertyTypeOption[]>(
    []
  )
  const [zoneOptions, setZoneOptions] = useState<IProjectZoneOption[]>([])
  const [groupedZoneOptions, setGroupedZoneOptions] = useState<
    IGroupedOption[]
  >([])
  const [allZone, setAllZone] = useState<IAllZone[]>([])
  const [propertyTypeSelected, setPropertyTypeSelected] = useState<
    number | null
  >(null)
  const [priceName, setPriceName] = useState('')
  const [priceInputMinValid, setPriceInputMinValid] = useState('')
  const [priceInputMaxValid, setPriceInputMaxValid] = useState('')
  const [priceValueMin, setPriceValueMin] = useState('')
  const [priceValueMax, setPriceValueMax] = useState('')
  const [provinceOptions, setProvinceOptions] = useState<IProvinceOptions[]>([])
  const [districtOptions, setDistrictOptions] = useState<IDistrictOptions[]>([])
  const [subdistrictOptions, setSubdistrictOptions] = useState<
    ISubdistrictOptions[]
  >([])
  const [developOptions, setDeveloperOptions] = useState<IDeveloper[]>([])
  const [provinceValue, setProvinceValue] = useState<number | null>(null)
  const [districtValue, setDistrictValue] = useState<number | null>(null)
  const [subdistrictValue, setSubdistrictValue] = useState<number | null>(null)

  const formatGroupLabel = (data: IGroupedOption) => {
    if (data.label) {
      return (
        <div style={groupStyles}>
          <span>{data.label}</span>
          <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
      )
    }
    return ''
  }

  const {
    state: { language }
  } = useUser()

  const { data: itemsPropertyType } = useQuery(['property_type'], () =>
    getPropertyType()
  )
  const { data: itemsZoneList, isLoading: isItemZoneLoading } = useQuery(
    ['project_zone'],
    () => getZoneList()
  )

  const { data: itemProvince, isLoading: isProvinceLoading } = useQuery(
    ['province'],
    () => getProjectProvince()
  )
  const { data: itemDeveloper, isLoading: isDeveloperLoading } = useQuery(
    ['developer'],
    () => getDeveloperName()
  )

  const handleSetFilters = (fillter: object) => {
    onSubmitFilter(fillter)
  }

  const handleSetPropertyType = (propertyId: number | null) => {
    setPropertyTypeSelected(propertyId)
    handleSetFilters({ propertyTypeId: propertyId })
  }
  const handleZoneChange = (zone: any) => {
    setZoneOptions(zone)
    handleSetFilters({
      zoneId: zone?.value,
      projectZone: zone?.label
    })
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
    handleSetFilters({
      minPrice: valuePrice,
      maxPrice: priceValueMax
    })
  }

  const handleSelectedPrice = (value: string, qMin: string, qMax: string) => {
    handleSetFilters({ minPrice: qMin, maxPrice: qMax })
    setPriceName(value)
    setPriceInputMinValid('')
    setPriceInputMaxValid('')
  }

  const handleMaxPrice = (event: any) => {
    const valuePrice = event.target.value
    handleSetFilters({
      minPrice: priceValueMin,
      maxPrice: valuePrice
    })
  }

  const checkMax = () => {
    if (+priceValueMin >= +priceValueMax && priceValueMax !== '') {
      setPriceValueMax('')
      setPriceValueMin('')
      handleSetFilters({
        minPrice: '',
        maxPrice: ''
      })
    } else {
      handleSetFilters({
        minPrice: priceValueMin,
        maxPrice: priceValueMax
      })
    }
  }

  const checkMin = () => {
    if (+priceValueMin >= +priceValueMax && priceValueMax !== '') {
      setPriceValueMax('')
      handleSetFilters({
        minPrice: priceValueMin,
        maxPrice: ''
      })
    } else {
      handleSetFilters({
        minPrice: priceValueMin,
        maxPrice: priceValueMax
      })
    }
  }

  const onChangeSubdistrict = (v: number | null) => {
    setSubdistrictValue(v)
    handleSetFilters({
      subdistrictId: v
    })
  }

  const handleChangeDeveloper = (v: IDeveloper | null) => {
    handleSetFilters({
      developerId: v?.id
    })
  }

  const handleSubmitFilters = () => {
    setShow(false)
  }

  const handleClearFilters = () => {
    setProvinceValue(null)
    setDistrictValue(null)
    setSubdistrictValue(null)
    setDistrictOptions([])
    setSubdistrictOptions([])
    setPriceName('')
    setPriceValueMin('')
    setPriceValueMax('')
    setPropertyTypeSelected(null)
    setZoneOptions([{ value: -1, label: t('propertyType.zone.allZone') }])
    onSubmitFilter({
      projectName: '',
      propertyTypeId: null,
      priceName: '', // for home page
      minPrice: '',
      maxPrice: '',
      provinceId: null,
      districtId: null,
      subdistrictId: null,
      developerId: null,
      projectZone: '',
      zoneId: null
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
    setPropertyTypeSelected(
      filterSearch?.propertyTypeId ? Number(filterSearch?.propertyTypeId) : null
    )
  }, [filterSearch?.propertyTypeId])

  const getFilterLength = () => {
    let countFilter = 0
    if (
      filterSearch?.provinceId ||
      filterSearch?.districtId ||
      filterSearch?.subdistrictId
    ) {
      countFilter = 1
    }
    return countFilter
  }

  const getZoneData = () => {
    // Zone list
    const groupedOptions: IGroupedOption[] = []
    const allZoneOptions: IAllZone[] = []
    if (
      itemsZoneList &&
      itemsZoneList?.data?.payload?.length &&
      !isItemZoneLoading
    ) {
      const titleZoneList = itemsZoneList?.data?.payload
      // tSubZoneList is translate
      const tZoneList = titleZoneList && getLngArr(titleZoneList, localeLng)

      titleZoneList?.map((item: IProjectGetZone, indexZone: number) => {
        if (item?.zone?.length > 0) {
          // tSubZoneList is translate
          const tSubZoneList =
            item?.zone && getLngArr(item?.zone, localeLng, true)
          const zoneList: IProjectZoneOption[] = []
          item?.zone?.map((subItem: IProjectZone, indexSubZone: number) => {
            zoneList.push({
              value: subItem?.id,
              label: tSubZoneList('name', indexSubZone),
              nameTh: subItem?.nameTh as string,
              nameEn: subItem?.nameEn as string,
              nameCn: subItem?.nameCn as string
            })
            allZoneOptions.push({ id: subItem?.id, zone: subItem })
            return true
          })
          // sort zone
          zoneList.sort((a: any, b: any) =>
            a.label.toLowerCase().localeCompare(b.label.toLowerCase(), 'th')
          )

          groupedOptions.push({
            label: tZoneList('name', indexZone),
            options: zoneList
          })

          // sort group
          groupedOptions.sort((a: any, b: any) =>
            a.label.toLowerCase().localeCompare(b.label.toLowerCase(), 'th')
          )
        }
        return true
      })
      groupedOptions.unshift({
        label: '',
        options: [{ value: -1, label: t('propertyType.zone.allZone') }]
      })
      setAllZone(allZoneOptions) // for search filter language
    }
    setGroupedZoneOptions(groupedOptions)
  }

  const getDeveloper = () => {
    const payloadDeveloper = itemDeveloper?.data?.payload as IDeveloper[]
    if (payloadDeveloper?.length && !isDeveloperLoading) {
      const newOptionsDeveloper: IDeveloperOption[] = payloadDeveloper?.map(
        (item: IDeveloper, index) => ({
          value: index,
          ...item
        })
      )
      setDeveloperOptions(newOptionsDeveloper)
    }
  }

  const provinceData = () => {
    const payloadProvince = itemProvince?.data?.payload as IProvince[]

    if (payloadProvince?.length && !isProvinceLoading) {
      const newOptionsProvince: IProvinceOptions[] = payloadProvince?.map(
        (item: IProvince, index) => ({
          value: index,
          ...item
        })
      )
      setProvinceOptions(newOptionsProvince)
      // sort province
      // newOptionProvince.sort((a: any, b: any) =>
      //   a.label.toLowerCase().localeCompare(b.label.toLowerCase(), 'th')
      // )
    }
  }

  const getDistrict = async (v: number | null, change = false) => {
    await getProjectDistrict({ provinceId: v }).then((data) => {
      const payloadDistrict = data?.data?.payload as IDistrict[]
      if (payloadDistrict?.length > 0) {
        const newOptionsDistrict: IDistrictOptions[] = payloadDistrict.map(
          (item: IDistrict, index) => ({
            value: index,
            ...item
          })
        )
        if (newOptionsDistrict) {
          setDistrictOptions(newOptionsDistrict)
          setSubdistrictOptions([])
        }
        // Change filter
        if (change) {
          setProvinceValue(v)
          setDistrictValue(null)
          handleSetFilters({
            provinceId: v,
            districtId: null,
            subdistrictId: null
          })
        }
      }
    })
  }

  const getSubdistrict = async (v: number | null, change = false) => {
    await getProjectSubdistrict({ districtId: v }).then((data) => {
      const payloadSubdistrict = data?.data?.payload
      if (payloadSubdistrict?.length > 0) {
        const newOptionsSubdistrict: ISubdistrictOptions[] =
          payloadSubdistrict.map((item: ISubdistrict, index) => ({
            value: index,
            ...item
          }))
        if (newOptionsSubdistrict) {
          setSubdistrictOptions(newOptionsSubdistrict)
        }
        // Change filter
        if (change) {
          setDistrictValue(v)
          setSubdistrictValue(null)
          handleSetFilters({
            districtId: v,
            subdistrictId: null
          })
        }
      }
    })
  }

  useEffect(() => {
    getZoneData()
  }, [itemsZoneList, locale])

  useEffect(() => {
    setZoneOptions([{ value: -1, label: t('propertyType.zone.allZone') }])
    const searchZoneOptions = allZone?.find(
      (v: any) => v.zone?.id === filterSearch?.zoneId
    )
    if (searchZoneOptions) {
      /* set zone default and set option when change from language */

      const getZoneOptionTranslate = (camelCase: boolean = false) => {
        const getSearchZone = searchZoneOptions
        return (
          getSearchZone && getLng(getSearchZone?.zone, localeLng, camelCase)
        )
      }
      const tSearch = getZoneOptionTranslate(true)
      setZoneOptions([
        {
          value: searchZoneOptions.id,
          label: tSearch('name')
        }
      ])
    }
  }, [groupedZoneOptions, filterSearch?.projectZone])

  useEffect(() => {
    setPriceName('')
    setPriceValueMin('')
    setPriceValueMax('')
    if (filterSearch?.minPrice !== '' || filterSearch?.maxPrice !== '') {
      const priceTitle = getPriceTitle(
        filterSearch?.minPrice,
        filterSearch?.maxPrice
      )
      setPriceName(priceTitle.toString())
    }
  }, [filterSearch?.minPrice, filterSearch?.maxPrice])

  useEffect(() => {
    provinceData()
  }, [itemProvince])

  useEffect(() => {
    getDeveloper()
  }, [itemDeveloper])

  useEffect(() => {
    setProvinceValue(null)
    if (filterSearch.provinceId) {
      setProvinceValue(filterSearch.provinceId)
      getDistrict(filterSearch.provinceId).then(() => {
        setDistrictValue(filterSearch.districtId || null)
      })
    }
  }, [filterSearch?.provinceId])

  useEffect(() => {
    const district = filterSearch.districtId ? filterSearch.districtId : null
    if (district) {
      getDistrict(district).then(() => {
        setDistrictValue(district)
        getSubdistrict(district).then(() => {})
      })
    } else {
      setDistrictValue(null)
      setSubdistrictValue(null)
    }
  }, [filterSearch?.districtId])

  useEffect(() => {
    if (filterSearch.subdistrictId) {
      setSubdistrictValue(filterSearch.subdistrictId)
    } else {
      setSubdistrictValue(null)
    }
  }, [filterSearch?.subdistrictId])

  return (
    <Wrapper>
      <div className='col-12 px-2 mt-2  pb-3 justify-content-between d-flex flex-main-row d-main-none'>
        <Modal
          show={isShow}
          fullscreen
          onHide={() => setShow(false)}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title className='col-12'>
              <div className='text-center w-100 position-relative d-flex justify-content-center align-items-center'>
                <div className='position-absolute top-0 start-0 d-flex align-items-center'>
                  <FiArrowLeft
                    role='button'
                    size={24}
                    className='text-primary'
                    onClick={() => {
                      setShow(false)
                      handleSubmitFilters()
                    }}
                  />
                </div>
                <h5 className='mb-0 d-inline col-10 '>
                  {t('propertyType.searchArea.locationFilterPlaceholder')}
                </h5>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='px-0 py-2' style={{ overflowX: 'hidden' }}>
            <WrapperBox>
              <Row xs={2} className='mb-3 px-3'>
                <div className='col-12 mb-2 pb-2'>
                  {t('propertyType.searchArea.projectTypePlaceholder')}
                </div>
                {allPropertyType?.map((property) => {
                  const tPropertyName = getLngFlex(
                    { ...property },
                    language.toUpperCase(),
                    true
                  )
                  return (
                    <Col
                      key={property.id}
                      className='mb-2'
                      onClick={() => handleSetPropertyType(property?.id)}
                    >
                      {property.id === null && !propertyTypeSelected ? (
                        <FilterItem
                          title={tPropertyName('name')}
                          isActive
                          isBackground
                        />
                      ) : (
                        <FilterItem
                          title={tPropertyName('name')}
                          isActive={propertyTypeSelected === property?.id}
                          isBackground
                        />
                      )}
                    </Col>
                  )
                })}
              </Row>
              <WrapperHorizontalLine />
            </WrapperBox>
            <WrapperBox>
              <Row xs={2} className='mb-3 px-3'>
                <Col className='col-12'>
                  <div className='col-12 mb-2 pb-2'>
                    {t('propertyType.searchArea.zonePlaceholder')}
                  </div>
                  <Select<IProjectZoneOption, true, IGroupedOption>
                    instanceId='projectZoneId'
                    className='bn-form-select-container col-12'
                    placeholder={t('propertyType.searchArea.zoneHeaderTitle2')}
                    isClearable
                    isSearchable
                    value={zoneOptions}
                    onChange={(value) => handleZoneChange(value)}
                    options={groupedZoneOptions}
                    formatGroupLabel={formatGroupLabel}
                  />
                </Col>
              </Row>
              <WrapperHorizontalLine />
            </WrapperBox>
            <WrapperBox>
              <Row xs={2} className='mb-3 px-3 d-flex'>
                <div className='col-12 mb-2 pb-2'>
                  {t('propertyType.searchArea.pricePleaceholder')}
                </div>
                <Col className='col-5'>
                  <Form.Control
                    className='fs-14 text-center'
                    placeholder={t('propertyType.price.minPricePlaceholder')}
                    type='number'
                    style={{
                      borderColor: priceValueMax ? priceInputMinValid : ''
                    }}
                    value={priceValueMin}
                    onKeyDown={blockCharNotNumber}
                    onChange={(event) => handleMinPrice(event)}
                    onBlur={() => checkMin()}
                  />
                </Col>
                <Col className='col-2 text-center'> - </Col>
                <Col className='col-5'>
                  <Form.Control
                    className='fs-14 text-center'
                    placeholder={t('propertyType.price.maxPricePlaceholder')}
                    type='number'
                    value={priceValueMax}
                    style={{
                      borderColor: priceValueMin ? priceInputMaxValid : ''
                    }}
                    onKeyDown={blockCharNotNumber}
                    onChange={(event) => handleMaxPrice(event)}
                    onBlur={() => checkMax()}
                  />
                </Col>
                <div className='list-group-flush pt-2 col-12'>
                  <hr className='pb-0' />
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
                        checked={priceName === value}
                        onChange={() => handleSelectedPrice(value, qMin, qMax)}
                        type='radio'
                      />
                    </Form.Group>
                  ))}
                </div>
              </Row>
              <WrapperHorizontalLine />
            </WrapperBox>
            <WrapperBox>
              <Row className='col-12 mt-2 mx-0'>
                <Col>
                  <div className='col-12 mb-2 pb-2'>
                    {t('propertyType.location.province')}
                  </div>
                  <Select
                    instanceId='mainProvince'
                    placeholder={t('propertyType.location.provincePlaceholder')}
                    className='bn-form-select-container'
                    menuPlacement='auto'
                    options={provinceOptions}
                    value={provinceOptions.filter(
                      (option: IProvince) => option.id === provinceValue
                    )}
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
              <WrapperHorizontalLine />
            </WrapperBox>
            <WrapperBox>
              <Row className='col-12 mt-2 mx-0'>
                <Col>
                  <div className='col-12 mb-2 pb-2'>
                    {t('propertyType.location.district')}
                  </div>
                  <Select
                    instanceId='mainDistrict'
                    placeholder={t('propertyType.location.districtPlaceholder')}
                    className='bn-form-select-container'
                    menuPlacement='auto'
                    isDisabled={!districtOptions.length || !getFilterLength()}
                    options={districtOptions}
                    value={districtOptions.filter(
                      (option: IDistrict) => option.id === districtValue
                    )}
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
              <WrapperHorizontalLine />
            </WrapperBox>
            <WrapperBox>
              <Row className='col-12 mt-2 mx-0'>
                <Col>
                  <div className='col-12 mb-2 pb-2'>
                    {t('propertyType.location.subDistrict')}
                  </div>
                  <Select
                    instanceId='mainSubDistrict'
                    placeholder={t(
                      'propertyType.location.subDistrictPlaceholder'
                    )}
                    className='bn-form-select-container'
                    menuPlacement='auto'
                    isDisabled={
                      !subdistrictOptions.length || !getFilterLength()
                    }
                    options={subdistrictOptions}
                    value={subdistrictOptions.filter(
                      (option: ISubdistrict) => option.id === subdistrictValue
                    )}
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
              <WrapperHorizontalLine />
            </WrapperBox>
            <WrapperBox>
              <Row className='col-12 mt-2 mx-0'>
                <Col>
                  <div className='col-12 mb-2 pb-2'>
                    {t('propertyType.location.searchDeveloper')}
                  </div>
                  <Select
                    instanceId='mainDeveloper'
                    placeholder={t(
                      'propertyType.location.searchDeveloperPlaceholder'
                    )}
                    className='bn-form-select-container'
                    menuPlacement='auto'
                    options={developOptions}
                    value={developOptions.filter(
                      (option: IDeveloper) =>
                        option.id === filterSearch?.developerId
                    )}
                    getOptionLabel={(option: IDeveloper) => {
                      const tDeveloper = getLng(
                        option,
                        locale?.toUpperCase() || 'TH',
                        true
                      )
                      return tDeveloper('companyName') || option?.companyNameTh
                    }}
                    onChange={(e) => handleChangeDeveloper(e)}
                  />
                </Col>
              </Row>
              <WrapperHorizontalLine />
            </WrapperBox>
          </Modal.Body>
          <Modal.Footer>
            <div className='d-flex justify-content-center pt-2 col-12'>
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
                onClick={handleSubmitFilters}
                variant='primary'
                className='w-100 py-2'
              >
                {t('global.button.submit')}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </Wrapper>
  )
}

SearchAreaMobileModal.defaultProps = {
  isShow: false,
  locale: ''
}
SearchAreaMobileModal.propTypes = {
  isShow: PropTypes.bool,
  setShow: PropTypes.func.isRequired,
  onSubmitFilter: PropTypes.func.isRequired,
  filterSearch: PropTypes.shape({
    propertyTypeId: PropTypes.number,
    minPrice: PropTypes.string.isRequired,
    maxPrice: PropTypes.string.isRequired,
    provinceId: PropTypes.number,
    districtId: PropTypes.number,
    subdistrictId: PropTypes.number,
    developerId: PropTypes.number,
    projectZone: PropTypes.string.isRequired,
    zoneId: PropTypes.number.isRequired
  }).isRequired,
  locale: PropTypes.string
}

export default SearchAreaMobileModal
