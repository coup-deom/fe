import { useQuery } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

export interface UseExchangesTradableQueryResponse {
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
export function useExchangesTradableQuery() {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseExchangesTradableQueryResponse[] }>(
          '/exchanges/tradable',
        )
      ).data.data,
    queryKey: ['/exchanges/tradable'],
  })
}
