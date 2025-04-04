import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Filters } from '@/components/base/Filters'
import { SearchFilter } from '@/components/base/SearchFilter'
import { CommonLayout } from '@/components/layouts/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/')({
  component: withAccessToken(Index),
})

function Index() {
  const [filters, setFilters] = useState(new Set<string>())
  const [shop, setShop] = useState('')
  return (
    <CommonLayout title="기본 프레임">
      <Filters.WithWrapper
        value={filters}
        onChange={setFilters}
        options={[
          { label: '기본 필터 1', value: 'default filter 1' },
          { label: '기본 필터 2', value: 'default filter 2' },
          { label: '기본 필터 3', value: 'default filter 3' },
          { label: '기본 필터 4', value: 'default filter 4' },
          { label: '기본 필터 5', value: 'default filter 5' },
          { label: '기본 필터 6', value: 'default filter 6' },
          { label: '기본 필터 7', value: 'default filter 7' },
          { label: '기본 필터 8', value: 'default filter 8' },
          { label: '기본 필터 9', value: 'default filter 9' },
          { label: '기본 필터 10', value: 'default filter 10' },
        ]}
      >
        <SearchFilter.WithWrapper value={shop} onChange={setShop}>
          {shop}
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}
