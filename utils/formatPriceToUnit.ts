const reduceDecimal = (n: string) => {
  const decimal = n.split('.')
  return parseInt(decimal[1], 10) > 0 ? n : `${decimal[0]}`
}

const formatPriceToUnit = (n: number) => {
  if (n < 1e3) return n
  if (n >= 1e12) return `${reduceDecimal((n / 1e12).toFixed(1))}T`
  if (n >= 1e9 && n < 1e12) return `${reduceDecimal((n / 1e9).toFixed(1))}B`
  if (n >= 1e6 && n < 1e9) return `${reduceDecimal((n / 1e6).toFixed(1))}M`
  if (n >= 1e3) return `${reduceDecimal((n / 1e3).toFixed(1))}K`

  return n
}
const blockCharNotNumber = (e: any) =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

export { formatPriceToUnit, blockCharNotNumber }
