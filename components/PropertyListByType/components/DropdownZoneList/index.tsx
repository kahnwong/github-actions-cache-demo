import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getZoneList } from 'services/job'
import {
  IProjectZoneOption,
  IGroupedOption,
  IProjectZone,
  IAllZone,
  IProjectGetZone
} from 'interfaces/JobZoneList'
import Select from 'react-select'
import { getLng, getLngArr } from 'utils/getLng'
import DropdownListContainer from '../DropdownListContainer'
import { groupBadgeStyles, groupStyles } from './style'

interface IFilterList {
  placeholder?: string
  titleText?: string
  zoneId?: number | null
  sizeWidth?: string
  setFilterSelect: Function
  locale?: string | undefined
}

const DropdownZoneList: FC<IFilterList> = ({
  placeholder,
  titleText,
  zoneId,
  sizeWidth,
  setFilterSelect,
  locale
}) => {
  const { t } = useTranslation()
  const localeLng = locale?.toUpperCase() || 'TH'
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [groupedZoneOptions, setGroupedZoneOptions] = useState<
    IGroupedOption[]
  >([])
  const [zoneOptions, setZoneOptions] = useState<IProjectZoneOption | null>(
    null
  )
  const [allZone, setAllZone] = useState<IAllZone[]>([])

  const searchZoneOptions = (zoneObj: IAllZone[]) =>
    zoneObj?.filter((v: IAllZone) => v.zone?.id === zoneId)
  const getZoneOptionTranslate = (
    zoneObj: IAllZone[],
    camelCase: boolean = false
  ) => {
    const getSearchZone = searchZoneOptions(zoneObj)
    return getSearchZone && getLng(getSearchZone[0]?.zone, localeLng, camelCase)
  }

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

  const { data: itemsZoneList, isLoading: isItemZoneLoading } = useQuery(
    ['project_zone'],
    () => getZoneList()
  )

  const handleSubmit = (value: object) => {
    setFilterSelect({ ...value })

    onClose()
  }

  const handleSetFilters = (filter: any) => {
    handleSubmit(filter ? { ...filter } : { projectZone: '' })
  }

  const handleZoneChange = (zone: any) => {
    setZoneOptions(zone)
    handleSetFilters({
      zoneId: zone?.value,
      projectZone: zone?.label
    })
  }

  useEffect(() => {
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
          setAllZone(allZoneOptions) // for search filter language
        }
        return true
      })
      groupedOptions.unshift({
        label: '',
        options: [{ value: -1, label: t('propertyType.zone.allZone') }]
      })
    }
    setGroupedZoneOptions(groupedOptions)

    /* set zone default and set option when change from language */
    const zoneSearch: IAllZone[] = searchZoneOptions(allZoneOptions)
    const tSearch = getZoneOptionTranslate(zoneSearch, true)
    setZoneOptions({
      value: zoneId ? zoneSearch[0]?.id : -1,
      label:
        zoneId && zoneSearch[0]?.id !== -1
          ? tSearch('name')
          : t('propertyType.zone.allZone')
    })
  }, [itemsZoneList, locale])

  useEffect(() => {
    // if close dropdown but not hit submit then set filter to previous value

    if (!isOpen) {
      /* set option when change from mobile area */
      const zoneSearch: IAllZone[] = searchZoneOptions(allZone)
      const tSearch = getZoneOptionTranslate(zoneSearch, true)
      setZoneOptions({
        value: zoneId ? zoneSearch[0]?.id : -1,
        label: zoneId ? tSearch('name') : t('propertyType.zone.allZone')
      })
    }
  }, [isOpen, zoneId])

  useEffect(() => {
    const zoneSelected = allZone?.find(
      (zone: IAllZone) => zone?.id === zoneId
    ) as IAllZone

    handleSetFilters({
      zoneId,
      projectZone: getLng(zoneSelected?.zone, localeLng, true)('name')
    })
    setZoneOptions({
      value: zoneId || -1,
      label:
        getLng(zoneSelected?.zone, localeLng, true)('name') ||
        t('propertyType.zone.allZone')
    })
  }, [zoneId, allZone])

  return (
    <DropdownListContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={zoneOptions?.value !== -1 || false}
      textList={[zoneOptions?.label || '']}
      placeholder={placeholder}
      sizeWidth={sizeWidth}
    >
      <Container className='px-3 py-2'>
        <div className='display-12 mb-2  px-1'>{titleText}</div>
        <Row className='m-0'>
          <Col>
            <Select<IProjectZoneOption, true, IGroupedOption>
              instanceId='projectZoneId'
              className='bn-form-select-container'
              placeholder={t('propertyType.zone.locationPlaceholder')}
              isClearable
              isSearchable
              value={zoneOptions}
              onChange={(value) => handleZoneChange(value)}
              options={groupedZoneOptions}
              formatGroupLabel={formatGroupLabel}
            />
          </Col>
        </Row>
      </Container>
    </DropdownListContainer>
  )
}

DropdownZoneList.defaultProps = {
  placeholder: '',
  titleText: '',
  zoneId: null,
  sizeWidth: '',
  locale: ''
}
DropdownZoneList.propTypes = {
  placeholder: PropTypes.string,
  titleText: PropTypes.string,
  zoneId: PropTypes.number,
  sizeWidth: PropTypes.string,
  setFilterSelect: PropTypes.func.isRequired,
  locale: PropTypes.string
}
export default DropdownZoneList
