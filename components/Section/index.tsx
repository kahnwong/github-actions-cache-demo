import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import Button from 'components/Button'
import Link from 'next/link'
import SectionTitle from './components/SectionTitle'
import { SeeMoreLinkWrapper, SectionWrapper, ChildrenWrapper } from './style'

interface ISection {
  title?: string
  description?: string
  fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
  isSlide?: boolean
  seemore?: string
}

// TODO: wrap useSeeMore & link
const Section: FC<ISection> = ({
  title,
  description,
  children,
  fluid,
  className,
  isSlide,
  seemore
}) => {
  const { t } = useTranslation()
  return (
    <SectionWrapper className={className}>
      <Container fluid={fluid}>
        {(title || seemore) && (
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <SectionTitle title={title} link={seemore} />
            {seemore && (
              <Link href={seemore}>
                <SeeMoreLinkWrapper
                  className='text-secondary fw-300'
                  role='button'
                >
                  {t('global.seeMore')}
                </SeeMoreLinkWrapper>
              </Link>
            )}
          </div>
        )}
        {description && <p className='fw-light display-10'>{description}</p>}
        <ChildrenWrapper isSlide={isSlide}>{children}</ChildrenWrapper>
        {seemore && (
          <div className='d-none d-main-block text-center mt-3'>
            <Link href={seemore}>
              <a>
                <Button variant='light' className='px-5'>
                  {t('global.seeMore')}
                </Button>
              </a>
            </Link>
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}

Section.defaultProps = {
  title: '',
  description: '',
  fluid: false,
  className: '',
  isSlide: true,
  seemore: ''
}
Section.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fluid: PropTypes.oneOf([true, false, 'sm', 'md', 'lg', 'xl', 'xxl']),
  className: PropTypes.string,
  isSlide: PropTypes.bool,
  seemore: PropTypes.string
}

export default Section
