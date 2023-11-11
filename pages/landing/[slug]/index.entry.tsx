import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import PropertyLayout from 'layouts/PropertyLayout'
import Banner from 'components/JobInfo/Banner'
import Contact from 'components/JobInfo/Contact'
import { IBanner } from 'interfaces/PropertyLanding'
import PropertyAbout from 'components/JobInfo/About'
import PropertyProjectInfo from 'components/JobInfo/ProjectInfo'
import ProjectInfoFacility from 'components/JobInfo/Facility'

// import PropertyBuildingInfo from 'components/JobInfo/BuildingInfo'
import PropertyPayoff from 'components/JobInfo/Payoff'
import PropertyPlan from 'components/JobInfo/Plan'
import PropertyUnitInfo from 'components/JobInfo/UnitInfo'
import PropertyRenovate from 'components/JobInfo/Renovate'
import PropertyGallery from 'components/JobInfo/Gallery'
import PropertyVirtualTour from 'components/JobInfo/VirtualTour'
import PropertyVideo from 'components/JobInfo/Video'
import PropertyPoi from 'components/JobInfo/Poi'
import PropertyBrochure from 'components/JobInfo/Brochure'
import Recommend from 'components/JobInfo/Recommend'
import ResponseError from 'components/ResponseError'
import { getJobInfo, getJobInfoAdmin } from 'services/jobInfo'
import {
  IJobinfoAbout,
  IJobInfoPage,
  IJobInfoSeo,
  IJobinfoRenovate,
  IJobInfoProjectInfo,
  IJobinfoBrochure,
  IJobinfoPayOff,
  IJobinfoPlan,
  IJobinfoFacility,
  IJobinfoVirtualTour,
  IJobinfoPoiComponent,
  IJobinfoVideo,
  IUnits,
  IJobinfoGallery,
  IJobInfo
} from 'interfaces/JobInfo'
import { IOptions } from 'interfaces/Form'
import { getLng } from 'utils/getLng'
// @ts-ignore
import { variables } from '@company/variables.ts'
// @ts-ignore
import companyDetail from '@company/companyDetail.json'

import { SITE_URL } from 'config/environment'
import { useCompany } from '../../../contexts/companyContext'

interface ILandingProperty {
  status: number
  jobInfoData: IJobInfo
  seoData: IJobInfoSeo
  lang: string
  token: string | null
  agentId: string | null
  platform: string | null
}

