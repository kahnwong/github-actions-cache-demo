const formatNumber = (
  number: number,
  locale: string = 'th',
  fractionOption: any = { maximumFractionDigits: 2 }
): string => {
  if (!number && typeof number !== 'number') return ''
  return number.toLocaleString(locale, { ...fractionOption })
}

export default formatNumber
