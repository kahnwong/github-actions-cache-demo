import { CSSProperties } from 'react'
import styled from 'styled-components'

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}
const groupBadgeStyles: CSSProperties = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center'
}

const StyleWrapper = styled.div`
  ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    border-radius: 10px;
    background: #e8e8e8;
  }

  ::-webkit-scrollbar-track {
    width: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #7a7a7a;
    border-radius: 10px;
  }
`
export { groupStyles, groupBadgeStyles, StyleWrapper }
