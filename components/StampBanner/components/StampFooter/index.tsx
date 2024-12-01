import { FC } from 'react'
import PropTypes from 'prop-types'

import { ModalFooterWrapper } from './style'

interface IProps {
  textFooter?: string
}
const StampFooter: FC<IProps> = (props) => {
  const { textFooter } = props
  return (
    <ModalFooterWrapper className='p-5 small'>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: textFooter || ''
        }}
      />
    </ModalFooterWrapper>
  )
}

StampFooter.defaultProps = {
  textFooter: ''
}
StampFooter.propTypes = {
  textFooter: PropTypes.string
}

export default StampFooter
