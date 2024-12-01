import Head from 'next/head'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Container, Form, Row, Col, Card } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import { useTranslation } from 'react-i18next'

import PrivateLayout from 'layouts/PrivateLayout'
import { useUser } from 'contexts/userContext'
import Button from 'components/Button'
import withPrivate from 'hocs/withPrivate'
import Profile from 'components/Profile'
import Select from 'react-select'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'
import { useQuery, useMutation } from 'react-query'
import toast, { Toaster } from 'react-hot-toast'
import { getUserCareer, updateUserProfile } from 'services/user'
import { IUserDispatch } from 'contexts/userContext/type'
import { IOccupation, IUser, IUserCareer } from 'interfaces/User'
import { GENDER_LIST } from './constants'
import { getLngArr } from '../../utils/getLng'

const Account = () => {
  const { t } = useTranslation()
  const {
    state: { user, language },
    dispatch
  } = useUser()

  const tGender = GENDER_LIST && getLngArr(GENDER_LIST, language.toUpperCase())

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm<Partial<IUser>>({ mode: 'onBlur' })

  const { data: itemUserCareer, isLoading: isUserCareerLoading } = useQuery(
    ['user_career'],
    () => getUserCareer()
  )

  const optionsOptions: IOccupation[] = []
  if (itemUserCareer && itemUserCareer?.data.payload && !isUserCareerLoading) {
    const dataItemCareer = itemUserCareer?.data.payload
    const tCareer =
      optionsOptions && getLngArr(dataItemCareer, language.toUpperCase())
    if (dataItemCareer) {
      dataItemCareer?.map((item: IUserCareer, index) => {
        optionsOptions.push({
          value: item?.id ? item?.id : 0,
          label: tCareer('name', index)
        })
        return true
      })
    }
  }

  const [isBirthDay, setIsBirthDay] = useState(false)
  const [isOccOther, setOccOther] = useState(false)
  const [isValidOcc, setIsValidOcc] = useState(false)
  const [birthday, setBirthday] = useState<Value>(new DateObject())
  const [valueCareer, setValueCareer] = useState({ id: 0 })

  const currentDateFormat = (valDate: any = new Date()) => {
    const currentDate = valDate
    const day = currentDate.getDate().toString().padStart(2, '0')
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (date: any) => {
    const newDate = date ? date.format('YYYY-MM-DD', ['Date']) : null
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const currentDay = currentDateFormat()
    setIsBirthDay(false)
    if (dateRegex.test(newDate) && newDate < currentDay) {
      setIsBirthDay(true)
    }
    setValue('birthday', newDate)
  }

  const handleOccupationChange = (event: any) => {
    if (event.value === 9) {
      setValue('careerOther', '')
      setOccOther(true)
    } else {
      setOccOther(false)
      setValue('careerOther', '')
      setValue('career', { id: 0 })
    }
    setIsValidOcc(true)
    setValueCareer({ id: event.value })
    setValue('career', { id: event.value })
  }

  const checkValidDate = (value: any) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const currentDay = currentDateFormat()
    return (
      (dateRegex.test(value) && value < currentDay) ||
      `${t('userProfile.birthdayMessageError')}`
    )
  }

  const updateUserMutation = useMutation(
    ({ data }: { data: Partial<IUser> }) => updateUserProfile(data),
    {
      onSuccess: (response) => {
        const newUserData: Partial<IUser> = {
          contactPhone: response.data.payload?.contactPhone,
          loginEmail: response.data.payload?.loginEmail,
          contactEmail: response.data.payload?.contactEmail,
          gender: response.data.payload?.gender,
          career: response.data.payload?.career,
          careerOther: response.data.payload?.careerOther,
          birthday: response.data.payload?.birthday,
          profileFilled: true
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
  const onSubmit = handleSubmit(async (submittedData: Partial<IUser>) => {
    const birthdayNew = submittedData?.birthday
      ? new Date(submittedData?.birthday.toString())
      : ''
    const birthdayNewFormat = birthdayNew
      ? new Date(currentDateFormat(birthdayNew)).toISOString()
      : ''
    const getGender =
      submittedData.gender === 'N' ? null : submittedData?.gender

    if (user && !isEmpty(user) && birthdayNewFormat) {
      const data: Partial<IUser> = {
        phone: submittedData.contactPhone,
        gender: getGender,
        career: submittedData?.career,
        careerOther: submittedData?.careerOther,
        birthday: birthdayNewFormat
      }
      if (isEmpty(user?.contactEmail)) {
        data.contactEmail = submittedData?.contactEmail
      }

      updateUserMutation.mutate({
        data
      })
    }
  })

  useEffect(() => {
    const careerId = user?.career?.id ? user?.career?.id : 0
    const genderDefault: string = user?.gender ? user?.gender : 'N'
    if (user?.birthday) {
      const strBirthday: string = user?.birthday.toString()
      const newBirthday = new Date(strBirthday)
      const newSetBirthday = currentDateFormat(newBirthday)
      setBirthday(newBirthday)
      setValue('birthday', newSetBirthday)
    } else {
      setBirthday(null)
      setValue('birthday', '')
    }

    setValueCareer({ id: careerId })
    setValue('contactEmail', user?.contactEmail)
    setValue(
      'contactPhone',
      user?.contactPhone ? user?.contactPhone : user?.phone
    )
    setValue('gender', genderDefault)
    setValue('career', { id: careerId })
    setValue('careerOther', user?.careerOther)
    if (careerId === 9) {
      setOccOther(true)
    }
  }, [user])

  return (
    <PrivateLayout useBackButton title={t('userProfile.headerTitle')}>
      <Head>
        <title>{t('userProfile.headerTitle')}</title>
      </Head>
      <Container className='justify-content-center py-4 py-lg-5'>
        <div>
          <Toaster
            gutter={24}
            toastOptions={{
              className: '',
              duration: 5000,
              success: {
                duration: 5000
              }
            }}
          />
        </div>
        <Card>
          <Card.Body className='pt-3 pt-sm-5 pb-5'>
            <Row className='justify-content-center'>
              <Col lg={9}>
                <Row className='mb-3'>
                  <Col>
                    <h4 className='d-none d-lg-block h4 mb-4'>
                      {t('userProfile.headerTitle')}{' '}
                    </h4>
                  </Col>
                </Row>
                <Row className='mb-3 text-start'>
                  <Col>
                    <Profile
                      position='head'
                      className='mb-3 text-start col-12 col-md-6'
                      name={user?.name}
                      image={user?.picture}
                      id={user?.id}
                    />
                  </Col>
                </Row>
                <Form onSubmit={onSubmit} className='pe-sm-4 fs-13'>
                  <Row>
                    <Col>
                      <Form.Label className='bn-form-label'>
                        {t('userProfile.email')}
                      </Form.Label>
                      <Form.Control
                        className='bn-form-control'
                        type='email'
                        placeholder='name@example.com'
                        disabled={!isEmpty(user?.contactEmail)}
                        isInvalid={!!errors?.contactEmail}
                        {...register('contactEmail', {
                          required: {
                            value: true,
                            message: t('userProfile.emailRequired')
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z\d.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:.[a-zA-Z\d-]+)*$/,
                            message: t('userProfile.emailMessageError')
                          }
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.contactEmail?.message}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col>
                      <Form.Label>{t('userProfile.phone')}</Form.Label>
                      <Form.Control
                        className='bn-form-control'
                        minLength={9}
                        maxLength={10}
                        isInvalid={!!errors?.contactPhone}
                        {...register('contactPhone', {
                          required: {
                            value: true,
                            message: t('userProfile.phoneRequired')
                          },
                          pattern: {
                            value: /^(0)(\d{9})$/,
                            message: t('userProfile.phoneMessageError')
                          }
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors?.contactPhone?.message}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className='d-block'>
                        <span className='bn-small bn-fade'>
                          {t('userProfile.emailAndPhoneMessage')}
                        </span>
                      </span>
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col>
                      <Form.Label>{t('userProfile.gender')}</Form.Label>
                      <div>
                        {GENDER_LIST?.map(({ value }, index) => (
                          <div
                            key={`gender-${index.toString()}`}
                            className='mb-3 d-inline'
                          >
                            <Form.Check
                              className='bn-form-check'
                              inline
                              value={value}
                              label={tGender('label', index)}
                              isInvalid={!!errors?.gender}
                              type='radio'
                              {...register('gender', {
                                required: {
                                  value: true,
                                  message: t('userProfile.genderRequired')
                                }
                              })}
                            />
                          </div>
                        ))}
                      </div>
                      <small className='text-danger'>
                        {errors?.gender?.message}
                      </small>
                    </Col>
                  </Row>
                  <Row className='pt-3'>
                    <Col lg={6}>
                      <Form.Label>{t('userProfile.career')}</Form.Label>
                      <Controller
                        control={control}
                        name='career'
                        rules={{
                          required: {
                            value: true,
                            message: t('userProfile.careerRequired')
                          },
                          validate: {
                            checkCareer: (value) =>
                              value?.id !== 0 || t('userProfile.careerRequired')
                          }
                        }}
                        render={() => (
                          <Select
                            instanceId='mainOccupation'
                            placeholder={`${t(
                              'userProfile.careerPlaceholder'
                            )}`}
                            className='bn-form-select-container'
                            onChange={(value) => handleOccupationChange(value)}
                            value={optionsOptions.filter(
                              (option: any) => option.value === valueCareer.id
                            )}
                            options={optionsOptions}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                  {(!isValidOcc || errors?.careerOther) && (
                    <Row>
                      <Col>
                        <small className='text-danger'>
                          {errors?.career && (errors.career as any).message}
                        </small>
                      </Col>
                    </Row>
                  )}
                  {isOccOther && (
                    <Row className='pt-3'>
                      <Col>
                        <Form.Label>{t('userProfile.careerOther')}</Form.Label>
                        <Form.Control
                          className='bn-form-control'
                          placeholder={t('userProfile.careerOtherRequired')}
                          isInvalid={!!errors?.careerOther}
                          {...register('careerOther', {
                            required: {
                              value: true,
                              message: t('userProfile.careerOtherMessageError')
                            },
                            validate: {
                              checkOccupation: (value) => {
                                const { career } = getValues()
                                return (
                                  (career?.id === 9 && value !== '') ||
                                  (career?.id !== 9 && value === '') ||
                                  t('userProfile.careerOtherMessageError')
                                )
                              }
                            }
                          })}
                        />
                        <small className='text-danger'>
                          {errors?.careerOther?.message}
                        </small>
                      </Col>
                    </Row>
                  )}

                  <Row className='pt-3'>
                    <Col>
                      <Form.Label>{t('userProfile.birthday')}</Form.Label>
                      <div className='col-12 col-sm-5'>
                        <Controller
                          control={control}
                          name='birthday'
                          defaultValue=''
                          rules={{
                            required: {
                              value: true,
                              message: t('userProfile.birthdayRequired')
                            },
                            validate: {
                              checkDate: (value) => checkValidDate(value)
                            }
                          }}
                          render={() => (
                            <DatePicker
                              placeholder={t('userProfile.birthdayPlaceholder')}
                              format='DD/MM/YYYY'
                              value={user?.birthday ? birthday : ''}
                              maxDate={new Date()}
                              onChange={(date) => handleDateChange(date)}
                            />
                          )}
                        />
                      </div>
                      {!isBirthDay && (
                        <small className='text-danger'>
                          {errors?.birthday?.message}
                        </small>
                      )}
                    </Col>
                  </Row>
                  <Row className='pt-5'>
                    <Col>
                      <Button type='submit' className='me-2 me-lg-3 mb-3 px-5'>
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

export default withPrivate(Account)
