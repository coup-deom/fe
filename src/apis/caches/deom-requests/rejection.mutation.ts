import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  userId: number
  storeId: number
  otpCode: number
  deomId: number
  usedStampAmount: number
}
export function useDeomRequestRejectionMutation() {
  return useMutation({
    mutationFn: (props: Body) =>
      FETCHER.post('/deom-requests/rejection', { ...props }),
    mutationKey: ['deom-requests', 'rejection'],
  })
}
