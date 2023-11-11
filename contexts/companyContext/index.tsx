import { createContext, useContext } from 'react'
// @ts-ignore
import companyDetail from '@company/companyDetail.json'

const initialContext: any = {
  state: companyDetail,
  dispatch: () => {}
}

export const CompanyContext = createContext(initialContext)

export const useCompany = () => useContext(CompanyContext)
