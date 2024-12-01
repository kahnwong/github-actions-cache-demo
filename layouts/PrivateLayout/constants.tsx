import { ReactNode } from 'react'
import {
  FiUser,
  FiCalendar,
  FiTrendingUp,
  FiHelpCircle,
  FiMail,
  FiHeart
} from 'react-icons/fi'
import { MdOutlineSell, MdPushPin } from 'react-icons/md'
import {
  VscBookmark,
  VscCalendar,
  VscHome,
  VscLayers,
  VscTerminalTmux
} from 'react-icons/vsc'

interface INavbarMenu {
  label?: string
  labelTH?: string
  labelEN?: string
  labelCN?: string
  link: string
}

interface INavBarToggleMenu extends INavbarMenu {
  onClick?(): void
  icon: ReactNode
}

const NAVBAR_PRIVATE_MENU: INavbarMenu[] = [
  { label: 'ดีลพิเศษ', link: '/exclusive' },
  { label: 'โครงการที่น่าสนใจ', link: '/projects' },
  { label: 'บ้านสวยมือสอง', link: '/npa' },
  { label: 'ทรัพย์ดี by BAM', link: '/sell' },
  { label: 'ห้องเช่า', link: '/rental' }
]
const NAVBAR_PRIVATE_TOGGLE_MENU: INavBarToggleMenu[] = [
  {
    labelTH: 'บัญชีของฉัน',
    labelEN: 'My Account',
    labelCN: 'My Account',
    link: '/user-profile/',
    icon: <FiUser />
  },
  {
    labelTH: 'ข้อมูลความสนใจ',
    labelEN: 'Agent Profile',
    labelCN: 'Agent Profile',
    link: '/interest',
    icon: <MdPushPin />
  },
  {
    labelTH: 'Performance Dashboard',
    labelEN: 'Performance Dashboard',
    labelCN: 'Performance Dashboard',
    link: '/performance-dashboard',
    icon: <FiTrendingUp />
  },

  {
    labelTH: 'โครงการที่ชอบ',
    labelEN: 'Favorite',
    labelCN: 'Favorite',
    link: '/favorite',
    icon: <FiHeart />
  },
  {
    labelTH: 'การนัดหมาย',
    labelEN: 'Appointment',
    labelCN: 'Appointment',
    link: '/appointment',
    icon: <FiCalendar />
  },
  {
    labelTH: 'วิธีใช้งาน',
    labelEN: 'How to use',
    labelCN: 'How to use',
    link: '/faq',
    icon: <FiHelpCircle />
  },
  {
    labelTH: 'ติดต่อเรา',
    labelEN: 'Contact us',
    labelCN: 'Contact us',
    link: '/contact',
    icon: <FiMail />
  }
  // change to custom component b/c of using context in onClick
  // { label: 'ออกจากระบบ', link: '', onClick: () => {}, icon: <FiUnlock /> }
]

const WALL_PRIVATE_TOGGLE_MENU: INavBarToggleMenu[] = [
  { label: 'ดีลพิเศษ', link: '/exclusive', icon: <VscBookmark /> },
  { label: 'โครงการที่น่าสนใจ', link: '/projects', icon: <VscLayers /> },
  { label: 'บ้านสวยมือสอง', link: '/npa', icon: <VscHome /> },
  { label: 'ทรัพย์ดี by BAM', link: '/sell', icon: <MdOutlineSell /> },
  { label: 'ห้องเช่า', link: '/rental', icon: <VscTerminalTmux /> },
  { label: 'การนัดหมาย', link: '/appointment', icon: <VscCalendar /> }
]

export {
  NAVBAR_PRIVATE_MENU,
  NAVBAR_PRIVATE_TOGGLE_MENU,
  WALL_PRIVATE_TOGGLE_MENU
}
