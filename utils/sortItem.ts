import { getLngFlex } from './getLng'

const sortItem = (sortList: any, locale: string, key?: string) =>
  sortList.sort((a: any, b: any) => {
    const tSortItemA = getLngFlex({ ...a }, locale?.toUpperCase(), true)
    const tSortItemB = getLngFlex({ ...b }, locale?.toUpperCase(), true)

    return tSortItemA(key || 'name')
      .toLowerCase()
      .localeCompare(
        tSortItemB(key || 'name').toLowerCase(),
        locale?.toLowerCase()
      )
  })

export default sortItem
