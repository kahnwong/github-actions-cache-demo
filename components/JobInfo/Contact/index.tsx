import { FC, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Form } from 'react-bootstrap'
import Link from 'next/link'
import FormSelect from 'components/Form/Select'
import FormInput from 'components/Form/Input'
import FormCheckbox from 'components/Form/Checkbox'
import FormButton from 'components/Form/Button'
import { IOptions } from 'interfaces/Form'
import Title from 'components/JobInfo/Title'
import { successAlert, loadingAlert, failedAlert } from 'components/Alert'

import { useTranslation } from 'react-i18next'
import { IContactRequest, IContactError } from 'interfaces/Contact'
import { postContact } from 'services/contact'
import { Wrapper, ContactForm, BottomText } from './style'

interface IContact {
  id?: string
  backgroundColor?: string
  theme?: string
  jobId?: string
  agentId?: string | null
  platform?: string
}

const Contact: FC<IContact> = ({
  id,
  backgroundColor,
  theme,
  jobId,
  agentId,
  platform
}) => {
  const [form, setForm] = useState<IContactRequest>({})
  const [formErrors, setFormErrors] = useState<IContactError>({})
  const [formCheckbox, setFormCheckbox] = useState<boolean>(false)
  const [selectBudget, setSelectBudget] = useState<IOptions[]>([])

  const { t } = useTranslation()
  useEffect(() => {
    setSelectBudget([
      {
        label: t('jobinfo.contact.budgetSelected1'),
        value: '<2M'
      },
      {
        label: t('jobinfo.contact.budgetSelected2'),
        value: '2-5M'
      },
      {
        label: t('jobinfo.contact.budgetSelected3'),
        value: '>5M'
      }
    ])
    setForm({
      ...form,
      job: jobId,
      agent: agentId,
      plat: platform,
      budget: '<2M'
    })
  }, [jobId])
  const checkboxLabel = (
    <>
      {t('jobinfo.contact.privacy')}{' '}
      <Link href='/privacy'>
        <a style={{ color: theme ?? '#22bb66' }} target='_blank'>
          {t('jobinfo.contact.privacyLink')}*
        </a>
      </Link>
    </>
  )
  const handleChange = (key: string, value: string | number) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const checkName = (): string | undefined => {
    if (!form.name) {
      return t('jobinfo.contact.required')
    }
    return undefined
  }

  const checkPhone = (): string | undefined => {
    if (!form.phone) {
      return t('jobinfo.contact.required')
    }
    if (!form.phone.match(/^\(?([0]{1})\)?([0-9]{9})$/)) {
      return t('jobinfo.contact.phoneFormat')
    }
    return undefined
  }
  const checkEmail = (): string | undefined => {
    if (!form.email) {
      return t('jobinfo.contact.emailFormat')
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return t('jobinfo.contact.emailFormat')
    }

    return undefined
  }
  const handleOnSubmit = async () => {
    const name = checkName()
    const phone = checkPhone()
    const email = checkEmail()
    setFormErrors({
      name,
      phone,
      email
    })
    if (!name && !phone && !email) {
      try {
        loadingAlert()
        await postContact(form)
        setForm({
          job: jobId,
          agent: agentId,
          plat: platform,
          name: '',
          phone: '',
          email: '',
          budget: '<2M'
        })
        setFormCheckbox(false)
        successAlert(
          {
            title: t('jobinfo.contact.responseSuccess')
          },
          { small: true }
        )
      } catch (err) {
        failedAlert({ title: t('jobinfo.contact.responseError') })
      }
    }
  }

  return (
    <Wrapper id={id} backgroundColor={backgroundColor ?? '#fff'}>
      <ContactForm>
        <Title text={t('jobinfo.contact.title')} underLineColor={theme} />
        <Row className='mt-5'>
          <Col md={12} lg={6}>
            <FormInput
              label={t('jobinfo.contact.name')}
              error={formErrors?.name}
              required
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Col>
          <Col md={12} lg={6}>
            <FormSelect
              label={t('jobinfo.contact.budget')}
              helper={t('jobinfo.contact.budgetDescription')}
              options={selectBudget}
              value={form.budget}
              theme={theme}
              change={(value: IOptions) => handleChange('budget', value.value)}
              mapOptions
              instanceId={`budget - contact-${id}`}
            />
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col md={12} lg={6}>
            <FormInput
              label={t('jobinfo.contact.phone')}
              error={formErrors?.phone}
              required
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Col>
          <Col md={12} lg={6}>
            <FormInput
              label={t('jobinfo.contact.email')}
              error={formErrors?.email}
              required
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>
              {formErrors?.email}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col>
            <FormCheckbox
              color={theme}
              label={checkboxLabel}
              checked={formCheckbox}
              onChange={(e) => setFormCheckbox(e.target.checked)}
            />
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col className='d-flex justify-content-center'>
            <FormButton
              color={theme}
              text-color='#000'
              disabled={!formCheckbox}
              onClick={handleOnSubmit}
            >
              {t('jobinfo.contact.title')}
            </FormButton>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col className='text-center'>
            <BottomText
              theme={theme}
              href='https://docs.google.com/forms/d/e/1FAIpQLSdjiRF5vc7bIlhKcgLQV5jbIvT2MmiczwtOvB3ps1C5fXp4aA/viewform '
              target='_blank'
            >
              {t('jobinfo.contact.interestedOtherProjects')}?
            </BottomText>
          </Col>
        </Row>
      </ContactForm>
    </Wrapper>
  )
}

Contact.defaultProps = {
  id: undefined,
  backgroundColor: '#ffffff',
  theme: '#000',
  platform: '',
  agentId: null
}
Contact.propTypes = {
  id: PropTypes.string,
  backgroundColor: PropTypes.string,
  theme: PropTypes.string,
  jobId: PropTypes.string.isRequired,
  agentId: PropTypes.string,
  platform: PropTypes.string
}

export default Contact
