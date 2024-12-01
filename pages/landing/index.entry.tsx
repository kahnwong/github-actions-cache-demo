import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'
import LandingLayout from 'layouts/LandingLayout'
import Button from 'components/Button'
import Head from 'next/head'
import Link from 'next/link'
// import { DOMAIN_NAME } from 'config/environment'
import { IHighlightInfo } from 'interfaces/WeeklyHighlight'
import { getWeeklyHighlight } from 'services/weeklyHighlight'
import { getLng, getLngArr } from 'utils/getLng'
import { useUser } from 'contexts/userContext'
import userIcon from 'public/assets/images/landing/user-icon.png'
import backToTop from 'public/assets/images/landing/back-to-top.png'
import ogImage from 'public/assets/images/prop2share.jpg'
import CssFilterConverter from 'css-filter-converter'
// @ts-ignore
import { variables } from '@company/variables.ts'
import { BENEFITS, STEPS, EXCLUSIVE_ASSETS, STEPS_SHARE } from './constants'

import {
  SectionCover,
  Section,
  LineVertical,
  CarouselHighlight,
  CarouselShowIndicators,
  DescriptionCard,
  ButtonWrapper,
  CarouselStepShare
} from './style'
import { useCompany } from '../../contexts/companyContext'

interface IJobWeekly {
  id: number
  bannerurl: string
}

