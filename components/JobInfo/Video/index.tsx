import { FC, HTMLAttributes, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Title from 'components/JobInfo/Title'
import { IJobinfoVideo, IJobinfoVideoComponent } from 'interfaces/JobInfo'
import { getLng } from 'utils/getLng'
import { Container } from 'react-bootstrap'
import { WrapperVDO } from './style'

interface IPropertyVideo extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IJobinfoVideo[]
}

const PropertyVideo: FC<IPropertyVideo> = ({
  theme,
  data,
  locale,
  ...props
}) => {
  const [dataVideo, setDataVideo] = useState<IJobinfoVideoComponent[]>([])
  useEffect(() => {
    if (data) {
      const dataList = [] as IJobinfoVideoComponent[]
      data.forEach((row) => {
        const tJobInfo = getLng(row, locale?.toUpperCase() || 'TH', true)
        dataList.push({
          id: row.id,
          youtubeUrl: tJobInfo('youtubeUrl')
        })
      })
      setDataVideo(dataList)
    }
  }, [data])

  return (
    <Container {...props} className='py-5'>
      <Title text='Video' underLineColor={theme} />
      {dataVideo.map((video) => {
        const idEmbeds = video.youtubeUrl
          ?.split('/')[3]
          ?.replace('watch?v=', '')

        return (
          <WrapperVDO key={`vedio-${video.id}`}>
            <iframe
              width='1000'
              height='515'
              src={`https://www.youtube.com/embed/${idEmbeds}`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title={`${video.id}` ?? ''}
            />
          </WrapperVDO>
        )
      })}
    </Container>
  )
}

PropertyVideo.defaultProps = {
  theme: '#000',
  locale: 'th'
}
PropertyVideo.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      youtubeUrlTh: PropTypes.string,
      youtubeUrlEn: PropTypes.string,
      youtubeUrlCn: PropTypes.string
    }).isRequired
  ).isRequired
}

export default PropertyVideo
