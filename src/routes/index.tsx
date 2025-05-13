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
              <ShopCard.Stamp
                count={10}
                name="쿠키 한개"
                threshold={{ now: 5, prev: 0 }}
              />
              <ShopCard.Stamp
                count={10}
                name="아메리카노 한잔"
                threshold={{ now: 10, prev: 5 }}
              />
              <ShopCard.Stamp
                count={10}
                name="카페라떼 한잔"
                threshold={{ now: 15, prev: 10 }}
              />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp
                count={10}
                name="아메리카노 한잔"
                threshold={{ now: 10, prev: 0 }}
              />
              <ShopCard.Stamp
                count={10}
                name="카페라떼 한잔"
                threshold={{ now: 15, prev: 10 }}
              />
              <ShopCard.Stamp
                count={10}
                name="마카롱 세개"
                threshold={{ now: 20, prev: 15 }}
              />
              <ShopCard.Stamp
                count={10}
                name="조각케이크 하나"
                threshold={{ now: 30, prev: 20 }}
              />
              <ShopCard.Stamp
                count={10}
                name="홀케이크 하나"
                threshold={{ now: 50, prev: 30 }}
              />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp
                count={10}
                name="쿠키 한개"
                threshold={{ now: 5, prev: 0 }}
              />
              <ShopCard.Stamp
                count={10}
                name="아메리카노 한잔"
                threshold={{ now: 10, prev: 5 }}
              />
              <ShopCard.Stamp
                count={10}
                name="카페라떼 한잔"
                threshold={{ now: 15, prev: 10 }}
              />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp
                count={10}
                name="쿠키 한개"
                threshold={{ now: 5, prev: 0 }}
              />
              <ShopCard.Stamp
                count={10}
                name="아메리카노 한잔"
                threshold={{ now: 10, prev: 5 }}
              />
              <ShopCard.Stamp
                count={10}
                name="카페라떼 한잔"
                threshold={{ now: 15, prev: 10 }}
              />
            </ShopCard>
            <ShopCard>
              {/* TODO: Stamp 내용 데이터 기반으로 */}
              <ShopCard.Stamp
                count={10}
                name="쿠키 한개"
                threshold={{ now: 5, prev: 0 }}
              />
              <ShopCard.Stamp
                count={10}
                name="아메리카노 한잔"
                threshold={{ now: 10, prev: 5 }}
              />
              <ShopCard.Stamp
                count={10}
                name="카페라떼 한잔"
                threshold={{ now: 15, prev: 10 }}
              />
            </ShopCard>
          </VerticalCardList>
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}
