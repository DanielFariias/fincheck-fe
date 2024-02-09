import { Link } from 'react-router-dom'
import { Input } from '../components/input'
import { Button } from '../components/button'

export function Login() {
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

      <form className="mt-[60px] flex flex-col gap-4">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Senha" />

        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </>
  )
}
