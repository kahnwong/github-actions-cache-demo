import { useTranslation } from 'react-i18next'

interface iGetEarnLabel {
  earnLabel: string
}
const getEarnLabel = (jobType: string): iGetEarnLabel => {
  const { t } = useTranslation()

  switch (jobType) {
    case 'Rental':
      return {
        earnLabel: t('formatEarnRateAndPrice.sharingPayment')
      }
    default:
      return {
        earnLabel: t('formatEarnRateAndPrice.minimum')
      }
  }
}

export default getEarnLabel
