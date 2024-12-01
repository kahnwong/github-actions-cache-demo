import { ComponentType } from 'react'
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon
} from 'react-share'

interface IShares {
  name: string
  title: string
  Icon: ComponentType<any>
  Component: ComponentType<any>
}
const SHARES: IShares[] = [
  {
    name: 'fb',
    title: 'Facebook',
    Icon: FacebookIcon,
    Component: FacebookShareButton
  },
  {
    name: 'tw',
    title: 'Twitter',
    Icon: TwitterIcon,
    Component: TwitterShareButton
  },
  {
    name: 'li',
    title: 'Line',
    Icon: LineIcon,
    Component: LineShareButton
  }
]

export { SHARES }
