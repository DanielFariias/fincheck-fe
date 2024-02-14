import { httpClient } from '../http-client'

export interface ICreateBankAccountParams {
  name: string
  initialBalance: number
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export async function create(params: ICreateBankAccountParams) {
  const { data } = await httpClient.post('/bank-accounts', params)

  return data
}
