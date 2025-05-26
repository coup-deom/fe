import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  userId: number
  storeId: number
  otpCode: number
  amount: number
}
export function useStampRequestRejectionMutation() {
  return useMutation({
    mutationFn: (props: Body) =>
      FETCHER.post('/stamp-request/rejection', { ...props }),
    mutationKey: ['stamp-request', 'rejection'],
  })
}