const LandingProperty = ({
  status,
  jobInfoData,
  seoData,
  lang,
  token,
  agentId,
  platform
}: ILandingProperty) => {
  const [jobInfoPayload, setJobInfoPayload] = useState<IJobInfo>()
  const [jobInfoTheme, setJobInfoTheme] = useState<string>(variables.primary)
  const [jobInfoBanner, setJobInfoBanner] = useState<IBanner>()
  const [jobInfo, setJobInfo] = useState<IJobInfoPage>({})
  const [jobinfoRenovates, setJobinfoRenovates] = useState<IJobinfoRenovate[]>(
    []
  )
  const [jobinfoAbout, setJobinfoAbout] = useState<IJobinfoAbout>()
  const [jobinfoProjectInfo, setJobinfoProjectInfo] =
    useState<IJobInfoProjectInfo>({})
  const [jobinfoFacility, setJobinfoFacility] = useState<IJobinfoFacility[]>([])
  const [jobinfoBrochure, setJobinfoBrochure] = useState<IJobinfoBrochure[]>()
  const [jobinfoPayOff, setJobinfoPayOff] = useState<IJobinfoPayOff>()
  const [jobinfoPlans, setjobinfoPlans] = useState<IJobinfoPlan[]>([])
  const [jobinfoVirtualTour, setJobinfoVirtualTour] = useState<
    IJobinfoVirtualTour[]
  >([])
  const [jobinfoVideos, setJobinfoVideos] = useState<IJobinfoVideo[]>([])

  const [jobInfoPoi, setJobInfoPoi] = useState<IJobinfoPoiComponent>()
  const [jobinfoGalleries, setJobinfoGalleries] = useState<IJobinfoGallery[]>(
    []
  )
  const [jobinfoUnitInfo, setJobinfoUnitInfo] = useState<IUnits[]>()

  const [menuList, setMenuList] = useState<IOptions[]>()

  const {
    state: { twitterAccount }
  } = useCompany()

  let lng =
    (typeof localStorage !== 'undefined' && localStorage.getItem('lng')) || 'th'

  useEffect(() => {
    if (lang) {
      lng = lang
      localStorage.setItem('lng', lang)
    }
  }, [lang])
  useEffect(() => {
    if (jobInfoData) {
      const tJobInfo = getLng(jobInfoData, lng?.toUpperCase() || 'TH', true)
      setJobInfoPayload(jobInfoData)
      setJobInfoTheme(jobInfoData.themeColorCode ?? variables.primary)
      setJobInfo({
        projectLogoUrl: jobInfoData.projectLogoUrl
      })
      setJobInfoBanner({
        alt: (tJobInfo('projectName') as string) ?? '',
        src: (tJobInfo('mainImageUrl') as string) ?? ''
      })

      const aboutPayload = jobInfoData?.jobinfoAbout
      setJobinfoAbout({
        id: Number(aboutPayload?.id),
        projectOverviewTh: aboutPayload?.projectOverviewTh || '',
        projectOverviewEn: aboutPayload?.projectOverviewEn || '',
        projectOverviewCn: aboutPayload?.projectOverviewCn || '',
        subImageUrl: aboutPayload?.subImageUrl || ''
      })
      setJobinfoRenovates(jobInfoData?.jobinfoRenovates ?? [])

      const addressDetail = jobInfoData.addressDetail ?? ''
      const tSubDistrict = getLng(jobInfoData?.subdistrict, lng, true)
      const tDistrict = getLng(jobInfoData?.district, lng, true)
      const tProvince = getLng(jobInfoData?.province, lng, true)
      const subDistrict = tSubDistrict('name') ? `${tSubDistrict('name')}` : ''
      const district = tDistrict('name') ? `${tDistrict('name')}` : ''
      const province = tProvince('name') ? `${tProvince('name')}` : ''
      const postcode = jobInfoData?.postcode ?? ''

      setJobinfoProjectInfo({
        projectFullAddress: `${addressDetail} ${subDistrict} ${district} ${province} ${postcode}`,
        constructionEndDate: jobInfoData.constructionEndDate,
        parkingLotDetail: jobInfoData.parkingLotDetail,
        totalUnitDetail: jobInfoData.totalUnitDetail,
        projectAreaRai: jobInfoData.projectAreaRai,
        projectAreaNgan: jobInfoData.projectAreaNgan,
        projectAreaSqwa: jobInfoData.projectAreaSqwa,
        developer: jobInfoData.developer,
        projectDescriptionTh: jobInfoData.projectDescriptionTh,
        projectDescriptionEn: jobInfoData.projectDescriptionEn,
        projectDescriptionCn: jobInfoData.projectDescriptionCn
      })
      setJobinfoFacility(
        (jobInfoData.jobinfoFacilities as IJobinfoFacility[]) ?? []
      )
      setJobinfoBrochure(jobInfoData.jobinfoBrochures)
      setJobinfoPayOff(jobInfoData.jobinfoPayOff as IJobinfoPayOff)
      setjobinfoPlans(jobInfoData.jobinfoPlans ?? [])
      setJobinfoVirtualTour(jobInfoData?.jobinfoVirtualTours ?? [])
      setJobInfoPoi({
        latitude: jobInfoData.latitude,
        longitude: jobInfoData.longitude,
        googleMapsUrl: jobInfoData.googleMapsUrl,
        streetViewUrl: jobInfoData.streetViewUrl,
        mapImageUrl: tJobInfo('mapImageUrl') ?? '',
        dataPoi: jobInfoData.jobinfoPois ?? []
      })
      setJobinfoVideos(jobInfoData?.jobinfoVideos ?? [])
      setJobinfoGalleries(jobInfoData.jobinfoGalleries ?? [])
      setJobinfoUnitInfo(jobInfoData.units ?? [])
    }

    if (jobInfoData?.jobinfoModules) {
      const jobinfoModulesActive = jobInfoData?.jobinfoModules
        .filter((row) => row.isActive)
        .sort((a, b) => a.order - b.order)
      setMenuList(
        jobinfoModulesActive.map(({ module }) => ({
          label: module.nameTh ?? '',
          value: module.title ?? ''
        }))
      )
    }
  }, [jobInfoData])

  if (status !== 200) {
    return <ResponseError statusCode={404} />
  }

  const { asPath } = useRouter()
  const seoPathName = `${SITE_URL}${asPath.split('?')[0]}`
  return (
    <>
      <Head>
        <title>{seoData?.projectName}</title>
        <meta name='description' content={seoData?.seoJobDescription} />
        {/* for twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:description' content={seoData?.seoJobDescription} />
        <meta
          name='twitter:title'
          content={seoData?.seoJobTitle || seoData?.projectName}
        />
        <meta name='twitter:site' content={twitterAccount} />
        <meta name='twitter:image' content={seoData?.seoImageUrl} />
        <meta name='twitter:creator' content={twitterAccount} />
        <meta
          property='og:title'
          content={seoData?.seoJobTitle || seoData?.projectName}
        />
        <meta property='og:description' content={seoData?.seoJobDescription} />
        <meta property='og:url' content={`${seoPathName}`} />
        <meta property='og:type' content='article' />
        <meta property='og:image' content={seoData?.seoImageUrl} />
        <meta property='og:image:width' content='600' />
        <meta property='og:image:height' content='312' />
        <link href={`${seoPathName}`} rel='canonical' />
      </Head>
      <PropertyLayout
        menuList={menuList as IOptions[]}
        agentId={agentId as string}
        logo={jobInfo?.projectLogoUrl}
        theme={jobInfoTheme}
        isLoading={typeof jobInfoPayload === 'undefined'}
        isPrivate={
          typeof token !== 'undefined' && jobInfoPayload?.status !== 'ACTIVE'
        }
        locale={lng}
      >
        {jobInfoBanner?.src && <Banner {...jobInfoBanner} />}
        <Contact
          id='CONTACT1'
          backgroundColor='#E4E4E4'
          theme={jobInfoTheme}
          jobId={String(jobInfoData?.id)}
          platform={platform as string}
          agentId={agentId as string}
        />
        {menuList &&
          menuList.map(({ value }) => {
            const key = `property-${value}`
            switch (value) {
              case 'ABOUT':
                return (
                  <PropertyAbout
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoAbout}
                    locale={lng}
                  />
                )
              case 'PROJECT_INFO':
                return (
                  <div key={key}>
                    <PropertyProjectInfo
                      id={value}
                      theme={jobInfoTheme}
                      data={jobinfoProjectInfo}
                      locale={lng}
                    />
                    {jobinfoFacility?.length > 0 && (
                      <ProjectInfoFacility
                        theme={jobInfoTheme}
                        data={jobinfoFacility}
                        locale={lng}
                      />
                    )}
                  </div>
                )
              // case 'BUILDING_INFO':
              //   return (
              //     <PropertyBuildingInfo
              //       id={value}
              //       key={key}
              //       theme={jobInfoTheme}
              //     />
              //   )
              case 'PAY_OFF':
                return (
                  <PropertyPayoff
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoPayOff}
                    locale={lng}
                  />
                )
              case 'PLAN':
                return (
                  <PropertyPlan
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoPlans}
                    locale={lng}
                  />
                )
              case 'UNIT_INFO':
                return (
                  <PropertyUnitInfo
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoUnitInfo}
                  />
                )
              case 'RENOVATE':
                return (
                  <PropertyRenovate
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoRenovates}
                  />
                )
              case 'GALLERY':
                return (
                  <PropertyGallery
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoGalleries}
                  />
                )
              case 'VIRTUAL_TOUR':
                return (
                  <PropertyVirtualTour
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoVirtualTour}
                  />
                )
              case 'VDO':
                return (
                  <PropertyVideo
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoVideos}
                    locale={lng}
                  />
                )
              case 'POI':
                return (
                  <PropertyPoi
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    dataPoi={jobInfoPoi?.dataPoi ?? []}
                    latitude={Number(jobInfoPoi?.latitude)}
                    longitude={Number(jobInfoPoi?.longitude)}
                    googleMapsUrl={jobInfoPoi?.googleMapsUrl}
                    streetViewUrl={jobInfoPoi?.streetViewUrl}
                    mapImageUrl={jobInfoPoi?.mapImageUrl}
                  />
                )
              case 'BROCHURE':
                return (
                  <PropertyBrochure
                    id={value}
                    key={key}
                    theme={jobInfoTheme}
                    data={jobinfoBrochure}
                    locale={lng}
                  />
                )
              default:
                return <Fragment key={key} />
            }
          })}
        <Contact
          id='CONTACT2'
          theme={jobInfoTheme}
          jobId={String(jobInfoData?.id)}
          platform={platform as string}
          agentId={agentId as string}
        />
        <Recommend theme={jobInfoTheme} />
      </PropertyLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const slug = ctx.query.slug as string
  const jobId =
    slug.lastIndexOf('-') > -1 ? slug.slice(slug.lastIndexOf('-') + 1) : slug
  const response = ctx.query.token
    ? await getJobInfoAdmin(
        jobId as string,
        (ctx.query.token as string) ?? null
      )
    : await getJobInfo(jobId as string)

  const { companyNameEn } = companyDetail

  let seoData = {
    projectName: companyNameEn,
    seoJobDescription: '-',
    seoImageUrl: '-',
    seoJobTitle: '-'
  } as IJobInfoSeo
  if (response?.status === 200) {
    const tJobInfo = getLng(
      response?.data?.payload,
      ctx.query.lang?.toUpperCase() || 'TH',
      true
    )

    const tJobInfoAbout = getLng(
      response?.data?.payload?.jobinfoAbout,
      ctx.query.lang?.toUpperCase() || 'TH',
      true
    )
    seoData = {
      projectName: tJobInfo('projectName'),
      seoJobDescription: tJobInfo('seoJobDescription')
        ? tJobInfo('seoJobDescription')
        : tJobInfoAbout('projectOverview').replace(/(<([^>]+)>)/gi, ''),
      seoImageUrl: tJobInfo('seoImageUrl'),
      seoJobTitle: tJobInfo('seoJobTitle')
    }
  }

  if (ctx.query.slug && ctx.query.slug.lastIndexOf('-') === -1) {
    const newSlug = `${encodeURIComponent(seoData?.projectName)}-${jobId}`
    const resolveUrl = ctx.resolvedUrl?.split('?')[1]
    const newQuery = resolveUrl ? `?${resolveUrl}` : ''
    ctx.res.writeHead(302, { Location: `/a/${newSlug}${newQuery}` })
    ctx.res.end()
  }
  return {
    props: {
      status: response?.status ?? 400,
      jobInfoData: response?.data?.payload ?? null,
      seoData: seoData ?? null,
      lang: ctx.query.lang ?? null,
      token: ctx.query.token ?? null,
      agentId: ctx.query.ref ?? null,
      platform: ctx.query.platform ?? null
    }
  }
}
export default LandingProperty
