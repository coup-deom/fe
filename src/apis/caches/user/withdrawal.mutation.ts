import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

export function useWithdrawalMutation() {
  return useMutation({
    mutationFn: async () => (await FETCHER.post('/user/withdrawal')).data,
    mutationKey: ['/user/withdrawal'],
  })
}
