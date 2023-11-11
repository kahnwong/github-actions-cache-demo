import withPrivate from 'hocs/withPrivate'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import PrivateLayout from 'layouts/PrivateLayout'
import { Container, Card } from 'react-bootstrap'
import { HeaderSection, AccordionWrapper } from './style'
import { useUser } from '../../contexts/userContext'
import { getLngFlex } from '../../utils/getLng'
import { useCompany } from '../../contexts/companyContext'

interface IQa {
  question: string
  answers: string[]
  highlight?: boolean
}

const Qa = () => {
  const { t } = useTranslation()
  const {
    state: { language }
  } = useUser()

  const {
    state: { FAQ_TH, FAQ_EN, FAQ_CN }
  } = useCompany()

  const tQaList = getLngFlex(
    { faqTh: FAQ_TH, faqEn: FAQ_EN, faqCn: FAQ_CN },
    language.toUpperCase(),
    true
  )
  return (
    <PrivateLayout useBackButton title='FAQ'>
      <Head>
        <title>{t('qa.header')}</title>
      </Head>
      <HeaderSection>
        <Container>
          <div className='py-4'>
            <h1 className='d-none d-main-block mb-0'>{t('qa.headerTitle')}</h1>
            <p className='mb-0'>{t('qa.headerSubTitle')}</p>
          </div>
        </Container>
      </HeaderSection>
      <Container>
        <AccordionWrapper defaultActiveKey='0' flush className='py-4 py-main-5'>
          {(tQaList('faq') as IQa[]).map(
            ({ question, answers, highlight }, key) => (
              <AccordionWrapper.Item eventKey={key.toString()} key={question}>
                <AccordionWrapper.Header>
                  <h6 className={highlight ? 'text-primary' : ''}>
                    {question}
                  </h6>
                </AccordionWrapper.Header>
                <Card className='py-1'>
                  <AccordionWrapper.Body className='fw-light p-0'>
                    <Card.Body className='pt-0'>
                      {answers.map((answer) => (
                        <div key={answer}>{answer}</div>
                      ))}
                    </Card.Body>
                  </AccordionWrapper.Body>
                </Card>
              </AccordionWrapper.Item>
            )
          )}
        </AccordionWrapper>
      </Container>
    </PrivateLayout>
  )
}

export default withPrivate(Qa)
