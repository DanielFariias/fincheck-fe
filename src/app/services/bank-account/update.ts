import { httpClient } from '../http-client'

export interface IUpdateBankAccountParams {
  id: string
  name: string
  initialBalance: number
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

export async function update({ id, ...params }: IUpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params)

  return data
}
