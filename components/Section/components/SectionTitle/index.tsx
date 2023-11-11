import { FC } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { HeaderWrapper } from './style'

interface ISectionTitle {
  title?: string
  link?: string
  className?: string
}
const SectionTitle: FC<ISectionTitle> = ({ title, link, className }) => {
  if (!title) return null
  if (title && link)
    return (
      <Link href={link}>
        <a className={classNames('text-dark', className)}>
          <HeaderWrapper>{title}</HeaderWrapper>
        </a>
      </Link>
    )
  return (
    <HeaderWrapper className={classNames('text-dark', className)}>
      {title}
    </HeaderWrapper>
  )
}

SectionTitle.defaultProps = {
  title: '',
  link: '',
  className: ''
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string
}

export default SectionTitle
