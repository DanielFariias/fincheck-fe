import { Controller } from 'react-hook-form'
import { Button } from '../../../../components/button'
import { ColorsDropdownInput } from '../../../../components/colors-dropdown-input'
import { Input } from '../../../../components/input'
import { InputCurrency } from '../../../../components/input-currency'
import Modal from '../../../../components/modal'
import { Select } from '../../../../components/select'
import { useNewAccountModalController } from './use-new-account-modal-controller'

const typeCurrency = [
  { label: 'Conta Corrente', value: 'CHECKING' },
  { label: 'Investimentos', value: 'INVESTMENT' },
  { label: 'Dinheiro Físico', value: 'CASH' },
]

export function NewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    handleSubmit,
    errors,
    control,
    isFormValid,
    isLoading,
  } = useNewAccountModalController()
  return (
    <Modal
      title="Nova conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Saldo inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={typeCurrency}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={!isFormValid}
          isLoading={isLoading}
        >
          Criar
        </Button>
      </form>
    </Modal>
  )
}
