import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { CheckIcon } from '@/components/base/svgs/CheckIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'
import { useStoresStatusQuery } from '@/apis/caches/stores/status.query'
import { useEffect } from 'react'
import { FETCHER } from '@/apis/fetcher'

export const Route = createFileRoute('/owner/entry/waiting')({
  component: withAccessToken(EntryWaiting, 'OWNER'),
})

function EntryWaiting() {
  const storeStatusQuery = useStoresStatusQuery()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (storeStatusQuery.data === undefined) {
      return
    }

    if (storeStatusQuery.data?.status !== 'PENDING' && storeStatusQuery.data?.status !== 'REJECTED') {
      FETCHER.post('/auth/reissue', undefined).then(() => {
        navigate({ to: '/' })
      })
      return
    }
  }, [storeStatusQuery.data?.status])

  return (
    <CommonLayout seamless title="가게 입점 대기">
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-12">
        <div className="flex flex-col items-center justify-center w-full gap-4 mb-24">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#22CC88] text-white">
            <CheckIcon width="48" height="48" />
          </div>
          <span className="text-xl font-bold ">
            {storeStatusQuery.data?.status === 'REJECTED' ? '입점 심사가 반려되었습니다.' : '입점 심사 중 입니다'}
          </span>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-4 bg-[#f3f3f3] py-4 px-4 rounded-lg">
          <div className="text-lg font-bold">서류 확인</div>
          <div>제출하신 서류를 확인하고 있습니다</div>
        </div>
      </div>
    </CommonLayout>
  )
}
