import Image, { ImageProps } from 'next/image'
import { FC, useEffect, useState } from 'react'
import i18next from 'i18next'

import thailandFlag from 'public/assets/images/flags/thailand.png'
import unitedFlag from 'public/assets/images/flags/united-kingdom.png'
import chainaFlag from 'public/assets/images/flags/china.png'

import { DropdownWrapper } from './style'

interface INavBarDropdownDetail {
  label: string
  icon: ImageProps['src']
}

interface ILocale {
  changeLng: Function
}

const DropdownDetail: FC<INavBarDropdownDetail> = ({ label, icon }) => (
  <div className='d-flex align-items-center'>
    <Image src={icon} alt={label} />
  </div>
)

const NAVBAR_LANGUAGE_MENU = [
  { label: 'th', icon: thailandFlag },
  { label: 'en', icon: unitedFlag },
  { label: 'cn', icon: chainaFlag }
]

const DropdownLanguage: FC<ILocale> = ({ changeLng }) => {
  const flag =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'
  const [flagImage, setFlagImage] = useState(thailandFlag)

  const changeLanguageFlag = (lng: string) => {
    let defaultLngImage = thailandFlag
    switch (lng) {
      case 'th':
        defaultLngImage = thailandFlag
        break
      case 'en':
        defaultLngImage = unitedFlag
        break
      case 'cn':
        defaultLngImage = chainaFlag
        break
      default:
        defaultLngImage = thailandFlag
        break
    }
    return defaultLngImage
  }
  const changeLanguage = (value: string) => {
    setFlagImage(changeLanguageFlag(value))
    localStorage.setItem('lng', value)
    changeLng(value)
  }

  useEffect(() => {
    changeLanguage(flag)
  }, [flag])

  return (
    <DropdownWrapper
      className='row align-self-center '
      style={{ marginRight: '30px' }}
    >
      <DropdownWrapper.Toggle
        variant='light'
        id='language-dropdown'
        className='align-items-center'
      >
        <div className='d-inline font-size-14 '>
          <Image src={flagImage} alt='flag image' width='30' height='30' />
        </div>
        <div className='d-inline font-size-14 px-2' style={{ top: '20px' }}>
          {flag.toUpperCase()}
        </div>
      </DropdownWrapper.Toggle>
      <DropdownWrapper.Menu>
        {NAVBAR_LANGUAGE_MENU.map(({ label, icon }, index) => (
          <DropdownWrapper.Item
            key={`$lang-${index.toString()}`}
            onClick={() => changeLanguage(label)}
            style={{ display: label === i18next.language ? 'none' : 'block' }}
          >
            <DropdownDetail label={label} icon={icon} />
          </DropdownWrapper.Item>
        ))}
      </DropdownWrapper.Menu>
    </DropdownWrapper>
  )
}

export default DropdownLanguage
