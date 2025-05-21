import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Body {
  creatorId: number
  sourceStoreId: number
  targetStoreId: number
  sourceAmount: number
  targetAmount: number
}
interface UseExchangesMutationResponse {
  id: number
  updatedAt: string
  creatorId: number
  responderId: number
  sourceStoreId: number
  sourceStoreName: string
  sourceBranchName: string
  targetStoreId: number
  targetStoreName: string
  targetBranchName: string
  sourceAmount: number
  targetAmount: number
}
export function useExchangesMutation() {
  return useMutation({
    mutationFn: async (props: Body) =>
      (
        await FETCHER.post<{ data: UseExchangesMutationResponse }>(
          '/exchanges',
          { ...props },
        )
      ).data.data,
    mutationKey: ['/exchanges'],
  })
}
