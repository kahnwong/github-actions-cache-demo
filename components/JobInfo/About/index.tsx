import { FC, HTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

import PropTypes from 'prop-types'
import Image from 'next/image'
import { Container } from 'react-bootstrap'
import { getLng } from 'utils/getLng'

import { IJobinfoAbout } from 'interfaces/JobInfo'
import Title from 'components/JobInfo/Title'
import { AboutWrapper, AboutBody, AboutDetail } from './style'

interface IAbout extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IJobinfoAbout
}

const ProjectAbout: FC<IAbout> = ({ theme, data, locale, ...props }) => {
  const tJobInfo = getLng(data, locale?.toUpperCase() || 'TH', true)
  const { t } = useTranslation()

  return (
    <AboutWrapper {...props}>
      {data?.subImageUrl && (
        <Image src={data.subImageUrl} layout='fill' objectFit='cover' />
      )}
      <Container style={{ height: '100%' }}>
        <AboutBody>
          <div className='row'>
            <Title
              text={t('jobinfo.about.title')}
              underLineColor={theme}
              textColor='#fff'
            />
          </div>
          <AboutDetail
            dangerouslySetInnerHTML={{
              __html: tJobInfo('projectOverview')
            }}
          />
        </AboutBody>
      </Container>
    </AboutWrapper>
  )
}
ProjectAbout.defaultProps = {
  theme: '#000',
  locale: 'th'
}

ProjectAbout.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    projectOverviewTh: PropTypes.string.isRequired,
    projectOverviewEn: PropTypes.string.isRequired,
    projectOverviewCn: PropTypes.string.isRequired,
    subImageUrl: PropTypes.string.isRequired
  }).isRequired
}

export default ProjectAbout
