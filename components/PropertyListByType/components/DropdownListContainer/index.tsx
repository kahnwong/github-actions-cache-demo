import { FC } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  DropDownToggleContainer,
  DropDownFilterWrapper,
  DropDownToggleWrapper,
  FillterTextWrapper
} from './style'

interface IDropDownContainer {
  isOpen: boolean
  onToggle: Function
  isSort?: boolean
  textList: (string | undefined)[]
  haveFilter: boolean
  placeholder?: string
  haveFilterShowTitle?: boolean
  sizeWidth?: string
}

const DropdownListContainer: FC<IDropDownContainer> = ({
  isOpen,
  onToggle,
  children,
  isSort,
  textList,
  haveFilter,
  placeholder,
  haveFilterShowTitle,
  sizeWidth
}) => {
  const renderFilterText = () => textList.filter(Boolean).join(',')
  return (
    <DropDownFilterWrapper
      onToggle={(open: boolean) => {
        onToggle(open)
      }}
      show={isOpen}
      align='end'
      style={
        sizeWidth
          ? { width: `${sizeWidth} !important` }
          : { minWidth: !isSort ? '110px !important' : '120px !important' }
      }
    >
      <DropDownToggleWrapper
        id='dropdown-filter-list'
        variant='light'
        className={classNames('w-100', haveFilter ? 'border-secondary' : '')}
      >
        <DropDownToggleContainer>
          <div
            className={classNames(haveFilter ? 'display-11' : 'display-10 ')}
          >
            {haveFilter && haveFilterShowTitle
              ? placeholder
              : [haveFilter && !haveFilterShowTitle ? '' : placeholder]}
            {isSort && haveFilter && (
              <span className='text-secondary display-12 ms-1 fw-bold text-truncate'>
                {renderFilterText()}
              </span>
            )}
          </div>
          {!isSort && haveFilter && (
            <FillterTextWrapper className='text-secondary display-11 fw-bold text-truncate'>
              {renderFilterText()}
            </FillterTextWrapper>
          )}
        </DropDownToggleContainer>
      </DropDownToggleWrapper>
      <DropDownFilterWrapper.Menu>{children}</DropDownFilterWrapper.Menu>
    </DropDownFilterWrapper>
  )
}

DropdownListContainer.defaultProps = {
  isSort: false,
  placeholder: '',
  haveFilterShowTitle: false,
  sizeWidth: ''
}
DropdownListContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isSort: PropTypes.bool,
  textList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  haveFilter: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  haveFilterShowTitle: PropTypes.bool,
  sizeWidth: PropTypes.string
}

export default DropdownListContainer
