import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Container } from 'react-bootstrap'
import useDisclosure from 'hooks/useDisclosure'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import { getZoneList } from 'services/job'
import { getLng, getLngArr } from 'utils/getLng'
import {
  IProjectZoneOption,
  IGroupedOption,
  IProjectZone,
  IAllZone,
  IProjectGetZone
} from 'interfaces/JobZoneList'
import Select from 'react-select'
import { groupBadgeStyles, groupStyles, StyleWrapper } from './style'
import DropdownContainer from '../DropdownContainer'

interface IFilterList {
  titleText?: string
  projectZone?: string
  onSubmitFilter: Function
  locale?: string | undefined
}

const DropdownZoneList: FC<IFilterList> = ({
  titleText,
  projectZone,
  onSubmitFilter,
  locale
}) => {
  const { t } = useTranslation()
  const localeLng = locale?.toUpperCase() || 'TH'
  const { isOpen, onToggle, onClose } = useDisclosure(false)
  const [filters, setFilters] = useState({ projectZone })
  const [groupedZoneOptions, setGroupedZoneOptions] = useState<
    IGroupedOption[]
  >([])
  const [zoneOptions, setZoneOptions] = useState<IProjectZoneOption[]>([])
  const [allZone, setAllZone] = useState<IAllZone[]>([])

  const searchZoneOptions = () =>
    allZone?.filter(
      (v: IAllZone) =>
        v.zone?.nameTh === projectZone ||
        v.zone?.nameEn === projectZone ||
        v.zone?.nameCn === projectZone
    )

  const getZoneOptionTranslate = (camelCase: boolean = false) => {
    const getSearchZone = searchZoneOptions()
    return getSearchZone && getLng(getSearchZone[0]?.zone, localeLng, camelCase)
  }
  const haveFilter = getZoneOptionTranslate(true)('name')

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

  const handleSubmit = (filter: object) => {
    onSubmitFilter({ ...filter })
    onClose()
  }

  const handleSetFilters = (filter: object) => {
    setFilters((previousFilter) => ({ ...previousFilter, ...filter }))
    handleSubmit(filter)
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

      const tZoneList = titleZoneList && getLngArr(titleZoneList, localeLng)

      titleZoneList?.map((item: IProjectGetZone, indexZone: number) => {
        if (item?.zone?.length > 0) {
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
    setFilters({ projectZone })

    // for change option selected language
    if (projectZone) {
      const tSearch = getZoneOptionTranslate(true)
      setZoneOptions([
        {
          value: projectZone ? searchZoneOptions()[0]?.id : -1,
          label: projectZone ? tSearch('name') : t('propertyType.zone.allZone')
        }
      ])
    }
  }, [itemsZoneList, locale])

  useEffect(() => {
    // if close dropdown but not hit submit then set filter to previous value
    if (!isOpen && filters.projectZone !== projectZone) {
      setFilters({ projectZone })

      /* set option when change from mobile area */
      const zoneSearch: IAllZone[] = searchZoneOptions()
      const tSearch = getZoneOptionTranslate(true)
      setZoneOptions([
        {
          value: projectZone ? zoneSearch[0]?.id : -1,
          label: projectZone ? tSearch('name') : t('propertyType.zone.allZone')
        }
      ])
    }
  }, [isOpen, projectZone])

  return (
    <DropdownContainer
      onToggle={onToggle}
      isOpen={isOpen}
      haveFilter={!!haveFilter}
      textList={haveFilter || ''}
      defaultText={t('propertyType.zone.zonePlaceholder')}
    >
      <Container className='px-3 py-2'>
        <div className='display-12 mb-2  px-1'>{titleText}</div>
        <Row className='m-0'>
          <Col>
            <StyleWrapper>
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
            </StyleWrapper>
          </Col>
        </Row>
      </Container>
    </DropdownContainer>
  )
}

DropdownZoneList.defaultProps = {
  titleText: '',
  projectZone: '',
  locale: ''
}
DropdownZoneList.propTypes = {
  titleText: PropTypes.string,
  projectZone: PropTypes.string,
  onSubmitFilter: PropTypes.func.isRequired,
  locale: PropTypes.string
}
export default DropdownZoneList
