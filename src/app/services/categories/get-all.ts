import { Category } from '../../entities/ctegory'
import { httpClient } from '../http-client'

type CategoriesResponse = Array<Category>

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories')

  return data
}
