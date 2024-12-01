import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  DropDownFilterWrapper,
  DropDownToggleWrapper,
  FillterTextWrapper
} from 'components/PropertyListByType/style'
import { FiFilter, FiList } from 'react-icons/fi'
import PropTypes from 'prop-types'

interface IDropDownContainer {
  isOpen: boolean
  onToggle: Function
  isSort?: boolean
  textList: (string | undefined)[]
  haveFilter: boolean
}

const DropdownContainer: FC<IDropDownContainer> = ({
  isOpen,
  onToggle,
  children,
  isSort,
  textList,
  haveFilter
}) => {
  const { t } = useTranslation()
  const renderFilterText = () => textList.filter(Boolean).join(',')
  return (
    <DropDownFilterWrapper
      onToggle={(open: boolean) => {
        onToggle(open)
      }}
      show={isOpen}
      align='end'
      className={classNames(isSort && 'sort')}
    >
      <DropDownToggleWrapper
        id='dropdown-filter-list'
        variant='light'
        className={classNames('w-100', haveFilter ? 'border-secondary' : '')}
      >
        {isSort ? (
          <FiList style={{ width: '25%' }} />
        ) : (
          <FiFilter style={{ width: '25%' }} />
        )}
        <div
          className='d-flex flex-column align-items-start'
          style={{ width: '60%' }}
        >
          <div className={classNames(haveFilter ? 'display-11' : 'display-10')}>
            {isSort ? t('global.sort.by') : t('global.sort.filter')}
          </div>
          {haveFilter && (
            <FillterTextWrapper className='text-secondary display-11 fw-bold'>
              {renderFilterText()}
            </FillterTextWrapper>
          )}
        </div>
      </DropDownToggleWrapper>
      <DropDownFilterWrapper.Menu>{children}</DropDownFilterWrapper.Menu>
    </DropDownFilterWrapper>
  )
}

DropdownContainer.defaultProps = {
  isSort: false
}
DropdownContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  isSort: PropTypes.bool,
  textList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  haveFilter: PropTypes.bool.isRequired
}

export default DropdownContainer
