const getLng = (
  resource: any,
  locale: string | undefined,
  CamelCase: boolean = false
) =>
  function translate(key: string) {
    let ret = {} as any
    ret = resource

    const newLocale =
      !!locale && CamelCase
        ? locale.charAt(0).toUpperCase() + locale.slice(1).toLowerCase()
        : locale
    const item: string = `${key}${newLocale}`

    return ret && ret[item]
  }

const getLngArr = (
  resource: any,
  locale: string | undefined,
  CamelCase: boolean = false
) =>
  function translateArr(key: string, index: number) {
    let ret = {} as any
    ret = resource
    // const item: string = `${key}${locale}`
    const newLocale =
      !!locale && CamelCase
        ? locale.charAt(0).toUpperCase() + locale.slice(1).toLowerCase()
        : locale
    const item: string = ret[index][key] ? key : `${key}${newLocale}`

    return ret[index] && ret[index][item]
  }

const getLngFlex = (
  resource: any,
  locale: string | undefined,
  CamelCase: boolean = false
) =>
  function translate(key: string) {
    let ret = {} as any
    ret = resource

    const getLocale = (lang: string) =>
      !!lang && CamelCase
        ? lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
        : lang

    if (locale === 'TH') {
      return (
        ret &&
        (ret[`${key}${getLocale('TH')}`] ||
          ret[`${key}${getLocale('EN')}`] ||
          ret[`${key}${getLocale('CN')}`])
      )
    }
    if (locale === 'EN') {
      return (
        ret &&
        (ret[`${key}${getLocale('EN')}`] ||
          ret[`${key}${getLocale('TH')}`] ||
          ret[`${key}${getLocale('CN')}`])
      )
    }
    if (locale === 'CN') {
      return (
        ret &&
        (ret[`${key}${getLocale('CN')}`] ||
          ret[`${key}${getLocale('EN')}`] ||
          ret[`${key}${getLocale('TH')}`])
      )
    }
    return (
      ret &&
      (ret[`${key}${getLocale('TH')}`] ||
        ret[`${key}${getLocale('EN')}`] ||
        ret[`${key}${getLocale('CN')}`])
    )
  }

const getLngFlexArr = (
  resource: any,
  locale: string | undefined,
  CamelCase: boolean = false
) =>
  function translate(key: string, index: number, subkey?: string) {
    let ret = {} as any
    ret = resource

    const getLocale = (lang: string) =>
      !!lang && CamelCase
        ? lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()
        : lang

    const getItem = (lang: string) =>
      subkey
        ? ret[index][subkey!][`${key}${getLocale(lang)}`]
        : ret[index][`${key}${getLocale(lang)}`]

    if (locale === 'TH') {
      return ret[index] && (getItem('TH') || getItem('EN') || getItem('CN'))
    }
    if (locale === 'EN') {
      return ret[index] && (getItem('EN') || getItem('TH') || getItem('CN'))
    }
    if (locale === 'CN') {
      return ret[index] && (getItem('CN') || getItem('EN') || getItem('TH'))
    }
    return ret[index] && (getItem('TH') || getItem('EN') || getItem('CN'))
  }

export { getLng, getLngArr, getLngFlex, getLngFlexArr }
