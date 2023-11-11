interface IPropertyListFilter {
  value: string
  titleTH: string
  titleEN: string
  titleCN: string
}

interface IPropertyListSort extends IPropertyListFilter {
  key: string
  q: string
}

const PROJECT_TYPES: IPropertyListFilter[] = [
  {
    value: '',
    titleTH: 'ทั้งหมด',
    titleEN: 'All',
    titleCN: 'All'
  },
  {
    value: 'Exclusive',
    titleTH: 'ดีลพิเศษ',
    titleEN: 'Exclusive',
    titleCN: 'Exclusive'
  },
  {
    value: 'NPA',
    titleTH: 'บ้านสวยมือสอง',
    titleEN: 'NPA',
    titleCN: 'NPA'
  },
  {
    value: 'Rental',
    titleTH: 'ห้องเช่า',
    titleEN: 'Rental',
    titleCN: 'Rental'
  },
  {
    value: 'Non-Exclusive',
    titleTH: 'โครงการที่น่าสนใจ',
    titleEN: 'Non-Exclusive',
    titleCN: 'Non-Exclusive'
  },
  {
    value: 'For-Sell',
    titleTH: 'ทรัพย์ดี by BAM',
    titleEN: 'ทรัพย์ดี by BAM',
    titleCN: 'ทรัพย์ดี by BAM'
  }
]

const PROPERTY_TYPES: IPropertyListFilter[] = [
  {
    value: '',
    titleTH: 'ทั้งหมด',
    titleEN: 'All',
    titleCN: 'All'
  },
  {
    value: 'บ้าน',
    titleTH: 'บ้าน',
    titleEN: 'Detached House',
    titleCN: 'Detached House'
  },
  {
    value: 'คอนโด',
    titleTH: 'คอนโด',
    titleEN: 'Condo',
    titleCN: 'Condo'
  },
  {
    value: 'ทาวน์โฮม',
    titleTH: 'ทาวน์โฮม',
    titleEN: 'Townhome',
    titleCN: 'Townhome'
  },
  {
    value: 'อาคารพาณิชย์',
    titleTH: 'อาคารพาณิชย์',
    titleEN: 'Commercial',
    titleCN: 'Commercial'
  },
  {
    value: 'อพาตเมนต์',
    titleTH: 'อพาตเมนต์',
    titleEN: 'Apartment',
    titleCN: 'Apartment'
  },
  {
    value: 'โฮมออฟฟิศ',
    titleTH: 'โฮมออฟฟิศ',
    titleEN: 'Home office',
    titleCN: 'Home office'
  },
  {
    value: 'ที่ดิน',
    titleTH: 'ที่ดิน',
    titleEN: 'Land',
    titleCN: 'Land'
  },
  {
    value: 'โกดัง / โรงงาน',
    titleTH: 'โกดัง / โรงงาน',
    titleEN: 'Warehouse / Factory',
    titleCN: 'Warehouse / Factory'
  },
  {
    value: 'โรงแรม',
    titleTH: 'โรงแรม',
    titleEN: 'Hotel',
    titleCN: 'Hotel'
  },
  {
    value: 'บ้านแฝด',
    titleTH: 'บ้านแฝด',
    titleEN: 'Twin house',
    titleCN: 'Twin house'
  },
  {
    value: 'สำนักงาน',
    titleTH: 'สำนักงาน',
    titleEN: 'Office Space',
    titleCN: 'Office Space'
  },
  {
    value: 'อื่นๆ',
    titleTH: 'อื่นๆ',
    titleEN: 'Other',
    titleCN: 'Other'
  }
]

const SORTS: IPropertyListSort[] = [
  {
    value: 'desc',
    titleTH: 'ล่าสุด',
    titleEN: 'Latest',
    titleCN: 'Latest',
    key: 'updatedDate',
    q: 'desc'
  },
  {
    value: 'asc',
    titleTH: 'ราคาจากน้อยไปมาก',
    titleEN: 'Price from low to high',
    titleCN: 'Price from low to high',
    key: 'unitLocalSalePrice',
    q: 'asc'
  },
  {
    value: 'desc',
    titleTH: 'ราคาจากมากไปน้อย',
    titleEN: 'Price from high to low',
    titleCN: 'Price from high to low',
    key: 'unitLocalSalePrice',
    q: 'desc'
  }
]
const SORT_KEYS = ['unitLocalSalePrice', 'createdDate']

const HEADER_SUBTITLE = {
  headerTitleTH: 'โครงการที่ชอบ',
  headerTitleEN: 'Favorite',
  headerTitleCN: 'Favorite',
  totalNumberTH: 'จำนวนทั้งหมด',
  totalNumberEN: 'Total',
  totalNumberCN: 'Total',
  projectTH: 'โครงการ',
  projectEN: 'Project (s)',
  projectCN: 'Project (s)'
}

export { PROJECT_TYPES, PROPERTY_TYPES, SORTS, SORT_KEYS, HEADER_SUBTITLE }
