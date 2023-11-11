import { FC } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getRecommendJob } from 'services/job'
import { Card } from 'react-bootstrap'
import formatNumber from 'utils/formatNumber'
import { useUser } from 'contexts/userContext'
import { getLngArr } from 'utils/getLng'
import { WrapperContent } from './style'
import Title from '../Title'

interface IRecommended {
  theme?: string
}

const Recommend: FC<IRecommended> = ({ theme }) => {
  const { query } = useRouter()
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  const { data, isLoading, isError } = useQuery(['job_with_share'], () =>
    getRecommendJob({
      take: 8
    })
  )

  const queryValue = (obj: object): string => {
    const arrayValue: Array<string> = []
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value && key !== 'slug') {
        // @ts-ignore
        arrayValue.push(`${key}=${value}`)
      }

      return acc
    }, {})
    return arrayValue?.length > 0 ? `?${arrayValue.join('&')}` : ''
  }
  const {
    state: { language }
  } = useUser()
  const items = data?.data?.payload?.payload
  const tItems =
    items && (getLngArr(items, language?.toUpperCase() || 'TH', true) as any)
  const CardRecommend = () =>
    !isLoading &&
    !isError &&
    items?.map((item, idx) => {
      const floorstartingPrice = Math.floor(
        item.unitLocalStartingPrice as number
      )
      const priceText = item.unitLocalStartingPrice
        ? `฿${formatNumber(floorstartingPrice)}`
        : ''
      const goToLandingUrl = `/a/${item.id}${queryValue({ ...query })}`

      return (
        <a
          key={item.projectId}
          href={goToLandingUrl}
          rel='noreferrer'
          target='_blank'
        >
          <Card
            id={`recommendCard${item.id}`}
            className='mx-2  overflow-hidden h-100'
          >
            <div className='ratio ratio-fb'>
              {item?.seoImageUrlTh && (
                <Image
                  src={tItems('seoImageUrl', idx) || item?.seoImageUrlTh}
                  layout='fill'
                  objectFit='cover'
                  role='button'
                />
              )}
            </div>
            <Card.Body className='d-flex flex-column'>
              <div className='display-14 mb-2 fw-bold'>
                {tItems('projectName', idx) || item?.projectNameTh}
              </div>
              <div className='mb-1 small fw-light display-14 mb-2'>
                {priceText}
              </div>
            </Card.Body>
          </Card>
        </a>
      )
    })

  return (
    <WrapperContent>
      <Title text='โครงการอื่น ๆ' underLineColor={theme} />
      <Carousel
        responsive={responsive}
        swipeable
        ssr
        keyBoardControl
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {CardRecommend()}
      </Carousel>
    </WrapperContent>
  )
}

Recommend.defaultProps = {
  theme: '#22bb66'
}

Recommend.propTypes = {
  theme: PropTypes.string
}

export default Recommend
