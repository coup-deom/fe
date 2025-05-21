import { useEffect, useState } from 'react'

import { useUpdateExchangeMutation } from '@/apis/caches/exchanges/[id].mutation'
import { useExchangesMutation } from '@/apis/caches/exchanges/index.mutation'
import { useStoresQuery } from '@/apis/caches/stores/index.query'
import { useStoresStampedQuery } from '@/apis/caches/stores/stamped.query'
import { Button } from '@/components/airbnbs/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/airbnbs/select'
import { Stepper } from '@/components/airbnbs/stepper'
import { useAccessToken } from '@/contexts/AccessToken.context'
import { dateString } from '@/lib/date'
import { cn } from '@/lib/utils'

import { Dialog } from '../Dialog'
import { CheckIcon } from '../svgs/CheckIcon'
import { CompareIcon } from '../svgs/CompareIcon'
import { EditIcon } from '../svgs/EditIcon'
import { PlusIcon } from '../svgs/PlusIcon'

interface Props {
  noInteraction?: boolean
}
const TradeCardListRoot: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  noInteraction,
}) => {
  const { idToken } = useAccessToken()
  const stampedStoresQuery = useStoresStampedQuery()
  const storesAllQuery = useStoresQuery()

  const createExchangeMutation = useExchangesMutation()

  const [fromCount, setFromCount] = useState(0)
  const [toCount, setToCount] = useState(0)
  const [fromStoreID, setFromStoreID] = useState<number>()
  const [toStoreID, setToStoreID] = useState<number>()

  const fromStore = stampedStoresQuery.data?.find(
    store => store.storeId === fromStoreID,
  )

  const reset = () => {
    setFromCount(0)
    setToCount(0)
    setFromStoreID(undefined)
    setToStoreID(undefined)
  }

  const invalid =
    fromCount === 0 ||
    toCount === 0 ||
    fromCount > (fromStore?.myStampCount ?? 0) ||
    fromStoreID === undefined ||
    toStoreID === undefined

  const onSubmit = () => {
    if (createExchangeMutation.isPending || invalid) {
      return
    }

    createExchangeMutation.mutate(
      {
        creatorId: idToken.userId,
        sourceAmount: fromCount,
        sourceStoreId: fromStoreID,
        targetAmount: toCount,
        targetStoreId: toStoreID,
      },
      {
        onSuccess: () => {
          window.location.reload()
        },
      },
    )
  }

  const onClose = () => {
    if (createExchangeMutation.isPending) {
      return
    }

    setFromCount(0)
    setToCount(0)
    setFromStoreID(undefined)
    setToStoreID(undefined)
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {children}
      {!noInteraction && (
        <div className="fixed right-0 z-50 mb-4 mr-6 bottom-16 pb-safe">
          <Dialog onOpenChange={v => v === false && onClose()}>
            <Dialog.Trigger asChild>
              <Button variant="secondary" rounded="full" size="icon">
                <PlusIcon />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Title>
                <div className="flex flex-row items-center justify-between w-full h-[24px]">
                  <span className="text-lg font-bold">쿠폰 거래 등록</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSubmit()}
                    disabled={invalid}
                  >
                    <CheckIcon />
                  </Button>
                </div>
              </Dialog.Title>
              <div className="flex flex-col w-full gap-6 bg-white shadow-xs rounded-2xl">
                <div className="flex flex-col items-start w-full gap-6 p-0">
                  <div className="flex flex-col items-start w-full gap-3">
                    <div className="w-full font-bold text-md leading-[21px] text-black">
                      내가 가진 쿠폰
                    </div>
                    <div className="w-full h-4 text-xs font-medium text-black leading-md">
                      <Select
                        value={fromStoreID?.toString() ?? ''}
                        onValueChange={v => setFromStoreID(Number(v))}
                      >
                        <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                          <SelectValue placeholder="가게를 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {stampedStoresQuery.data?.map(store => (
                            <SelectItem
                              key={store.storeId}
                              value={store.storeId.toString()}
                            >
                              {store.storeName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full pt-6 text-black text-md whitespace-nowrap leading-md">
                      스탬프 개수
                      <div>
                        <Stepper
                          value={fromCount}
                          onChange={setFromCount}
                          formatter={v => v}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start flex-grow w-full gap-3">
                    <div className="w-full font-bold text-md leading-[21px] text-black">
                      교환을 원하는 쿠폰
                    </div>
                    <div className="w-full h-4 text-xs font-medium text-black leading-md">
                      <Select
                        value={toStoreID?.toString() ?? ''}
                        onValueChange={v => setToStoreID(Number(v))}
                      >
                        <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                          <SelectValue placeholder="가게를 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {storesAllQuery.data
                            ?.filter(store => store.storeId !== fromStoreID)
                            .map(store => (
                              <SelectItem
                                key={store.storeId}
                                value={store.storeId.toString()}
                              >
                                {store.storeName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full pt-6 text-black text-md whitespace-nowrap leading-md">
                      스탬프 개수
                      <div>
                        <Stepper
                          value={toCount}
                          onChange={setToCount}
                          formatter={v => v}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    'flex flex-col items-center justify-between w-full pt-6 text-gray-500 font-bold text-md whitespace-nowrap leading-md',
                    (fromCount !== 0 ||
                      toCount !== 0 ||
                      fromStoreID !== undefined ||
                      toStoreID !== undefined) &&
                      'text-black',
                  )}
                  onClick={() => reset()}
                >
                  초기화
                </div>
              </div>
            </Dialog.Content>
          </Dialog>
        </div>
      )}
    </div>
  )
}
interface TradeCardItemProps {
  status?: 'PENDING' | 'COMPLETED'
  noInteraction?: boolean
  mode?: 'edit' | 'view'
  onModeChange?: (mode: 'edit' | 'view', data?: unknown) => void

  id: number
  source: {
    storeName: string
    branchName?: string
    amount: number
    id: number
  }
  target: {
    storeName: string
    branchName?: string
    amount: number
    id: number
  }
}
const TradeCardItem: React.FC<TradeCardItemProps> = ({
  status,
  noInteraction,
  mode,
  onModeChange,

  id,
  source,
  target,
}) => {
  const createdAt = new Date()

  const stampedStoresQuery = useStoresStampedQuery()
  const storesAllQuery = useStoresQuery()

  const updateExchangeMutation = useUpdateExchangeMutation({ id })

  const [fromCount, setFromCount] = useState(source.amount)
  const [toCount, setToCount] = useState(target.amount)
  const [fromStoreID, setFromStoreID] = useState<number>(source.id)
  const [toStoreID, setToStoreID] = useState<number>(target.id)

  const fromStore = stampedStoresQuery.data?.find(
    store => store.storeId === fromStoreID,
  )

  const invalid =
    fromCount === 0 ||
    toCount === 0 ||
    fromCount > (fromStore?.myStampCount ?? 0) ||
    fromStoreID === undefined ||
    toStoreID === undefined

  const reset = () => {
    setFromCount(source.amount)
    setToCount(target.amount)
    setFromStoreID(source.id)
    setToStoreID(target.id)
  }
  const onSubmit = () => {
    if (updateExchangeMutation.isPending || invalid) {
      return
    }

    if (
      fromCount === source.amount &&
      toCount === target.amount &&
      fromStoreID === source.id &&
      toStoreID === target.id
    ) {
      onModeChange?.('view')
      return
    }

    updateExchangeMutation.mutate(
      {
        sourceAmount: fromCount,
        sourceStoreId: fromStoreID,
        targetAmount: toCount,
        targetStoreId: toStoreID,
      },
      {
        onSuccess: () => {
          onModeChange?.('view')
        },
      },
    )
  }

  useEffect(() => {
    setFromCount(source.amount)
    setToCount(target.amount)
    setFromStoreID(source.id)
    setToStoreID(target.id)
  }, [mode, source.amount, target.amount, source.id, target.id])

  return (
    <div className="flex flex-col w-full gap-6 px-4 py-4 text-left bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row items-center justify-between w-full h-[24px]">
        <span className="text-sm font-bold">{dateString(createdAt, '. ')}</span>

        {(() => {
          switch (status) {
            case 'COMPLETED':
              return (
                <span className="text-sm font-bold text-[#22CC88]">완료됨</span>
              )
            case 'PENDING':
              return (
                <span className="text-sm font-bold text-[#FFB800]">
                  진행 중
                </span>
              )
            default:
              return null
          }
        })()}

        {!noInteraction &&
          mode !== undefined &&
          (mode === 'edit' ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSubmit()}
              disabled={invalid}
            >
              <CheckIcon />
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => onModeChange?.('edit')}>
              <EditIcon />
            </Button>
          ))}
      </div>

      {mode === undefined || mode === 'view' ? (
        <div className="flex flex-row items-center justify-between w-full gap-6 p-0">
          <div className="flex flex-col items-start justify-center flex-1 flex-grow gap-3">
            <div className="w-full font-bold text-md leading-[21px] text-black">
              {source.storeName}
            </div>
            <div className="w-full h-4 text-xs font-medium text-black leading-md">
              {source.branchName}
            </div>
            <div className="w-full pt-2 text-sm font-bold text-black leading-md">
              “스탬프 {source.amount}개”와 함께
            </div>
          </div>
          <div className="flex flex-row items-center justify-center p-0 shrink-0">
            <CompareIcon fill="black" />
          </div>
          <div className="flex flex-col items-start justify-center flex-1 flex-grow gap-3">
            <div className="w-full font-bold text-md leading-[21px] text-black">
              {target.storeName}
            </div>
            <div className="w-full h-4 text-xs font-medium text-black leading-md">
              {target.branchName}
            </div>
            <div className="w-full pt-2 text-sm font-bold text-black leading-md">
              “스탬프 {target.amount}개”를 기다려요.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start w-full gap-6 p-0">
          <div className="flex flex-col items-start w-full gap-3">
            <div className="w-full font-bold text-md leading-[21px] text-black">
              내가 가진 쿠폰
            </div>
            <div className="w-full h-4 text-xs font-medium text-black leading-md">
              <Select
                value={fromStoreID?.toString() ?? ''}
                onValueChange={v => setFromStoreID(Number(v))}
              >
                <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                  <SelectValue placeholder="가게를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {stampedStoresQuery.data?.map(store => (
                    <SelectItem
                      key={store.storeId}
                      value={store.storeId.toString()}
                    >
                      {store.storeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row items-center justify-between w-full pt-6 text-black text-md whitespace-nowrap leading-md">
              스탬프 개수
              <div>
                <Stepper
                  value={fromCount}
                  onChange={setFromCount}
                  max={
                    stampedStoresQuery.data?.find(
                      store => store.storeId === fromStoreID,
                    )?.myStampCount ?? 0
                  }
                  formatter={v => v}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start flex-grow w-full gap-3">
            <div className="w-full font-bold text-md leading-[21px] text-black">
              교환을 원하는 쿠폰
            </div>
            <div className="w-full h-4 text-xs font-medium text-black leading-md">
              <Select
                value={toStoreID?.toString() ?? ''}
                onValueChange={v => setToStoreID(Number(v))}
              >
                <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                  <SelectValue placeholder="가게를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {storesAllQuery.data
                    ?.filter(store => store.storeId !== fromStoreID)
                    .map(store => (
                      <SelectItem
                        key={store.storeId}
                        value={store.storeId.toString()}
                      >
                        {store.storeName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row items-center justify-between w-full pt-6 text-black text-md whitespace-nowrap leading-md">
              스탬프 개수
              <div>
                <Stepper
                  value={toCount}
                  onChange={setToCount}
                  formatter={v => v}
                />
              </div>
            </div>
          </div>

          <div
            className={cn(
              'flex flex-col items-center justify-between w-full pt-6 text-gray-500 font-bold text-md whitespace-nowrap leading-md',
              (fromCount !== source.amount ||
                toCount !== target.amount ||
                fromStoreID !== source.id ||
                toStoreID !== target.id) &&
                'text-black',
            )}
            onClick={() => reset()}
          >
            초기화
          </div>
        </div>
      )}
    </div>
  )
}

export const TradeCardList = Object.assign(TradeCardListRoot, {
  Item: TradeCardItem,
})
