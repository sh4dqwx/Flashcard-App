import { FC, ReactNode, createContext, useContext } from "react"
import { User } from "../classes/User"
import { environment } from "../environments/environment"
import axios, { AxiosResponse } from "axios"

type UserRepositoryContextType = {
  getUser: (login: string, password: string) => Promise<User | null>,
  getUserById: (id: number) => Promise<User | null>
}

const UserRepositoryContext = createContext<UserRepositoryContextType | null>(null)

export const useUserRepository = (): UserRepositoryContextType => {
  const context = useContext(UserRepositoryContext)
  if (context == null) throw new Error("Context not initialized")
  return context
}

export const UserRepositoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl: string = environment.apiUrl

  const getUser = async (login: string, password: string): Promise<User | null> => {
    try {
      const response: AxiosResponse<User> = await axios.post(`${apiUrl}/users`, { login, password });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
    // const response: AxiosResponse<User> = await axios.post(`${apiUrl}`, { login, password })
    // console.log(response);
    // return response.data
  }

  const getUserById = async (id: number): Promise<User | null> => {
    try {
      const response: AxiosResponse<User> = await axios.get(`${apiUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
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