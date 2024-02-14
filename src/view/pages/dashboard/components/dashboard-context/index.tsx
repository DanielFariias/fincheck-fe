import { ReactNode, createContext, useCallback, useState } from 'react'
import { BankAccount } from '../../../../../app/entities/bank-account'

interface IDashboardContext {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  toggleValuesVisibility: () => void
  openNewAccountModal: () => void
  closeNewAccountModal: () => void
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void
  closeNewTransactionModal: () => void
  isEditAccountModalOpen: boolean
  accountBeingEdited: null | BankAccount
  openEditAccountModal(bankAccount: BankAccount): void
  closeEditAccountModal(): void
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
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false)
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null)
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<null | BankAccount>(null)

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false)
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setIsNewTransactionModalOpen(true)
    setNewTransactionType(type)
  }, [])

  const closeNewTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false)
    setNewTransactionType(null)
  }, [])

  const toggleValuesVisibility = useCallback(() => {
    localStorage.setItem('areValuesVisible', JSON.stringify(!areValuesVisible))

    setAreValuesVisible((prevState) => !prevState)
  }, [areValuesVisible])

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        newTransactionType,
        isEditAccountModalOpen,
        accountBeingEdited,
        openEditAccountModal,
        closeEditAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
