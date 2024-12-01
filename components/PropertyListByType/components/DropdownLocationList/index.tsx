import { FC, useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Row, Col, Container, Button } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { useQuery } from 'react-query'
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
import DropdownListContainer from '../DropdownListContainer'
import { getLng } from '../../../../utils/getLng'
import sortItem from '../../../../utils/sortItem'

interface IObjectKeys {
  [key: string]: string | number | undefined | null
}
interface IInputLocationAll extends IObjectKeys {
  provinceId?: number | null
  districtId?: number | null
  subdistrictId?: number | null
  developerId?: number | null
}

interface IFilterList {
  placeholder?: string
  titleText?: string
  onSubmitFilter: Function
  totalSelectedFilter: number
  locateFilterAll: IInputLocationAll
  notShowSectionTitle?: boolean
  locale?: string | undefined
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

interface IDeveloperOptions extends IDeveloper {
  value: number
}

const DropdownLocationList: FC<IFilterList> = ({
  placeholder,
  titleText,
  onSubmitFilter,
  totalSelectedFilter,
  locateFilterAll,
  notShowSectionTitle,
  locale
}) => {
  const { t } = useTranslation()
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [provinceOptions, setProvinceOptions] = useState<IProvinceOptions[]>([])
  const [districtOptions, setDistrictOptions] = useState<IDistrictOptions[]>([])
  const [subdistrictOptions, setSubdistrictOptions] = useState<
    ISubdistrictOptions[]
  >([])
  const [developOptions, setDeveloperOptions] = useState<IDeveloper[]>([])
  const [provinceValue, setProvinceValue] = useState<number | null>(null)
  const [districtValue, setDistrictValue] = useState<number | null>(null)
  const [subdistrictValue, setSubdistrictValue] = useState<number | null>(null)

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
  const handleChangeDeveloper = (v: IDeveloper | null) => {
    handleSetFilters({
      developerId: v?.id
    })
  }

  const handleSubmit = () => {
    onClose()
  }

  const handleClearFilters = () => {
    setProvinceValue(null)
    setDistrictValue(null)
    setSubdistrictValue(null)
    setDistrictOptions([])
    setSubdistrictOptions([])
    onSubmitFilter({
      provinceId: '',
      districtId: '',
      subdistrictId: '',
      developerId: ''
    })
  }

  // To not disabled developer name dropdown when clear data
  const getFilterLength = () => {
    let countFilter = 0
    Object.keys(locateFilterAll).forEach((key) => {
      if (locateFilterAll[key] !== '' && key !== 'developerId') {
        countFilter += 1
      }
    })
    return countFilter
  }

  const getDeveloper = () => {
    const payloadDeveloper = itemDeveloper?.data?.payload as IDeveloper[]
    if (payloadDeveloper?.length && !isDeveloperLoading) {
      const newOptionsDeveloper: IDeveloperOptions[] = payloadDeveloper?.map(
        (item: IDeveloper, index) => ({
          value: index,
          ...item
        })
      )

      setDeveloperOptions(sortItem(newOptionsDeveloper, locale!, 'companyName'))
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
      setProvinceOptions(sortItem(newOptionsProvince, locale!))
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
          setDistrictOptions(sortItem(newOptionsDistrict, locale!))
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
          setSubdistrictOptions(sortItem(newOptionsSubdistrict, locale!))
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

  const onChangeSubdistrict = (v: number | null) => {
    setSubdistrictValue(v)
    handleSetFilters({
      subdistrictId: v
    })
  }

  useEffect(() => {
    getDeveloper()
  }, [itemDeveloper])

  useEffect(() => {
    provinceData()
  }, [itemProvince])

  useEffect(() => {
    if (locateFilterAll.developerId) {
      handleSetFilters({
        developerId: locateFilterAll.developerId
      })
    }
  }, [locateFilterAll.developerId])

  useEffect(() => {
    setProvinceValue(null)
    if (locateFilterAll.provinceId) {
      setProvinceValue(locateFilterAll.provinceId)
      getDistrict(locateFilterAll.provinceId).then(() => {
        setDistrictValue(locateFilterAll.districtId || null)
      })
    }
  }, [locateFilterAll.provinceId])

  useEffect(() => {
    const district = locateFilterAll.districtId
      ? locateFilterAll.districtId
      : ''
    if (district) {
      getDistrict(district).then(() => {
        setDistrictValue(district)
        getSubdistrict(district).then(() => {})
      })
    } else {
      setDistrictValue(null)
      setSubdistrictValue(null)
    }
  }, [locateFilterAll?.districtId])

  useEffect(() => {
    setSubdistrictValue(locateFilterAll.subdistrictId || null)
  }, [locateFilterAll?.subdistrictId])

  useEffect(() => {
    setProvinceOptions(sortItem(provinceOptions, locale!))
    setDistrictOptions(sortItem(districtOptions, locale!))
    setSubdistrictOptions(sortItem(subdistrictOptions, locale!))
    setDeveloperOptions(sortItem(developOptions, locale!, 'companyName'))
  }, [locale])
  return (
    <DropdownListContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!parseInt(totalSelectedFilter?.toString(), 10)}
      textList={[totalSelectedFilter ? `(${totalSelectedFilter})` : '']}
      placeholder={placeholder}
      haveFilterShowTitle={notShowSectionTitle}
      isSort
    >
      <Container className='px-1 py-2'>
        {titleText && (
          <div className='display-12 mb-2  px-2 pb-2'>{titleText}</div>
        )}
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2'>
              {t('propertyType.location.province')}
            </div>
            <Select
              instanceId='mainProvince'
              placeholder={t('propertyType.location.provincePlaceholder')}
              className='bn-form-select-container'
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
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2 pt-2'>
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
              getOptionLabel={(option: IProvince) => {
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
            <div className='display-12 mb-2  px-2 pt-2'>
              {t('propertyType.location.subDistrict')}
            </div>
            <Select
              instanceId='mainSubDistrict'
              placeholder={t('propertyType.location.subDistrictPlaceholder')}
              className='bn-form-select-container'
              menuPlacement='auto'
              isDisabled={!subdistrictOptions.length || !getFilterLength()}
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
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
        <Row className='col-12 mt-2 mx-0'>
          <Col>
            <div className='display-12 mb-2  px-2 pt-0'>
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
                  option.id === locateFilterAll?.developerId
              )}
              getOptionLabel={(option: IDeveloper) => {
                const tDeveloper = getLng(
                  option,
                  locale?.toUpperCase() || 'TH',
                  true
                )

                return tDeveloper('companyName') || option.companyNameTh
              }}
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
            {t('global.button.ok')}
          </Button>
        </div>
      </Container>
    </DropdownListContainer>
  )
}

DropdownLocationList.defaultProps = {
  placeholder: '',
  titleText: '',
  notShowSectionTitle: false,
  locale: ''
}
DropdownLocationList.propTypes = {
  placeholder: PropTypes.string,
  titleText: PropTypes.string,
  onSubmitFilter: PropTypes.func.isRequired,
  totalSelectedFilter: PropTypes.number.isRequired,
  locateFilterAll: PropTypes.shape({
    provinceId: PropTypes.number,
    districtId: PropTypes.number,
    subdistrictId: PropTypes.number,
    developerId: PropTypes.number
  }).isRequired,
  notShowSectionTitle: PropTypes.bool,
  locale: PropTypes.string
}
export default DropdownLocationList
