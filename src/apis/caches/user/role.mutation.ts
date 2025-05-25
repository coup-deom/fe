import { FETCHER } from '@/apis/fetcher'
import { Role } from '@/contexts/AccessToken.context'
import { useMutation } from '@tanstack/react-query'

interface Body {
  role: Role
}
interface useSetUserRoleMutationResponse {
  id: number
  nickname: string
  email: string
  role: string
  provider: string
}
export function useSetUserRoleMutation() {
  return useMutation({
    mutationFn: (props: Body) =>
      FETCHER.post<{ data: useSetUserRoleMutationResponse }>('/user/role', {
        role: props.role,
      }),
    mutationKey: ['user', 'role'],
  })
}
