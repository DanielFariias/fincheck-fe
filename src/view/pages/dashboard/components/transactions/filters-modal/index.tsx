import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import Modal from '../../../../../components/modal'
import { Button } from '../../../../../components/button'
import { useFiltersModalController } from './use-filters-modal'
import { cn } from '../../../../../../app/utils/cn'

interface IFiltersModalProps {
  open: boolean
  onClose: VoidFunction
}

const mockedAccounts = [
  { id: '1', name: 'Nubank' },
  { id: '2', name: 'Itaú' },
  { id: '3', name: 'Bradesco' },
  { id: '4', name: 'Santander' },
  { id: '5', name: 'Banco do Brasil' },
  { id: '6', name: 'Inter' },
]

export function FiltersModal({ open, onClose }: IFiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  } = useFiltersModalController()
  return (
    <Modal open={open} title="Filtros" onClose={onClose}>
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2 max-h-[120px] overflow-y-auto">
          {mockedAccounts.map((account) => (
            <button
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors ',
                account.id === selectedBankAccountId && '!bg-gray-200',
              )}
            >
              {account.name}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <span className="text-lg tracking-[-1px] font-bold text-gray-800">
            Ano
          </span>

          <div className="mt-2 flex items-center justify-between w-full">
            <button
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full"
              onClick={() => handleChangeYear(-1)}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div className="flex-1 text-center">
              <span className="text-sm font-medium tracking-[-0.5px]">
                {selectedYear}
              </span>
            </div>

            <button
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full"
              onClick={() => handleChangeYear(+1)}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <Button className="w-full mt-10">Aplicar filtros</Button>
      </div>
    </Modal>
  )
}
