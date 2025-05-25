import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

interface Props {
  storeId: number
}
export interface UseAnalysisRecentExchangesQueryResponse {
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
  status: 'PENDING' | 'COMPLETED'
}
export function useAnalysisRecentExchangesQuery({ storeId }: Props) {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseAnalysisRecentExchangesQueryResponse[] }>(
          '/analysis/recent-exchanges',
          { params: { storeId } },
        )
      ).data.data,
    queryKey: ['analysis', 'customer', storeId],
  })
}
