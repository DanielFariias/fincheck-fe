import { ChevronDownIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from '../../../../components/dropdown-menu'
import { TransactionsIcon } from '../../../../components/icons/transactions-icon'
import { IncomeIcon } from '../../../../components/icons/income-icon'
import { ExpensesIcon } from '../../../../components/icons/expenses-icon'

export function TransactionTypeDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2 text-gray-900">
          <TransactionsIcon />
          <span className="text-gray-800 text-sm tracking-[-0.5px]">
            Transações
          </span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px] mt-2">
        <DropdownMenu.Item className="gap-2">
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2">
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2">
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
