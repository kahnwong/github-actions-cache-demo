import { FC, useState, useEffect, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import Image from 'next/image'

import 'react-multi-carousel/lib/styles.css'

import PopupGallery from 'components/PopupGallery'
import dynamic from 'next/dynamic'
import { IJobinfoRenovate } from 'interfaces/JobInfo'
import { useTranslation } from 'react-i18next'
import Title from 'components/JobInfo/Title'

import {
  ImageCompareWrapper,
  CompareBox,
  TitleBefore,
  TitleAfter
} from './style'

const Carousel: any = dynamic(() => import('react-multi-carousel'), {
  ssr: false
})

interface IRenovate extends HTMLAttributes<HTMLElement> {
  theme?: string
  data?: IJobinfoRenovate[]
}

const JobInfoRenovate: FC<IRenovate> = ({ theme, data, ...props }) => {
  const [dataItems, setDataItem] = useState<IJobinfoRenovate[]>([])
  const [selectedItems, setSelectedItem] = useState<number>()
  const [imgDefaultBefore, setDefaultImgBefore] = useState<string>('')
  const [imgDefaultAfter, setDefaultImgAfter] = useState<string>('')
  const [showGallery, setShowGallery] = useState<boolean>(false)
  const [dataGallery, setDataToGallery] = useState<string[]>([])
  const { t } = useTranslation()

  const handleClose = () => setShowGallery(false)

  const dataToGallery = (item: string[]) => {
    setDataToGallery(item)
    setShowGallery(true)
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 992 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 991, min: 0 },
      items: 2
    }
  }

  const displayBeforeAfter = (
    id: number,
    imgBefore: string,
    imgAfter: string
  ) => {
    setSelectedItem(id)
    setDefaultImgBefore(imgBefore)
    setDefaultImgAfter(imgAfter)
  }

  useEffect(() => {
    if (data && data?.length > 0) {
      setDataItem(data)
      setSelectedItem(data[0]?.id)
      setDefaultImgBefore(data[0]?.beforeImageUrl as string)
      setDefaultImgAfter(data[0]?.afterImageUrl as string)
    }
  }, [data])

  return (
    <div className='py-5' {...props}>
      <PopupGallery
        isShow={showGallery}
        handleClose={handleClose}
        listImage={dataGallery}
        autoPlay={false}
      />
      {dataItems?.length > 0 && (
        <div className='py-3'>
          <Title text={t('jobinfo.renovate.title')} underLineColor={theme} />
          <Container>
            <ImageCompareWrapper>
              <CompareBox>
                {imgDefaultBefore && (
                  <Image
                    src={imgDefaultBefore}
                    layout='responsive'
                    role='button'
                    width={500}
                    height={400}
                    onClick={() =>
                      dataToGallery([imgDefaultBefore, imgDefaultAfter])
                    }
                  />
                )}
                <TitleBefore>Before</TitleBefore>
              </CompareBox>
              <CompareBox>
                {imgDefaultAfter && (
                  <Image
                    src={imgDefaultAfter}
                    layout='responsive'
                    role='button'
                    width={500}
                    height={400}
                    onClick={() =>
                      dataToGallery([imgDefaultAfter, imgDefaultBefore])
                    }
                  />
                )}
                <TitleAfter>After</TitleAfter>
              </CompareBox>
            </ImageCompareWrapper>
            <Carousel
              showDots
              responsive={responsive}
              ssr
              infinite={false}
              autoPlaySpeed={1000}
              keyBoardControl
              customTransition='all .5'
              transitionDuration={500}
              containerClass='carousel-container pb-3'
              removeArrowOnDeviceType={['tablet', 'mobile']}
            >
              {dataItems?.map((item: any) => (
                <div key={`renovate-${item?.id}`} className='px-1'>
                  <div
                    style={{
                      border:
                        item?.id === selectedItems
                          ? `2px solid ${theme ?? '#22bb66'}`
                          : ''
                    }}
                  >
                    <Image
                      src={item?.afterImageUrl}
                      layout='responsive'
                      height={152}
                      width={260}
                      role='button'
                      onClick={() =>
                        displayBeforeAfter(
                          item?.id,
                          item?.beforeImageUrl,
                          item?.afterImageUrl
                        )
                      }
                    />
                  </div>
                  <div
                    className='text-center'
                    style={{
                      color:
                        item?.id === selectedItems ? theme ?? '#22bb66' : ''
                    }}
                  >
                    {item?.titleTh}
                  </div>
                </div>
              ))}
            </Carousel>
          </Container>
        </div>
      )}
    </div>
  )
}

JobInfoRenovate.defaultProps = {
  theme: '#000'
}

JobInfoRenovate.propTypes = {
  theme: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titleTh: PropTypes.string,
      titleEn: PropTypes.string,
      titleCn: PropTypes.string,
      beforeImageUrl: PropTypes.string.isRequired,
      afterImageUrl: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default JobInfoRenovate
