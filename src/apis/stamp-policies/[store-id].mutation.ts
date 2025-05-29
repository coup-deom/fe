import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Props {
  storeId: number
}
type Body = {
  policies: (Omit<UseStampPoliciesMutationResponse, 'id'> & {
    id?: UseStampPoliciesMutationResponse['id']
  })[]
}
export interface UseStampPoliciesMutationResponse {
  id: number
  baseAmount: number
  stampCount: number
}
export function useStampPoliciesMutation({ storeId }: Props) {
  return useMutation({
    mutationFn: async (props: Body) => {
      console.log('useStampPoliciesMutation', props)
      return (
        await FETCHER.post<{
          data: { policies: UseStampPoliciesMutationResponse[] }
        }>(`/stamp-policies/${storeId}`, { ...props })
      ).data.data.policies
    },
    mutationKey: ['stamp-policies', storeId],
  })
}
