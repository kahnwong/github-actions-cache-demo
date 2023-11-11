import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import windowExtract from 'public/assets/images/download/window-extract.png'
import windowSelectFolder from 'public/assets/images/download/window-select-folder.png'
import windowExtractSuccess from 'public/assets/images/download/window-extract-success.png'
import macZip from 'public/assets/images/download/mac-zip.png'
import macExtractSuccess from 'public/assets/images/download/mac-extract-success.png'
import downloadSuccess from 'public/assets/images/download/download-success.png'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { useTranslation } from 'react-i18next'
import PrivateLayout from '../../layouts/PrivateLayout'
import { ContentWrapper, DownloadingWrapper, OrderBox } from './style'
import ResponseError from '../../components/ResponseError'
import { useCompany } from '../../contexts/companyContext'

const DownloadImages = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const { t } = useTranslation()

  const {
    state: { productNameEn }
  } = useCompany()

  const router = useRouter()
  try {
    const images = JSON.parse(
      decodeURIComponent(escape(atob(router?.query?.listImage as string)))
    ) as string[]

    const projectName = router?.query?.projectName as string

    const getDateNow = () =>
      new Date()
        .toLocaleString('th-TH')
        .replaceAll('/', '-')
        .replaceAll(' ', '_')
        .replaceAll(':', '.')

    const downloadImages = () => {
      setLoading(true)
      let count = 0
      const zip = new JSZip()
      const zipFilename = `${productNameEn}_${projectName}_${getDateNow()}.zip`
      images?.map(async (imgURL, i) => {
        try {
          const filePath = imgURL.split('.').slice(-1)
          const filename = `${productNameEn}_${projectName}_${getDateNow()}_${
            i + 1
          }.${filePath}`
          const image = await fetch(imgURL)
          const imageBlog = await image.blob()
          await zip?.file(filename, imageBlog, { binary: true })
          count += 1
          if (count === images.length) {
            zip.generateAsync({ type: 'blob' }).then((content) => {
              saveAs(content, zipFilename)
              setLoading(false)
            })
          }
          return true
        } catch (e) {
          return setError(true)
        }
      })
    }

    useEffect(() => {
      downloadImages()
    }, [])

    if (error) return <ResponseError statusCode={400} />

    return (
      <>
        <Head>
          <title>Download Images</title>
        </Head>
        <PrivateLayout useBackButton title='Download' className='bg-light'>
          <Container className='py-4'>
            <DownloadingWrapper>
              <Row className='justify-content-center align-items-center gap-4 gap-md-1 gap-lg-4'>
                {loading ? (
                  <Spinner
                    variant='primary'
                    style={{ width: '47px', height: '47px' }}
                  />
                ) : (
                  <Image src={downloadSuccess} width={47} height={47} />
                )}

                <div className='text-center'>
                  {loading
                    ? t('downloadImages.downloading')
                    : t('downloadImages.downloadSuccess')}
                </div>
              </Row>
            </DownloadingWrapper>
            <ContentWrapper>
              <div className='align-items-center justify-content-center d-flex'>
                <div className='title-box'>{t('downloadImages.unzip')}</div>
              </div>
              <Row className='justify-content-between mt-4'>
                <Col xs={12} md={6} lg={5} className='px-2'>
                  <div className='d-flex justify-content-center'>
                    <div className='header-box'>
                      {t('downloadImages.windows')}
                    </div>
                  </div>
                  <Col xs={12} className='text-center mt-4'>
                    <Image src={windowExtract} height='48' width='134' />
                    <div className='mt-2 d-flex align-items-center gap-4 gap-md-1 gap-lg-4 text-left'>
                      <OrderBox className='col-auto'>1.</OrderBox>
                      {t('downloadImages.windows1')}
                    </div>
                  </Col>

                  <Col xs={12} className='text-center mt-5'>
                    <Image src={windowSelectFolder} height='40' width='170' />
                    <div className='mt-2 d-flex align-items-center gap-4 gap-md-1 gap-lg-4 text-left'>
                      <OrderBox className='col-auto'>2.</OrderBox>
                      {t('downloadImages.windows2')}
                    </div>
                  </Col>

                  <Col xs={12} className='text-center mt-5'>
                    <Image src={windowExtractSuccess} height='35' width='78' />
                    <div className='mt-2 d-flex align-items-center gap-4 gap-md-1 gap-lg-4 text-left'>
                      <OrderBox className='col-auto'>3.</OrderBox>
                      {t('downloadImages.windows3')}
                    </div>
                  </Col>
                </Col>
                <div className='vertical-line d-none d-md-block' />
                <Col xs={12} md={6} lg={5} className='mt-4 mt-md-0 px-2'>
                  <div className='d-flex justify-content-center'>
                    <div className='header-box'>{t('downloadImages.mac')}</div>
                  </div>
                  <Col xs={12} className='text-center mt-4'>
                    <Image src={macZip} height='53' width='76' />
                    <div className='mt-2 d-flex align-items-center gap-4 gap-md-1 gap-lg-4 text-left'>
                      <OrderBox className='col-auto'>1.</OrderBox>
                      {t('downloadImages.mac1')}
                    </div>
                  </Col>

                  <Col xs={12} className='text-center mt-5'>
                    <Image src={macExtractSuccess} height='35' width='78' />
                    <div className='mt-2 d-flex align-items-center gap-4 gap-md-1 gap-lg-4 text-left pre-line'>
                      <OrderBox className='col-auto'>2.</OrderBox>
                      {t('downloadImages.mac2')}
                    </div>
                  </Col>
                </Col>
              </Row>
            </ContentWrapper>
          </Container>
        </PrivateLayout>
      </>
    )
  } catch (e) {
    return <ResponseError statusCode={400} />
  }
}

export default DownloadImages
