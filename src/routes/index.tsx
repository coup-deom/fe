import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { useStoresQuery } from '@/apis/caches/stores/index.query'
import { Filters } from '@/components/base/Filters'
import { SearchFilter } from '@/components/base/SearchFilter'
import { ShopCard } from '@/components/base/ShopCard'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import {
  withAccessToken,
  withStoreApproval,
} from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/')({
  component: withAccessToken(withStoreApproval(Index)),
})

function Index() {
  const storesQuery = useStoresQuery()
  const [filters, setFilters] = useState(new Set<string>())
  const [storeName, setStoreName] = useState('')

  return (
    <CommonLayout title="가게 목록">
      <Filters.WithWrapper
        value={filters}
        onChange={setFilters}
        options={[
          { label: '스탬프 보유한 가게만', value: 'STAMPED' },
          { label: '지금 받을 수 있는 가게만', value: 'AVAILABLE' },
        ]}
      >
        <SearchFilter.WithWrapper
          value={storeName}
          onChange={v => setStoreName(v.trim())}
        >
          <VerticalCardList>
            {storesQuery.data
              ?.filter(store => {
                if (filters.size === 0) {
                  return true
                }
                if (filters.has('STAMPED') && store.myStampCount === 0) {
                  return false
                }
                if (
                  filters.has('AVAILABLE') &&
                  store.deoms.at(0) &&
                  store.deoms[0].requiredStampAmount <= store.myStampCount
                ) {
                  return false
                }
                return true
              })
              .filter(store =>
                (store.storeName + store.branchName).includes(storeName),
              )
              .map(store => (
                <ShopCard
                  key={store.storeId}
                  storeId={store.storeId}
                  storeName={store.storeName}
                  branchName={store.branchName}
                  image={store.image}
                  stampCount={store.myStampCount}
                >
                  {store.deoms.map((deom, index, deoms) => (
                    <ShopCard.Stamp
                      key={deom.deomId}
                      count={store.myStampCount}
                      name={deom.name}
                      deomId={deom.deomId}
                      storeId={store.storeId}
                      threshold={{
                        now: deom.requiredStampAmount,
                        prev: deoms.at(index - 1)?.requiredStampAmount ?? 0,
                      }}
                    />
                  ))}
                </ShopCard>
              ))}
          </VerticalCardList>
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}
