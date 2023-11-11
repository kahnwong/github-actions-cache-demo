import { usePropertyModalContext } from 'contexts/propertyModalContext'
import { FC } from 'react'
import ButtonToolTipOverlay from 'components/ButtonTooltipOverlay'
import { useTranslation } from 'react-i18next'
import { useUser } from '../../../../contexts/userContext'
import { getLngFlex } from '../../../../utils/getLng'

const ShareQuote: FC = () => {
  const { t } = useTranslation()
  const {
    state: {
      data: { shareQuoteTh, shareQuoteEn, shareQuoteCn }
    }
  } = usePropertyModalContext()

  const {
    state: { language }
  } = useUser()

  const tShareQuote = getLngFlex(
    { shareQuoteTh, shareQuoteEn, shareQuoteCn },
    language.toUpperCase(),
    true
  )
  return (
    <>
      <div className='display-12 mb-1'>{tShareQuote('shareQuote')}</div>
      <ButtonToolTipOverlay
        buttonText={t('global.button.copy')}
        tooltipText={t('global.button.copyTooltip')}
        dataCopy={tShareQuote('shareQuote')}
      />
    </>
  )
}

export default ShareQuote
