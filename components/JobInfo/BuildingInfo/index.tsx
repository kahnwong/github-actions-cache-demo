import { FC, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import Title from 'components/JobInfo/Title'
import { MockupWrapper } from '../style'

interface IPropertyBuildingInfo extends HTMLAttributes<HTMLElement> {
  theme?: string
}

const PropertyBuildingInfo: FC<IPropertyBuildingInfo> = ({
  theme,
  ...props
}) => (
  <MockupWrapper {...props}>
    <Title text='BuildingInfo' underLineColor={theme} />
  </MockupWrapper>
)

PropertyBuildingInfo.defaultProps = {
  theme: '#000'
}
PropertyBuildingInfo.propTypes = {
  theme: PropTypes.string
}

export default PropertyBuildingInfo
