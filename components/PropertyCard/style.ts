import styled from 'styled-components'
import { MAX_WIDTH_MD, MAX_WIDTH_SE } from 'config/breakpoint'
import { Button, Badge } from 'react-bootstrap'

const CardButtonGroupWrapper = styled.div`
  ${MAX_WIDTH_SE} {
    flex-direction: column;
  }

  .row {
    --bs-gutter-x: 0;
  }

  button {
    align-items: center;
    height: 44px;
    border-radius: 0;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    margin: 0;
  }
`
const CardTitleWrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 500;
  font-size: 24px;
`

const CardSoldOutWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    background-color: rgba(47, 72, 88, 0.75);
    color: white;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-bottom: 50px;
  }
`
const CardFavorite = {
  top: '15px',
  background: 'rgba(255,255,255,0.56)',
  borderRadius: '8px',
  marginLeft: '10px',
  cursor: 'pointer'
}

const FavoriteSoldOut = {
  zIndex: 1
}
const FavoriteBorder = {
  border: 'none'
}

const DetailBox = {
  minHeight: '83px'
}
const FavoriteButton = styled(Button)`
  top: 15px;
  background: rgba(255, 255, 255, 0.56);
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.56);
  border: none;
  &:focus:not(:focus-visible) {
    outline: 0;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.56) !important;
  }
  &:hover {
    background-color: #e8e8e88e;
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.56) !important;
  }
`

const LabelTag = styled(Badge)`
  background-color: ${(props) => props.theme} !important;
  border-radius: 50px;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 500;
  padding: 0.435rem;
  cursor: pointer;
  height: 26px;
  ${MAX_WIDTH_MD} {
    width: 70px;
    font-size: 10px;
    font-weight: 500;
    padding: 0.5rem;
  }
`

export {
  CardButtonGroupWrapper,
  CardTitleWrapper,
  CardSoldOutWrapper,
  CardFavorite,
  FavoriteButton,
  FavoriteSoldOut,
  FavoriteBorder,
  LabelTag,
  DetailBox
}
