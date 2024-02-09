import { httpClient } from '../http-client'

interface IMeResponse {
  email: string
  name: string
}
export async function me() {
  const { data } = await httpClient.get<IMeResponse>('/users/me')

  return data
}
