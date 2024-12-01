import { useState } from 'react'

const useDisclosure = (open?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(open || false)

  const onToggle = (value?: boolean) => {
    if (typeof value === 'boolean') {
      setIsOpen(value)
    } else {
      setIsOpen((val) => !val)
    }
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return { isOpen, onToggle, onClose, onOpen }
}

export default useDisclosure
