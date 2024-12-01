import { IGender } from 'interfaces/User'

const GENDER_LIST: IGender[] = [
  {
    labelTH: 'ชาย',
    labelEN: 'Male',
    labelCN: 'Male',
    name: 'groupSex',
    value: 'M'
  },
  {
    labelTH: 'หญิง',
    labelEN: 'Female',
    labelCN: 'Female',
    name: 'groupSex',
    value: 'F'
  },
  {
    labelTH: 'ไม่ต้องการระบุ',
    labelEN: 'Not specify',
    labelCN: 'Not specify',
    name: 'groupSex',
    value: 'N'
  }
]

export { GENDER_LIST }
