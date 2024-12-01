import Head from 'next/head'
import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import PrivateLayout from 'layouts/PrivateLayout'
import { Container, Form, Row, Col, Card, InputGroup } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import withPrivate from 'hocs/withPrivate'
import DatePicker, { DateObject, Value } from 'react-multi-date-picker'
import Button from 'components/Button'
import Select from 'react-select'
import toast, { Toaster } from 'react-hot-toast'
import { useUser } from 'contexts/userContext'
import { useMutation, useQuery } from 'react-query'
import {
  getUserInterestPropertyType,
  getUserInterestZone,
  getUserQuestionnaire,
  updateUserInterest
} from 'services/interest'
import { IAgentInfoZone, IUserInterestProperty, IUser } from 'interfaces/User'
import {
  IGroupedOption,
  IInterest,
  IInterestPropertySave,
  IUserInterestZone,
  IInterestZoneOption
} from 'interfaces/Interest'
import { getLng, getLngArr } from 'utils/getLng'
import { IUserDispatch } from '../../contexts/userContext/type'
import {
  fontSize16,
  submitButton,
  groupStyles,
  groupBadgeStyles
} from './style'
import { IBrokerList } from './constants'

const Interest = () => {
  const { t } = useTranslation()
  const {
    state: { user, language },
    dispatch
  } = useUser()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<Partial<IInterest>>({ mode: 'onBlur' })
  // query
  const { data: itemPropertyType, isLoading: isPropertyTypeLoading } = useQuery(
    ['interested_propertytype'],
    () => getUserInterestPropertyType()
  )
  const { data: itemZone, isLoading: isItemZoneLoading } = useQuery(
    ['zone'],
    () => getUserInterestZone()
  )

  const { data: brokerList } = useQuery(['broker_list'], () =>
    getUserQuestionnaire()
  )

  const BROKER_LIST = brokerList?.data.payload.map(
    (questionaire: IBrokerList) => {
      if (questionaire.id === 1) {
        return {
          ...questionaire,
          periodDetail: [
            {
              yearStart: 'เริ่มเป็นนายหน้าตั้งแต่ปี',
              yearTotal: 'ปัจจุบันเป็นนายหน้ามาแล้ว'
            }
          ]
        }
      }
      return {
        ...questionaire
      }
    }
  )

  // constant
  const [isSubBroker, setIsSubBroker] = useState(false)
  const [isErrorBrokerYear, setIsErrorBrokerYear] = useState(false)
  const [totalBrokerYear, setTotalBrokerYear] = useState('')
  const [isValidZone, setIsValidZone] = useState(false)
  const [zoneOptions, setZoneOptions] = useState<IInterestZoneOption[]>([])
  // const [propertyListOptions, setPropertyListOptions] = useState<
  //   IInterestProperty[]
  // >([])
  const [allZone, setAllZone] = useState<IAgentInfoZone[]>([])
  const [allProperty, setAllProperty] = useState<IUserInterestProperty[]>([])
  const [groupedZoneOptions, setGroupedZoneOptions] = useState<
    IGroupedOption[]
  >([])
  const [brokerYear, setBrokerYear] = useState<Value>(new DateObject() || null)
  const [btnSaveId, setBtnSaveId] = useState('interest')

  const formatGroupLabel = (data: IGroupedOption) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  )

  const tItemPropertyType =
    itemPropertyType?.data.payload &&
    getLngArr(itemPropertyType?.data.payload, language.toUpperCase())

  // update user
  const updateUserMutation = useMutation(
    ({ data }: { data: Partial<IInterest> }) => updateUserInterest(data),
    {
      onSuccess: (response) => {
        // map new zone into dispatch
        const responseZone = response.data.payload?.agentinfoZone
        const newAllZone: Array<any> = responseZone?.map(
          (item: any) => allZone.find((v: any) => v.id === item?.zone) as any
        )
        // map new property into dispatch
        const responseProperty = response.data.payload?.interestProperty
        const newAllProperty: Array<any> = responseProperty?.map(
          (item: any) =>
            allProperty.find(
              (v: any) => v.id === parseInt(item?.interestPropertyType, 10)
            ) as any
        )
        // dispatch into user
        const newUserData: Partial<IUser> = {
          brokerQuestionnaire: response.data.payload?.brokerQuestionnaire,
          agentinfoZone: newAllZone,
          interestProperty: newAllProperty,
          brokerYear: response.data.payload?.brokerYear,
          interestFilled: true
        }

        dispatch({
          type: IUserDispatch.UPDATE_PROFILE,
          payload: { data: newUserData }
        })
        toast.success(t('global.successUpdateMessage'), {
          className: 'bg-alert-success',
          style: {
            fontSize: '14px',
            color: 'rgba(0,0,0,0.99)'
          }
        })
      },
      onError: () => {
        toast.error(t('global.errorUpdateMessage'), {
          className: 'bg-alert-error',
          style: {
            fontSize: '14px',
            color: 'rgba(0,0,0,0.99)'
          }
        })
      },
      onSettled: () => {
        //
      }
    }
  )
  const onSubmit = handleSubmit((submittedData: Partial<IInterest>) => {
    if (user && !isEmpty(user)) {
      const mapZone: any = submittedData?.agentinfoZone?.map((item: any) => ({
        zone: item?.value
      }))
      const mapProperty: any = submittedData?.interestProperty?.map(
        (item: any) => ({
          interestPropertyType: item
        })
      )

      let BrokerYear: Date | string | null = null
      const BrokerFirstDay = submittedData?.brokerYear
      if (BrokerFirstDay) {
        const parseDate = parseInt(BrokerFirstDay.toString(), 10)
        const brokerFullYear = new Date(parseDate, 0, 1).setHours(10, 0, 0, 0)
        BrokerYear = new Date(brokerFullYear).toISOString()
      }
      updateUserMutation.mutate({
        data: {
          agentinfoZone: mapZone,
          interestProperty: mapProperty,
          brokerYear: BrokerYear,
          brokerQuestionnaire: { id: +submittedData.brokerQuestionnaire!.id }
        }
      })
    }
  })

  const addBrokerYearChange = (date: any) => {
    if (date) {
      const newYear: number = new Date(date).getFullYear()
      const dateRegex = /^(19|20)\d{2}$/
      const currentYear = new Date().getFullYear()
      setIsErrorBrokerYear(false)
      setTotalBrokerYear('')

      if (dateRegex.test(newYear.toString()) && newYear <= currentYear) {
        const isNaNYear = Number.isNaN(date)
        const calYear = !isNaNYear
          ? currentYear - parseInt(newYear.toString(), 10) + 1
          : ''

        setTotalBrokerYear(calYear.toString())
        setIsErrorBrokerYear(true)
      }

      setValue('brokerYear', newYear)
    } else {
      setValue('brokerYear', '')
    }
  }

  const handleBrokerChange = (value: number) => {
    if (value === 1) {
      setIsSubBroker(true)
      setIsErrorBrokerYear(false)
    } else {
      setIsSubBroker(false)
    }
    setValue('brokerYear', '')
    setBrokerYear('')
    setTotalBrokerYear('')
    setBtnSaveId(`interest-${value}`)
  }

  const checkValidBrokerYear = (value: any) => {
    const newYear = value
    const dateRegex = /^(19|20)\d{2}$/
    const currentYear = new Date().getFullYear()

    if (dateRegex.test(newYear) && newYear < currentYear) {
      setIsErrorBrokerYear(true)
    } else {
      setIsErrorBrokerYear(false)
    }
    return (
      (dateRegex.test(newYear) && newYear <= currentYear) ||
      t('userProfile.brokerYearMessageError')
    )
  }
  const handleBrokerYearChange = (date: any) => {
    const newYear = date ? date.format('YYYY', ['Date']) : null
    const dateRegex = /^(19|20)\d{2}$/
    const currentYear = new Date().getFullYear()
    setIsErrorBrokerYear(false)
    setTotalBrokerYear('')

    if (dateRegex.test(newYear) && newYear <= currentYear) {
      const isNaNYear = Number.isNaN(date)
      const calYear = !isNaNYear ? currentYear - parseInt(date, 10) + 1 : ''
      setTotalBrokerYear(calYear.toString())
      setIsErrorBrokerYear(true)
    }

    setValue('brokerYear', newYear)
  }

  const handleZoneChange = (zone: any) => {
    setValue('agentinfoZone', zone)
    setZoneOptions(zone)

    setIsValidZone(false)
    if (zone.length > 0) {
      setIsValidZone(true)
    }
  }

  const setTranslateZoneOptions = (
    objZoneOption: IInterestZoneOption[] | null
  ) => {
    const tZoneOptionLng =
      objZoneOption && getLngArr(objZoneOption, language.toUpperCase(), true)
    return objZoneOption?.map((item, index) => ({
      value: item?.value,
      label: tZoneOptionLng ? tZoneOptionLng('name', index) : item?.nameTh,
      nameTh: item?.nameTh || '',
      nameEn: item?.nameEn || '',
      nameCn: item?.nameCn || ''
    }))
  }

  useEffect(() => {
    if (
      zoneOptions?.length === 0 &&
      user?.agentinfoZone &&
      user?.agentinfoZone?.length > 0
    ) {
      const zoneList: IInterestZoneOption[] = []
      user?.agentinfoZone?.map((item: IAgentInfoZone) => {
        const tItemZoneLng =
          item?.zone && getLng(item?.zone, language.toUpperCase(), true)
        zoneList.push({
          value: item?.zone?.id,
          label: tItemZoneLng('name'),
          nameTh: item?.zone?.nameTh || '',
          nameEn: item?.zone?.nameEn || '',
          nameCn: item?.zone?.nameCn || ''
        })
        return true
      })
      if (zoneList?.length > 0) {
        setIsValidZone(true)
      }
      setZoneOptions(zoneList)
    }

    const defaultValuePropertyList: string[] = []
    if (user?.interestProperty && user?.interestProperty?.length > 0) {
      user?.interestProperty?.map((item: IUserInterestProperty) => {
        defaultValuePropertyList.push(item?.interestPropertyType?.id.toString())
        return true
      })
    }

    // property all zone
    const allPropertyOption: IUserInterestProperty[] = []
    if (
      itemPropertyType &&
      itemPropertyType?.data.payload &&
      !isPropertyTypeLoading
    ) {
      const dataItemProp = itemPropertyType?.data.payload
      if (dataItemProp) {
        dataItemProp?.map((item: IInterestPropertySave) => {
          allPropertyOption.push({
            id: item?.id,
            interestPropertyType: {
              id: item?.id,
              nameTh: item?.nameTh,
              nameEn: item?.nameEn,
              nameCn: item?.nameCn
            }
          })
          return true
        })
      }
    }
    setAllProperty(allPropertyOption)

    /* set zone default and set option when change from language */
    if (zoneOptions?.length > 0) {
      const tZoneOption = setTranslateZoneOptions(zoneOptions)
      if (tZoneOption) {
        setZoneOptions(tZoneOption)
      }
    }

    // Zone list
    const groupedOptions: IGroupedOption[] = []
    const allZoneOptions: IAgentInfoZone[] = []
    if (itemZone && itemZone?.data?.payload?.length && !isItemZoneLoading) {
      const titleZoneList = itemZone?.data?.payload
      const tZoneList =
        titleZoneList && getLngArr(titleZoneList, language?.toUpperCase())

      titleZoneList.map((item: any, indexZone: number) => {
        if (item?.zone?.length > 0) {
          const zoneList: IInterestZoneOption[] = []
          const tSubZoneList =
            item?.zone && getLngArr(item?.zone, language?.toUpperCase(), true)
          item?.zone?.map(
            (subItem: IUserInterestZone, indexSubZone: number) => {
              zoneList.push({
                value: subItem.id,
                label: tSubZoneList('name', indexSubZone),
                nameTh: subItem?.nameTh || '',
                nameEn: subItem?.nameEn || '',
                nameCn: subItem?.nameCn || ''
              })
              allZoneOptions.push({ id: subItem?.id, zone: subItem })
              return true
            }
          )
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
          setAllZone(allZoneOptions)
        }
        return true
      })
    }

    setGroupedZoneOptions(groupedOptions)

    const newBrokerYear = user?.brokerYear ? user?.brokerYear : ''
    if (newBrokerYear) {
      setBrokerYear(newBrokerYear)
      setValue('brokerYear', newBrokerYear)
      addBrokerYearChange(newBrokerYear)
    } else {
      setBrokerYear(null)
      setValue('brokerYear', '')
    }

    setValue(
      'brokerQuestionnaire.id',
      user?.brokerQuestionnaire?.id?.toString() || ''
    )
    setValue('agentinfoZone', zoneOptions)
    setValue('interestProperty', defaultValuePropertyList)

    if (user?.brokerQuestionnaire?.id === 1) {
      setIsSubBroker(true)
    }
  }, [user, itemPropertyType, itemZone, language])

  return (
    <PrivateLayout useBackButton title={t('interest.headerTitle')}>
      <Head>
        <title>{t('interest.headerTitle')}</title>
      </Head>
      <Container className='justify-content-center py-4 py-lg-5'>
        <Card>
          <Card.Body className='pt-3 pt-sm-5 pb-5'>
            <div>
              <Toaster
                gutter={24}
                toastOptions={{
                  duration: 3000
                }}
              />
            </div>
            <Row className='justify-content-center'>
              <Col lg={9}>
                <Row className='mb-0'>
                  <Col>
                    <h4 className='d-none d-lg-block h4 pe-md-4'>
                      {t('interest.headerTitle')}
                      <hr />
                    </h4>
                  </Col>
                </Row>
                <Form onSubmit={onSubmit} className='pe-md-4 fs-13'>
                  <Row className='pt-3'>
                    <Col>
                      <Form.Label>
                        {t('interest.broker')}
                        <span className='text-danger'>*</span>
                      </Form.Label>
                      {BROKER_LIST?.map(({ id, periodDetail }, index) => {
                        const tBrokerList =
                          BROKER_LIST &&
                          getLngArr(BROKER_LIST, language.toUpperCase(), true)
                        return (
                          <div key={`broker-${id}`} className='mb-2'>
                            <Form.Group
                              className='mb-3'
                              controlId='groupAreYouBroker'
                            >
                              <Form.Check
                                className='bn-form-check'
                                inline
                                label={tBrokerList('name', index)}
                                value={id}
                                type='radio'
                                id={id.toString()}
                                onClick={() => handleBrokerChange(id as number)}
                                isInvalid={!!errors?.brokerQuestionnaire?.id}
                                {...register('brokerQuestionnaire.id', {
                                  required: {
                                    value: true,
                                    message: t('interest.brokerMessageError')
                                  }
                                })}
                              />
                            </Form.Group>
                            {periodDetail && id === 1 && isSubBroker && (
                              <div className='pt-2 ps-5'>
                                <Row className='align-items-center'>
                                  <Col className='col-12 col-sm-4 bn-fade'>
                                    <Form.Label style={fontSize16}>
                                      {t('interest.brokerYearTotal')}
                                    </Form.Label>
                                  </Col>
                                  <Col className='col-12 col-sm-5'>
                                    <Controller
                                      control={control}
                                      name='brokerYear'
                                      defaultValue=''
                                      rules={{
                                        required: {
                                          value: true,
                                          message: t(
                                            'interest.brokerYearRequired'
                                          )
                                        },
                                        validate: {
                                          checkDate: (e) =>
                                            checkValidBrokerYear(e)
                                        }
                                      }}
                                      render={() => (
                                        <DatePicker
                                          placeholder={`${t(
                                            'interest.brokerYearPlaceholder'
                                          )}`}
                                          format='YYYY'
                                          maxDate={new Date()}
                                          onlyYearPicker
                                          value={
                                            user?.brokerYear ? brokerYear : ''
                                          }
                                          onChange={(year) =>
                                            handleBrokerYearChange(year)
                                          }
                                        />
                                      )}
                                    />
                                    {!isErrorBrokerYear && (
                                      <small className='text-danger'>
                                        {errors?.brokerYear?.message}
                                      </small>
                                    )}
                                  </Col>
                                </Row>
                                <Row className='pt-2 align-items-center'>
                                  <Col className='col-12 col-sm-4 bn-fade'>
                                    <Form.Label style={fontSize16}>
                                      {t('interest.HowManyYearsBroker')}
                                    </Form.Label>
                                  </Col>
                                  <Col className='col-12 col-sm-5 bn-fade'>
                                    <InputGroup className='mb-3'>
                                      <Form.Control
                                        className='bn-form-control'
                                        type='number'
                                        value={totalBrokerYear}
                                        aria-describedby='brokerYear'
                                        minLength={0}
                                        disabled
                                      />
                                      <InputGroup.Text
                                        id='brokerYear'
                                        style={fontSize16}
                                      >
                                        {t('interest.brokerYearPlaceholder')}
                                      </InputGroup.Text>
                                    </InputGroup>
                                  </Col>
                                </Row>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <small className='text-danger'>
                        {errors?.brokerQuestionnaire?.id &&
                          errors?.brokerQuestionnaire?.id.message}
                      </small>
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col>
                      <Form.Label>
                        {t('interest.interestZone')}
                        <span className='text-danger'>* </span>
                        <span className='bn-small bn-fade'>
                          {t('interest.interestZoneDescription')}
                        </span>
                      </Form.Label>
                      <Controller
                        control={control}
                        name='agentinfoZone'
                        rules={{
                          required: {
                            value: true,
                            message: t('interest.interestZoneRequired')
                          }
                        }}
                        render={() => (
                          <Select<IInterestZoneOption, true, IGroupedOption>
                            instanceId='zoneInterest'
                            className='bn-form-select-container'
                            placeholder={`${t(
                              'interest.interestZonePlaceholder'
                            )}`}
                            closeMenuOnSelect={false}
                            isMulti
                            value={zoneOptions}
                            onChange={handleZoneChange}
                            isOptionDisabled={() => zoneOptions.length === 5}
                            options={groupedZoneOptions}
                            formatGroupLabel={formatGroupLabel}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  {!isValidZone && (
                    <Row>
                      <Col>
                        <small className='text-danger'>
                          {errors?.agentinfoZone &&
                            (errors.agentinfoZone as any).message}{' '}
                        </small>
                      </Col>
                    </Row>
                  )}
                  <Row className='pt-3'>
                    <Col>
                      <Form.Label>
                        {t('interest.realEstateInterest')}
                        <span className='text-danger'>* </span>
                        <span className='bn-small bn-fade  d-block d-sm-inline'>
                          {t('interest.realEstateInterestDescription')}
                        </span>
                      </Form.Label>
                      <Row>
                        <Col>
                          <Form.Group
                            className='mb-3'
                            controlId='groupProperty'
                          >
                            {tItemPropertyType &&
                              itemPropertyType?.data.payload &&
                              itemPropertyType?.data.payload?.map(
                                (item, index) => (
                                  <div
                                    key={`prop-type-${index.toString()}`}
                                    className='d-sm-inline  mx-3'
                                  >
                                    <Form.Check
                                      className='col-6 col-sm-6 col-md-3 bn-form-check text-nowrap'
                                      inline
                                      value={item?.id}
                                      label={tItemPropertyType('name', index)}
                                      type='checkbox'
                                      id={`property-${item?.id}`}
                                      isInvalid={!!errors?.interestProperty}
                                      {...register('interestProperty', {
                                        required: {
                                          value: true,
                                          message: t(
                                            'interest.realEstateInterestRequired'
                                          )
                                        }
                                      })}
                                    />
                                  </div>
                                )
                              )}
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <small className='text-danger'>
                        {errors?.interestProperty &&
                          (errors.interestProperty as any).message}
                      </small>
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col>
                      <Button
                        type='submit'
                        className='mb-3'
                        style={submitButton}
                        id={btnSaveId}
                      >
                        {t('global.button.submit')}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </PrivateLayout>
  )
}

export default withPrivate(Interest)
