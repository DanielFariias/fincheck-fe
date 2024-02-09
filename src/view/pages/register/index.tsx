import { Link } from 'react-router-dom'

import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { useRegisterController } from './use-register-controller'

export function Register() {
  const { handleSubmit, register, errors, isFormValid, isLoading } =
    useRegisterController()
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px]">Crie sua conta</h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link
            to={'/login'}
            className="text-green-900 font-medium tracking-[-0.5px]"
          >
            Faça Login
          </Link>
        </p>
      </header>

      <form
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          placeholder="Nome"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          type="email"
          placeholder="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button
          type="submit"
          className="mt-2"
          disabled={!isFormValid}
          isLoading={isLoading}
        >
          Criar conta
        </Button>
      </form>
    </>
  )
}
