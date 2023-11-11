import { FC, HTMLAttributes, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import Title from 'components/JobInfo/Title'
import Image from 'next/image'

import { useTranslation } from 'react-i18next'
import { IJobinfoFacility, IJobinfoFacilityComponent } from 'interfaces/JobInfo'
import { getLng } from 'utils/getLng'
import {
  FacilityWrapper,
  FacilityBody,
  FacilityColumn,
  FacilityDetail
} from './style'

interface IProjectInfo extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IJobinfoFacility[]
}
const JobInfoFacility: FC<IProjectInfo> = ({
  theme,
  locale,
  data,
  ...props
}) => {
  const [facilities, setFacilities] = useState<IJobinfoFacilityComponent[]>([])

  const { t } = useTranslation()
  useEffect(() => {
    if (data) {
      const facilitiesTmp = [] as IJobinfoFacilityComponent[]
      data
        .filter(
          (row) =>
            row.otherFacilityIsActive === true ||
            row.facilityType.isActive === true
        )
        .forEach((row) => {
          const tJobInfoOtherFacility = getLng(
            row,
            locale?.toUpperCase() || 'TH',
            true
          )
          const tJobInfoFacility = getLng(
            row.facilityType,
            locale?.toUpperCase() || 'TH',
            true
          )
          facilitiesTmp.push({
            id: row.id,
            image: row.facilityType.iconUrl,
            name:
              tJobInfoOtherFacility('otherFacilityName') ??
              tJobInfoFacility('name')
          })
        })
      setFacilities(facilitiesTmp)
    }
  }, [data])

  return (
    <FacilityWrapper {...props} className='pt-5'>
      <Container>
        <Title text={t('jobinfo.facility.title')} underLineColor={theme} />
        <FacilityBody>
          {facilities?.length === 0 && (
            <FacilityColumn className='w-100'>
              <div className='text-center'>-</div>
            </FacilityColumn>
          )}
          {facilities?.map((item) => (
            <FacilityColumn key={`facilities-${item?.id}`}>
              <FacilityDetail>
                {item?.image && (
                  <Image src={item?.image} width={30} height={30} />
                )}
                <div className='align-self-center text-wrap text-black ps-2 fw-bold'>
                  {item?.name}
                </div>
              </FacilityDetail>
            </FacilityColumn>
          ))}
        </FacilityBody>
      </Container>
    </FacilityWrapper>
  )
}

JobInfoFacility.defaultProps = {
  locale: 'th',
  theme: '#000'
}

JobInfoFacility.propTypes = {
  locale: PropTypes.string,
  theme: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      otherDescriptionTh: PropTypes.string,
      otherDescriptionEn: PropTypes.string,
      otherDescriptionCn: PropTypes.string,
      otherFacilityIsActive: PropTypes.bool,
      facilityType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        iconUrl: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
}

export default JobInfoFacility
