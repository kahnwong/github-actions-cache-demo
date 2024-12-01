interface IProvince {
  id: number
  nameTh: string | null
  nameEn: string | null
  nameCn: string | null
  provinceCode: string | null
}

interface IDistrict {
  id: number
  nameTh: string | null
  nameEn: string | null
  nameCn: string | null
  districtCode: string | null
  provinceCode: string | null
}

interface ISubdistrict {
  id: number
  nameTh: string | null
  nameEn: string | null
  nameCn: string | null
  subdistrictCode: string | null
  districtCode: string | null
  geom: string | null
}

interface IDeveloper {
  id: number
  companyNameTh: string | null
  companyNameEn: string | null
  companyNameCn: string | null
  shortNameTh: string | null
  shortNameEn: string | null
  shortNameCn: string | null
  businessRegistrationNumber: string | null
  logoUrl: string | null
}

interface IDistrictFilter {
  provinceId: number | null
}

interface ISubdistrictFilter {
  districtId: number | null
}

interface ILocationOption {
  readonly value: number
  readonly label: string
}

export type {
  IProvince,
  IDistrict,
  ISubdistrict,
  IDistrictFilter,
  ISubdistrictFilter,
  IDeveloper,
  ILocationOption
}
