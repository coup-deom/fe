import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

export interface UseStoresStampedQueryResponse {
  storeId: number
  storeName: string
  branchName: string
  image: string
  myStampCount: number
  deoms: {
    deomId: number
    name: string
    requiredStampAmount: number
    status: 'UNAVAILABLE' | 'IN_PROGRESS' | 'AVAILABLE'
  }[]
  city: string
  street: string
  detail: string
}

export function useStoresStampedQuery() {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseStoresStampedQueryResponse[] }>(
          '/stores/stamped',
        )
      ).data.data,
    queryKey: ['/stores/stamped'],
  })
}
