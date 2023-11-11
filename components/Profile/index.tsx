import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Avatar from 'components/Avatar'

interface IProfile {
  image?: string
  count?: number
  className?: string
  position?: string
  name?: string
  id?: number
}
const Profile: FC<IProfile> = ({
  image,
  count,
  className,
  position,
  name,
  id
}) => {
  const { t } = useTranslation()
  return (
    <div>
      {position === 'head' ? (
        <div className={className}>
          <div className='row align-items-center'>
            <div className='ms-auto col-auto col-lg-3 pe-lg-5'>
              <Avatar image={image} position='head' />
            </div>
            <div className='col ps-0 ps-lg-2 text-truncate lh-1 text-dark'>
              <span className='fs-6'>{name}</span>
              <span className='d-block'>
                <span className='bn-small opacity-50'>ID: {id}</span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={className}>
          <div className='d-flex align-items-center px-2 pt-2'>
            <span className='bn-small me-1'>
              {t('wallHead.profile.cumulativeChare')}
            </span>
            <span className='text-primary'>{count}</span>
          </div>
          <Link href='/user-profile'>
            <a className='d-none d-main-flex align-items-center me-2 me-main-0'>
              <Avatar image={image} />
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

// TODO: fix default prop
Profile.defaultProps = {
  image: '',
  className: '',
  count: 0,
  position: '',
  name: '',
  id: 0
}

Profile.propTypes = {
  image: PropTypes.string,
  count: PropTypes.number,
  className: PropTypes.string,
  position: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number
}

export default Profile
