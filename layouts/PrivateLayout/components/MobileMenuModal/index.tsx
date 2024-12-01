/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Link from 'next/link'
import { Container } from 'react-bootstrap'
import type { FC } from 'react'
import { FiUnlock } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import { INavBarDropdownDetail } from 'interfaces/NavBarDropdownDetail'
import { NAVBAR_PRIVATE_TOGGLE_MENU } from 'layouts/PrivateLayout/constants'

import Image from 'next/image'
import arrowRight from 'public/assets/images/arrow-right.svg'

import { getLngArr } from 'utils/getLng'

import { INavbarMenu } from 'interfaces/MenuJobType'

import { ModalWrapper } from './style'
import ProjectMenuAccordion from './components/ProjectMenuAccordion'

// import PropTypes from 'prop-types'

interface IMobileMenuModal {
  show: boolean
  onClose: () => void
  onClickLogout: () => void
  itemsMenu: INavbarMenu[]
  locale?: string | undefined
}

const MenuDetail: FC<INavBarDropdownDetail> = ({ label, icon }) => (
  <>
    <div className='d-flex align-items-center'>
      {icon}
      <div className='ms-3'>{label}</div>
    </div>
    <Image src={arrowRight} alt='avatar' width={12} height={12} />
  </>
)

const MobileMenuModal: FC<IMobileMenuModal> = ({
  show,
  onClose,
  onClickLogout,
  itemsMenu,
  locale
}) => {
  const { t } = useTranslation()
  const tNavbar =
    NAVBAR_PRIVATE_TOGGLE_MENU &&
    getLngArr(NAVBAR_PRIVATE_TOGGLE_MENU, locale?.toUpperCase() || 'TH')

  return (
    <ModalWrapper show={show} animation={false} fullscreen onHide={onClose}>
      <Container>
        <ModalWrapper.Header closeButton />
        <ModalWrapper.Body className='pt-2'>
          {NAVBAR_PRIVATE_TOGGLE_MENU.map(
            ({ labelTH, link, onClick, icon }, index) => {
              if (onClick) {
                return (
                  <div
                    onClick={onClick}
                    className='mobile-menu-modal-detail'
                    role='button'
                    key={`${tNavbar(
                      'label',
                      index
                    )}-mobile-click-${index.toString()}`}
                  >
                    <MenuDetail label={tNavbar('label', index)} icon={icon} />
                  </div>
                )
              }
              return (
                <div
                  key={`${tNavbar('label', index)}-mobile-${index.toString()}`}
                >
                  <Link href={link} key={tNavbar('label', index)}>
                    <a className='mobile-menu-modal-detail' role='button'>
                      <MenuDetail label={tNavbar('label', index)} icon={icon} />
                    </a>
                  </Link>
                  {labelTH === 'โครงการที่ชอบ' && itemsMenu.length > 0 && (
                    <ProjectMenuAccordion
                      items={itemsMenu}
                      title={t('global.button.project')}
                    />
                  )}
                </div>
              )
            }
          )}
          <div
            onClick={onClickLogout}
            className='mobile-menu-modal-detail'
            role='button'
          >
            <MenuDetail
              label={t('global.button.signOut')}
              icon={<FiUnlock />}
            />
          </div>
        </ModalWrapper.Body>
      </Container>
    </ModalWrapper>
  )
}

MobileMenuModal.defaultProps = {
  locale: ''
}
export default MobileMenuModal
