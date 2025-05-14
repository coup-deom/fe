import React, { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Filters } from '@/components/base/Filters'
import { SearchFilter } from '@/components/base/SearchFilter'
import { TradeCardList } from '@/components/base/TradeCardList'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'
import { Dialog } from '@/components/base/Dialog'
import { Button } from '@/components/airbnbs/button'

export const Route = createFileRoute('/trade')({
  component: withAccessToken(Trade, 'NORMAL'),
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
              <CardItem isMine />
              <CardItem isMine={false} />
              <CardItem isMine={false} />
              <CardItem isMine={false} />
              <CardItem isMine />
              <CardItem isMine={false} />
              <CardItem isMine />
            </TradeCardList>
          </VerticalCardList>
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}

interface CardItemProps {
  isMine: boolean
}
const CardItem: React.FC<CardItemProps> = ({ isMine }) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  if (isMine) {
    return <TradeCardList.Item mode={mode} onModeChange={setMode} />
  }

  const [open, setOpen] = useState(false)
  const onConfirm = () => { setOpen(false) }
  
  return (
    <Dialog open={open}>
      <Dialog.Trigger onClick={() => setOpen(true)}>
        <TradeCardList.Item />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>정말 거래를 수락하시겠어요?</Dialog.Title>
        <Dialog.Description>
          고객님의 <span className="font-bold">배스킨라빈스 상도점 "스탬프 2개"</span>를 <br />
          <span className="font-bold">카페 에스프레소 관악구청점 "스탬프 3개"</span>와 교환합니다.
        </Dialog.Description>

        <Dialog.Footer className="flex flex-row justify-end w-full gap-2">
          <Dialog.Close onClick={() => setOpen(false)}>
            <Button variant="outline">취소</Button>
          </Dialog.Close>
          <Button variant="default" onClick={onConfirm}>
            수락
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
