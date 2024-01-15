import { FC, ReactNode, createContext, useContext } from "react"
import { User } from "../classes/User"

type CurrentStateContextType = {
  getCurrentUser: () => User | null
  setCurrentUser: (user: User) => void,
  removeCurrentUser: () => void
}

const CurrentStateContext = createContext<CurrentStateContextType | null>(null)

export const useCurrentState = (): CurrentStateContextType => {
  const context = useContext(CurrentStateContext)
  if (context == null) throw new Error("Context not initialized")
  return context
}

export const CurrentStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  let currentUser: User | null = null

  const getCurrentUser = (): User | null => {
    return currentUser
  }

  const setCurrentUser = (user: User) => {
    currentUser = user
  }

  const removeCurrentUser = () => {
    currentUser = null
  }

  return (
    <CurrentStateContext.Provider value={{
      getCurrentUser: getCurrentUser,
      setCurrentUser: setCurrentUser,
      removeCurrentUser: removeCurrentUser
    }}>
      {children}
    </CurrentStateContext.Provider>
  )
}