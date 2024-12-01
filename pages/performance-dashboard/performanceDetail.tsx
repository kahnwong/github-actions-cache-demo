import { FC, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { FiAlertCircle, FiEdit3 } from 'react-icons/fi'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Alert, Container, Col, Row } from 'react-bootstrap'
import Pagination from 'components/Pagination'
import PinGreen from 'public/assets/icons/pin-green.png'
import { getPerformanceDetail } from 'services/performance'
import PerformanceDashboardChart from './components/PerformanceDashboardChart'
import { Wrapper, SpanTable, SpanCopy, TableUL } from './style'

import { MONTHS, MONTHS_EN, MONTHS_CN } from './constants'
import { useCompany } from '../../contexts/companyContext'

interface IPerformanceDetail {
  startDate: Date
  endDate: Date
  skip?: number
  take?: number
  month: number
  year: number
  profileFilled: boolean
  interestFilled: boolean
  locale?: string | undefined
}

const PerformanceDetailList: FC<IPerformanceDetail> = (
  props: IPerformanceDetail
) => {
  const {
    startDate,
    endDate,
    month,
    year,
    profileFilled,
    interestFilled,
    locale
  } = props
  const { t } = useTranslation()
  const localeLng = locale?.toUpperCase()
  const [currentPage, setCurrent] = useState(1)

  const {
    state: { companyNameEn }
  } = useCompany()

  const getMonthList = () => {
    switch (localeLng) {
      case 'TH':
        return MONTHS
      case 'EN':
        return MONTHS_EN
      case 'CN':
        return MONTHS_CN
      default:
        return MONTHS
    }
  }
  const [subTitle, setSubTitle] = useState(
    `${t('performanceDashboard.performanceDetail.subTitleMonth')} ${
      getMonthList()[month - 1].altTitle
    } ${t('performanceDashboard.performanceDetail.subTitleYear')} ${year}`
  )
  const { data, isLoading, isError } = useQuery(
    [
      'PERFORMANCE',
      {
        startDate,
        endDate,
        skip: (currentPage - 1) * 10,
        take: currentPage * 10
      }
    ],
    () =>
      getPerformanceDetail({
        startDate,
        endDate,
        skip: (currentPage - 1) * 10,
        take: 10
      })
  )

  const getItemAtPage = (num: number) => {
    setCurrent(num)
  }

  const totalPage = data?.data.count!
  useEffect(() => {
    setSubTitle(
      `${t('performanceDashboard.performanceDetail.subTitleMonth')} ${
        getMonthList()[month - 1].altTitle
      } ${t('performanceDashboard.performanceDetail.subTitleYear')} ${year}`
    )
  }, [month, year, locale])

  if (isLoading)
    return (
      <Row className='justify-content-center'>{t('global.loadingMessage')}</Row>
    )

  if (isError)
    return (
      <Container className='border rounded-3 justify-content-center bg-white p-4 my-4'>
        {t('performanceDashboard.performanceDetail.errorMessage')}
      </Container>
    )
  if (!data?.data.payload.detail.length)
    return (
      <Container className='border rounded-3 justify-content-center bg-white p-4 my-4'>
        {t('performanceDashboard.performanceDetail.notFoundData')}
      </Container>
    )

  if (!profileFilled || !interestFilled) {
    const urlProfile = '/user-profile'
    const urlInterest = '/interest'
    return (
      <Container className='border rounded-3 justify-content-center bg-white p-4 my-4'>
        <Alert
          variant='light'
          className='border mb-0 bn-small d-flex align-items-center'
        >
          <FiAlertCircle size={24} className='me-2 flex-shrink-0' />
          <div>
            {t('performanceDashboard.performanceDetail.emailAndPhone')}{' '}
            <span className='text-primary'>
              {t('performanceDashboard.performanceDetail.toUseThisSection')}
            </span>
            {!profileFilled && (
              <Link href={urlProfile}>
                <a className='mt-2 text-end'>
                  <FiEdit3 size={16} className='ms-2 me-1' />
                  {t(
                    'performanceDashboard.performanceDetail.ButtonUpdateProfile'
                  )}
                </a>
              </Link>
            )}
            <div className='d-inline pe-2 ms-2 '>
              {!profileFilled && !interestFilled && (
                <span className='px-2'>
                  {t('performanceDashboard.performanceDetail.and')}
                </span>
              )}
              {!interestFilled && (
                <Link href={urlInterest}>
                  <a className='mt-2 text-end'>
                    <Image
                      src={PinGreen}
                      alt={`${companyNameEn} user interest`}
                      height={14}
                      width={14}
                    />
                    <span className='ps-0'>
                      {t('performanceDashboard.popupAlert.interestInfo')}
                    </span>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </Alert>
      </Container>
    )
  }

  return (
    <Wrapper>
      <Container className='px-0 pt-3 '>
        <PerformanceDashboardChart {...data?.data.payload} />
      </Container>
      <Container className='border rounded-3 mt-4 px-0 pb-3 pt-3 bg-white '>
        <Container className='px-4 py-2 pb-4 m-0'>
          <h4 className='text-black-2'>
            {' '}
            {t('performanceDashboard.performanceDetail.headerTitle')}{' '}
          </h4>
          <small className='text-primary'> {subTitle} </small>
        </Container>

        <Container className='p-0 g-0 m-0 overflow-scroll'>
          <Container className='p-0 g-0 m-0 container-width'>
            <Row className='justify-content-between g-0 p-0 m-0 font-sizxe-18 bg-table-1'>
              <Col
                xs={5}
                className='row p-0 justify-content-center align-content-center text-black-2 font-size-18'
              >
                {t('performanceDashboard.performanceDetail.project')}
              </Col>
              <Col>
                <Row className='g-0 m-0 p-0 bg-table-2'>
                  <Col className='row g-0 m-0 p-0 justify-content-center align-content-center text-black-2 font-size-15'>
                    {t('performanceDashboard.performanceDetail.numberOfShares')}
                  </Col>
                  <Col className='row g-0 m-0 p-0 justify-content-center align-content-center text-black-2 font-size-15'>
                    {t(
                      'performanceDashboard.performanceDetail.registeredPerson'
                    )}
                  </Col>
                </Row>
                <Row className='justify-content-between g-0 mx-0 font-size-16'>
                  <Col>
                    <Row className='justify-content-between g-0 mx-0 '>
                      <Col className='row g-0 m-0 p-0 justify-content-center align-content-center font-size-14'>
                        {t(
                          'performanceDashboard.performanceDetail.columnTotal'
                        )}
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0 justify-content-center align-content-center color-fb'>
                        <li>
                          <SpanTable>
                            {t(
                              'performanceDashboard.performanceDetail.columnFacebook'
                            )}
                          </SpanTable>
                        </li>
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0 justify-content-center align-content-center color-tw'>
                        <li>
                          <SpanTable>
                            {t(
                              'performanceDashboard.performanceDetail.columnTwitter'
                            )}
                          </SpanTable>
                        </li>
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0  justify-content-center align-content-center color-line'>
                        <li>
                          <SpanTable>
                            {t(
                              'performanceDashboard.performanceDetail.columnLine'
                            )}
                          </SpanTable>
                        </li>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row className='g-0 justify-content-between mx-0'>
                      <Col className='row g-0 m-0 p-0 justify-content-center align-content-center text-black-2 font-size-14'>
                        Total
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0 justify-content-center align-content-center color-fb'>
                        <li>
                          <SpanTable>
                            {t(
                              'performanceDashboard.performanceDetail.columnFacebook'
                            )}
                          </SpanTable>
                        </li>
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0 justify-content-center align-content-center color-tw'>
                        <li>
                          <SpanTable>
                            {t(
                              'performanceDashboard.performanceDetail.columnTwitter'
                            )}
                          </SpanTable>
                        </li>
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0 justify-content-center align-content-center color-line'>
                        <li>
                          <SpanTable>
                            {t(
                              'performanceDashboard.performanceDetail.columnLine'
                            )}
                          </SpanTable>
                        </li>
                      </Col>
                      <Col className='d-flex g-0 m-0 p-0 justify-content-center align-content-center color-copy'>
                        <TableUL>
                          <li>
                            <SpanCopy>
                              {t(
                                'performanceDashboard.performanceDetail.columnCopy'
                              )}
                            </SpanCopy>
                          </li>
                        </TableUL>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className='g-0 justify-content-between mx-0'>
              <Col className='g-0 mx-0'>
                {data?.data.payload.detail.map((item, index) => (
                  <Row
                    className='justify-content-between g-0 mx-0'
                    key={`detail-${index.toString()}`}
                  >
                    <Col
                      xs={5}
                      className='row justify-content-center align-content-center'
                    >
                      <Row className='justify-content-between g-0 p-1 text-start mx-0'>
                        <Col xs={3} className='px-1'>
                          {' '}
                          {item?.url && (
                            <Image
                              className='rounded table-img'
                              src={item.url}
                              alt={item.url}
                              width={72}
                              height={45}
                            />
                          )}
                        </Col>
                        <Col xs={9}>
                          <Row className='justify-content-start g-0 mx-0'>
                            <Col
                              xs={12}
                              className='text-nowrap overflow-hidden text-black-2 fw-500 font-size-16 text-ellipsis'
                            >
                              {item.name || ''}
                            </Col>
                          </Row>
                          <Row className='justify-content-start g-0 mx-0 font-size-12 fw-400 text-grey-2'>
                            <Col>{item.jobtype || ''}</Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row className='justify-content-between g-0 h-100 mx-0 font-size-16 fw-400'>
                        <Col xs={6}>
                          <Row className='justify-content-between g-0 h-100 mx-0'>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center bg-table-1'>
                              {' '}
                              {item.shareTotal || ''}{' '}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-fb'>
                              {item.shareFB || ''}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-tw'>
                              {' '}
                              {item.shareTW || ''}{' '}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-line'>
                              {' '}
                              {item.shareLine || ''}{' '}
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={6}>
                          <Row className='justify-content-between g-0 h-100 mx-0'>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center bg-table-1'>
                              {' '}
                              {item.dropTotal || ''}{' '}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-fb'>
                              {' '}
                              {item.dropFB || ''}{' '}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-tw'>
                              {' '}
                              {item.dropTW || ''}{' '}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-line'>
                              {' '}
                              {item.dropLine || ''}{' '}
                            </Col>
                            <Col className='row g-0 m-0 p-0 justify-content-center align-content-center color-copy'>
                              {' '}
                              {item.dropCopy || ''}{' '}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Container>
        </Container>
        <Col xs={12} className='pt-3'>
          <Pagination
            currentPage={currentPage}
            lastPage={Math.ceil(totalPage / 10)}
            total={totalPage}
            onPaginate={getItemAtPage}
          />
        </Col>
      </Container>
    </Wrapper>
  )
}

PerformanceDetailList.defaultProps = {
  skip: 0,
  take: 10,
  locale: ''
}

PerformanceDetailList.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  skip: PropTypes.number,
  take: PropTypes.number,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  profileFilled: PropTypes.bool.isRequired,
  interestFilled: PropTypes.bool.isRequired,
  locale: PropTypes.string
}

export default PerformanceDetailList
