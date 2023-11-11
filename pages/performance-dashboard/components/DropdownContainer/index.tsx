import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { FiCalendar } from 'react-icons/fi'
import PropTypes from 'prop-types'
import { useUser } from 'contexts/userContext'
import {
  DropDownFilterWrapper,
  DropDownToggleWrapper,
  FillterTextWrapper
} from '../../style'
import { MONTHS, MONTHS_CN, MONTHS_EN } from '../../constants'

interface IDropDownContainer {
  isOpen: boolean
  onToggle: Function
  textList: (number | undefined)[]
  haveFilter: boolean
}

const DropdownContainer: FC<IDropDownContainer> = ({
  isOpen,
  onToggle,
  children,
  textList,
  haveFilter
}) => {
  const { t } = useTranslation()
  const {
    state: { language }
  } = useUser()

  const getMonthList = () => {
    switch (language) {
      case 'th':
        return MONTHS
      case 'en':
        return MONTHS_EN
      case 'cn':
        return MONTHS_CN
      default:
        return MONTHS
    }
  }

  const renderFilterText = () => {
    const y = `${textList[0]}`
    const m =
      getMonthList()[textList[1] ? textList[1] - 1 : new Date().getMonth()]
        .altTitle
    return [y, m].filter(Boolean).join(' - ')
  }

  return (
    <DropDownFilterWrapper
      onToggle={(open: boolean) => {
        onToggle(open)
      }}
      show={isOpen}
      align='end'
    >
      <DropDownToggleWrapper
        id='dropdown-filter-list'
        variant='light'
        className={classNames('w-80', haveFilter ? 'border-secondary' : '')}
      >
        <FiCalendar className='w-15' />
        <div className='d-flex flex-column align-items-start w-60'>
          <div className={classNames('display-10')}>
            {t('performanceDashboard.dropdownContainer.dataDuration')}
          </div>
          {haveFilter && (
            <FillterTextWrapper className='text-secondary display-12 fw-bold'>
              {renderFilterText()}
            </FillterTextWrapper>
          )}
        </div>
      </DropDownToggleWrapper>
      <DropDownFilterWrapper.Menu>{children}</DropDownFilterWrapper.Menu>
    </DropDownFilterWrapper>
  )
}

DropdownContainer.defaultProps = {}
DropdownContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  textList: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  haveFilter: PropTypes.bool.isRequired
}

export default DropdownContainer
