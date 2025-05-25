import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

type Body = Omit<UseDeomPolicyMutationResponse, 'id'> & {
  id?: UseDeomPolicyMutationResponse['id']
}
export interface UseDeomPolicyMutationResponse {
  id: number
  storeId: number
  name: string
  requiredStampAmount: number
}
/** 생성 / 수정 통합 policyId를 통해 분기 */
export function useDeomPolicyMutation() {
  return useMutation({
    mutationFn: async (props: Body) => {
      if (props.id === undefined) {
        // NOTE: 생성
        return (
          await FETCHER.post<{ data: UseDeomPolicyMutationResponse }>(
            '/stamp-policies',
            { ...props },
          )
        ).data.data
      } else {
        // NOTE: 수정
        return (
          await FETCHER.put<{ data: UseDeomPolicyMutationResponse }>(
            `/stamp-policies/${props.id}`,
            { ...props },
          )
        ).data.data
      }
    },
    mutationKey: ['stamp-policies'],
  })
}
