import { useQuery } from '@tanstack/react-query'
import { TransactionsFilters } from '../services/transactions/get-all'
import { transactionsService } from '../services/transactions'

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  }
}
