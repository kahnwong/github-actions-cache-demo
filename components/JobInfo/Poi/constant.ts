interface IColorPoi {
  id: number
  colors: string
  textTH: string
  textEN: string
  textCN: string
  icon: string
}

const POI_RGB: IColorPoi[] = [
  {
    id: 0,
    colors: '#222529',
    textTH: 'ทั้งหมด',
    textEN: 'All',
    textCN: 'All',
    icon: ''
  },
  {
    id: 1,
    colors: '#6FADF6',
    textTH: 'โรงเรียน',
    textEN: 'School',
    textCN: 'School',
    icon: 'https://s3.ap-southeast-1.amazonaws.com/cdn.baaniathailand.com/prop2share/master_data/poi/school.svg'
  },
  {
    id: 2,
    colors: '#076077',
    textTH: 'สวนสาธารณะ',
    textEN: 'Park',
    textCN: 'Park',
    icon: 'https://s3.ap-southeast-1.amazonaws.com/cdn.baaniathailand.com/prop2share/master_data/poi/park.svg'
  },
  {
    id: 3,
    colors: '#E93B51',
    textTH: 'โรงพยาบาล',
    textEN: 'Hospital',
    textCN: 'Hospital',
    icon: 'https://s3.ap-southeast-1.amazonaws.com/cdn.baaniathailand.com/prop2share/master_data/poi/hospital.svg'
  },
  {
    id: 4,
    colors: '#F5A522',
    textTH: 'ห้างสรรพสินค้า',
    textEN: 'Shopping mall',
    textCN: 'Shopping mall',
    icon: 'https://s3.ap-southeast-1.amazonaws.com/cdn.baaniathailand.com/prop2share/master_data/poi/mall.svg'
  },
  {
    id: 5,
    colors: '#008C8B',
    textTH: 'รถไฟฟ้า',
    textEN: 'Metro',
    textCN: 'Metro',
    icon: 'https://s3.ap-southeast-1.amazonaws.com/cdn.baaniathailand.com/prop2share/master_data/poi/metro.svg'
  }
]

export { POI_RGB }
