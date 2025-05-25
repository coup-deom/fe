import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

export function useWithdrawalMutation() {
  return useMutation({
    mutationFn: async () => (await FETCHER.post('/user/withdrawal')).data,
    mutationKey: ['user', 'withdrawal'],
  })
}
