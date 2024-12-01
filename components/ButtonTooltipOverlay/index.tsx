import { FC, useRef } from 'react'
import PropTypes from 'prop-types'
import useCopyToClipboard from 'hooks/useCopyToClipboard'
import { Button, Overlay, Tooltip } from 'react-bootstrap'

interface IButtonToolTipOverlay {
  buttonText: string
  tooltipText: string
  overlayPosition?: 'top' | 'right' | 'bottom' | 'left'
  dataCopy: string
  className?: string
}

const ButtonToolTipOverlay: FC<IButtonToolTipOverlay> = ({
  buttonText,
  tooltipText,
  overlayPosition,
  dataCopy,
  className
}) => {
  const { isShowCopyOverlay, onCopyClipboard } = useCopyToClipboard()
  const targetOverlayRef = useRef(null)

  const handleDataPattern = (data: string) => {
    if (!data) return ''
    const isLink = data.startsWith('www') || data.startsWith('http')
    return isLink ? decodeURI(data) : data
  }

  return (
    <div className={className}>
      <Button
        className='border-0'
        ref={targetOverlayRef}
        variant='outline-primary'
        size='sm'
        onClick={() => onCopyClipboard(handleDataPattern(dataCopy))}
        style={{ width: 65 }}
      >
        {buttonText}
      </Button>
      <Overlay
        target={targetOverlayRef.current}
        show={isShowCopyOverlay}
        placement={overlayPosition}
      >
        {(props) => <Tooltip {...props}>{tooltipText}</Tooltip>}
      </Overlay>
    </div>
  )
}

ButtonToolTipOverlay.defaultProps = {
  overlayPosition: 'bottom',
  className: ''
}

ButtonToolTipOverlay.propTypes = {
  buttonText: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  overlayPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  dataCopy: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default ButtonToolTipOverlay
