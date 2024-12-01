interface ICalendarListFilter {
  value: number
  title: string
  altTitle: string
}

const YEARS: ICalendarListFilter[] = [
  { value: 2021, title: '2021', altTitle: '2564' },
  { value: 2022, title: '2022', altTitle: '2565' }
]

const MONTHS: ICalendarListFilter[] = [
  { value: 1, title: 'ม.ค.', altTitle: 'มกราคม' },
  { value: 2, title: 'ก.พ.', altTitle: 'กุมภาพันธ์' },
  { value: 3, title: 'มี.ค.', altTitle: 'มีนาคม' },
  { value: 4, title: 'เม.ย.', altTitle: 'เมษายน' },
  { value: 5, title: 'พ.ค.', altTitle: 'พฤษภาคม' },
  { value: 6, title: 'มิ.ย.', altTitle: 'มิถุนายน' },
  { value: 7, title: 'ก.ค.', altTitle: 'กรกฎาคม' },
  { value: 8, title: 'ส.ค.', altTitle: 'สิงหาคม' },
  { value: 9, title: 'ก.ย.', altTitle: 'กันยายน' },
  { value: 10, title: 'ต.ค.', altTitle: 'ตุลาคม' },
  { value: 11, title: 'พ.ย.', altTitle: 'พฤศจิกายน' },
  { value: 12, title: 'ธ.ค.', altTitle: 'ธันวาคม' }
]

const MONTHS_EN: ICalendarListFilter[] = [
  { value: 1, title: 'Jan.', altTitle: 'January' },
  { value: 2, title: 'Feb.', altTitle: 'February' },
  { value: 3, title: 'Mar.', altTitle: 'March' },
  { value: 4, title: 'Apr.', altTitle: 'April' },
  { value: 5, title: 'May.', altTitle: 'May' },
  { value: 6, title: 'Jun.', altTitle: 'June' },
  { value: 7, title: 'Jul.', altTitle: 'July' },
  { value: 8, title: 'Aug.', altTitle: 'August' },
  { value: 9, title: 'Sept.', altTitle: 'September' },
  { value: 10, title: 'Oct.', altTitle: 'October' },
  { value: 11, title: 'Nov.', altTitle: 'November' },
  { value: 12, title: 'Dec.', altTitle: 'December' }
]

const MONTHS_CN: ICalendarListFilter[] = [
  { value: 1, title: 'Jan.', altTitle: 'January' },
  { value: 2, title: 'Feb.', altTitle: 'February' },
  { value: 3, title: 'Mar.', altTitle: 'March' },
  { value: 4, title: 'Apr.', altTitle: 'April' },
  { value: 5, title: 'May.', altTitle: 'May' },
  { value: 6, title: 'Jun.', altTitle: 'June' },
  { value: 7, title: 'Jul.', altTitle: 'July' },
  { value: 8, title: 'Aug.', altTitle: 'August' },
  { value: 9, title: 'Sept.', altTitle: 'September' },
  { value: 10, title: 'Oct.', altTitle: 'October' },
  { value: 11, title: 'Nov.', altTitle: 'November' },
  { value: 12, title: 'Dec.', altTitle: 'December' }
]

export { YEARS, MONTHS, MONTHS_EN, MONTHS_CN }
