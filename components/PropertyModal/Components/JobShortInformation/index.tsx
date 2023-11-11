import { FC } from 'react'
import PropTypes from 'prop-types'
import { usePropertyModalContext } from 'contexts/propertyModalContext'
import Image from 'next/image'
import { Row, Col } from 'react-bootstrap'
import { ProjectNameWrapper } from './style'
import formatNumber from '../../../../utils/formatNumber'
import { useUser } from '../../../../contexts/userContext'
import { getLngFlex } from '../../../../utils/getLng'

interface IJobShortInformation {
  title: string
}

const JobShortInformation: FC<IJobShortInformation> = ({ title }) => {
  const {
    state: {
      data: {
        projectNameTh,
        projectNameEn,
        projectNameCn,
        unitLocalStartingPrice,
        bannerurl
      }
    }
  } = usePropertyModalContext()

  const {
    state: { language }
  } = useUser()

  const tProjectName = getLngFlex(
    { projectNameTh, projectNameEn, projectNameCn },
    language.toUpperCase(),
    true
  )

  return (
    <div>
      <h4 className='mb-4 text-dark fw-600'>{title}</h4>
      <Row>
        <Col xs={4} className='position-relative'>
          <div className='ratio ratio-fb'>
            {bannerurl && (
              <Image
                src={bannerurl}
                layout='fill'
                objectFit='cover'
                className='rounded'
              />
            )}
          </div>
        </Col>
        <Col>
          <ProjectNameWrapper className='mb-0 text-primary font-size-18 fw-500'>
            {tProjectName('projectName')}
          </ProjectNameWrapper>
          <small className='text-mute fw-light'>
            {`฿${formatNumber(+unitLocalStartingPrice!)}`}
          </small>
        </Col>
      </Row>
    </div>
  )
}

JobShortInformation.propTypes = {
  title: PropTypes.string.isRequired
}

export default JobShortInformation
