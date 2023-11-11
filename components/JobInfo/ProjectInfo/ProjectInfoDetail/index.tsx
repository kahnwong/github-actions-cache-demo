import { FC } from 'react'
import PropTypes from 'prop-types'
import { ProjectDetail } from './style'

interface IProjectInfo {
  className?: string
  label: string
  value?: string
}

const ProjectInfoDetail: FC<IProjectInfo> = ({ className, label, value }) => (
  <ProjectDetail className={className}>
    <div className='fw-light display-11 mb-2'>{label}</div>
    <div
      className='fw-bold display-10 text-black'
      dangerouslySetInnerHTML={{
        __html: value ?? ''
      }}
      style={{ color: '#000 !important' }}
    />
  </ProjectDetail>
)

ProjectInfoDetail.defaultProps = {
  className: '',
  value: '-'
}

ProjectInfoDetail.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
}
export default ProjectInfoDetail
