import { FC, ReactNode, createContext, useContext } from "react"
import { User } from "../classes/User"
import { environment } from "../environments/environment"
import axios, { AxiosResponse } from "axios"

type UserRepositoryContextType = {
  getUser: (login: string, password: string) => Promise<User>,
  getUserById: (id: number) => Promise<User>
}

const UserRepositoryContext = createContext<UserRepositoryContextType | null>(null)

export const useUserRepository = () => {
  return useContext(UserRepositoryContext)
}

export const UserRepositoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl: string = environment.apiUrl
  
  const getUser = async (login: string, password: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.post(`${apiUrl}`, { login, password })
    return response.data
  }

  const getUserById = async (id: number): Promise<User> => {
    const response: AxiosResponse<User> = await axios.get(`${apiUrl}/${id}`)
    return response.data
  }

  return (
    <UserRepositoryContext.Provider value={{
      getUser: getUser,
      getUserById: getUserById
    }}>
      {children}
    </UserRepositoryContext.Provider>
  )
}