import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { IJobinfoPayOff } from 'interfaces/JobInfo'
import { Col, Container, Row } from 'react-bootstrap'
import iconRent from 'public/assets/icons/icon-rent.svg'
import iconRentalYieldRate from 'public/assets/icons/icon-rental-yield-rate.svg'
import { useTranslation } from 'react-i18next'
import { getLng } from 'utils/getLng'
import { PayoffBox, Title, NumberText, Description } from './style'
import { useCompany } from '../../../contexts/companyContext'

interface IPropertyPayoff extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IJobinfoPayOff
}

const PropertyPayoff: FC<IPropertyPayoff> = ({
  theme,
  data,
  locale,
  ...props
}) => {
  const { t } = useTranslation()
  const tJobInfo = getLng(data, locale?.toUpperCase() || 'TH', true)

  const {
    state: { companyNameEn }
  } = useCompany()
  return (
    <Container {...props} className='py-5'>
      <Row>
        {data?.monthlyRental && (
          <Col
            sm={12}
            md={data?.yieldRatePercentage ? 6 : 12}
            className='text-center my-3'
          >
            <PayoffBox>
              <Image src={iconRent} alt={`${companyNameEn} log`} height={44} />
              <Title>{t('jobinfo.projectPayoff.averageRent')}</Title>
              {locale !== 'en' && <Title>(Average Rent)</Title>}
              <NumberText>
                {data?.monthlyRental?.toLocaleString() ?? '-'}
              </NumberText>
              <Description>{tJobInfo('monthlyRentalRemark')}</Description>
            </PayoffBox>
          </Col>
        )}
        {data?.yieldRatePercentage && (
          <Col
            sm={12}
            md={data?.monthlyRental ? 6 : 12}
            className='text-center my-3'
          >
            <PayoffBox>
              <Image
                src={iconRentalYieldRate}
                alt='Payoff logo'
                className='payoff-logo'
                height={44}
              />
              <Title>{t('jobinfo.projectPayoff.rentalYieldRate')}</Title>
              {locale !== 'en' && <Title>(Rental Yield Rate)</Title>}
              <NumberText>
                {data?.yieldRatePercentage
                  ? `${data?.yieldRatePercentage}%`
                  : '-'}
              </NumberText>
              <Description>{tJobInfo('yieldRateRemark')}</Description>
            </PayoffBox>
          </Col>
        )}
      </Row>
    </Container>
  )
}

PropertyPayoff.defaultProps = {
  theme: '#000',
  locale: 'th'
}
PropertyPayoff.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    monthlyRental: PropTypes.number,
    monthlyRentalRemarkTh: PropTypes.string,
    monthlyRentalRemarkEn: PropTypes.string,
    monthlyRentalRemarkCn: PropTypes.string,
    yieldRatePercentage: PropTypes.number,
    yieldRateRemarkTh: PropTypes.string,
    yieldRateRemarkEn: PropTypes.string,
    yieldRateRemarkCn: PropTypes.string
  }).isRequired
}

export default PropertyPayoff
