import { FC } from 'react'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'

import { getLng } from 'utils/getLng'
import { getJobByFilter } from 'services/job'
import { IJobType } from 'interfaces/MenuJobType'
import PropertyCardList from 'components/PropertyCardList'
import Section from 'components/Section'

interface ISectionPropertyCard {
  itemData: IJobType
  locale?: string | undefined
}
const SectionPropertyCard: FC<ISectionPropertyCard> = ({
  itemData,
  locale
}) => {
  const localeLng = locale?.toUpperCase() || 'TH'
  const takeJob =
    (itemData?.type ? itemData?.type?.toUpperCase() : '') === 'EXCLUSIVE'
      ? 9
      : 6
  const {
    data: jobWithSharData,
    isLoading: jobWithSharLoading,
    isError: jobWithSharError
  } = useQuery(
    [
      'job_with_share',
      { jobTypeId: itemData?.id, take: takeJob, random: true }
    ],
    () =>
      getJobByFilter({
        jobTypeId: itemData?.id,
        take: takeJob,
        random: true
      })
  )

  const tItemData = itemData && getLng(itemData, localeLng)

  return (
    <div>
      {(jobWithSharData?.data.payload?.length || 0) > 0 && (
        <Section
          title={tItemData('title')}
          description={tItemData('desc')}
          className='border-bottom'
          seemore={
            (jobWithSharData?.data.payload?.length || 0) > 0
              ? `/${itemData?.type}`
              : ''
          }
        >
          <PropertyCardList
            items={jobWithSharData?.data.payload}
            isLoading={jobWithSharLoading}
            isError={jobWithSharError}
            locale={localeLng}
          />
        </Section>
      )}
    </div>
  )
}

SectionPropertyCard.defaultProps = {
  locale: ''
}
SectionPropertyCard.propTypes = {
  locale: PropTypes.string
}
export default SectionPropertyCard
