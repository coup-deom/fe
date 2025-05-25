import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

export interface UseExchangesMyQueryResponse {
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
export function useExchangesMyQuery() {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseExchangesMyQueryResponse[] }>(
          '/exchanges/my',
          {
            params: {
              status: 'PENDING',
            },
          },
        )
      ).data.data,
    queryKey: ['exchanges', 'my'],
  })
}
