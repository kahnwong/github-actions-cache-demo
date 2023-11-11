import { createContext, useContext, useReducer } from 'react'
import reducer, { initialState } from './reducer'
import { IUserContext } from './type'

const initialContext: IUserContext = {
  state: initialState,
  dispatch: () => {}
}

export const UserContext = createContext<IUserContext>(initialContext)

export const useUser = () => useContext(UserContext)

export const useUserReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
