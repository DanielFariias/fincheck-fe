import { z } from 'zod'
import { useDashboard } from '../../components/dashboard-context/use-dashboard'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { transactionsService } from '../../../../../app/services/transactions'
import { useBankAccounts } from '../../../../../app/hooks/use-bank-accounts'
import { useCategories } from '../../../../../app/hooks/use-categories'
import { useMemo } from 'react'
import { currencyStringToNumber } from '../../../../../app/utils/currency-string-to-number'

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a categoria'),
  date: z.date(),
})

type TFormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
  })

  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()

  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  })

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      )
      closeNewTransactionModal()
      reset()
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar a despesa!'
          : 'Erro ao cadastrar a receita!',
      )
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    )
  }, [categoriesList, newTransactionType])

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    register,
    isLoading: isPending,
    accounts,
    categories,
  }
}
