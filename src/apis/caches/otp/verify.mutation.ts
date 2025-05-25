import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  storeId: number
  otpCode: number
}
export interface UseOTPVerifyMutationResponse {
  userId: number
  storeId: number
  type: 'STAMP' | 'DEOM'
  deomId: number | null
  usedStampAmount: number
  createdAt: string
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
    mutationKey: ['otp', 'verify'],
  })
}
