import { z } from 'zod'
import { useDashboard } from '../../components/dashboard-context/use-dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bankAccountsService } from '../../../../../app/services/bank-account'
import { currencyStringToNumber } from '../../../../../app/utils/currency-string-to-number'
import toast from 'react-hot-toast'

const formSchema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
})

type TFormDataSchema = z.infer<typeof formSchema>

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<TFormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialBalance: '0,00',
      name: '',
      type: 'CHECKING',
      color: '',
    },
  })

  function closeAndClearForm() {
    reset()
    closeNewAccountModal()
  }

  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create,
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      })

      toast.success('Conta criada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      closeAndClearForm()
    } catch (e) {
      toast.error('Erro ao criar conta')
      console.error(e)
    }
  })

  return {
    isNewAccountModalOpen,
    closeNewAccountModal: closeAndClearForm,
    register,
    handleSubmit,
    errors,
    control,
    isFormValid: isValid,
    isLoading: isPending,
  }
}
