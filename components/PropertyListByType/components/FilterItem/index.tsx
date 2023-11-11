import { FC } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FiCheck } from 'react-icons/fi'

interface IFilterItem {
  title: string
  isActive: boolean
  isBackground?: boolean
}

const FilterItem: FC<IFilterItem> = ({ title, isActive, isBackground }) => {
  let isActiveStyle = ''
  if (isActive && isBackground) {
    isActiveStyle = 'border-secondary alert-secondary'
  } else if (isActive && !isBackground) {
    isActiveStyle = 'border-secondary'
  } else {
    isActiveStyle = ''
  }
  return (
    <div
      className={classNames(
        'border d-flex justify-content-between align-items-center p-2 rounded display-10',
        isActiveStyle
      )}
      role='button'
    >
      <div className='overflow-hidden'>{title}</div>
      {isActive && !isBackground && (
        <FiCheck className='ms-auto text-primary' />
      )}
    </div>
  )
}

FilterItem.defaultProps = {
  isBackground: false
}

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isBackground: PropTypes.bool
}

export default FilterItem
