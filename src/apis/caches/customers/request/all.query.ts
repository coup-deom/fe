import { useQuery } from '@tanstack/react-query'

import { FETCHER } from '@/apis/fetcher'

export interface UseCustomerRequestAllQueryResponse {
  otpId: string
  storeName: string
  storeId: string
  type: 'STAMP' | 'DEOM'
  usedStampAmount: number
  createdAt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
  otpCode: number
  deomId: string
  deomName: string
}
export function useCustomerRequestAllQuery() {
  return useQuery({
    queryFn: async () =>
      (
        await FETCHER.get<{ data: UseCustomerRequestAllQueryResponse[] }>(
          '/customers/request/all',
        )
      ).data.data,
    queryKey: ['/customers/request/all'],
  })
}
