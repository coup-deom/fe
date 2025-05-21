import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  ownerId: number
  businessNumber: number
  storeName: string
  branchName: string
  addressCity: string
  addressStreet: string
  addressDetail: string
  image: string
}
interface UseStoresMutationResponse {
  ownerId: number
  businessNumber: number
  storeName: string
  branchName: string
  addressCity: string
  addressStreet: string
  addressDetail: string
  image: string
}
export function useStoresMutation() {
  return useMutation({
    mutationFn: async (props: Body) =>
      (
        await FETCHER.post<{ data: UseStoresMutationResponse }>('/stores', {
          ...props,
        })
      ).data.data,
    mutationKey: ['/stores'],
  })
}
