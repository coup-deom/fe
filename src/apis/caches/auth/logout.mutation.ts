import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => FETCHER.post('/auth/logout'),
    mutationKey: [],
  })
}
