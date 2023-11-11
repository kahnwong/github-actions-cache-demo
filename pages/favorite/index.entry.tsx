import { NextPage } from 'next'
import PropertyListByFavorite from 'components/PropertyListByFavorite'
import withPrivate from 'hocs/withPrivate'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../contexts/userContext'

const ProjectsFavorite: NextPage = () => {
  const { t } = useTranslation()
  const {
    state: { language }
  } = useUser()
  return (
    <PropertyListByFavorite
      jobType=''
      title={t('favorite.headerTitle')}
      locale={language}
    />
  )
}

export default withPrivate(ProjectsFavorite)
