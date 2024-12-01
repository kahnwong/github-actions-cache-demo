import { NextPage } from 'next'

import PropertyListSearch from 'components/PropertyListSearch'
import withPrivate from 'hocs/withPrivate'
import { useUser } from 'contexts/userContext'
import { getLngFlex } from 'utils/getLng'
import { propertySearch } from './constants'

const PropertySearch: NextPage = () => {
  const {
    state: { language }
  } = useUser()
  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'
  const t = propertySearch && getLngFlex(propertySearch, language.toUpperCase())
  return <PropertyListSearch title={t('headTitle')} locale={lng} />
}

export default withPrivate(PropertySearch)
