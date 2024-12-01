// TODO: remove all and get from backend instead
export const CAMPAIGN = {
  enabled: true,
  dateStart: +new Date(2022, 7), // 2022-07-01
  dateEnd: +new Date(2022, 8) // 2022-08-01
}
export const MIN_TODAY_SHARE = 5

const getDaysInMonth = (yy: number, mm: number) => new Date(yy, mm, 0).getDate()
const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1 // 👈️ months are 0-based
const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth)

export const TOTAL_STAMP = daysInCurrentMonth

export const REWARD_DATA = [
  // {
  //   day: 7,
  //   name: 'บัตรของขวัญ Swensens',
  //   price: '100 บาท',
  //   title: 'บัตรของขวัญ Swensens มูลค่า 100 บาท',
  //   img: '/2022_6/2022_6_1_prized.png'
  // },
  {
    day: 14,
    name: 'บัตรของขวัญ',
    price: 'Grab',
    title: 'บัตรของขวัญ Grab มูลค่า 100 บาท',
    img: '/2022_8/2022_8_1_prized.png'
  },
  // {
  //   day: 21,
  //   name: 'พิพิธภัณฑ์สัตว์น้ำ',
  //   price: 'Sea Life Ocean World',
  //   title: 'บัตรเข้าชมพิพิธภัณฑ์สัตว์น้ำ Sea Life Ocean World มูลค่า 1,080 บาท',
  //   img: '/2022_7/2022_7_2_prized.png'
  // },
  {
    day: 28,
    name: 'บัตรของขวัญ',
    price: 'เครือ Central',
    title: 'บัตรของขวัญเครือ Central มูลค่า 500 บาท',
    img: '/2022_8/2022_8_2_prized.png'
  }
]
