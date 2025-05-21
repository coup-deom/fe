import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

interface Props {
  storeId: number
}
export interface UseDeomPoliciesQueryResponse {
  id: number
  name: string
  requiredStampAmount: number
}
export function useDeomPoliciesQuery({ storeId }: Props) {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseDeomPoliciesQueryResponse[] }>(
          `/deom-policies/${storeId}`,
        )
      ).data.data,
    queryKey: ['/deom-policies', storeId],
  })
}
