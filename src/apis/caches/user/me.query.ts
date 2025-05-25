import { FETCHER } from '@/apis/fetcher'
import { Provider } from '@/apis/types/Provider.types'
import { useQuery } from '@tanstack/react-query'

export interface UseUserMeQueryResponse {
  id: number
  nickname: string
  email: string
  role: string
  provider: Provider
}
export function UseUserMeQuery() {
  return useQuery({
    queryFn: async () =>
      (await FETCHER.get<{ data: UseUserMeQueryResponse }>('/user/me')).data
        .data,
    queryKey: ['user', 'me'],
  })
}