const Landing: NextPage = () => {
  const { t } = useTranslation()
  const [dataWeekly, setDataWeekly] = useState<IJobWeekly[]>([])
  const {
    state: { language }
  } = useUser()
  const router = useRouter()
  const { isReady } = router

  const tBenefit =
    BENEFITS && getLngArr(BENEFITS, language?.toUpperCase() || 'TH')

  const tSteps = STEPS && getLngArr(STEPS, language?.toUpperCase() || 'TH')

  const tStepsShare =
    STEPS_SHARE && getLngArr(STEPS_SHARE, language?.toUpperCase() || 'TH')

  const getRandom = (array: IHighlightInfo[], num: number) => {
    const newArray = [...array]
    const { length } = newArray
    const random = [] as IHighlightInfo[]

    for (let i = 0; i < length; i += 1) {
      const randomPosition = Math.floor((newArray.length - i) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)

      random.push(...randomItem)
      if (random.length === num) {
        break
      }
    }

    return random
  }

  const getBenefitMobile = () => {
    const benefitMobile = []
    for (let i = 0; i < BENEFITS?.length; i += 1) {
      benefitMobile.push([
        {
          ...BENEFITS[i],
          title: tBenefit('title', i),
          description: tBenefit('description', i)
        },
        {
          ...BENEFITS[i + 1],
          title: tBenefit('title', i + 1),
          description: tBenefit('description', i + 1)
        }
      ])
      i += 1
    }

    return benefitMobile
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const { data: items } = useQuery(
    [isReady, 'highlight_current'],
    () => getWeeklyHighlight(),
    { enabled: isReady }
  )

  useEffect(() => {
    if (items && Number(items?.data?.count) > 0) {
      const randData = getRandom(items?.data?.payload, 3)
      const highlight =
        (randData.map((item) => {
          const itemJob = item?.job
          const tItemInfo =
            item && getLng(item, language?.toUpperCase() || 'TH')
          const tJob =
            itemJob && getLng(itemJob, language?.toUpperCase() || 'TH', true)
          if (item?.isJob && itemJob) {
            return {
              id: item?.id,
              bannerurl: tJob('seoImageUrl') || itemJob?.seoImageUrlTh
            }
          }
          return {
            id: item?.id,
            bannerurl: tItemInfo('image') || item?.imageTH
          }
        }) as IJobWeekly[]) ?? []
      setDataWeekly(highlight)
    }
  }, [items, language])

  const {
    state: { productNameEn, lineLink, headerTitle1, headerTitle2 }
  } = useCompany()

  return (
    <>
      <Head>
        <title>{productNameEn} : โปรแกรมนายหน้าอสังหาฯออนไลน์</title>
        <meta name='description' content={t('landing.metaDescription')} />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={t('landing.metaOgTitle')} />
        <meta
          property='og:description'
          content={t('landing.metaDescription')}
        />
        <meta
          property='og:image:secure_url'
          content={ogImage?.src?.toString()}
        />
        <meta property='og:image' content={ogImage?.src?.toString()} />
        <meta property='og:image:width' content='600' />
        <meta property='og:image:height' content='312' />
        <meta
          name='facebook-domain-verification'
          content='wp94ozedkc528lcuaf8kvm07vxdyf4'
        />
      </Head>
      <LandingLayout>
        <SectionCover className='py-4'>
          <Container>
            <Row className='align-items-start pt-main-2'>
              <Col className='text-center text-main-start'>
                <h1 className='pt-3 pt-lg-5 display-4 fw-bold my-4 text-primary text-uppercase'>
                  {headerTitle1}
                  <span className='text-secondary'>{headerTitle2}</span>
                </h1>
                <h2 className='text-primary fs-3 p2s-xs-pre-line'>
                  {t('landing.headerSubTitle')}
                </h2>
                <div className='pb-5 fs-14 px-0'>
                  <span className='p2s-lg-pre-line'>
                    {t('landing.headerDescription')}
                  </span>
                </div>
                <Link href='/login'>
                  <a>
                    <Button
                      size='lg'
                      className='bn-btn-gradient-primary my-2 py-2 px-4 mx-2'
                    >
                      {t('landing.buttonGetStarted')}
                    </Button>
                  </a>
                </Link>

                <a href={lineLink} target='_blank' rel='noreferrer'>
                  <Button
                    size='lg'
                    className='bn-btn-gradient-secondary  my-2 py-2 px-4 mx-2'
                  >
                    {t('landing.buttonInterest')}
                  </Button>
                </a>
              </Col>
            </Row>
          </Container>
        </SectionCover>
        <Section className='text-center py-5 bg-primary text-white'>
          <DescriptionCard className='justify-content-center'>
            <div className='col-12 col-lg-auto d-lg-flex align-items-center justify-content-lg-end'>
              <div className='d-se-block px-2 '>
                <span className='d-block px-2 display-9 text-center text-lg-start'>
                  {t('landing.descriptionCard.project.headerTitle')}
                </span>
                <span className='d-block px-2 display-7 text-center text-lg-start'>
                  {t('landing.descriptionCard.project.more')}
                </span>
              </div>
              <div className='d-se-block px-2 display-5 fw-600'>
                {t('landing.descriptionCard.project.total')}
              </div>
              <span className='d-se-block px-2'>
                {t('landing.descriptionCard.project.unit')}
              </span>
            </div>
            <div className='col-12 col-lg-auto text-center'>
              <LineVertical />
            </div>
            <div className='col-12 col-lg-auto d-lg-flex align-items-center justify-content-lg-start'>
              <div className='d-se-block px-2 '>
                <span className='d-block px-2 display-9 text-center text-lg-start'>
                  {t('landing.descriptionCard.sale.headerTitle')}
                </span>
                <span className='d-block px-2 display-7 text-center text-lg-start'>
                  {t('landing.descriptionCard.sale.more')}
                </span>
              </div>
              <div className='d-se-block px-2 display-5 fw-600'>
                {t('landing.descriptionCard.sale.total')}
              </div>
              <span className='d-se-block px-2'>
                {t('landing.descriptionCard.sale.unit')}
              </span>
            </div>
          </DescriptionCard>
        </Section>
        {dataWeekly?.length > 0 && (
          <section className='text-center py-5 bg-gray-2'>
            <Container>
              <h2 id='weeklyHighlight' className='pre-line pb-3'>
                {t('landing.weeklyHighlights.headerTitle')}
              </h2>
              <CarouselHighlight className='d-block d-main-none'>
                {dataWeekly?.map((item, index) => (
                  <CarouselHighlight.Item
                    key={`highlight-mobile-${index.toString()}`}
                  >
                    <div className='ratio ratio-fb'>
                      {item?.bannerurl && (
                        <a
                          href='/login'
                          target='_self'
                          rel='noopener noreferrer'
                        >
                          <Image
                            id='img-highlight'
                            src={item?.bannerurl}
                            layout='fill'
                            objectFit='fill'
                            alt='announce'
                            className='img-fluid'
                          />
                        </a>
                      )}
                    </div>
                  </CarouselHighlight.Item>
                ))}
              </CarouselHighlight>
              <div className='d-none d-main-block px-3 text-center'>
                <Row>
                  {dataWeekly?.map((item, index) => (
                    <Col key={`weekly-desktop-${index.toString()}`}>
                      {item?.bannerurl && (
                        <a
                          href='/login'
                          target='_self'
                          rel='noopener noreferrer'
                        >
                          <Image
                            id='img-highlight'
                            src={item?.bannerurl}
                            alt='weekly highlight'
                            className='img-fluid'
                            width={323}
                            height={169}
                          />
                        </a>
                      )}
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          </section>
        )}
        <section id='sectionBenefit' className='text-center py-5'>
          <Container className='py-3'>
            <h2 id='benefit' className='mb-3 p2s-xs-pre-line'>
              {t('landing.benefit.headerTitle')}
            </h2>
            <div className='pb-2 '>{t('landing.benefit.description')}</div>
            <div className='d-none d-main-block pt-5'>
              <Row sm={3}>
                {BENEFITS?.map((item, index) => (
                  <Col
                    key={`benefit-desktop-${index.toString()}`}
                    className='py-3'
                  >
                    <div>
                      <Image
                        src={item?.image?.src}
                        width={item?.image?.width}
                        height={item?.image?.height}
                        alt={`benefit-${item?.key}`}
                      />
                      <h3 className='display-8 fw-bold pt-3 pre-line '>
                        {tBenefit('title', index)}
                      </h3>
                      <div className='font-size-16 pre-line'>
                        {tBenefit('description', index)}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <CarouselShowIndicators
              interval={null}
              className='d-block d-main-none py-3'
            >
              {getBenefitMobile()?.map((item, index) => (
                <CarouselShowIndicators.Item
                  key={`benefit-mobile-${index.toString()}`}
                >
                  {item?.map((subItem: any, subIndex) => (
                    <div
                      key={`benefit-mobile-img-${subIndex.toString()}`}
                      className='pt-2 pb-3'
                    >
                      <Image
                        src={subItem?.image?.src}
                        width={subItem?.image?.width}
                        height={subItem?.image?.height}
                        alt={`benefit-${subItem?.key}`}
                      />
                      <h3 className='display-6 fw-bold pre-line pt-3'>
                        {subItem?.title}
                      </h3>
                      <div className='font-size-16  pb-3 pre-line'>
                        {subItem?.description}
                      </div>
                    </div>
                  ))}
                </CarouselShowIndicators.Item>
              ))}
            </CarouselShowIndicators>
          </Container>
        </section>
        <section id='sectionStep' className='text-center py-5 bg-info-2'>
          <Container className='py-3'>
            <h2 id='step' className='mb-3 text-black p2s-xs-pre-line'>
              {t('landing.stepToBroker.headerTitle')}
            </h2>
            <div className='d-none d-main-block text-black-2'>
              <Row sm={3}>
                {STEPS?.map((item, index) => (
                  <Col
                    key={`step-desktop-${index.toString()}`}
                    className='py-3'
                  >
                    <div>
                      <Image
                        src={item?.image?.src}
                        width={item?.image?.width}
                        height={item?.image?.height}
                        alt={`benefit-${item?.key}`}
                      />
                      <h3 className='display-8 fw-bold pt-3 pre-line'>
                        {tSteps('title', index)}
                      </h3>
                      <div className='font-size-16 pre-line'>
                        {tSteps('description', index)}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <CarouselShowIndicators
              interval={null}
              className='d-block d-main-none py-3'
            >
              {STEPS?.map((item, index) => (
                <CarouselShowIndicators.Item
                  key={`step-mobile-${index.toString()}`}
                >
                  <div className='pb-3'>
                    <Image
                      src={item?.image?.src}
                      width={item?.image?.width}
                      height={item?.image?.height}
                      alt={`step-${item?.key}`}
                    />
                    <h3 className='display-8 pt-3 pre-line'>
                      {tSteps('title', index)}
                    </h3>
                    <div className='font-size-16  pb-3 pre-line'>
                      {tSteps('description', index)}
                    </div>
                  </div>
                </CarouselShowIndicators.Item>
              ))}
            </CarouselShowIndicators>
          </Container>
        </section>
        <Section className='text-center py-4 bg-primary text-white'>
          <DescriptionCard className='justify-content-center'>
            <div className='col-12 col-lg-6 d-lg-flex py-2 align-items-center justify-content-center'>
              <span className='ps-2 text-center display-9 '>
                <Image src={userIcon} alt='user-image' width={18} height={15} />
                <span className='ps-2 description-text-medium'>
                  {t('landing.descriptionCard.broker.headerTitle')}
                </span>
              </span>
              <span className='display-7 px-2 fw-500'>
                {t('landing.descriptionCard.broker.total')}
              </span>
              <span className='pe-2 text-center description-text-medium'>
                {t('landing.descriptionCard.broker.unit')}
              </span>
            </div>
            <div className='col-12 col-lg-6 d-lg-flex py-2 align-items-center justify-content-center'>
              <span className='d-block px-2 text-center description-text-small'>
                {t('landing.descriptionCard.broker.updateDate')}
              </span>
            </div>
          </DescriptionCard>
        </Section>
        <section className='text-center py-5'>
          <Container className='py-3'>
            <h2 id='exclusive' className='mb-5 p2s-xs-pre-line'>
              {t('landing.topBrand.headerTitle')}
            </h2>
            <Row xs={6} className='justify-content-center'>
              {EXCLUSIVE_ASSETS?.map((item, index) => (
                <Col key={`exclusive-asset-${index.toString()}`}>
                  <Image
                    src={item?.image?.src}
                    width={item?.image?.width}
                    height={item?.image?.height}
                    alt={`exclusive-${index}`}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        <Section id='sectionStepShare' className='py-5 bg-info-2'>
          <Container>
            <Row xs={1} lg={2} className='align-items-center pt-main-2'>
              <Col className='text-start'>
                <h2
                  id='stepShare'
                  className='text-center text-lg-start text-black fs-3 p2s-xs-pre-line'
                >
                  {t('landing.stepShare.headerTitle')}
                </h2>
                <div className='pb-2 text-black-2 fs-14 px-0'>
                  {t('landing.stepShare.description')}
                </div>
                <div className='fs-14 fw-bold text-primary'>
                  <ul>
                    <li>{t('landing.stepShare.list.1')}</li>
                    <li>{t('landing.stepShare.list.2')}</li>
                    <li>{t('landing.stepShare.list.3')}</li>
                    <li>{t('landing.stepShare.list.4')}</li>
                  </ul>
                </div>
              </Col>
              <Col lg={{ order: 'last' }}>
                <CarouselStepShare className='d-block'>
                  {STEPS_SHARE?.map((item, index) => (
                    <CarouselStepShare.Item key={`step-share-${item?.key}`}>
                      <div>
                        {item?.image?.src && (
                          <Image
                            src={item?.image?.src}
                            width={item?.image?.width}
                            height={item?.image?.height}
                            alt={`step-share-${index}`}
                          />
                        )}
                      </div>
                      <div className='display-8 display-9 text-black fw-semibold pre-line'>
                        {`${index + 1}. ${tStepsShare('title', index)}`}
                      </div>
                    </CarouselStepShare.Item>
                  ))}
                </CarouselStepShare>
              </Col>
            </Row>
          </Container>
        </Section>
        <section className='text-center py-5 bg-gray-2'>
          <ButtonWrapper>
            <Container>
              <Row>
                <Col>
                  <h2 className='text-primary fs-3 pb-2'>
                    {t('landing.sectionFooter.headerTitle')}
                  </h2>
                  <Link href='/login'>
                    <a>
                      <Button
                        size='lg'
                        className='bn-btn-gradient-primary my-2 py-2 px-4 mx-2'
                      >
                        {t('landing.buttonGetStarted')}
                      </Button>
                    </a>
                  </Link>
                  <a href={lineLink} target='_blank' rel='noreferrer'>
                    <Button
                      size='lg'
                      className='bn-btn-gradient-secondary my-2 py-2 px-4 mx-2'
                    >
                      {t('landing.buttonInterest')}
                    </Button>
                  </a>
                </Col>
              </Row>
              <div className='row justify-content-end pe-4'>
                <Image
                  className='cursor-pointer'
                  style={{
                    filter: CssFilterConverter.hexToFilter(variables.primary)
                      .color!
                  }}
                  src={backToTop}
                  alt='user-image'
                  width={17}
                  height={14}
                  onClick={() => goToTop()}
                />
              </div>
            </Container>
          </ButtonWrapper>
        </section>
      </LandingLayout>
    </>
  )
}
export default Landing
