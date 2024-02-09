import { httpClient } from '../http-client'

export interface ISignUpParams {
  name: string
  email: string
  password: string
}

interface ISignUpResponse {
  accessToken: string
}

export async function signUp(params: ISignUpParams) {
  const { data } = await httpClient.post<ISignUpResponse>(
    '/auth/signup',
    params,
  )

  return data
}
