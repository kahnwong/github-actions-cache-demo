import { FC } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

import { ILoading } from 'interfaces/PropertyList'
import { FiInbox } from 'react-icons/fi'
import Image from 'next/image'
import noFavorite from 'public/assets/images/nofavorite-desktop.png'
import searchNoResult from 'public/assets/images/search-no-result.png'
import Link from 'next/link'
import { loadingScreen } from './constants'
import { getLng } from '../../utils/getLng'

interface INewLoading extends ILoading {
  locale?: string | undefined
}

const LoadingItem: FC = ({ children }) => {
  const router = useRouter()
  const opacity =
    router.asPath !== '/favorite' && router.asPath !== '/property-search'
      ? 'opacity-50'
      : ''
  const classItem = `d-flex flex-column justify-content-center align-items-center py-5 rounded small  ${opacity}`
  return <div className={classItem}>{children}</div>
}
const LoadingScreen: FC<INewLoading> = ({ isLoading, isError, locale }) => {
  const localeLng = locale?.toUpperCase() || 'TH'
  const t = loadingScreen && getLng(loadingScreen, localeLng)

  if (isLoading) {
    return <LoadingItem>{t('loading')}</LoadingItem>
  }

  if (isError) {
    return <LoadingItem>{t('errorLoadingMessage')}</LoadingItem>
  }
  const router = useRouter()
  const isRouteFavorite = router.pathname === '/favorite'
  const isRouterSearch = router.pathname === '/property-search'
  return (
    <LoadingItem>
      {isRouteFavorite ? (
        <div className='text-center'>
          <Image
            src={noFavorite}
            role='button'
            height='224'
            width='300'
            className='pe-none'
          />
          <div className='pt-4'>
            <span className='d-block d-sm-inline'>
              {t('notFoundFavorite')} &nbsp;
            </span>
            <Link href='/'>
              <a className='d-inline  align-items-center me-2 me-main-0'>
                {t('seeProject')}
              </a>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {isRouterSearch ? (
            <div className='text-center'>
              <Image
                src={searchNoResult}
                role='button'
                height='224'
                width='300'
                className='pe-none'
              />
              <div className='pt-4'>
                <span className='display-9 fw-bold d-inline d-sm-block pe-2'>
                  {t('searchNotFound')}
                </span>
                <span className='fs-7 d-inline d-sm-block pt-3 '>
                  {t('searchNotFoundDetail')}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <FiInbox size={32} />
              {t('noResult')}
            </div>
          )}
        </div>
      )}
    </LoadingItem>
  )
}

LoadingScreen.defaultProps = {
  isLoading: false,
  isError: false,
  locale: ''
}

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  locale: PropTypes.string
}

export default LoadingScreen
