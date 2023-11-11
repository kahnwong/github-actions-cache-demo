// NOTED: disabled eslint below for fix enum warning
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import {
  createContext,
  useMemo,
  useContext,
  FC,
  useReducer,
  Dispatch
} from 'react'
import { IJobCard } from 'interfaces/Job'

export enum PROPERTY_MODAL_ACTIONS {
  OPEN_MODAL = 'open',
  CLOSE_MODAL = 'close',
  RESET = 'reset'
}

interface IPropertyModal {
  isOpen?: boolean
  modalType: string
  data: IJobCard
}

type PropertyModalAction = {
  type: PROPERTY_MODAL_ACTIONS
  payload?: IPropertyModal
}

interface IPropertyModalContext {
  state: IPropertyModal
  dispatch: Dispatch<PropertyModalAction>
}
// default shareFee is 2500
const defaultJobData = {
  id: 0,
  bannerurl: '',
  startingPrice: 0,
  unitLocalStartingPrice: 0,
  unitLocalPromotionPrice: 0,
  jobtype: '',
  isSoldOut: false,
  downloadLink: '',
  propertytype: '',
  projectFullAddress: '',
  copyLink: '',
  line: '',
  fb: '',
  tw: '',
  shareQuoteTh: '',
  shareQuoteEn: '',
  shareQuoteCn: '',
  shareFee: 2500,
  globalSharePrice: 0,
  projectNameTh: null,
  projectNameEn: null,
  projectNameCn: null,
  unitBedRoomCount: null,
  unitBathRoomCount: null,
  unitUsableAreaSqm: null,
  unitLandAreaSqwa: null,
  unitFloorCount: null,
  jobinfoLabels: [],
  seoImageUrlTh: null,
  sharePrice: null,
  commissionPercentage: null,
  commissionPrice: null,
  globalCommissionPrice: null,
  pricePerUnitUsableAreaSqm: null,
  zoneNameTh: null,
  zoneNameEn: null,
  zoneNameCn: null,
  redirectExternalUrl: null,
  redirectType: null
}
const propertyModal: IPropertyModal = {
  isOpen: false,
  modalType: '',
  data: defaultJobData
}

const reducer = (
  state: IPropertyModal,
  { type, payload }: PropertyModalAction
) => {
  switch (type) {
    case PROPERTY_MODAL_ACTIONS.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: payload?.modalType ?? '',
        data: payload?.data ?? defaultJobData
      }
    case PROPERTY_MODAL_ACTIONS.CLOSE_MODAL:
      return { ...state, isOpen: false }
    case PROPERTY_MODAL_ACTIONS.RESET:
      return propertyModal
    default:
      throw new Error()
  }
}

const PropertyModalContext = createContext<IPropertyModalContext>({
  state: propertyModal,
  dispatch: () => {}
})

const PropertyModalContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, propertyModal)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return (
    <PropertyModalContext.Provider value={value}>
      {children}
    </PropertyModalContext.Provider>
  )
}

export const usePropertyModalContext = () => useContext(PropertyModalContext)

export default PropertyModalContextProvider
