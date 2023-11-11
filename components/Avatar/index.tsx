import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

import type { FC } from 'react'
import type { ImageProps } from 'next/image'

import defaultAvatar from 'public/assets/images/profile.png'

import { Wrapper, WrapperHeader } from './style'

interface IAvatar {
  image?: ImageProps['src']
  position?: string
}

const Avatar: FC<IAvatar> = ({ image, position }) => {
  const [avatar, setAvatar] = useState<ImageProps['src']>(
    image || defaultAvatar
  )

  const handleOnError = () => {
    setAvatar(defaultAvatar)
  }

  useEffect(() => {
    if (image) {
      setAvatar(image)
    } else {
      setAvatar(defaultAvatar)
    }
  }, [image])

  return (
    <div>
      {position === 'head' ? (
        <WrapperHeader>
          <Image
            src={avatar}
            alt='avatar'
            layout='fill'
            objectFit='cover'
            onError={handleOnError}
          />
        </WrapperHeader>
      ) : (
        <Wrapper>
          <Image
            src={avatar}
            alt='avatar'
            layout='fill'
            objectFit='cover'
            onError={handleOnError}
          />
        </Wrapper>
      )}
    </div>
  )
}

Avatar.defaultProps = {
  image: defaultAvatar,
  position: ''
}

Avatar.propTypes = {
  image: PropTypes.string,
  position: PropTypes.string
}

export default Avatar
