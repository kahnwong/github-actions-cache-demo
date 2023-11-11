const formatDateApp = (data: string) => {
  const isData = new Date(data)
  const fullYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
    isData
  )
  const isMonth = new Intl.DateTimeFormat('th-TH', {
    month: 'numeric'
  }).format(isData)
  const isDay = new Intl.DateTimeFormat('th-TH', { day: 'numeric' }).format(
    isData
  )
  const isWeek = new Intl.DateTimeFormat('th-TH', {
    weekday: 'short'
  }).format(isData)
  const fullDay = new Intl.DateTimeFormat('th-TH').format(isData)
  const isHour = new Intl.DateTimeFormat('th-TH', {
    timeStyle: 'short',
    timeZone: 'UTC'
  }).format(isData)
  const dateTH = `${fullDay}, ${isHour} น.`
  const isYear: number = +fullYear + 543
  return { isYear, isMonth, isDay, isWeek, dateTH }
}
export default formatDateApp
