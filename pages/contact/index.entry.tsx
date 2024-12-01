import { Container, Card, Row, Col } from 'react-bootstrap'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import contactImage from 'public/assets/images/contact/contact.jpg'
import PrivateLayout from 'layouts/PrivateLayout'
import { FiMail, FiEdit3 } from 'react-icons/fi'
import { CONTACT_EMAIL } from 'config/contact'
import Button from 'components/Button'
import withPrivate from 'hocs/withPrivate'

const Contact = () => {
  const { t } = useTranslation()
  return (
    <PrivateLayout useBackButton title={t('contact.headerTitle')}>
      <Head>
        <title>{t('contact.headerTitle')}</title>
      </Head>
      <Container className='d-flex justify-content-center py-4 py-lg-5'>
        <Row className='justify-content-center'>
          <Col lg={8}>
            <Card>
              <div className='ratio ratio-21x9'>
                <Image
                  src={contactImage}
                  alt='contact-image'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <Card.Body className='text-center'>
                <h3>{t('contact.headerTitle')}</h3>
                <Card.Text>
                  <p className='small text-muted px-5'>
                    {t('contact.description')}
                  </p>
                  <p className='text-primary fw-light'>
                    <FiMail size={24} /> {CONTACT_EMAIL}
                  </p>
                  <p className='pt-3'>
                    <a href={`mailto:${CONTACT_EMAIL}`} rel='noreferrer'>
                      <Button className='px-4'>
                        <FiEdit3 /> {t('contact.writeAnEmail')}
                      </Button>
                    </a>
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PrivateLayout>
  )
}

export default withPrivate(Contact)
