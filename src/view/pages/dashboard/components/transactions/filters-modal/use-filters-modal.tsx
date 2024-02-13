import { useState } from 'react'

type TSelectedBankAccountId = string | null

export function useFiltersModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] =
    useState<TSelectedBankAccountId>(null)
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  )

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? null : bankAccountId,
    )
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step)
  }

  return {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
  }
}
