import { BankAccount } from '../../../../../app/entities/bank-account'
import { cn } from '../../../../../app/utils/cn'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import { BankAccountTypeIcon } from '../../../../components/icons/bank-account-type-icon'
import { useDashboard } from '../dashboard-context/use-dashboard'

interface IAcountCardProps {
  data: BankAccount
}

export function AccountCard({ data }: IAcountCardProps) {
  const { color, name, currentBalance, type } = data
  const { areValuesVisible, openEditAccountModal } = useDashboard()

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-900"
      style={{
        borderColor: `${color}`,
      }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <header>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </header>

      <div>
        <span
          className={cn(
            'text-gray-800 font-medium tracking-[-0.5px] block',
            !areValuesVisible && 'blur-[8px]',
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}
