import { Logo } from '../../components/logo'
import { UserMenu } from '../../components/user-menu'
import { Accounts } from './components/accounts'
import {
  DashboardContext,
  DashboardProvider,
} from './components/dashboard-context'
import { Fab } from './components/fab'
import { Transactions } from './components/transactions'
import { EditAccountModal } from './modals/edit-account-modal'
import { NewAccountModal } from './modals/new-account-modal'
import { NewTransactionNodal } from './modals/new-transaction-modal'

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <>
            <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
              <header className="h-12 flex justify-between items-center">
                <Logo className="h-6 text-teal-900" />
                <UserMenu />
              </header>

              <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-[calc(100%-65px)]">
                <section className="w-full md:w-1/2">
                  <Accounts />
                </section>
                <section className="w-full md:w-1/2">
                  <Transactions />
                </section>
              </main>

              <Fab />
            </div>

            <NewAccountModal />
            <NewTransactionNodal />
            {accountBeingEdited && <EditAccountModal />}
          </>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}
