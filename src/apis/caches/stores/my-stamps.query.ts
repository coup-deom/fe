import { useQuery } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

export interface UseStoresMyStampsQueryResponse {
  storeId: number
  storeName: string
  branchName: string
}

export function useStoresMyStampsQuery() {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseStoresMyStampsQueryResponse[] }>(
          '/stores/my-stamps',
        )
      ).data.data,
    queryKey: ['/stores/my-stamps'],
  })
}
