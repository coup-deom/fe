import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Props {
  storeId: number
}
type Body = {
  policies: (Omit<UseDeomPoliciesMutationResponse, 'id'> & {
    id?: UseDeomPoliciesMutationResponse['id']
  })[]
}
export interface UseDeomPoliciesMutationResponse {
  id: number
  name: string
  requiredStampAmount: number
}
export function useDeomPoliciesMutation({ storeId }: Props) {
  return useMutation({
    mutationFn: async (props: Body) => {
      return (
        await FETCHER.post<{
          data: { policies: UseDeomPoliciesMutationResponse[] }
        }>(`/deom-policies/${storeId}`, { ...props })
      ).data.data.policies
    },
    mutationKey: ['deom-policies', storeId],
  })
}
