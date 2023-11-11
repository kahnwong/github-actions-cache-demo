import Link from 'next/link'
import { FiMoreVertical, FiUnlock } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

import { INavBarDropdownDetail } from 'interfaces/NavBarDropdownDetail'
import { NAVBAR_PRIVATE_TOGGLE_MENU } from 'layouts/PrivateLayout/constants'

import { getLngArr } from 'utils/getLng'

import { DropdownWrapper } from './style'

interface IDesktopDropdown {
  onClickLogout: () => void
  locale?: string | undefined
}

const DropdownDetail: FC<INavBarDropdownDetail> = ({ label, icon }) => (
  <div className='d-flex align-items-center'>
    {icon}
    <div className='ms-3'>{label}</div>
  </div>
)

const DesktopDropdown: FC<IDesktopDropdown> = (props) => {
  const { t } = useTranslation()
  const { onClickLogout, locale } = props

  const tNavbar =
    NAVBAR_PRIVATE_TOGGLE_MENU &&
    getLngArr(NAVBAR_PRIVATE_TOGGLE_MENU, locale?.toUpperCase() || 'TH')
  return (
    <DropdownWrapper align='end' className='d-none d-main-block'>
      <DropdownWrapper.Toggle variant='light' id='desktop-dropdown'>
        <FiMoreVertical />
      </DropdownWrapper.Toggle>
      <DropdownWrapper.Menu>
        {NAVBAR_PRIVATE_TOGGLE_MENU.map(({ link, onClick, icon }, index) => {
          if (onClick) {
            return (
              <DropdownWrapper.Item
                key={tNavbar('label', index)}
                onClick={onClick}
              >
                <DropdownDetail label={tNavbar('label', index)} icon={icon} />
              </DropdownWrapper.Item>
            )
          }
          return (
            <Link href={link} key={tNavbar('label', index)}>
              <DropdownWrapper.Item href={link}>
                <DropdownDetail label={tNavbar('label', index)} icon={icon} />
              </DropdownWrapper.Item>
            </Link>
          )
        })}
        <DropdownWrapper.Item onClick={onClickLogout}>
          <DropdownDetail
            label={t('global.button.signOut')}
            icon={<FiUnlock />}
          />
        </DropdownWrapper.Item>
      </DropdownWrapper.Menu>
    </DropdownWrapper>
  )
}

DesktopDropdown.defaultProps = {
  locale: ''
}
export default DesktopDropdown
