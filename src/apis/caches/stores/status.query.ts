import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

export interface UseStoresStatusQueryResponse {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
}
export function useStoresStatusQuery() {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseStoresStatusQueryResponse }>(
          '/stores/status',
        )
      ).data.data,
    queryKey: ['/stores/status'],
  })
}
