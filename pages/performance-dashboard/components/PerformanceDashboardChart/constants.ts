import {FiCopy} from 'react-icons/fi'
import {
  FacebookIcon,
  TwitterIcon,
  LineIcon
} from 'react-share'
import { ComponentType } from 'react'

export interface IChartLegends {
  label: string
  color: string
  Icon: ComponentType<any>
}

interface IChartConfig {
  labels: string[]
  colors: string[]
  legends: IChartLegends[]
}


const shareLegends: IChartLegends[] = [{
    label: 'Line',
    color: '#06C755',
    Icon: LineIcon
},{
    label: 'Twitter',
    color: '#1DA1F2',
    Icon: TwitterIcon
},{
    label: 'Facebook',
    color: '#4267B2',
    Icon: FacebookIcon
}]
const dropLegends: IChartLegends[] = [
    {
    label: 'Copy Link',
    color: '#FF8C7A',
    Icon: FiCopy
},...shareLegends
]
 const SHARED : IChartConfig ={
  'labels':['Line','Twitter','Facebook'],
  'colors':['#06C755','#1DA1F2','#4267B2'],
  'legends': shareLegends
}

 const DROP : IChartConfig ={
  'labels':['Line','Twitter','Facebook','Copy Link'],
  'colors':['#06C755','#1DA1F2','#4267B2','#FF8C7A'],
  'legends': dropLegends
}
export {SHARED,DROP}