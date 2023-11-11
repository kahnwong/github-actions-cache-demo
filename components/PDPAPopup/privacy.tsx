/* eslint-disable react/no-danger */
import type { HTMLProps } from 'react'
import { useTranslation } from 'react-i18next'
import { HOUR } from 'config/constant'
import { useQuery } from 'react-query'
import { getPDPA } from 'services/pdpa'

const Privacy = (props: HTMLProps<HTMLDivElement>) => {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(['PDPA'], () => getPDPA(), {
    staleTime: 24 * HOUR,
    cacheTime: 24 * HOUR
  })
  if (isLoading)
    return (
      <div className='pdpa-content' {...props}>
        {t('global.loadingMessage')}
      </div>
    )

  const dateString = new Date(
    data?.data.payload.createdAt as string
  ).toLocaleDateString('th', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className='pdpa-content'>
      <small>
        {t('privacy.lastUpdate')} {dateString} (
        {data?.data.payload.versionNumber})
      </small>
      <hr />
      <div
        {...props}
        dangerouslySetInnerHTML={{ __html: data?.data.payload.privacyTh || '' }}
      />
    </div>
  )
}

export default Privacy
