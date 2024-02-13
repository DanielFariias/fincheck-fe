import { ColorsDropdownInput } from '../../../../components/colors-dropdown-input'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import Modal from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useNewAccountModalController } from './use-new-account-modal-controller'

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } =
    useNewAccountModalController()
  return (
    <Modal
      title="Nova conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            name="initialBalance"
            placeholder="Nome da conta"
          />
          <Select
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
            placeholder="Tipo"
          />

          <ColorsDropdownInput />
        </div>
      </form>
    </Modal>
  )
}
