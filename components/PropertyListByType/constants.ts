interface IPropertyListFilter {
  value: string
  title: string
  labelTH: string
  labelEN: string
  labelCN: string
}

interface IProertyListSort extends IPropertyListFilter {
  key: string
  q: string
}

interface IPriceSort {
  value: string
  title?: string
  titleTH: string
  titleEN: string
  titleCN: string
  keyMin: string
  qMin: string
  keyMax: string
  qMax: string
}

const LOCATIONS: IPropertyListFilter[] = [
  {
    value: '',
    title: 'ทุกพื้นที่',
    labelTH: 'ทุกพื้นที่',
    labelEN: 'ทุกพื้นที่',
    labelCN: 'ทุกพื้นที่'
  },
  {
    value: 'กรุงเทพฯ',
    title: 'กรุงเทพฯ',
    labelTH: 'กรุงเทพฯ',
    labelEN: 'กรุงเทพฯ',
    labelCN: 'กรุงเทพฯ'
  },
  {
    value: 'ปทุมธานี',
    title: 'ปทุมธานี',
    labelTH: 'ปทุมธานี',
    labelEN: 'ปทุมธานี',
    labelCN: 'ปทุมธานี'
  },
  {
    value: 'นครปฐม',
    title: 'นครปฐม',
    labelTH: 'นครปฐม',
    labelEN: 'นครปฐม',
    labelCN: 'นครปฐม'
  },
  {
    value: 'นนทบุรี',
    title: 'นนทบุรี',
    labelTH: 'นนทบุรี',
    labelEN: 'นนทบุรี',
    labelCN: 'นนทบุรี'
  },
  {
    value: 'สมุทรปราการ',
    title: 'สมุทรปราการ',
    labelTH: 'สมุทรปราการ',
    labelEN: 'สมุทรปราการ',
    labelCN: 'สมุทรปราการ'
  }
]

const PROPERTY_TYPES: IPropertyListFilter[] = [
  {
    value: '',
    title: 'ทั้งหมด',
    labelTH: 'ทั้งหมด',
    labelEN: 'ทั้งหมด',
    labelCN: 'ทุกพืทั้งหมด้นที่'
  },
  {
    value: 'ทาวน์โฮม',
    title: 'ทาวน์โฮม',
    labelTH: 'ทาวน์โฮม',
    labelEN: 'ทาวน์โฮม',
    labelCN: 'ทาวน์โฮม'
  },
  {
    value: 'คอนโด',
    title: 'คอนโด',
    labelTH: 'คอนโด',
    labelEN: 'คอนโด',
    labelCN: 'คอนโด'
  },
  {
    value: 'บ้านเดี่ยว',
    title: 'บ้านเดี่ยว',
    labelTH: 'ทุกพื้นที่',
    labelEN: 'ทุกพื้นที่',
    labelCN: 'ทุกพื้นที่'
  }
]

