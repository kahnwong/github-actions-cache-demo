import { IJob, IJobFilter, IJobRecommend } from 'interfaces/Job'
import { IPropertyTypeList } from 'interfaces/JobPropertyTypeList'
import { IProjectGetZone } from 'interfaces/JobZoneList'
import {
  FAVORITE_JOB,
  fetcher,
  IResponse,
  JOB_WITH_SHARE,
  RECOMMEND
} from './_base'
import {
  IProvince,
  IDistrict,
  ISubdistrict,
  IDistrictFilter,
  IDeveloper,
  ISubdistrictFilter
} from '../interfaces/JobLocation'

export const getJobByFilter = (params: IJobFilter) =>
  fetcher.get<IResponse<IJob[]>>(JOB_WITH_SHARE, { params })

export const getJobFavoriteByFilter = (params: IJobFilter) =>
  fetcher.get<IResponse<IJob[]>>(`${FAVORITE_JOB}/job_with_share`, { params })

export const getRecommendJob = (params: IJobFilter) =>
  fetcher.get<IResponse<IJobRecommend>>(`${JOB_WITH_SHARE}${RECOMMEND}`, {
    params
  })

export const getPropertyType = () =>
  fetcher.get<IResponse<IPropertyTypeList>>(`${JOB_WITH_SHARE}/property_type`)

export const getZoneList = () =>
  fetcher.get<IResponse<IProjectGetZone[]>>(`${JOB_WITH_SHARE}/project_zone`)

export const getProjectProvince = () =>
  fetcher.get<IResponse<IProvince[]>>(`${JOB_WITH_SHARE}/project_province_name`)

export const getProjectDistrict = (params: IDistrictFilter) =>
  fetcher.get<IResponse<IDistrict[]>>(
    `${JOB_WITH_SHARE}/project_district_name/`,
    { params }
  )

export const getProjectSubdistrict = (params: ISubdistrictFilter) =>
  fetcher.get<IResponse<ISubdistrict[]>>(
    `${JOB_WITH_SHARE}/project_subdistrict_name/`,
    { params }
  )

export const getDeveloperName = () =>
  fetcher.get<IResponse<IDeveloper[]>>(`${JOB_WITH_SHARE}/developer_name`)
