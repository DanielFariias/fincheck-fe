import { z } from 'zod'
import { useDashboard } from '../../components/dashboard-context/use-dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bankAccountsService } from '../../../../../app/services/bank-account'
import { currencyStringToNumber } from '../../../../../app/utils/currency-string-to-number'
import toast from 'react-hot-toast'
import { useState } from 'react'

const formSchema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number().min(1, 'Saldo inicial é obrigatório'),
  ]),
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
})

type TFormDataSchema = z.infer<typeof formSchema>

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<TFormDataSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
    },
  })

  function closeAndClearForm() {
    reset()
    closeEditAccountModal()
  }

  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.update,
  })
  const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: bankAccountsService.remove,
    })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      })

      toast.success('Conta editada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      closeAndClearForm()
    } catch (e) {
      toast.error('Erro ao editar conta!')
      console.error(e)
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id)

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('A conta foi deletada com sucesso!')
      closeEditAccountModal()
    } catch {
      toast.error('Erro ao deletar a conta!')
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal: closeAndClearForm,
    register,
    handleSubmit,
    errors,
    control,
    isFormValid: isValid,
    isLoading: isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isLoadingDelete,
    handleDeleteAccount,
  }
}
