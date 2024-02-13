import { useDashboard } from '../../components/dashboard-context/use-dashboard'

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard()

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  }
}
