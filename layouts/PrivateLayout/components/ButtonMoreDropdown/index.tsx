import Link from 'next/link'

import type { FC } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { getLngArr } from 'utils/getLng'

import { INavBarDropdownDetail } from 'interfaces/NavBarDropdownDetail'

import { INavbarMenu } from 'interfaces/MenuJobType'

import { DropdownWrapper } from './style'

interface IDesktopDropdown {
  items?: INavbarMenu[]
  locale?: string | undefined
}

const DropdownDetail: FC<INavBarDropdownDetail> = ({ label, icon }) => (
  <div className='d-flex align-items-center'>
    {icon}
    <div className='ms-3'>{label}</div>
  </div>
)

const ButtonMoreDropdown: FC<IDesktopDropdown> = ({ items, locale }) => {
  const { t } = useTranslation()
  const tMenu = items && getLngArr(items, locale?.toUpperCase() || 'TH')

  return (
    <DropdownWrapper align='end'>
      <DropdownWrapper.Toggle
        variant='light'
        id='menu-desktop-dropdown'
        className='display-12'
      >
        {t('global.more')}
      </DropdownWrapper.Toggle>
      <DropdownWrapper.Menu>
        {tMenu &&
          items?.map(({ link, icon }, index) => (
            <Link href={link} key={tMenu('menu', index)}>
              <DropdownWrapper.Item href={link}>
                <DropdownDetail label={tMenu('menu', index)} icon={icon} />
              </DropdownWrapper.Item>
            </Link>
          ))}
      </DropdownWrapper.Menu>
    </DropdownWrapper>
  )
}

ButtonMoreDropdown.defaultProps = {
  items: [],
  locale: ''
}
ButtonMoreDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    }).isRequired
  ),
  locale: PropTypes.string
}
export default ButtonMoreDropdown
