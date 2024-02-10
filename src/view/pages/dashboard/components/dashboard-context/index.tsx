import { ReactNode, createContext, useCallback, useState } from 'react'

interface IDashboardContext {
  areValuesVisible: boolean
  toggleValuesVisibility: () => void
}

export const DashboardContext = createContext({} as IDashboardContext)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState<boolean>(() => {
    const isValuesVisibleLocalStorage = localStorage.getItem('areValuesVisible')
    const isValuesVisible = isValuesVisibleLocalStorage
      ? JSON.parse(isValuesVisibleLocalStorage)
      : null

    if (isValuesVisible === null) {
      localStorage.setItem('areValuesVisible', JSON.stringify(!false))
      return false
    }
    return isValuesVisible
  })

  const toggleValuesVisibility = useCallback(() => {
    localStorage.setItem('areValuesVisible', JSON.stringify(!areValuesVisible))

    setAreValuesVisible((prevState) => !prevState)
  }, [areValuesVisible])

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
