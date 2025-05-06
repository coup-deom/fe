import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Filters } from '@/components/base/Filters'
import { SearchFilter } from '@/components/base/SearchFilter'
import { TradeCardList } from '@/components/base/TradeCardList'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/trade')({
  component: withAccessToken(Trade),
})

function Trade() {
  const [filters, setFilters] = useState<Set<string>>(new Set())
  const [shop, setShop] = useState<string>('')

  return (
    <CommonLayout title="거래소">
      <Filters.WithWrapper
        value={filters}
        onChange={setFilters}
        options={[
          { label: '스탬프 보유한 가게만', value: '스탬프 보유한 가게만' },
          {
            label: '지금 받을 수 있는 가게만',
            value: '지금 받을 수 있는 가게만',
          },
        ]}
      >
        <SearchFilter.WithWrapper value={shop} onChange={setShop}>
          <VerticalCardList>
            <TradeCardList>
              <TradeCardList.Item />
              <TradeCardList.Item mode="edit" />
              <TradeCardList.Item mode="view" />
              <TradeCardList.Item />
              <TradeCardList.Item />
              <TradeCardList.Item />
              <TradeCardList.Item />
            </TradeCardList>
          </VerticalCardList>
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}
