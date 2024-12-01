import { FC } from 'react'
import PropTypes from 'prop-types'
import {
  DropDownFilterWrapper,
  DropDownToggleWrapper,
  FilterTextWrapper
} from './style'

interface IDropDownContainer {
  isOpen: boolean
  onToggle: Function
  textList: string
  haveFilter: boolean
  defaultText?: string
}

const DropdownContainer: FC<IDropDownContainer> = ({
  isOpen,
  onToggle,
  children,
  textList,
  haveFilter,
  defaultText
}) => (
  <DropDownFilterWrapper
    onToggle={(open: boolean) => {
      onToggle(open)
    }}
    show={isOpen}
    align='end'
  >
    <DropDownToggleWrapper id='dropdown-filter-list' variant='light'>
      <div className='d-flex flex-column ' style={{ width: '100%' }}>
        {!haveFilter && (
          <span className='display-10 fw-bold'>{defaultText}</span>
        )}
        {haveFilter && (
          <FilterTextWrapper className='display-10 fw-bold'>
            {textList}
          </FilterTextWrapper>
        )}
      </div>
    </DropDownToggleWrapper>
    <DropDownFilterWrapper.Menu>{children}</DropDownFilterWrapper.Menu>
  </DropDownFilterWrapper>
)

DropdownContainer.defaultProps = {
  defaultText: ''
}
DropdownContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  textList: PropTypes.string.isRequired,
  haveFilter: PropTypes.bool.isRequired,
  defaultText: PropTypes.string
}

export default DropdownContainer
