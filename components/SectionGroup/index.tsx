import { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { SectionGroupWrapper } from './style'

interface ISectionGroup {
  children: ReactNode
  noPadFirst?: boolean
  noPadLast?: boolean
  className?: string
}

const SectionGroup: FC<ISectionGroup> = ({
  children,
  noPadFirst,
  noPadLast,
  className
}) => (
  <SectionGroupWrapper
    className={className}
    noPadFirst={noPadFirst}
    noPadLast={noPadLast}
  >
    {children}
  </SectionGroupWrapper>
)

SectionGroup.defaultProps = {
  noPadFirst: false,
  noPadLast: false,
  className: ''
}

SectionGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  noPadFirst: PropTypes.bool,
  noPadLast: PropTypes.bool,
  className: PropTypes.string
}

export default SectionGroup
