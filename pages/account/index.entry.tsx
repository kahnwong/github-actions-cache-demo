import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Form, Row, Col, Alert } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import PrivateLayout from 'layouts/PrivateLayout'
import { useUser } from 'contexts/userContext'
import Button from 'components/Button'
import withPrivate from 'hocs/withPrivate'
import Profile from 'components/Profile'
import { updateUser } from 'services/user'
import { IUserDispatch } from 'contexts/userContext/type'
import { IUser } from 'interfaces/User'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { useMutation } from 'react-query'

const Account = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const {
    state: { user },
    dispatch
  } = useUser()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Partial<IUser>>()

  const updateUserMutation = useMutation(
    ({ data, userId }: { data: Partial<IUser>; userId: number }) =>
      updateUser(data, userId),
    {
      onSuccess: (response) => {
        const newUserData: Partial<IUser> = {
          contactEmail: response.data.payload?.contactEmail,
          contactPhone: response.data.payload?.contactPhone
        }
        dispatch({
          type: IUserDispatch.UPDATE_PROFILE,
          payload: { data: newUserData }
        })
        setShowAlert(true)
        setIsSuccess(true)
      },
      onError: () => {
        setShowAlert(true)
        setIsSuccess(false)
      },
      onSettled: () => {
        setTimeout(() => {
          setShowAlert(false)
        }, 3300)
      }
    }
  )

  const onSubmit = handleSubmit(async (submittedData: Partial<IUser>) => {
    if (user && !isEmpty(user)) {
      updateUserMutation.mutate({
        data: {
          contactEmail: submittedData.contactEmail,
          contactPhone: submittedData.contactPhone
        },
        userId: user.id
      })
    }
  })

  useEffect(() => {
    setValue('contactEmail', user?.contactEmail)
    setValue('contactPhone', user?.contactPhone)
  }, [user])

  return (
    <PrivateLayout useBackButton title='บัญชีของฉัน'>
      <Head>
        <title>บัญชีของฉัน</title>
      </Head>
      <Container className='d-flex justify-content-center py-4 py-lg-5'>
        <Row className='justify-content-center'>
          <Col>
            <Row className='mb-3'>
              <Col>
                <h4 className='d-none d-lg-block h4 mb-4'>บัญชีของฉัน</h4>
              </Col>
              {showAlert && (
                <Row className='mb-3 mx-auto'>
                  <Col md={{ span: 7, offset: 3 }}>
                    {isSuccess ? (
                      <Alert variant='success'>
                        <FiCheckCircle size={32} className='pe-2' />{' '}
                        อัปเดตข้อมูลเรียบร้อย
                      </Alert>
                    ) : (
                      <Alert variant='danger'>
                        <FiAlertCircle size={32} className='pe-2' />{' '}
                        ไม่สามารถอัปเดตข้อมูลได้
                      </Alert>
                    )}
                  </Col>
                </Row>
              )}
            </Row>
            <Row className='mb-3'>
              <Col>
                <Profile
                  position='head'
                  className='mb-3'
                  name={user?.name}
                  image={user?.picture}
                  id={user?.id}
                />
              </Col>
            </Row>
            <Form onSubmit={onSubmit}>
              <Row>
                <Col lg={3} className='text-lg-end'>
                  <Form.Label>อีเมล</Form.Label>
                </Col>
                <Col lg={7}>
                  <Form.Control
                    type='email'
                    placeholder='name@example.com'
                    isInvalid={!!errors?.contactEmail}
                    {...register('contactEmail', {
                      required: 'กรุณากรอก อีเมล'
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.contactEmail?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='pt-3'>
                <Col lg={3} className='text-lg-end'>
                  <Form.Label>เบอร์โทรศัพท์</Form.Label>
                </Col>
                <Col lg={7}>
                  <Form.Control
                    isInvalid={!!errors?.contactPhone}
                    maxLength={10}
                    {...register('contactPhone', {
                      required: 'กรุณากรอก เบอร์โทรศัพท์'
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.contactPhone?.message}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row>
                <Col lg={3} />
                <Col lg={7}>
                  <span className='d-block mb-3'>
                    <span className='bn-small bn-fade'>
                      กรุณากรอก อีเมล และเบอร์โทรศัพท์ของท่าน ให้ครบถ้วนสมบูรณ์
                      สำหรับให้เจ้าหน้าที่ติดต่อกลับหาท่าน
                      เพื่อรับส่วนแบ่งรายได้
                    </span>
                  </span>
                  <Button type='submit'>อัปเดต</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </PrivateLayout>
  )
}

export default withPrivate(Account)
