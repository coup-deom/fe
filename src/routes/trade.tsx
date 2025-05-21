import { useState } from 'react'

import { UseExecuteExchangeMutation } from '@/apis/caches/exchanges/[exchangeId]/execute.mutation'
import {
  useExchangesQuery,
  UseExchangesQueryResponse,
} from '@/apis/caches/exchanges/index.query'
import { useExchangesMyQuery } from '@/apis/caches/exchanges/my.query'
import { useExchangesTradableQuery } from '@/apis/caches/exchanges/tradable.query'
import { Button } from '@/components/airbnbs/button'
import { Dialog } from '@/components/base/Dialog'
import { Filters } from '@/components/base/Filters'
import { SearchFilter } from '@/components/base/SearchFilter'
import { TradeCardList } from '@/components/base/TradeCardList'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { useAccessToken, withAccessToken } from '@/contexts/AccessToken.context'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trade')({
  component: withAccessToken(Trade, 'CUSTOMER'),
})

function Trade() {
  const { idToken } = useAccessToken()
  const exchangesQuery = useExchangesQuery()
  const exchangesMyQuery = useExchangesMyQuery()
  const exchangesTradableQuery = useExchangesTradableQuery()
  const [filters, setFilters] = useState<Set<string>>(new Set())
  const [storeName, setStoreName] = useState<string>('')

  const list = (() => {
    if (filters.size === 0) {
      return exchangesQuery.data
    }

    return [
      ...(filters.has('AVAILABLE') ? (exchangesTradableQuery.data ?? []) : []),
      ...(filters.has('OWN_ONLY') ? (exchangesMyQuery.data ?? []) : []),
    ].filter(
      (value, index, self) => index === self.findIndex(t => t.id === value.id),
    )
  })()?.filter(exchange =>
    (
      exchange.sourceAmount +
      exchange.sourceStoreName +
      exchange.sourceBranchName +
      exchange.targetAmount +
      exchange.targetStoreName +
      exchange.targetBranchName
    )
      .replaceAll(' ', '')
      .includes(storeName.replaceAll(' ', '')),
  )

  return (
    <CommonLayout title="거래소">
      <Filters.WithWrapper
        value={filters}
        onChange={setFilters}
        options={[
          { label: '거래 가능한 가게만', value: 'AVAILABLE' },
          { label: '내가 등록한 가게만', value: 'OWN_ONLY' },
        ]}
      >
        <SearchFilter.WithWrapper value={storeName} onChange={setStoreName}>
          <VerticalCardList>
            <TradeCardList>
              {(list?.length ?? 0) > 0 ? (
                list?.map(exchange => (
                  <CardItem
                    key={exchange.id}
                    isMine={exchange.creatorId === idToken.userId}
                    data={exchange}
                    onModeChange={m => m === 'view' && exchangesQuery.refetch()}
                  />
                ))
              ) : (
                <div className="w-full py-12 text-gray-500 font-bold text-lg text-center">
                  요청 내역이 없습니다.
                </div>
              )}
            </TradeCardList>
          </VerticalCardList>
        </SearchFilter.WithWrapper>
      </Filters.WithWrapper>
    </CommonLayout>
  )
}

interface CardItemProps {
  isMine: boolean
  data: UseExchangesQueryResponse
  onModeChange: (mode: 'view' | 'edit') => void
}
const CardItem: React.FC<CardItemProps> = ({
  isMine,
  data,
  onModeChange: _onModeChange,
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const mutation = UseExecuteExchangeMutation({ id: data.id })
  const [open, setOpen] = useState(false)

  const onModeChange = (m: 'view' | 'edit') => {
    _onModeChange(m)
    setMode(m)
  }
  if (isMine) {
    return (
      <TradeCardList.Item
        mode={mode}
        onModeChange={onModeChange}
        id={data.id}
        source={{
          amount: data.sourceAmount,
          storeName: data.sourceStoreName,
          branchName: data.sourceBranchName,
          id: data.sourceStoreId,
        }}
        target={{
          amount: data.targetAmount,
          storeName: data.targetStoreName,
          branchName: data.targetBranchName,
          id: data.targetStoreId,
        }}
      />
    )
  }

  const onConfirm = () => {
    if (mutation.isPending) {
      return
    }

    mutation.mutate(undefined, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  const onOpenChange = (v: boolean) => {
    if (mutation.isPending) {
      return
    }

    setOpen(v)
  }

  return (
    <Dialog open={open} onOpenChange={v => onOpenChange(v)}>
      <Dialog.Trigger onClick={() => onOpenChange(true)}>
        <TradeCardList.Item
          id={data.id}
          source={{
            amount: data.sourceAmount,
            storeName: data.sourceStoreName,
            branchName: data.sourceBranchName,
            id: data.sourceStoreId,
          }}
          target={{
            amount: data.targetAmount,
            storeName: data.targetStoreName,
            branchName: data.targetBranchName,
            id: data.targetStoreId,
          }}
        />
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>정말 거래를 수락하시겠어요?</Dialog.Title>
        <Dialog.Description>
          고객님의{' '}
          <span className="font-bold">
            "{data.targetStoreName} {data.targetBranchName}" 스탬프{' '}
            {data.targetAmount}개
          </span>
          를 <br />
          <span className="font-bold">
            "{data.sourceStoreName} {data.sourceBranchName}" 스탬프{' '}
            {data.sourceAmount}개
          </span>
          와 교환합니다.
        </Dialog.Description>

        <Dialog.Footer className="flex flex-row justify-end w-full gap-2">
          <Dialog.Close onClick={() => onOpenChange(false)}>
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
