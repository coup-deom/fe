import { useQuery } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

interface Response {
  storeId: number
  storeName: string
  branchName: string
}
export function useStoresAllQuery() {
  return useQuery({
    queryFn: async () => (await FETCHER.get<Response[]>('/stores/all')).data,
    queryKey: ['/stores/all'],
  })
}
