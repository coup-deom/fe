import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  userId: number
  storeId: number
  otpCode: number
  amount: number
}
export function useStampRequestApprovalMutation() {
  return useMutation({
    mutationFn: (props: Body) =>
      FETCHER.post('/stamp-requests/approval', { ...props }),
    mutationKey: ['stamp-requests', 'approval'],
  })
}