const SORTS: IProertyListSort[] = [
  {
    value: 'desc',
    title: 'วันที่อัพเดตล่าสุด',
    labelTH: 'วันที่อัพเดตล่าสุด',
    labelEN: 'Updated from latest',
    labelCN: 'Updated from latest',
    key: 'updatedDate',
    q: 'desc'
  },
  {
    value: 'asc',
    title: 'วันที่อัพเดตเก่าสุด',
    labelTH: 'วันที่อัพเดตเก่าสุด',
    labelEN: 'Updated from oldest',
    labelCN: 'Updated from oldest',
    key: 'updatedDate',
    q: 'asc'
  },
  {
    value: 'asc',
    title: 'ราคาเริ่มต้น น้อย-มาก',
    labelTH: 'ราคาเริ่มต้น น้อย-มาก',
    labelEN: 'Starting price from low to high',
    labelCN: 'Starting price from low to high',
    key: 'unitLocalSalePrice',
    q: 'asc'
  },
  {
    value: 'desc',
    title: 'ราคาเริ่มต้น มาก-น้อย',
    labelTH: 'ราคาเริ่มต้น มาก-น้อย',
    labelEN: 'Starting price from high to low',
    labelCN: 'Starting price from high to low',
    key: 'unitLocalSalePrice',
    q: 'desc'
  },
  {
    value: 'asc',
    title: 'ส่วนแบ่งการแชร์ น้อย-มาก',
    labelTH: 'ส่วนแบ่งการแชร์ น้อย-มาก',
    labelEN: 'Share commission from low to high',
    labelCN: 'Share commission from low to high',
    key: 'sharePrice',
    q: 'asc'
  },
  {
    value: 'desc',
    title: 'ส่วนแบ่งการแชร์ มาก-น้อย',
    labelTH: 'ส่วนแบ่งการแชร์ มาก-น้อย',
    labelEN: 'Share commission from high to low',
    labelCN: 'Share commission from high to low',
    key: 'sharePrice',
    q: 'desc'
  },
  {
    value: 'asc',
    title: 'ส่วนแบ่งค่าคอมมิชชั่น น้อย-มาก',
    labelTH: 'ส่วนแบ่งค่าคอมมิชชั่น น้อย-มาก',
    labelEN: 'Commission amount from low to high',
    labelCN: 'Commission amount from low to high',
    key: 'commissionPrice',
    q: 'asc'
  },
  {
    value: 'desc',
    title: 'ส่วนแบ่งค่าคอมมิชชั่น มาก-น้อย',
    labelTH: 'ส่วนแบ่งค่าคอมมิชชั่น มาก-น้อย',
    labelEN: 'Commission amount from high to low',
    labelCN: 'Commission amount from high to low',
    key: 'commissionPrice',
    q: 'desc'
  },
  {
    value: 'asc',
    title: 'เปอร์เซ็นค่าคอมมิชชั่น น้อย-มาก',
    labelTH: 'เปอร์เซ็นค่าคอมมิชชั่น น้อย-มาก',
    labelEN: 'Commission percentage from low to high',
    labelCN: 'Commission percentage from low to high',
    key: 'commissionPercentage',
    q: 'asc'
  },
  {
    value: 'desc',
    title: 'เปอร์เซ็นค่าคอมมิชชั่น มาก-น้อย',
    labelTH: 'เปอร์เซ็นค่าคอมมิชชั่น มาก-น้อย',
    labelEN: 'Commission percentage from high to low',
    labelCN: 'Commission percentage from high to low',
    key: 'commissionPercentage',
    q: 'desc'
  }
]

const SORT_KEYS = [
  'updatedDate',
  'unitLocalSalePrice',
  'shareFee',
  'createdDate',
  'sharePrice',
  'commissionPrice',
  'commissionPercentage'
]

const SORT_PRICE: IPriceSort[] = [
  {
    value: '<1M',
    titleTH: 'ต่ำกว่า 1 ล้านบาท',
    titleEN: 'Less than 1 million baht',
    titleCN: 'Less than 1 million baht',
    keyMin: 'minPrice',
    qMin: '0',
    keyMax: 'maxPrice',
    qMax: '999999'
  },
  {
    value: '1M-5M',
    titleTH: '1-5 ล้านบาท',
    titleEN: '1-5 million baht',
    titleCN: '1-5 million baht',
    keyMin: 'minPrice',
    qMin: '1000000',
    keyMax: 'maxPrice',
    qMax: '5000000'
  },
  {
    value: '5M-10M',
    titleTH: '5-10 ล้านบาท',
    titleEN: '5-10 million baht',
    titleCN: '5-10 million baht',
    keyMin: 'minPrice',
    qMin: '5000000',
    keyMax: 'maxPrice',
    qMax: '10000000'
  },
  {
    value: '>10M',
    titleTH: 'มากกว่า 10 ล้านบาท',
    titleEN: 'More than 10 million baht',
    titleCN: 'More than 10 million baht',
    keyMin: 'minPrice',
    qMin: '10000001',
    keyMax: 'maxPrice',
    qMax: ''
  }
]

export { LOCATIONS, PROPERTY_TYPES, SORTS, SORT_KEYS, SORT_PRICE }
