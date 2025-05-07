import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Tabs } from '@/components/base/Tabs'
import { TradeCardList } from '@/components/base/TradeCardList'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/owner/analysis')({
  component: withAccessToken(Analysis),
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
  interface UserLeaderRecord {
    id: number
    nickname: string
    count: number
  }
  const users: UserLeaderRecord[] = [
    { id: 1, nickname: 'user1', count: 14 },
    { id: 2, nickname: 'user2', count: 10 },
    { id: 3, nickname: 'user3', count: 9 },
    { id: 4, nickname: 'user4', count: 6 },
    { id: 5, nickname: 'user5', count: 5 },
    { id: 6, nickname: 'user6', count: 3 },
    { id: 7, nickname: 'user7', count: 2 },
    { id: 8, nickname: 'user8', count: 1 },
    { id: 9, nickname: 'user9', count: 1 },
    { id: 10, nickname: 'user10', count: 1 },
  ]

  return (
    <VerticalCardList className="items-center px-6">
      <div className="mb-4 text-lg font-bold">
        우리 가게에서 <span className="text-[#22CC88]">쿠폰을 적립한</span>{' '}
        고객님들이에요!
      </div>

      {users.map((user, i) => (
        <div
          key={user.id}
          className={cn(
            'flex flex-row items-center w-full gap-6 px-4 py-4 font-bold border-2 rounded-lg whitespace-nowrap',
            i < 3
              ? 'border-[#22CC88] bg-[#22CC88] text-white'
              : 'bg-white text-black',
            i === 2 ? 'mb-6' : '',
          )}
        >
          <div className="shrink-0">{i + 1}</div>
          <div className="flex-1 overflow-hidden text-ellipsis">
            {user.nickname} 님
          </div>
          <div className="shrink-0">{user.count} 개</div>
        </div>
      ))}
    </VerticalCardList>
  )
}
const RecentTradeList = () => {
  return (
    <VerticalCardList>
      <TradeCardList noInteraction>
        <TradeCardList.Item noInteraction status="pending" />
        <TradeCardList.Item noInteraction status="completed" />
        <TradeCardList.Item noInteraction status="canceled" />
        <TradeCardList.Item noInteraction status="completed" />
        <TradeCardList.Item noInteraction status="pending" />
        <TradeCardList.Item noInteraction status="pending" />
      </TradeCardList>
    </VerticalCardList>
  )
}
