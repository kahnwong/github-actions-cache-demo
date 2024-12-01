import Image from 'next/image'
import PropTypes from 'prop-types'
import { Button, Form, Modal } from 'react-bootstrap'
import { isEmpty } from 'lodash'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useTranslation } from 'react-i18next'
// types
import type { FC } from 'react'
import type { IReqLogin } from 'services/authenticate'
// services
import { IUserDispatch } from 'contexts/userContext/type'
import { login } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
// assets

import { COOKIE_NAME, DAYS } from 'config/constant'
import { ModalHeader } from './style'
import { useCompany } from '../../../../contexts/companyContext'

interface IProps {
  show: boolean
  onHide: () => void
}

const LoginModal: FC<IProps> = (props: IProps) => {
  const { t } = useTranslation()
  const { show, onHide } = props
  const { push } = useRouter()
  const { dispatch } = useUser()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IReqLogin>()

  const {
    state: { companyLogo, companyNameEn }
  } = useCompany()

  const onSubmit = async (data: IReqLogin) => {
    const user = await login(data)
    if (!isEmpty(user) && user) {
      dispatch({ type: IUserDispatch.LOGIN, payload: { user } })
      localStorage.setItem('token', user.token)
      const token = { token: user.token }
      nookies.set(undefined, COOKIE_NAME, JSON.stringify(token), {
        maxAge: 30 * DAYS
      })
      push('/')
      onHide()
    } else {
      dispatch({ type: IUserDispatch.LOGOUT })
      setError('email', { type: 'validate' })
      setError('password', { type: 'validate' })
    }
  }

  return (
    // @ts-ignore
    <Modal show={show} onHide={onHide} centered fullscreen='main-down'>
      <ModalHeader closeButton />
      <Modal.Body className='p-4 p-main-5'>
        <div className='text-center h4 mb-4'>
          <Image
            src={companyLogo}
            alt={`${companyNameEn} logo`}
            height={40}
            width={130}
          />
          <div>{t('loginModal.headerTitle')}</div>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId='email' className='mb-2'>
            <Form.Label>{t('loginModal.email')}</Form.Label>
            <Form.Control
              type='email'
              placeholder={t('loginModal.placeholderEmail')}
              autoComplete='email'
              isInvalid={!isEmpty(errors.email)}
              {...register('email', { required: true })}
            />
            <Form.Control.Feedback type='invalid'>
              {t('loginModal.emailValid')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='password' className='mb-5'>
            <Form.Label>{t('loginModal.password')}</Form.Label>
            <Form.Control
              type='password'
              placeholder={t('loginModal.placeholderPassword')}
              autoComplete='current-password'
              isInvalid={!isEmpty(errors.password)}
              {...register('password', { required: true })}
            />
            <Form.Control.Feedback type='invalid'>
              {t('loginModal.passwordValid')}
            </Form.Control.Feedback>
          </Form.Group>
          <div className='d-grid mb-3'>
            <Button variant='secondary' type='submit'>
              {t('loginModal.buttonSubmit')}
            </Button>
          </div>
          {/* <p className='fs-6 text-center'>
            ยังไม่มีบัญชี Baania ?{' '}
            <a
              href='https://www.baania.com/register'
              target='_blank'
              rel='noreferrer'
            >
              สมัครสมาชิกใหม่
            </a>
            <br />
            <span className='text-dark fw-bold fst-italic'>
              สมัครฟรี... ไม่มีค่าใช้จ่าย
            </span>
          </p> */}
        </Form>
      </Modal.Body>
    </Modal>
  )
}

LoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default LoginModal
