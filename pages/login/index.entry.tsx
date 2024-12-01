import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import i18next from 'i18n'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

// types
import type { NextPage } from 'next'
// icons
import { FiMail } from 'react-icons/fi'
import { SiFacebook, SiLine } from 'react-icons/si'

import useDisclosure from 'hooks/useDisclosure'
import { useUser } from 'contexts/userContext'

import dynamic from 'next/dynamic'

import GoogleButton from 'components/GoogleButton'
import { COMPANY_NAME } from 'config/environment'
import {
  CompanyLogo,
  ButtonWrapper,
  FooterNoteWrapper,
  LogoWrapper,
  QuoteWrapper
} from './style'
import LoginModal from './components/LoginModal'
import { IUserDispatch } from '../../contexts/userContext/type'
import { useCompany } from '../../contexts/companyContext'
import { CONTACT_EMAIL } from '../../config/contact'
// import FacebookButton from './components/FacebookButton'

const FacebookButton = dynamic(() => import('./components/FacebookButton'), {
  ssr: false
})
const Login: NextPage = () => {
  const { t } = useTranslation()
  const {
    state: { isLoggedIn, language },
    dispatch
  } = useUser()

  const {
    state: {
      companySmallLogo,
      productLogo,
      companyNameEn,
      lineLink,
      facebookLink
    }
  } = useCompany()

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal
  } = useDisclosure()

  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'

  useEffect(() => {
    i18next.changeLanguage(lng)
    localStorage.setItem('lng', lng)
    dispatch({
      type: IUserDispatch.CHANGE_LANGUAGE,
      payload: { lng: lng || language }
    })
  }, [])
  return (
    <>
      <Head>
        <title>{companyNameEn} : Login</title>
      </Head>
      <main className='d-flex flex-column align-items-center gap-3 text-center'>
        <div className='mt-5 mb-4'>
          <LogoWrapper>
            <Image src={productLogo} height={102} width={277} />
          </LogoWrapper>
          <QuoteWrapper>{t('login.headerSubtitle')}</QuoteWrapper>
        </div>
        <ButtonWrapper className='d-flex flex-column w-100 gap-3 mb-3'>
          {isLoggedIn ? (
            <Link href='/'>
              <a>
                <Button
                  variant='outline'
                  className='d-flex justify-content-center py-3 text-secondary w-100'
                >
                  {t('global.button.backToHome')}
                </Button>
              </a>
            </Link>
          ) : (
            <>
              <div className='d-grid gap-3 mb-3'>
                {COMPANY_NAME === 'Baania' && <FacebookButton />}
                <GoogleButton />
                {COMPANY_NAME === 'Baania' && (
                  <Button
                    variant='secondary'
                    className='d-flex justify-content-center align-items-center py-3'
                    onClick={onOpenLoginModal}
                  >
                    <CompanyLogo
                      src={companySmallLogo}
                      alt={`${companyNameEn} icon`}
                      className='me-1'
                    />
                    {t('login.continueWithCompany')}
                  </Button>
                )}
              </div>
              {/* <p className='fs-6'>
                ยังไม่มีบัญชี Baania ?{' '}
                <a
                  href='https://www.baania.com/register'
                  target='_blank'
                  rel='noreferrer'
                >
                  {t('login.register')}
                </a>
                <br />
                <span className='text-dark fw-bold fst-italic'>
                  {t('login.SignUpForFree')}
                </span>
              </p> */}
            </>
          )}
          <Link href='/landing'>
            <a href='/landing'>
              <Button
                variant='light'
                className='d-flex justify-content-center py-3 mt-3 mb-5 w-100'
              >
                {t('login.learnMore')}
              </Button>
            </a>
          </Link>
        </ButtonWrapper>
      </main>
      <footer className='text-center'>
        <FooterNoteWrapper>{t('login.notifyMore')}</FooterNoteWrapper>
        <div className='d-flex justify-content-center gap-2 pt-3'>
          <a href={`mailto:${CONTACT_EMAIL}`} className='link-dark'>
            <FiMail size={20} />
          </a>
          <a
            href={lineLink}
            target='_blank'
            rel='noreferrer'
            className='link-dark'
          >
            <SiLine size={20} />
          </a>
          <a
            href={facebookLink}
            target='_blank'
            rel='noreferrer'
            className='link-dark'
          >
            <SiFacebook size={20} />
          </a>
        </div>
      </footer>
      <LoginModal show={isOpenLoginModal} onHide={onCloseLoginModal} />
    </>
  )
}

export default Login
