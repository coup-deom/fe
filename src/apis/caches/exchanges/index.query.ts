import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

export interface UseExchangesQueryResponse {
  id: number
  updatedAt: string
  creatorId: number
  responderId: number
  sourceStoreId: number
  sourceStoreName: string
  sourceBranchName: string
  targetStoreId: number
  targetStoreName: string
  targetBranchName: string
  sourceAmount: number
  targetAmount: number
}
export function useExchangesQuery() {
  return useQuery({
    queryFn: async () =>
      (await FETCHER.get<{ data: UseExchangesQueryResponse[] }>('/exchanges'))
        .data.data,
    queryKey: ['exchanges'],
  })
}
