import { FC, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import { Container, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Title from 'components/JobInfo/Title'
import { useTranslation } from 'react-i18next'
import { IJobinfoBrochure } from 'interfaces/JobInfo'
import { BrochureItem, BrochureButton } from './style'

interface IPropertyBrochure extends HTMLAttributes<HTMLElement> {
  theme?: string
  locale?: string
  data?: IJobinfoBrochure[]
}
const PropertyBrochure: FC<IPropertyBrochure> = ({
  data,
  locale,
  theme,
  ...props
}) => {
  const { t } = useTranslation()
  const onBrochureClick = (
    url: string,
    brochureName: string,
    brochureType: number
  ) => {
    if (brochureType === 3) {
      window.open(url, '_blank')
    } else {
      window.URL = window.URL || window.webkitURL
      const xhr = new XMLHttpRequest()
      const a = document.createElement('a')
      let file
      const filePath = url.split('.').slice(-1)
      xhr.open('GET', url, true)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        file = new Blob([xhr.response], {
          type: 'application/octet-stream'
        })
        a.href = window.URL.createObjectURL(file)
        a.download = `${brochureName}.${filePath}`
        a.click()
      }
      xhr.send()
    }
  }
  return (
    <Container {...props} className='py-5'>
      <Title text={t('jobinfo.brochure.title')} underLineColor={theme} />
      <div className='d-flex justify-content-center flex-wrap'>
        {data &&
          data
            .filter((item) => item.language.shortName.toLowerCase() === locale)
            .map((item) => (
              <BrochureItem
                key={`brochure-${item.name}-${item.id}`}
                theme={theme}
              >
                <OverlayTrigger
                  placement='top'
                  overlay={
                    <Tooltip className='download-tooltip'>
                      Download {item.name}
                    </Tooltip>
                  }
                  delay={{ show: 300, hide: 0 }}
                >
                  <BrochureButton
                    onClick={() =>
                      onBrochureClick(item.url, item.name, item.brochureType.id)
                    }
                    variant='theme'
                    theme={theme}
                  >
                    Download {item.name}
                  </BrochureButton>
                </OverlayTrigger>
              </BrochureItem>
            ))}
      </div>
    </Container>
  )
}

PropertyBrochure.defaultProps = {
  theme: '#000',
  locale: 'th'
}
PropertyBrochure.propTypes = {
  theme: PropTypes.string,
  locale: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      brochureType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        // name: PropTypes.oneOf(['PDF', 'IMAGE']).isRequired
        name: PropTypes.string.isRequired
      }).isRequired,
      language: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        shortName: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
}

export default PropertyBrochure
