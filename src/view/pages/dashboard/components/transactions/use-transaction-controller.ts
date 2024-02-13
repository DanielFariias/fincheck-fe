import { useState } from 'react'
import { useDashboard } from '../dashboard-context/use-dashboard'

export function useTransactionController() {
  const { areValuesVisible } = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesVisible,
    isLoading: false,
    isInitialLoading: false,
    transactions: [],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  }
}
