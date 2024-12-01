import { useTranslation } from 'react-i18next'
import formatNumber from './formatNumber'

interface iFormatEarnRate {
  earnLabel: string
  earnRateText: string
  startingPriceText: string
}
const formatEarnRateAndPrice = (
  startingPrice: number,
  jobType: string,
  shareFee?: string
): iFormatEarnRate => {
  const { t } = useTranslation()

  if (!startingPrice)
    return { earnLabel: '', earnRateText: '', startingPriceText: '' }
  const floorstartingPrice = Math.floor(startingPrice)
  const floorShareFee = shareFee ? parseInt(shareFee, 10) : 2500
  switch (jobType) {
    case 'Rental':
      return {
        earnLabel: t('formatEarnRateAndPrice.sharingPayment'),
        earnRateText: `฿${formatNumber(floorstartingPrice)}`,
        startingPriceText: `฿ ${formatNumber(floorstartingPrice)}/${t(
          'global.month'
        )}`
      }
    default:
      return {
        earnLabel: t('formatEarnRateAndPrice.minimum'),
        earnRateText: `฿${formatNumber(
          (floorstartingPrice / 1000000) * floorShareFee
        )}++`,
        startingPriceText: `฿${formatNumber(floorstartingPrice)}`
      }
  }
}

export default formatEarnRateAndPrice
