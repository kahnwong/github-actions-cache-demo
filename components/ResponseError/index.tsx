import i18next from 'i18n'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { FC } from 'react'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { Title, Description, Button } from './style'

interface IResponseError {
  statusCode?: number
}

const ResponseError: FC<IResponseError> = ({ statusCode }) => {
  if (!i18next.language) {
    i18next.changeLanguage(
      (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) ||
        'th'
    )
  }

  const { t } = useTranslation()

  const { push } = useRouter()

  return (
    <Container className='vh-100 d-flex flex-main-row align-items-center justify-content-center'>
      <Row>
        <Col className='d-flex flex-column p-5 align-items-center justify-content-center'>
          <Title>{t(`responseError.${statusCode}.title`)}</Title>
          <Description>
            {t(`responseError.${statusCode}.description`)}
          </Description>

          <Button onClick={() => push('/')}>
            {t(`responseError.${statusCode}.button`)}
          </Button>
        </Col>
        <Col lg={6} sm={12} className='d-flex justify-content-center'>
          <Image
            src='/assets/images/error.png'
            alt='Error'
            width={450}
            height={395}
          />
        </Col>
      </Row>
    </Container>
  )
}

ResponseError.propTypes = {
  statusCode: PropTypes.number.isRequired
}

export default ResponseError
