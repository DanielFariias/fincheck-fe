import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { localStorageKeys } from '../config/local-storage-keys'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userService } from '../services/user-service'
import toast from 'react-hot-toast'
import { LaunchScreen } from '../../view/components/launch-screen'
import { User } from '../entities/user'

interface IAuthContextProps {
  signedIn: boolean
  signIn: (accessToken: string) => void
  signOut: VoidFunction
  user: User | undefined
}

export const AuthContext = createContext({} as IAuthContextProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    )

    return !!storedAccessToken
  })
  const queryClient = useQueryClient()

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  })

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken)

    setSignedIn(true)
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN)
    queryClient.removeQueries({ queryKey: ['users', 'me'] })

    setSignedIn(false)
  }, [queryClient])

  useEffect(() => {
    if (isError) {
      toast.error('Sessão expirada, faça login novamente!')
      signOut()
    }
  }, [isError, signOut])

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signIn,
        signOut,
        user: data,
      }}
    >
      <LaunchScreen isActive={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  )
}
