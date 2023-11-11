interface IPropertyListFilter {
  value: string
  title: string
}

interface IProertyListSort extends IPropertyListFilter {
  key: string
  q: string
}

const LOCATIONS: IPropertyListFilter[] = [
  { value: '', title: 'ทุกพื้นที่' },
  { value: 'กรุงเทพฯ', title: 'กรุงเทพฯ' },
  { value: 'ปทุมธานี', title: 'ปทุมธานี' },
  { value: 'นครปฐม', title: 'นครปฐม' },
  { value: 'นนทบุรี', title: 'นนทบุรี' },
  { value: 'สมุทรปราการ', title: 'สมุทรปราการ' }
]

const PROPERTY_TYPES: IPropertyListFilter[] = [
  { value: '', title: 'ทั้งหมด' },
  { value: 'ทาวน์โฮม', title: 'ทาวน์โฮม' },
  { value: 'คอนโด', title: 'คอนโด' },
  { value: 'บ้านเดี่ยว', title: 'บ้านเดี่ยว' }
]

const SORTS: IProertyListSort[] = [
  { value: 'asc', title: 'ล่าสุด', key: 'createdDate', q: 'asc' },
  { value: 'asc', title: 'ราคาจากน้อยไปมาก', key: 'startingPrice', q: 'asc' },
  { value: 'desc', title: 'ราคาจากมากไปน้อย', key: 'startingPrice', q: 'desc' }
]
const SORT_KEYS = ['startingPrice', 'createdDate']

export { LOCATIONS, PROPERTY_TYPES, SORTS, SORT_KEYS }
