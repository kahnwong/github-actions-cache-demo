import { FC, HTMLAttributes } from 'react'
import { MockupWrapper } from '../style'



const PropertyPrivate: FC<HTMLAttributes<HTMLElement>> = ({ ...props }) => (
  <MockupWrapper {...props}>
    หน้านี้ยังไม่ได้เปิดสาธารณะ
  </MockupWrapper>
)


export default PropertyPrivate 
