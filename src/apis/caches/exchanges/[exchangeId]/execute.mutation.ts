import { useMutation } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'
interface Props {
  id: number
}
interface UseExecuteExchangeMutationResponse {}
export function UseExecuteExchangeMutation({ id }: Props) {
  return useMutation({
    mutationFn: async () =>
      (
        await FETCHER.post<{ data: UseExecuteExchangeMutationResponse }>(
          `/exchanges/${id}/execute`,
        )
      ).data.data,
    mutationKey: ['/exchanges', id],
  })
}
