import { useState } from 'react'

import { useAnalysisCustomerQuery } from '@/apis/caches/analysis/customer.query'
import { useAnalysisRecentExchangesQuery } from '@/apis/caches/analysis/recent-exchanges.query'
import { Tabs } from '@/components/base/Tabs'
import { TradeCardList } from '@/components/base/TradeCardList'
import { CircleLoaderIcon } from '@/components/base/svgs/CircleLoaderIcon'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import {
  useAccessToken,
  withAccessToken,
  withStoreApproval,
} from '@/contexts/AccessToken.context'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/analysis')({
  component: withAccessToken(withStoreApproval(Analysis), 'OWNER'),
})

function Analysis() {
  const [tab, setTab] = useState<'total-coupons' | 'recent-trade'>(
    'total-coupons',
  )
  return (
    <CommonLayout title="우리 가게 충성 고객 분석">
      <Tabs.WithWrapper
        value={tab}
        onChange={v => setTab(v as 'total-coupons' | 'recent-trade')}
        data={[
          { value: 'total-coupons', label: '총 적립 쿠폰 수' },
          { value: 'recent-trade', label: '최근 쿠폰 거래 내역' },
        ]}
      >
        {tab === 'total-coupons' && <TotalCouponLeaderBoard />}
        {tab === 'recent-trade' && <RecentTradeList />}
      </Tabs.WithWrapper>
    </CommonLayout>
  )
}

const TotalCouponLeaderBoard = () => {
  const { idToken } = useAccessToken()
  const usersQuery = useAnalysisCustomerQuery({ storeId: idToken.storeId })

  const isLoading = usersQuery.isFetching

  return (
    <VerticalCardList className="items-center px-6">
      <div className="mb-4 text-lg font-bold">
        우리 가게에서 <span className="text-[#22CC88]">쿠폰을 적립한</span>{' '}
        고객님들이에요!
      </div>
      {isLoading ? (
        <div className="flex w-full py-16 text-gray-500 font-bold text-lg justify-center items-center">
          <CircleLoaderIcon className="w-7 h-7 animate-spin text-secondary-foreground" />
        </div>
      ) : (usersQuery.data?.length ?? 0) > 0 ? (
        usersQuery.data
          ?.sort((a, b) => a.rank - b.rank)
          .map(user => (
            <div
              key={user.userId}
              className={cn(
                'flex flex-row items-center w-full gap-6 px-4 py-4 font-bold border-2 rounded-lg whitespace-nowrap',
                user.rank < 3
                  ? 'border-[#22CC88] bg-[#22CC88] text-white'
                  : 'bg-white text-black',
                user.rank === 2 ? 'mb-6' : '',
              )}
            >
              <div className="shrink-0">{user.rank}</div>
              <div className="flex-1 overflow-hidden text-ellipsis">
                {user.nickname} 님
              </div>
              <div className="shrink-0">{user.accumulatedStampAmount} 개</div>
            </div>
          ))
      ) : (
        <div className="py-4 text-gray-500 font-bold text-lg">
          아직 쿠폰을 적립한 고객이 없습니다.
        </div>
      )}
    </VerticalCardList>
  )
}
const RecentTradeList = () => {
  const { idToken } = useAccessToken()
  const recentExchangesQuery = useAnalysisRecentExchangesQuery({
    storeId: idToken.storeId,
  })
  return (
    <VerticalCardList>
      <TradeCardList noInteraction>
        {(recentExchangesQuery.data?.length ?? 0) > 0 ? (
          recentExchangesQuery.data?.map(exchange => (
            <TradeCardList.Item
              key={exchange.id}
              noInteraction
              status={exchange.status}
              source={{
                id: exchange.sourceStoreId,
                branchName: exchange.sourceBranchName,
                amount: exchange.sourceAmount,
                storeName: exchange.sourceStoreName,
              }}
              target={{
                id: exchange.targetStoreId,
                branchName: exchange.targetBranchName,
                amount: exchange.targetAmount,
                storeName: exchange.targetStoreName,
              }}
              id={exchange.id}
            />
          ))
        ) : (
          <div className="w-full py-4 text-gray-500 font-bold text-lg text-center">
            최근 거래 내역이 없습니다.
          </div>
        )}
      </TradeCardList>
    </VerticalCardList>
  )
}
