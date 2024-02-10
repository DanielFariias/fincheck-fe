import { useDashboard } from '../dashboard-context/use-dashboard'

export function useTransactionController() {
  const { areValuesVisible } = useDashboard()

  return {
    areValuesVisible,
    isLoading: false,
    isInitialLoading: false,
    transactions: [],
  }
}
