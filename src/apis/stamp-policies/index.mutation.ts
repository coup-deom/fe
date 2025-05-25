import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

type Body = Omit<UseStampPolicyMutationResponse, 'id'> & {
  id?: UseStampPolicyMutationResponse['id']
}
export interface UseStampPolicyMutationResponse {
  id: number
  storeId: number
  baseAmount: number
  stampCount: number
}
/** 생성 / 수정 통합 policyId를 통해 분기 */
export function useStampPolicyMutation() {
  return useMutation({
    mutationFn: async (props: Body) => {
      if (props.id === undefined) {
        // NOTE: 생성
        return (
          await FETCHER.post<{ data: UseStampPolicyMutationResponse }>(
            '/stamp-policies',
            { ...props },
          )
        ).data.data
      } else {
        // NOTE: 수정
        return (
          await FETCHER.post<{ data: UseStampPolicyMutationResponse }>(
            `/stamp-policies/${props.id}`,
            { ...props },
          )
        ).data.data
      }
    },
    mutationKey: ['stamp-policies'],
  })
}
