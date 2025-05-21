import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => FETCHER.post('/auth/logout'),
    mutationKey: [],
  })
}
