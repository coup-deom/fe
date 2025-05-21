import { FETCHER } from '@/apis/fetcher'
import { useQuery } from '@tanstack/react-query'

export interface UseCustomerRequestAllQueryResponse {
  otpId: string
  storeName: string
  storeId: string
  storeImage: string
  type: 'STAMP' | 'DEOM'
  usedStampAmount: number
  createdAt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED'
  otpCode: number | null
  deomId: number | null
  deomName: string | null
  deomRequiredStampAmount: number | null
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
