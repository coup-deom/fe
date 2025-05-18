import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

interface Body {
  storeId: number
  otpCode: number
}
interface UseOTPVerifyMutationResponse {
  // TODO: OTP API 변경되면 반영하기
  status: boolean
}
export function useOTPVerifyMutation() {
  return useMutation({
    mutationFn: async (props: Body) =>
      (
        await FETCHER.post<{ data: UseOTPVerifyMutationResponse }>(
          '/otp/verify',
          { ...props },
        )
      ).data.data,
    mutationKey: ['/otp/verify'],
  })
}
