import { useState } from 'react'

const useCopyToClipboard = () => {
  const [isShowCopyOverlay, setCopyOverlay] = useState(false)

  const onCopyClipboard = (str: string) => {
    navigator.clipboard.writeText(str).then(() => {
      setCopyOverlay(true)
      setTimeout(() => {
        setCopyOverlay(false)
      }, 3000)
    })
  }
  return {
    isShowCopyOverlay,
    onCopyClipboard
  }
}

export default useCopyToClipboard
