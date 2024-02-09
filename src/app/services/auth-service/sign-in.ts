import { httpClient } from '../http-client'

export interface ISignInParams {
  email: string
  password: string
}

interface ISignInResponse {
  accessToken: string
}

export async function signIn(params: ISignInParams) {
  const { data } = await httpClient.post<ISignInResponse>(
    '/auth/signin',
    params,
  )

  return data
}
