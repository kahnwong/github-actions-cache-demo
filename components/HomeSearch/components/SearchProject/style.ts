import styled from 'styled-components'
import { Button } from 'react-bootstrap'
// @ts-ignore
import { variables } from '@company/variables.ts'
import { MAX_WIDTH_LG } from '../../../../config/breakpoint'

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  width: 100%;
  height: 64px;
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px #eceeef;
  position: relative;
  ${MAX_WIDTH_LG} {
    height: 48px;
  }
`
const SearchInputContainer = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 5px 10px 15px;
  background-color: white;
  ${MAX_WIDTH_LG} {
    height: 46px;
  }
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 14px;
  color: #12112e;
  font-weight: 400;
  border-radius: 6px;
  background-color: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`
const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 27px;
  margin-right: 15px;
  margin-bottom: 4px;
`
const SearchBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 1000;
  border: solid 1px #d8d8d878;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 1px rgb(0 0 0 / 14%);
  overflow-y: auto;
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
const SearchContent = styled.div`
  width: 100%;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 100000;
`
const ResultShow = styled.div`
  width: 100%;
  display: flex !important;
  padding: 6px 8px;
  align-items: center !important;
  background-color: #ffffff;
  font-size: 16px;
  height: 45px;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${variables.primary}a1;
  }
`

const SearchButton = styled(Button)`
  min-width: 118px;
  height: 52px;
  background: ${variables.primary};
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  display: block;
  box-shadow: none !important;
  &:hover {
    background: ${variables.primary}a1;
  }
  &:focus {
    background: ${variables.primary};
  }
  border: none;
  ${MAX_WIDTH_LG} {
    display: none;
  }
`
export {
  SearchBarContainer,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  SearchContent,
  ResultShow,
  SearchBody,
  SearchButton
}
