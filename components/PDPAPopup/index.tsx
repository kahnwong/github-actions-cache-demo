/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FormCheck, Modal, ToggleButton } from 'react-bootstrap'

import type { FC } from 'react'

import { ESubmit } from 'hooks/usePDPA'
import Terms from './terms'
import Privacy from './privacy'
import { pdpaPopup } from './constants'
import { getLng } from '../../utils/getLng'
import { StyledModal, TabGroup } from './style'

enum ETab {
  terms,
  privacy
}

interface IProps {
  show: boolean
  onReject: () => void
  onAccept: () => void
  submitState: ESubmit
}

const PDPAPopup: FC<IProps> = (props) => {
  const { show, onReject, onAccept, submitState } = props
  const [isAccepted, setIsAccepted] = useState(false)
  const [selectedTab, setSelectedTab] = useState(ETab.terms)

  const lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'
  const t = pdpaPopup && getLng(pdpaPopup, lng.toUpperCase())

  const Content = useMemo(() => {
    switch (selectedTab) {
      case ETab.terms:
        return <Terms />
      case ETab.privacy:
        return <Privacy />
      default:
        return null
    }
  }, [selectedTab])

  return (
    <StyledModal
      show={show}
      onHide={onReject}
      backdrop='static'
      keyboard={false}
      size='xl'
      fullscreen='lg-down'
      centered
      scrollable
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <TabGroup
          type='radio'
          name='terms-and-privacy-content'
          value={selectedTab}
          onChange={(value: ETab) => setSelectedTab(value)}
        >
          <ToggleButton id={`tab-${ETab.terms}`} value={ETab.terms}>
            {t('headerTitle')}
          </ToggleButton>
          <ToggleButton id={`tab-${ETab.privacy}`} value={ETab.privacy}>
            {t('headerSubTitle')}
          </ToggleButton>
        </TabGroup>
        {Content}
      </Modal.Body>
      <Modal.Footer>
        <FormCheck
          label={t('acceptTerms')}
          id='accept-term-and-condition'
          checked={isAccepted}
          onChange={(e) => setIsAccepted(e.target.checked)}
        />
        <Button
          size='lg'
          disabled={!isAccepted || submitState === ESubmit.SUBMITTING}
          className='px-5'
          onClick={onAccept}
        >
          {submitState === ESubmit.SUBMITTING
            ? t('buttonSaving')
            : t('buttonSave')}
        </Button>
      </Modal.Footer>
    </StyledModal>
  )
}

PDPAPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  submitState: PropTypes.oneOf(Object.values(ESubmit) as ESubmit[]).isRequired
}

export default PDPAPopup
