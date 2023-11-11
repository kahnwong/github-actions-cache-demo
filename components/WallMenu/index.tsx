import { FC } from 'react'
import { WALL_PRIVATE_TOGGLE_MENU } from 'layouts/PrivateLayout/constants'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Wrapper } from './style'

interface IWallMenu {
  className?: string
}

const WallMenu: FC<IWallMenu> = ({ className }: IWallMenu) => (
  <div className={`d-flex flex-wrap row-cols-3 ${className}`}>
    {WALL_PRIVATE_TOGGLE_MENU.map(({ label, link, icon }) => (
      <Wrapper key={label}>
        <Link href={link}>
          <a className='d-block stretched-link bn-small text-primary'>
            <span className='fs-1'>{icon}</span>
            <span className='d-block'>{label}</span>
          </a>
        </Link>
      </Wrapper>
    ))}
  </div>
)
WallMenu.defaultProps = {
  className: ''
}
WallMenu.propTypes = {
  className: PropTypes.string
}

export default WallMenu
