import { FC, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import Title from 'components/JobInfo/Title'
import { MockupWrapper } from '../style'

interface IPropertyRelate extends HTMLAttributes<HTMLElement> {
  theme?: string
}

const PropertyRelate: FC<IPropertyRelate> = ({ theme, ...props }) => (
  <MockupWrapper {...props}>
    <Title text='โครงการอื่นๆ' underLineColor={theme} />
  </MockupWrapper>
)

PropertyRelate.defaultProps = {
  theme: '#000'
}
PropertyRelate.propTypes = {
  theme: PropTypes.string
}

export default PropertyRelate
