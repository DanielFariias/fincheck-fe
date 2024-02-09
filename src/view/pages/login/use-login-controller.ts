import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
    formState: { errors },
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormSubmit((data) => {
    console.log({ data })
  })

  return { handleSubmit, register, errors }
}
