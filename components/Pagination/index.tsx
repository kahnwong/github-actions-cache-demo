import { FC, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { PaginationWrapper } from './style'

interface iPaginationContainer {
  currentPage: number
  lastPage: number
  total?: number | undefined | null
  // perPage: number
  onPaginate: Function
  // onPerPage: Function
}

// const perPages = [10, 20, 50, 100]
const PaginationContainer: FC<iPaginationContainer> = ({
  currentPage,
  // perPage,
  lastPage,
  total,
  onPaginate
  // onPerPage
}) => {
  const handlePaginate = (num: number) => {
    if (currentPage === num) return
    onPaginate(num)
  }

  // const handlePerPage = (perPageNumber: number) => {
  //   onPerPage(perPageNumber)
  // }
  let isPageOutOfRange: boolean
  const pageNumbers = useMemo(
    () =>
      Array.from({ length: lastPage }, (_, index) => index + 1).map((page) => {
        const useEllipsis = Math.abs(page - currentPage) > 2
        if (page === 1 || page === lastPage || !useEllipsis) {
          isPageOutOfRange = false
          return (
            <PaginationWrapper.Item
              key={page}
              onClick={() => handlePaginate(page)}
              active={page === currentPage}
              className='rounded-circle overflow-hidden'
            >
              {page}
            </PaginationWrapper.Item>
          )
        }
        if (!isPageOutOfRange) {
          isPageOutOfRange = true
          return <PaginationWrapper.Ellipsis disabled key={page} />
        }
        return null
      }),
    [lastPage, currentPage, total]
  )

  if (!total) return null
  return (
    <div className='d-flex flex-column flex-main-row justify-content-center align-items-center gap-2'>
      <PaginationWrapper className='d-flex justify-content-center align-items-center mb-0'>
        <PaginationWrapper.Prev
          disabled={currentPage === 1}
          onClick={() => handlePaginate(currentPage - 1)}
          className='rounded-circle overflow-hidden'
        >
          <FiChevronLeft />
        </PaginationWrapper.Prev>
        {pageNumbers}
        <PaginationWrapper.Next
          disabled={currentPage === lastPage}
          onClick={() => handlePaginate(currentPage + 1)}
          className='rounded-circle overflow-hidden'
        >
          <FiChevronRight />
        </PaginationWrapper.Next>
      </PaginationWrapper>
      {/* <DropdownPerpageWrapper> */}
      {/*   <DropdownPerpageWrapper.Toggle */}
      {/*     className='text-white' */}
      {/*     variant='primary' */}
      {/*   > */}
      {/*     {perPage}/Page */}
      {/*   </DropdownPerpageWrapper.Toggle> */}
      {/*   <DropdownPerpageWrapper.Menu> */}
      {/*     {perPages.map((perPageNumber) => ( */}
      {/*       <DropdownPerpageWrapper.Item */}
      {/*         key={perPageNumber} */}
      {/*         onClick={() => handlePerPage(perPageNumber)} */}
      {/*       > */}
      {/*         {perPageNumber}/Page */}
      {/*       </DropdownPerpageWrapper.Item> */}
      {/*     ))} */}
      {/*   </DropdownPerpageWrapper.Menu> */}
      {/* </DropdownPerpageWrapper> */}
    </div>
  )
}

PaginationContainer.defaultProps = {
  total: 0
}

PaginationContainer.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  total: PropTypes.number,
  // perPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired
  // onPerPage: PropTypes.func.isRequired
}

export default PaginationContainer
