import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { authService } from '../../../app/services/auth-service'
import { useMutation } from '@tanstack/react-query'
import { ISignUpParams } from '../../../app/services/auth-service/sign-up'
import toast from 'react-hot-toast'
import { useAuth } from '../../../app/hooks/use-auth'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
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

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: ISignUpParams) => {
      return authService.signUp(data)
    },
  })

  const { signIn } = useAuth()

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      signIn(accessToken)
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao criar a sua conta!')
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
