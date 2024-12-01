import type { FC } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'

import { getLngArr } from 'utils/getLng'
import { useUser } from 'contexts/userContext'

import { INavBarDropdownDetail } from 'interfaces/NavBarDropdownDetail'
import { INavbarMenu } from 'interfaces/MenuJobType'

import Logo from 'public/assets/images/menu-building-house.png'
import { WrapperAccordion } from './style'
import { useCompany } from '../../../../../../contexts/companyContext'

interface IDropdown {
  title?: string
  items?: INavbarMenu[]
}

const MenuDetail: FC<INavBarDropdownDetail> = ({ label, icon }) => (
  <div className='d-flex align-items-center'>
    {icon}
    <div className='ms-3'>{label}</div>
  </div>
)

const ProjectMenuAccordion: FC<IDropdown> = ({ title, items }) => {
  const {
    state: { language }
  } = useUser()

  const {
    state: { companyNameEn }
  } = useCompany()

  const tMenu = items && getLngArr(items, language?.toUpperCase() || 'TH')

  return (
    <WrapperAccordion>
      <WrapperAccordion.Item eventKey='0'>
        <WrapperAccordion.Header>
          <Image
            src={Logo}
            alt={`${companyNameEn} logo`}
            height={20}
            width={20}
          />{' '}
          <div
            className='ms-3 accordion-header-title'
            id='accordion-menu-title'
          >
            {title}
          </div>
        </WrapperAccordion.Header>
        <WrapperAccordion.Body>
          {tMenu &&
            items?.map(({ id, link }, index) => (
              <Link
                href={link}
                key={`${id.toString()}-${tMenu('menu', index)}`}
              >
                <a className='mobile-menu-modal-detail' role='button'>
                  <MenuDetail label={tMenu('menu', index)} icon='' />
                </a>
              </Link>
            ))}
        </WrapperAccordion.Body>
      </WrapperAccordion.Item>
    </WrapperAccordion>
  )
}

ProjectMenuAccordion.defaultProps = {
  title: '',
  items: []
}
ProjectMenuAccordion.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    }).isRequired
  )
}

export default ProjectMenuAccordion
