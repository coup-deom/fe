import { useQuery } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

export interface UseStoresQueryResponse {
  storeId: number
  storeName: string
  branchName: string
  image: string
  myStampCount: number
  deoms: {
    deomId: number
    name: string
    requiredStampAmount: number
    status: 'UNAVAILABLE' | 'AVAILABLE' | 'PENDING'
  }[]
  city: string
  street: string
  detail: string
}
export function useStoresQuery() {
  return useQuery({
    queryFn: async () =>
      (await FETCHER.get<{ data: UseStoresQueryResponse[] }>('/stores')).data
        .data,
    queryKey: ['/stores'],
  })
}
