import { FC, useState, useRef, useEffect } from 'react'
import useDebounce from 'hooks/useDebounce'
import { useTranslation } from 'react-i18next'

import { FiSearch } from 'react-icons/fi'
import { VscClose } from 'react-icons/vsc'
import PropTypes from 'prop-types'
import useOutsideClick from 'hooks/useOnClickOutside'
import { useQuery } from 'react-query'
import { getJobByFilter } from 'services/job'
import { IJob } from 'interfaces/Job'
import {
  SearchBarContainer,
  SearchInputContainer,
  SearchInput,
  SearchIcon,
  SearchContent,
  ResultShow,
  SearchBody,
  SearchButton
} from './style'

interface ISearchContainer {
  placeholder: string | undefined
  onSubmitFilter: Function
  onSearch: Function
  projectName: string
}

const SearchProject: FC<ISearchContainer> = ({
  placeholder,
  onSubmitFilter,
  onSearch,
  projectName
}) => {
  const { t } = useTranslation()
  const [filteredData, setFilteredData] = useState<IJob[]>([])
  const [wordEntered, setWordEntered] = useState('')
  const ref = useRef(null)
  const [numberExpand, setNumberExpand] = useState(1)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const debouncedValue = useDebounce<string>(wordEntered, 500)
  const { isLoading, data } = useQuery(
    ['job_with_share', { projectName: debouncedValue, createdDate: 'asc' }],
    () =>
      getJobByFilter({
        projectName: debouncedValue,
        createdDate: 'asc'
      })
  )
  const items = data?.data
  const dataLength = items?.payload ? items?.payload?.length : 1

  useOutsideClick(ref, () => {
    setNumberExpand(0)
    setFilteredData([])
  })

  const handleFilter = (event: { target: HTMLInputElement }) => {
    const searchWord = event.target.value

    setWordEntered(searchWord)
    onSubmitFilter({ projectName: searchWord })
  }

  const clearInput = () => {
    setNumberExpand(0)
    setFilteredData([])
    setWordEntered('')
    onSubmitFilter({ projectName: '' })
  }

  const fillInput = (value: string) => {
    setWordEntered(value)
    setNumberExpand(0)
    setFilteredData([])
    setSelectedItem(value)
    setIsSelected(true)
    onSubmitFilter({ projectName: value })
  }

  useEffect(() => {
    if (wordEntered !== '') {
      if (!isLoading) {
        setNumberExpand(dataLength === 0 ? 1 : dataLength)
        setFilteredData(items?.payload ? items?.payload : [])
      }
    } else {
      setNumberExpand(0)
      setFilteredData([])
    }
    if (wordEntered !== selectedItem) {
      setIsSelected(false)
    }
  }, [items?.payload, wordEntered])

  useEffect(() => {
    setWordEntered(projectName)
  }, [projectName])

  return (
    <SearchBarContainer ref={ref}>
      <SearchInputContainer>
        <SearchIcon>
          <FiSearch size={24} className='me-1 flex-shrink-0' />
        </SearchIcon>
        <SearchInput
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div>
          {(filteredData.length > 0 || wordEntered !== '') && (
            <VscClose
              size={24}
              className='me-3 flex-shrink-0 cursor-pointer'
              id='clearBtn'
              onClick={clearInput}
            />
          )}
        </div>
        <SearchButton onClick={onSearch}>
          {t('global.button.search')}
        </SearchButton>
      </SearchInputContainer>
      {(filteredData.length > 0 || wordEntered !== '') && !isSelected && (
        <SearchBody
          style={
            !numberExpand
              ? { display: 'none' }
              : {
                  minHeight:
                    numberExpand < 7 ? `${numberExpand * 48}px` : '15em',
                  display: 'block'
                }
          }
        >
          {filteredData?.length !== 0 && (
            <SearchContent>
              {filteredData.map(
                (value) =>
                  value?.projectNameTh && (
                    <ResultShow
                      key={value?.projectNameTh?.toString()}
                      onClick={() => fillInput(value?.projectNameTh!)}
                    >
                      {value?.projectNameTh}
                    </ResultShow>
                  )
              )}
            </SearchContent>
          )}
          {(filteredData?.length === 0 || items?.payload.length === 0) &&
            wordEntered !== '' && (
              <SearchContent>
                <ResultShow>
                  {t('propertyType.searchProject.noResult')}
                </ResultShow>
              </SearchContent>
            )}
        </SearchBody>
      )}
    </SearchBarContainer>
  )
}

SearchProject.defaultProps = {
  placeholder: ''
}
SearchProject.propTypes = {
  placeholder: PropTypes.string,
  onSubmitFilter: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired
}
export default SearchProject
