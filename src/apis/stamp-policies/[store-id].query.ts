import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

interface Props {
  storeId: number
}
export interface UseStampPoliciesQueryResponse {
  id: number
  baseAmount: number
  stampCount: number
}
export function useStampPoliciesQuery({ storeId }: Props) {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseStampPoliciesQueryResponse[] }>(
          `/stamp-policies/${storeId}`,
        )
      ).data.data,
    queryKey: ['/stamp-policies', storeId],
  })
}
