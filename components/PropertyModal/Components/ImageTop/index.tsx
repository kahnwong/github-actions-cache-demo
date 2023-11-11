import { usePropertyModalContext } from 'contexts/propertyModalContext'
import { FC } from 'react'
import Image from 'next/image'
import { ImageTopWrapper } from './style'

const ImageTop: FC = () => {
  const {
    state: {
      data: { bannerurl, projectName }
    }
  } = usePropertyModalContext()

  return (
    <ImageTopWrapper className='ratio ratio-fb'>
      {bannerurl && (
        <Image
          src={bannerurl}
          layout='fill'
          objectFit='cover'
          alt={`${projectName}-modal-image-cover`}
        />
      )}
    </ImageTopWrapper>
  )
}
export default ImageTop
