import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useRouter } from 'next/router'
import i18next from 'i18n'

import type { ReactNode } from 'react'
import type { NextPage } from 'next'

import { FiMenu, FiArrowLeft } from 'react-icons/fi'

import useDisclosure from 'hooks/useDisclosure'
import Profile from 'components/Profile'
import Footer from 'components/Footer'
import { logout } from 'services/authenticate'
import { useUser } from 'contexts/userContext'
import { IUserDispatch } from 'contexts/userContext/type'
import { LOGOUT_REDIRECT_PATH } from 'config/constant'

import navbarPrivateMenu from 'utils/jobTypeMenuList'
import DropdownLanguage from 'components/DropdownLanguage'
import DesktopDropdown from './components/DesktopDropdown'
import MobileMenuModal from './components/MobileMenuModal'

import { Wrapper } from './style'
import ButtonMoreDropdown from './components/ButtonMoreDropdown'
import PopupInterest from '../../components/PopupInterest'
import { getLngArr } from '../../utils/getLng'
import { useCompany } from '../../contexts/companyContext'

interface IProps {
  children: ReactNode
  title?: string
  useBackButton?: boolean
  className?: string
  bg?: 'bg-white' | 'bg-transparent'
  position?: string
}

const pageNotShowPopInterest = ['/interest', '/privacy', '/terms']

const PrivateLayout: NextPage<IProps> = ({
  children,
  title,
  useBackButton,
  className,
  bg,
  position
}) => {
  const router = useRouter()
  const { push } = useRouter()
  const { isOpen, onClose, onOpen } = useDisclosure(false)

  const {
    state: { user, language },
    dispatch
  } = useUser()

  const {
    state: { productLogo, productNameEn }
  } = useCompany()

  const onClickLogout = async () => {
    await logout()
    await push(LOGOUT_REDIRECT_PATH)
    dispatch({ type: IUserDispatch.LOGOUT })

    // if (user?.via === 'fb') {
    //   window.FB.logout((response) => console.log('logout FB', response))
    // }
  }

  const { navPrivateMenu, navPrivateMenuMore, navPrivateMenuAll } =
    navbarPrivateMenu()

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
  const tMenu =
    navPrivateMenu && getLngArr(navPrivateMenu, lng?.toUpperCase() || 'TH')

  return (
    <Wrapper>
      {!user?.interestFilled &&
        !pageNotShowPopInterest.includes(router?.asPath) &&
        !!user && <PopupInterest />}

      <Navbar
        expand='lg'
        className={classNames(
          position === 'absolute'
            ? 'bn-navbar-abs bg-transparent'
            : 'border-bottom position-relative',
          bg,
          className
        )}
        // className={classNames('border-bottom position-relative', bg, className)}
        fixed={useBackButton ? 'top' : undefined}
      >
        {useBackButton && (
          <Container className='d-flex d-main-none'>
            <div className='text-center w-100 position-relative d-flex justify-content-center align-items-center'>
              <div className='position-absolute top-0 start-0'>
                <Link href='/'>
                  <a>
                    <FiArrowLeft size={24} />
                  </a>
                </Link>
              </div>
              <h5 className='mb-0 d-inline'>{title}</h5>
            </div>
          </Container>
        )}
        <Container className={useBackButton ? 'd-none d-main-flex' : 'd-flex'}>
          <Link href='/' passHref>
            <Navbar.Brand>
              <Image
                src={productLogo}
                alt={`${productNameEn} logo`}
                height={36}
                width={87}
              />
            </Navbar.Brand>
          </Link>
          {user && (
            <>
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto align-items-center'>
                  {navPrivateMenu?.map(({ id, link }, index) => (
                    <Link href={link} key={id}>
                      <Nav.Link href={link}>{tMenu('menu', index)}</Nav.Link>
                    </Link>
                  ))}
                  {navPrivateMenuMore.length > 0 && (
                    <ButtonMoreDropdown
                      items={navPrivateMenuMore}
                      locale={lng || language}
                    />
                  )}
                </Nav>
              </Navbar.Collapse>
              <div className='d-flex align-items-center'>
                <div className='pb-2'>
                  <DropdownLanguage changeLng={changeLng} />
                </div>
                <Profile
                  className='d-flex'
                  image={user?.picture}
                  count={user?.count}
                />
                <FiMenu
                  size={23}
                  onClick={onOpen}
                  className='d-flex d-main-none'
                />
              </div>
              <DesktopDropdown
                onClickLogout={onClickLogout}
                locale={lng || language}
              />
            </>
          )}
        </Container>
      </Navbar>

      <main className={classNames('flex-grow-1', className)}>{children}</main>
      <Footer />
      <MobileMenuModal
        itemsMenu={navPrivateMenuAll}
        show={isOpen}
        onClose={onClose}
        onClickLogout={onClickLogout}
        locale={lng || language}
      />
    </Wrapper>
  )
}

PrivateLayout.defaultProps = {
  children: null,
  title: '',
  useBackButton: false,
  className: '',
  bg: 'bg-white',
  position: ''
}
PrivateLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  title: PropTypes.string,
  useBackButton: PropTypes.bool,
  className: PropTypes.string,
  bg: PropTypes.oneOf(['bg-white', 'bg-transparent']),
  position: PropTypes.string
}

export default PrivateLayout
