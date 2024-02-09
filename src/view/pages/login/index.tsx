import { Link } from 'react-router-dom'

import { Input } from '../../components/input'
import { Button } from '../../components/button'

import { useLoginController } from './use-login-controller'

export function Login() {
  const { handleSubmit, register, errors } = useLoginController()
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-[-1px]">
          Entrar em sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <Link
            to={''}
            className="text-green-900 font-medium tracking-[-0.5px]"
          >
            Crie uma conta
          </Link>
        </p>
      </header>

      <form
        className="mt-[60px] flex flex-col gap-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type="email"
          placeholder="E-mail"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Senha"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </>
  )
}
