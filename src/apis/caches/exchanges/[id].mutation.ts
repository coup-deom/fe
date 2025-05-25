import { FETCHER } from '@/apis/fetcher'
import { useMutation } from '@tanstack/react-query'

interface Props {
  id: number
}
interface Body {
  sourceStoreId: number
  targetStoreId: number
  sourceAmount: number
  targetAmount: number
}
interface UseUpdateExchangeMutationResponse {
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
export function useUpdateExchangeMutation({ id }: Props) {
  return useMutation({
    mutationFn: async (props: Body) =>
      (
        await FETCHER.put<{ data: UseUpdateExchangeMutationResponse }>(
          `/exchanges/${id}`,
          { ...props },
        )
      ).data.data,
    mutationKey: ['exchanges', id],
  })
}
