import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Container, Nav, Navbar } from 'react-bootstrap'

import Button from 'components/Button'
import Footer from 'components/Footer'
import DropdownLanguage from 'components/DropdownLanguage'

import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'

import Link from 'next/link'
import i18next from 'i18n'
import { Header, Wrapper, MobileMenu, Main } from './style'
import { useCompany } from '../../contexts/companyContext'

interface IProps {
  children: React.ReactNode
}

interface INavlink {
  href: string
  label: string
  name: string
}

const LandingLayout: NextPage<IProps> = (props: IProps) => {
  const { t } = useTranslation()
  const { children } = props

  const {
    state: { productLogo, companyNameEn }
  } = useCompany()

  const NAVLINKS: INavlink[] = [
    {
      href: '#benefit',
      label: t('landing.menu.benefit'),
      name: 'sectionBenefit'
    },
    {
      href: '#step',
      label: t('landing.menu.step'),
      name: 'sectionStep'
    },
    {
      href: '#stepShare',
      label: t('landing.menu.stepShare'),
      name: 'sectionStepShare'
    }
  ]
  const {
    state: { language },
    dispatch
  } = useUser()

  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'
  const changeLng = async (val: string) => {
    await i18next.changeLanguage(val)
    localStorage.setItem('lng', val)
    dispatch({
      type: IUserDispatch.CHANGE_LANGUAGE,
      payload: { lng: lng || language }
    })
  }
  const goToPosition = (eleName = '', isMobile = false) => {
    let elePos = 0
    if (eleName) {
      const element = document.getElementById(eleName)
      elePos = element?.offsetTop ? element?.offsetTop : 0
      elePos = +elePos - (isMobile ? 120 : 0)
    }

    const newPosition = !eleName ? 0 : elePos
    window.scrollTo({
      top: newPosition,
      behavior: 'smooth'
    })
  }
  return (
    <Wrapper>
      <Header>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <Image
                src={productLogo}
                alt={`${companyNameEn} logo`}
                height={36}
                width={87}
              />
            </Navbar.Brand>
            <Nav>
              {NAVLINKS.map((nav) => (
                <Nav.Link
                  key={nav.href}
                  className='d-none d-sm-block'
                  onClick={() => goToPosition(nav.name)}
                >
                  {nav.label}
                </Nav.Link>
              ))}
              <div className='d-flex align-items-center mb-1'>
                <DropdownLanguage changeLng={changeLng} />
              </div>
              <div className='row align-items-center'>
                <Link href='/login'>
                  <a>
                    <Button size='sm' className='small btn-primary px-3'>
                      Login or Sign Up
                    </Button>
                  </a>
                </Link>
              </div>
            </Nav>
          </Container>
        </Navbar>
        <MobileMenu className='col-12 d-block d-sm-none '>
          <Container>
            <Navbar className='d-flex justify-content-center'>
              {NAVLINKS.map((nav) => (
                <Nav.Link
                  key={nav.href}
                  onClick={() => goToPosition(nav.name, true)}
                >
                  {nav.label}
                </Nav.Link>
              ))}
            </Navbar>
          </Container>
        </MobileMenu>
      </Header>
      <Main>{children}</Main>
      <Footer />
    </Wrapper>
  )
}

LandingLayout.defaultProps = {
  children: null
}
LandingLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

export default LandingLayout
