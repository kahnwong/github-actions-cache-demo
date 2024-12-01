import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { usePropertyModalContext } from 'contexts/propertyModalContext'
import ButtonToolTipOverlay from 'components/ButtonTooltipOverlay'
import { CONTACT_CALL } from 'config/contact'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useUser } from 'contexts/userContext'
import { InputActionWrapper } from './style'

type TypeInputAction = 'call' | 'copy'
interface IInputAction {
  type: TypeInputAction
  className?: string
}

const InputAction: FC<IInputAction> = ({ type, className }) => {
  const { t } = useTranslation()
  const {
    state: { user }
  } = useUser()
  const {
    state: {
      data: { id, redirectExternalUrl }
    }
  } = usePropertyModalContext()

  const httpLink =
    redirectExternalUrl && !!redirectExternalUrl
      ? redirectExternalUrl
      : `${window.location.origin}/a/${id}`

  const link = `${httpLink}?platform=c&ref=${user?.id}`

  if (type === 'call') {
    return (
      <InputActionWrapper className={className}>
        <div>{CONTACT_CALL}</div>
        <a href={`tel:${CONTACT_CALL}`}>
          <span className='fw-500'>Call</span>
        </a>
      </InputActionWrapper>
    )
  }
  if (type === 'copy') {
    return (
      <InputActionWrapper className={className}>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip className='copy-link-tooltip'>{link}</Tooltip>}
          delay={{ show: 300, hide: 0 }}
        >
          <div>{link}</div>
        </OverlayTrigger>
        <ButtonToolTipOverlay
          buttonText={t('global.button.copy')}
          tooltipText={t('global.button.copyTooltip')}
          dataCopy={link}
        />
      </InputActionWrapper>
    )
  }
  return null
}

InputAction.defaultProps = {
  className: ''
}
InputAction.propTypes = {
  type: PropTypes.oneOf<TypeInputAction>(['call', 'copy']).isRequired,
  className: PropTypes.string
}

export default InputAction
