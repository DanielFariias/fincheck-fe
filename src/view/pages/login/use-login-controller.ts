import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { authService } from '../../../app/services/auth-service'
import { ISignInParams } from '../../../app/services/auth-service/sign-in'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '../../../app/hooks/use-auth'

const schema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatório')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
})

type TSchema = z.infer<typeof schema>

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: ISignInParams) => {
      return authService.signIn(data)
    },
  })

  const { signIn } = useAuth()

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      signIn(accessToken)
    } catch (error) {
      console.log(error)
      toast.error('Credenciais inválidas!')
    }
  })

  return {
    handleSubmit,
    register,
    errors,
    isFormValid: isValid,
    isLoading: isPending,
  }
}
