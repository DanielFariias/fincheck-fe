import { User } from '../../entities/user'
import { httpClient } from '../http-client'

type TMeResponse = User
export async function me() {
  const { data } = await httpClient.get<TMeResponse>('/users/me')

  return data
}
