import { Outlet } from 'react-router-dom'
import illustration from '../../assets/illustration.png'
import { Logo } from '../components/logo'

export function AuthLayout() {
  return (
    <main className="flex w-full h-full">
      <section className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-16">
        <Logo className="h-6 text-gray-500" />

        <div className="max-w-[504px] w-full px-8">
          <Outlet />
        </div>
      </section>

      <section className="w-1/2 h-full justify-center items-center p-8 hidden lg:flex">
        <img
          src={illustration}
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
          alt="Image containing the panel page. Contains a filter menu, a months menu and 4 example transactions."
        />

        <div className="max-w-[656px] bottom-8 mx-8 bg-white p-10 absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </div>
      </section>
    </main>
  )
}
