import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

interface Props {
  storeId: number
}
export interface UseAnalysisCustomerQueryResponse {
  userId: number
  nickname: string
  accumulatedStampAmount: number
  rank: number
}
export function useAnalysisCustomerQuery({ storeId }: Props) {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseAnalysisCustomerQueryResponse[] }>(
          '/analysis/customer',
          { params: { storeId } },
        )
      ).data.data,
    queryKey: ['analysis', 'customer', storeId],
  })
}
