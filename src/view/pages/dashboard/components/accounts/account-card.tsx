import { formatCurrency } from '../../../../../app/utils/format-currency'
import { BankAccountTypeIcon } from '../../../../components/icons/bank-account-type-icon'

interface IAcountCardProps {
  color: string
  name: string
  balance: number
  type: 'CASH' | 'CHECKING' | 'INVESTMENT'
}

export function AccountCard({ color, name, balance, type }: IAcountCardProps) {
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-900"
      style={{
        borderColor: `${color}`,
      }}
    >
      <header>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </header>

      <div>
        <span className="text-gray-800 font-medium tracking-[-0.5px] block">
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  )
}
