import { useQuery } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'
import { Provider } from '@/apis/types/Provider.types'

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
    queryKey: ['/user/me'],
  })
}
