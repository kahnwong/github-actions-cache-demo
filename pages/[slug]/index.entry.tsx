import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import withPrivate from 'hocs/withPrivate'
import { useRouter } from 'next/router'
// import Error from 'next/error'
import { useQuery } from 'react-query'

// import LoadingScreen from 'components/LoadingScreen'
import PropertyListByType from 'components/PropertyListByType'
import ResponseError from 'components/ResponseError'
import { getJobType } from 'services/jobType'
import { IJobType, IJobTypeHeader } from 'interfaces/JobPropertyTypeList'

const DynamicJobType: NextPage = () => {
  const resetJobTypeSlug: IJobTypeHeader = {
    id: undefined,
    titleTH: '',
    titleEN: '',
    titleCN: '',
    descTH: '',
    descEN: '',
    descCN: '',
    image: ''
  }
  const { query, isReady } = useRouter()
  const [headTitle, setHeadTitle] = useState<IJobTypeHeader>(resetJobTypeSlug)
  const [isRenderCompleted, setIsRenderCompleted] = useState<boolean>(false)
  const { slug } = query

  const { data: dataJobType } = useQuery([], () => getJobType(), {
    enabled: isReady
  })

  useEffect(() => {
    if (dataJobType && isReady) {
      setIsRenderCompleted(false)
      const jobTypeList: IJobType[] = dataJobType?.data?.payload ?? []
      const jobTypeMatch: IJobType | undefined = jobTypeList.find(
        (value: IJobType) => value.type === slug && value.status === 'public'
      )
      if (jobTypeMatch?.id) {
        setHeadTitle({
          id: jobTypeMatch?.id ?? undefined,
          titleTH: jobTypeMatch?.titleTH ?? '',
          titleEN: jobTypeMatch?.titleEN ?? '',
          titleCN: jobTypeMatch?.titleCN ?? '',
          descTH: jobTypeMatch?.descTH ?? '',
          descEN: jobTypeMatch?.descEN ?? '',
          descCN: jobTypeMatch?.descCN ?? '',
          image: jobTypeMatch?.imageTH ?? ''
        })
      } else {
        setHeadTitle(resetJobTypeSlug)
      }
      setIsRenderCompleted(true)
    }
  }, [dataJobType, isReady, slug])

  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'

  // if (!isRenderCompleted && isLoading) {
  //   return <LoadingScreen isLoading={isLoading} locale={lng} />
  // }

  if (!headTitle.id && isRenderCompleted) {
    return <ResponseError statusCode={404} />
  }

  return (
    <div>
      {headTitle?.id && (
        <PropertyListByType headTitle={headTitle} locale={lng} />
      )}
    </div>
  )
}

export default withPrivate(DynamicJobType)
