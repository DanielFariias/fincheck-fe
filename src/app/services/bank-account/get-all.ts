import { BankAccount } from '../../entities/bank-account'
import { httpClient } from '../http-client'

type TBankAccountsResponse = Array<BankAccount>

export async function getAll() {
  const { data } = await httpClient.get<TBankAccountsResponse>('/bank-accounts')

  return data
}
