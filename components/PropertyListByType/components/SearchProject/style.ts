import styled from 'styled-components'
import { MAX_WIDTH_LG } from 'config/breakpoint'

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center !important;
  width: 100%;
  height: 2.6em;
  background-color: #fff;
  position: relative;
`
const SearchInputContainer = styled.div`
  width: 100%;
  height: 2.5em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid rgba(47, 72, 88, 0.1);
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
  margin-right: 10px;
  margin-bottom: 4px;
  vertical-align: middle;
`
const SearchBody = styled.div`
  width: 200%;
  margin-left: 100%;
  margin-top: 5px;
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
  ${MAX_WIDTH_LG} {
    width: 100%;
    margin-left: 0;
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
    background-color: rgba(0, 140, 139, 0.1);
  }
`
export {
  SearchBarContainer,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  SearchContent,
  ResultShow,
  SearchBody
}
