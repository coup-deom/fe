import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Filters } from '@/components/base/Filters'
import { SearchFilter } from '@/components/base/SearchFilter'
import { ShopCard } from '@/components/base/ShopCard'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/')({
  component: withAccessToken(Index),
})

function Index() {
  const [filters, setFilters] = useState(new Set<string>())
  const [shop, setShop] = useState('')
  return (
    <CommonLayout title="가게 목록">
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
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
              <ShopCard.Stamp />
            </ShopCard>
          </VerticalCardList>
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}
