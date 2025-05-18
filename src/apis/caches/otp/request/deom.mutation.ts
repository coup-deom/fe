import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

interface Body {
  userId: number
  storeId: number
  deomId: number
  usedStampAmount: number
  type: 'STAMP' | 'DEOM'
}
interface UseOTPRequestDeomMutationResponse {
  otpCode: number
}
export function useOTPRequestDeomMutation() {
  return useMutation({
    mutationFn: async (props: Body) =>
      (
        await FETCHER.post<{ data: UseOTPRequestDeomMutationResponse }>(
          '/otp/request/deom',
          {
            ...props,
          },
        )
      ).data.data,
    mutationKey: ['/otp/request/deom'],
  })
}
