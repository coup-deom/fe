import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { useAnalysisCustomerQuery } from '@/apis/caches/analysis/customer.query'
import { Tabs } from '@/components/base/Tabs'
import { TradeCardList } from '@/components/base/TradeCardList'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import {
  useAccessToken,
  withAccessToken,
  withStoreApproval,
} from '@/contexts/AccessToken.context'
import { cn } from '@/lib/utils'

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
  // TODO: userId인지 아니면 입점 후에 별개의 storeId가 있는지 확인 필요
  const usersQuery = useAnalysisCustomerQuery({ storeId: idToken.userId })

  return (
    <VerticalCardList className="items-center px-6">
      <div className="mb-4 text-lg font-bold">
        우리 가게에서 <span className="text-[#22CC88]">쿠폰을 적립한</span>{' '}
        고객님들이에요!
      </div>

      {usersQuery.data
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
        ))}
    </VerticalCardList>
  )
}
const RecentTradeList = () => {
  return (
    <VerticalCardList>
      <TradeCardList noInteraction>
        {/* TODO: */}
        {/* <TradeCardList.Item noInteraction status="pending" />
        <TradeCardList.Item noInteraction status="completed" />
        <TradeCardList.Item noInteraction status="canceled" />
        <TradeCardList.Item noInteraction status="completed" />
        <TradeCardList.Item noInteraction status="pending" />
        <TradeCardList.Item noInteraction status="pending" /> */}
      </TradeCardList>
    </VerticalCardList>
  )
}
