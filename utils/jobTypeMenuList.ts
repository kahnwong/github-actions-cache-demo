import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { INavbarMenu, IJobType } from 'interfaces/MenuJobType'
import { getMenuByJobType } from 'services/menu'

const pustNavMenu = (item: IJobType) => ({
  id: item?.id,
  label: item?.menuTH || '',
  link: item?.type || '',
  icon: '',
  menuTH: item?.menuTH,
  menuEN: item?.menuEN,
  menuCN: item?.menuCN
})

const navbarPrivateMenu = () => {
  const [navPrivateMenuAll, setNavPrivateMenuAll] = useState<INavbarMenu[]>([])
  const [navPrivateMenu, setNavPrivateMenu] = useState<INavbarMenu[]>([])
  const [navPrivateMenuMore, setNavPrivateMenuMore] = useState<INavbarMenu[]>(
    []
  )
  const { data } = useQuery(['job_type_menu', { orderBy: 'ASC' }], () =>
    getMenuByJobType({ orderBy: 'ASC' })
  )

  useEffect(() => {
    if (data?.data?.payload) {
      const menuHeaderAll: INavbarMenu[] = []
      const menuHeader: INavbarMenu[] = []
      const menuHeaderMore: INavbarMenu[] = []
      let countMenu = 0
      data?.data?.payload?.map((item: any) => {
        if (item?.menuTH) {
          if (countMenu <= 4) {
            menuHeader.push(pustNavMenu(item))
          }
          if (countMenu > 4) {
            menuHeaderMore.push(pustNavMenu(item))
          }
          menuHeaderAll.push(pustNavMenu(item))
          countMenu += 1
        }
        return true
      })

      setNavPrivateMenu(menuHeader)
      setNavPrivateMenuMore(menuHeaderMore)
      setNavPrivateMenuAll(menuHeaderAll)
    }
  }, [data])

  return { navPrivateMenu, navPrivateMenuMore, navPrivateMenuAll }
}

export default navbarPrivateMenu
