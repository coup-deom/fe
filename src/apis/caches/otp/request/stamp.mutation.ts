import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

interface Body {
  userId: number
  storeId: number
  type: 'STAMP' | 'DEOM'
}
interface UseOTPRequestStampMutationResponse {
  otpCode: number
}
export function useOTPRequestStampMutation() {
  return useMutation({
    mutationFn: async (props: Body) =>
      (
        await FETCHER.post<{ data: UseOTPRequestStampMutationResponse }>(
          '/otp/request/stamp',
          {
            ...props,
          },
        )
      ).data.data,
    mutationKey: ['/otp/request/stamp'],
  })
}
