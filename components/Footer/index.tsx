import { Col, Container, Row } from 'react-bootstrap'

import { FiMail, FiPhone } from 'react-icons/fi'
import { SiFacebook, SiLine } from 'react-icons/si'
import { useTranslation } from 'react-i18next'
import { FooterWrapper, FooterBottom, FooterTop } from './style'
import { useCompany } from '../../contexts/companyContext'
import { getLngFlex } from '../../utils/getLng'
import { useUser } from '../../contexts/userContext'

const Footer = () => {
  const { t } = useTranslation()
  const {
    state: {
      companyEmail,
      companyPhoneNumber,
      lineLink,
      facebookLink,
      companyAddressPrimaryTh,
      companyAddressPrimaryEn,
      companyAddressSecondaryTh,
      companyAddressSecondaryEn
    }
  } = useCompany()

  const {
    state: { language }
  } = useUser()

  const tCompanyAddressPrimary = getLngFlex(
    { companyAddressPrimaryTh, companyAddressPrimaryEn },
    language.toUpperCase(),
    true
  )
  const tCompanyAddressSecondary = getLngFlex(
    { companyAddressSecondaryTh, companyAddressSecondaryEn },
    language.toUpperCase(),
    true
  )
  return (
    <FooterWrapper>
      <FooterTop>
        <Container>
          <Row xs={1} lg={3} className='align-items-start py-4'>
            <Col className='text-start'>
              <div className='fs-6 py-2'>{t('footer.contactUs.headTitle')}</div>
              <div
                className='pre-line'
                dangerouslySetInnerHTML={{
                  __html: tCompanyAddressPrimary('companyAddressPrimary') || ''
                }}
              />
              <div
                className='pt-3 pre-line'
                dangerouslySetInnerHTML={{
                  __html:
                    tCompanyAddressSecondary('companyAddressSecondary') || ''
                }}
              />
            </Col>
            <Col>
              <div className='row justify-content-lg-end pt-3 pt-main-4 '>
                <div className='col-auto'>
                  <div className='d-flex gap-3 pb-2 pt-3'>
                    <a
                      href={`mailto:${companyEmail}`}
                      className='link-light'
                      aria-label='mail'
                    >
                      <FiMail size='20' />
                      <span className='ms-3 text-decoration-underline'>
                        {companyEmail}
                      </span>
                    </a>
                  </div>
                  <div className='d-flex gap-3'>
                    <a
                      href={`tel:${companyPhoneNumber}`}
                      target='_blank'
                      rel='noreferrer'
                      className='link-light'
                      aria-label='phone'
                    >
                      <FiPhone size='20' />
                      <span className='ms-3'>
                        {companyPhoneNumber.replace(
                          /(\d{3})(\d{3})(\d{4})/,
                          '$1-$2-$3'
                        )}
                      </span>
                    </a>
                  </div>
                  <div className='pt-4 pb-2'>
                    <a
                      href='/privacy'
                      target='_blank'
                      rel='noreferrer'
                      className='link-light'
                      aria-label='phone'
                    >
                      {t('footer.privacy')}
                    </a>
                  </div>
                  <div>
                    <a
                      href='/terms'
                      target='_blank'
                      rel='noreferrer'
                      className='link-light'
                      aria-label='phone'
                    >
                      {t('footer.terms')}
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className='row justify-content-lg-end pt-4 pt-main-0'>
                <div className='col-auto text-center'>
                  <div className=' fs-6 py-2 d-inline d-lg-block'>
                    {t('footer.followUs.headerTitle')}
                  </div>
                  <span>
                    <a
                      href={lineLink}
                      target='_blank'
                      rel='noreferrer'
                      className='link-light  ms-3'
                      aria-label='line'
                    >
                      <SiLine size='24' />
                    </a>
                    <a
                      href={facebookLink}
                      target='_blank'
                      rel='noreferrer'
                      className='link-light mx-3'
                      aria-label='facebook'
                    >
                      <SiFacebook size='24' />
                    </a>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </FooterTop>
      <FooterBottom>
        <Container className='d-flex flex-column flex-main-row align-items-center justify-content-center'>
          <div className='fw-light text-center small'>
            {t('footer.copyRight')}
          </div>
        </Container>
      </FooterBottom>
    </FooterWrapper>
  )
}

export default Footer
