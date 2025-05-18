import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'
import { Role } from '@/contexts/AccessToken.context'

interface Body {
  role: Role
}
interface Response {
  id: number
  nickname: string
  email: string
  role: string
  provider: string
}
export function useSetUserRoleMutation() {
  return useMutation({
    mutationFn: (props: Body) =>
      FETCHER.post<Response>('/user/role', { role: props.role }),
    mutationKey: ['/user/role'],
  })
}
