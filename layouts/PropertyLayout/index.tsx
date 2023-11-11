import { ReactNode, useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Image, Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import PropTypes from 'prop-types'

import Footer from 'components/Footer'

import { IOptions } from 'interfaces/Form'
import i18next from 'i18n'
import { t } from 'i18next'
import { WrapperHeader, SelectBox, PrivateHeader } from './style'
import { useCompany } from '../../contexts/companyContext'

interface IProps {
  logo?: string
  menuList?: IOptions[]
  theme: string
  locale?: string
  children: ReactNode
  isLoading: boolean
  isPrivate: boolean
  agentId?: string
}

const PropertyLayout: NextPage<IProps> = ({
  logo,
  menuList,
  theme,
  children,
  locale,
  isLoading,
  isPrivate,
  agentId
}) => {
  const [menuOptions, setMenuOptions] = useState<IOptions[]>([])
  const [menuSelect, setMenuSelect] = useState<IOptions | object>({})

  const {
    state: { companyNameEn }
  } = useCompany()

  useEffect(() => {
    if (menuList) {
      const menu = menuList
      if (agentId) {
        menu.unshift({
          label: 'ลงทะเบียน',
          value: 'CONTACT1'
        })
      }
      setMenuOptions(menu)
      setMenuSelect({
        label: menuList[0]?.label ?? '',
        value: menuList[0]?.value ?? ''
      })
    }
    i18next.changeLanguage(locale)
  }, [menuList])

  const onNavLinkClick = ({ label, value }: IOptions) => {
    setMenuSelect({ label, value })
    const el = document.getElementById(value as string)?.offsetTop
    const elementPosition = el! - 100
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: 'smooth'
    })
  }
  return (
    <>
      <WrapperHeader theme={theme}>
        {isPrivate && (
          <PrivateHeader>
            {isLoading ? t('global.loadingMessage') : t('jobinfo.privacyTitle')}
          </PrivateHeader>
        )}
        <Container className='d-flex mt-3 flex-column justify-content-center align-items-center'>
          {logo && (
            <Image
              src={logo ?? ''}
              alt={`${companyNameEn} logo`}
              height={50}
              width='auto'
            />
          )}
        </Container>
        <Navbar
          expand='lg'
          className='flex-column justify-content-center align-items-center p-0'
        >
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='d-none d-lg-block bg-white'
          >
            <Nav className='me-auto'>
              {menuOptions.map(({ value, label }) => (
                <Link href={`#${value}`} key={value}>
                  <Nav.Link onClick={() => onNavLinkClick({ label, value })}>
                    {label}
                  </Nav.Link>
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
          <div className='my-2 w-100 d-flex justify-content-center align-items-center d-lg-none'>
            <SelectBox
              theme={theme}
              isSearchable={false}
              placeholder={t('global.goto')}
              defaultValue={menuSelect}
              options={menuOptions}
              value={menuSelect}
              onChange={(e) => onNavLinkClick(e as IOptions)}
              classNamePrefix='react-select'
              instanceId='menu-register'
            />
          </div>
        </Navbar>
      </WrapperHeader>
      <main>{children}</main>
      <Footer />
    </>
  )
}

PropertyLayout.defaultProps = {
  logo: '',
  children: null,
  locale: 'th',
  menuList: [],
  agentId: ''
}
PropertyLayout.propTypes = {
  logo: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  locale: PropTypes.string,
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ),
  theme: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  agentId: PropTypes.string
}

export default PropertyLayout
