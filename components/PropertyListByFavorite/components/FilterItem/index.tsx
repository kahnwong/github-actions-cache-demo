import { FC } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FiCheck } from 'react-icons/fi'

interface IFilterItem {
  title: string
  isActive: boolean
}

const FilterItem: FC<IFilterItem> = ({ title, isActive }) => (
  <div
    className={classNames(
      'border d-flex justify-content-between align-items-center p-2 rounded display-10',
      isActive ? 'border-secondary' : ''
    )}
    role='button'
  >
    <div className='overflow-hidden'>{title}</div>
    {isActive && <FiCheck className='ms-auto text-primary' />}
  </div>
)

FilterItem.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default FilterItem
