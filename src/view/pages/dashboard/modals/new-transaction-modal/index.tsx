import { DatePickerInput } from '../../../../components/date-picker-input'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import Modal from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useNewTransactionModalController } from './use-new-transaction-modal-controller'

export function NewTransactionNodal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useNewTransactionModalController()

  const isExpense = newTransactionType === 'EXPENSE'
  return (
    <Modal
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Valor {isExpense ? 'da Despesa' : 'da Receita'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="initialBalance"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
          />
          <Select
            placeholder="Categoria"
            options={[
              {
                label: 'Conta Corrente',
                value: 'CHECKING',
              },
              {
                label: 'Investimentos',
                value: 'INVESTMENT',
              },
              {
                label: 'Dinheiro Físico',
                value: 'CASH',
              },
            ]}
          />

          <Select
            placeholder={isExpense ? 'Pagar com' : 'Receber com'}
            options={[
              {
                label: 'Conta Corrente',
                value: 'CHECKING',
              },
              {
                label: 'Investimentos',
                value: 'INVESTMENT',
              },
              {
                label: 'Dinheiro Físico',
                value: 'CASH',
              },
            ]}
          />

          <DatePickerInput />
        </div>
      </form>
    </Modal>
  )
}
