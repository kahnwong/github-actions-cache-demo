import { FC, HTMLAttributes, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import {
  IJobInfoProjectInfo,
  IJobinfoProjectInfoComponent
} from 'interfaces/JobInfo'
import { useTranslation } from 'react-i18next'
import { getLng } from 'utils/getLng'
import Title from 'components/JobInfo/Title'
import ProjectInfoDetail from './ProjectInfoDetail'

import {
  ProjectBody,
  ProjectColumn,
  ProjectColumnCenter,
  ProjectInfoWrapper
} from './style'

interface IProjectInfo extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data: IJobInfoProjectInfo
}

const ProjectInfo: FC<IProjectInfo> = ({ theme, data, locale, ...props }) => {
  const [dataItem, setDataItem] = useState<IJobinfoProjectInfoComponent>()
  const { t } = useTranslation()

  const getDate = (date: string): string =>
    new Date(date).toLocaleDateString('en', {
      year: 'numeric'
    })

  useEffect(() => {
    if (data) {
      const tJobInfo = getLng(data, locale?.toUpperCase() || 'TH', true)
      const tJobInfoDeveloper = getLng(
        data.developer,
        locale?.toUpperCase() || 'TH',
        true
      )
      setDataItem({
        developerName: tJobInfoDeveloper('companyName'),
        constructionEndDate: data?.constructionEndDate
          ? getDate(data?.constructionEndDate)
          : '',
        projectFullAddress: data.projectFullAddress as string,
        projectAreaRai: data.projectAreaRai as number,
        projectAreaNgan: data.projectAreaNgan as number,
        projectAreaSqwa: data.projectAreaSqwa as number,
        totalUnitDetail: data.totalUnitDetail as string,
        parkingLotDetail: data.parkingLotDetail as string,
        projectDescription: tJobInfo('projectDescription')
      })
    }
  }, [data])

  return (
    <ProjectInfoWrapper {...props} className='pt-5'>
      <Container>
        <Title text={t('jobinfo.projectInfo.title')} underLineColor={theme} />
        <ProjectBody>
          <ProjectColumn>
            {dataItem?.developerName && (
              <ProjectInfoDetail
                label='เจ้าของโครงการ'
                value={dataItem?.developerName}
              />
            )}

            {dataItem?.projectFullAddress && (
              <ProjectInfoDetail
                label='ที่ตั้งโครงการ'
                value={dataItem?.projectFullAddress}
              />
            )}
            {dataItem?.constructionEndDate && (
              <ProjectInfoDetail
                label='ปีที่สร้างเสร็จ'
                value={dataItem?.constructionEndDate}
              />
            )}
          </ProjectColumn>
          <ProjectColumnCenter>
            {(dataItem?.projectAreaRai ||
              dataItem?.projectAreaNgan ||
              dataItem?.projectAreaSqwa) && (
              <ProjectInfoDetail
                label='พื้นที่โครงการ'
                value={`${dataItem?.projectAreaRai}-${dataItem?.projectAreaNgan}-${dataItem?.projectAreaSqwa} ไร่`}
              />
            )}
            {dataItem?.totalUnitDetail && (
              <ProjectInfoDetail
                label='จำนวนยูนิต'
                value={dataItem?.totalUnitDetail}
              />
            )}
            {dataItem?.parkingLotDetail && (
              <ProjectInfoDetail
                label='ที่จอดรถ'
                value={dataItem?.parkingLotDetail}
              />
            )}
          </ProjectColumnCenter>
          <ProjectColumn>
            {dataItem?.projectDescription && (
              <ProjectInfoDetail
                label='รายละเอียด'
                value={dataItem?.projectDescription}
              />
            )}
          </ProjectColumn>
        </ProjectBody>{' '}
      </Container>
    </ProjectInfoWrapper>
  )
}

ProjectInfo.defaultProps = {
  theme: '#000',
  locale: 'th'
}

ProjectInfo.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.shape({
    developerName: PropTypes.string,
    projectFullAddress: PropTypes.string,
    constructionEndDate: PropTypes.string,
    parkingLotDetail: PropTypes.string,
    totalUnitDetail: PropTypes.string,
    projectAreaRai: PropTypes.number,
    projectAreaNgan: PropTypes.number,
    projectAreaSqwa: PropTypes.number,
    projectDescription: PropTypes.string
  }).isRequired
}

export default ProjectInfo
