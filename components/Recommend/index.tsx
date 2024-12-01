import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { Wrapper } from './style'
import { getRecommendJob } from '../../services/job'
import PropertyCardList from '../PropertyCardList'

interface IRecommend {}

const Recommend: FC<IRecommend> = () => {
  const { t } = useTranslation()
  const { data, isLoading, isError } = useQuery(['job_with_share'], () =>
    getRecommendJob({
      take: 3
    })
  )

  return (
    <Wrapper>
      <Container className='py-5'>
        <div className='text-recommend'>Recommend</div>
        <div className='text-description mt-1 mb-4'>
          {t('recommend.headerTitle')}
        </div>
        <PropertyCardList
          items={data?.data?.payload?.payload}
          isLoading={isLoading}
          isError={isError}
        />
      </Container>
    </Wrapper>
  )
}

Recommend.defaultProps = {}
Recommend.propTypes = {}

export default Recommend
