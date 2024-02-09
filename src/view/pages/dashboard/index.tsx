import { Logo } from '../../components/logo'
import { UserMenu } from '../../components/user-menu'
import { Accounts } from './components/accounts'
import { Transactions } from './components/transactions'

export function Dashboard() {
  return (
    <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
      <header className="h-12 flex justify-between items-center">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-4">
        <section className="w-full md:w-1/2">
          <Accounts />
        </section>
        <section className="w-full md:w-1/2">
          <Transactions />
        </section>
      </main>
    </div>
  )
}
