import React, { useState } from 'react'

import { Dialog } from '../Dialog'
import { CheckIcon } from '../svgs/CheckIcon'
import { CompareIcon } from '../svgs/CompareIcon'
import { EditIcon } from '../svgs/EditIcon'
import { PlusIcon } from '../svgs/PlusIcon'

import { Button } from '@/components/airbnbs/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/airbnbs/select'
import { Stepper } from '@/components/airbnbs/stepper'

const TradeCardListRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [fromCount, setFromCount] = useState(0)
  const [toCount, setToCount] = useState(0)
  const [fromShop, setFromShop] = useState<string>()
  const [toShop, setToShop] = useState<string>()
  const onSubmit = () => {
    // TODO:
    console.log('hit')
  }

  const onClose = () => {
    setFromCount(0)
    setToCount(0)
    setFromShop(undefined)
    setToShop(undefined)
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {children}
      <div className="fixed right-0 mb-2 mr-2 bottom-16 pb-safe">
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
                <CheckIcon onClick={() => onSubmit()} />
              </div>
            </Dialog.Title>
            <div className="flex flex-col w-full gap-6 bg-white shadow-xs rounded-2xl">
              <div className="flex flex-col items-start w-full gap-6 p-0">
                <div className="flex flex-col items-start w-full gap-3">
                  <div className="w-full font-bold text-md leading-[21px] text-black">
                    내가 가진 쿠폰
                  </div>
                  <div className="w-full h-4 text-xs font-medium text-black leading-md">
                    {/* TODO: 내가 쿠폰을 가지고 있는 가게 목록 */}
                    <Select value={fromShop} onValueChange={setFromShop}>
                      <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                        <SelectValue placeholder="가게를 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starbucks">스타벅스</SelectItem>
                        <SelectItem value="twosomeplace">
                          투썸플레이스
                        </SelectItem>
                        <SelectItem value="coffeebean">커피빈</SelectItem>
                        <SelectItem value="ediya">이디야 커피</SelectItem>
                        <SelectItem value="paulbassett">폴 바셋</SelectItem>
                        <SelectItem value="angelinus">엔제리너스</SelectItem>
                        <SelectItem value="gongcha">공차</SelectItem>
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
                    {/* TODO: 전체 가게 목록 | 위에서 선택한 건 제외하고 고를 수 있게끔 FE 처리 */}
                    <Select value={toShop} onValueChange={setToShop}>
                      <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                        <SelectValue placeholder="가게를 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starbucks">스타벅스</SelectItem>
                        <SelectItem value="twosomeplace">
                          투썸플레이스
                        </SelectItem>
                        <SelectItem value="coffeebean">커피빈</SelectItem>
                        <SelectItem value="ediya">이디야 커피</SelectItem>
                        <SelectItem value="paulbassett">폴 바셋</SelectItem>
                        <SelectItem value="angelinus">엔제리너스</SelectItem>
                        <SelectItem value="gongcha">공차</SelectItem>
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
            </div>
          </Dialog.Content>
        </Dialog>
      </div>
    </div>
  )
}
interface TradeCardItemProps {
  // createdAt: Date
  mode?: 'edit' | 'view'
  // TODO:
  onModeChange?: (mode: 'edit' | 'view', data?: unknown) => void

  // TODO:
  // data: {
  //   left: {
  //     shopName: string
  //     branchName: string
  //     count: number
  //   }
  //   right: {
  //     shopName: string
  //     branchName: string
  //     count: number
  //   }
  // }
}
const TradeCardItem: React.FC<TradeCardItemProps> = ({
  mode,
  onModeChange,
}) => {
  const createdAt = new Date()

  const [fromCount, setFromCount] = useState(0)
  const [toCount, setToCount] = useState(0)

  return (
    <div className="flex flex-col w-full gap-6 px-4 py-4 bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row items-center justify-between w-full h-[24px]">
        <span className="text-sm font-bold">
          {createdAt.toISOString().slice(0, 10).replaceAll('-', '. ')}
        </span>

        {mode !== undefined &&
          (mode === 'edit' ? (
            <CheckIcon onClick={() => onModeChange?.('view')} />
          ) : (
            <EditIcon onClick={() => onModeChange?.('edit')} />
          ))}
      </div>

      {mode === undefined || mode === 'view' ? (
        <div className="flex flex-row items-center justify-between w-full gap-6 p-0">
          <div className="flex flex-col items-start justify-center flex-1 flex-grow gap-3">
            <div className="w-full font-bold text-md leading-[21px] text-black">
              카페 에스프레소
            </div>
            <div className="w-full h-4 text-xs font-medium text-black leading-md">
              관악구청점
            </div>
            <div className="w-full pt-2 text-sm font-bold text-black leading-md">
              “스탬프 3개”와 함께
            </div>
          </div>
          <div className="flex flex-row items-center justify-center p-0 shrink-0">
            <CompareIcon fill="black" />
          </div>
          <div className="flex flex-col items-start justify-center flex-1 flex-grow gap-3">
            <div className="w-full font-bold text-md leading-[21px] text-black">
              배스킨라빈스
            </div>
            <div className="w-full h-4 text-xs font-medium text-black leading-md">
              상도점
            </div>
            <div className="w-full pt-2 text-sm font-bold text-black leading-md">
              “스탬프 2개”를 기다려요.
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
              {/* TODO: 내가 쿠폰을 가지고 있는 가게 목록 */}
              <Select>
                <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                  <SelectValue placeholder="가게를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starbucks">스타벅스</SelectItem>
                  <SelectItem value="twosomeplace">투썸플레이스</SelectItem>
                  <SelectItem value="coffeebean">커피빈</SelectItem>
                  <SelectItem value="ediya">이디야 커피</SelectItem>
                  <SelectItem value="paulbassett">폴 바셋</SelectItem>
                  <SelectItem value="angelinus">엔제리너스</SelectItem>
                  <SelectItem value="gongcha">공차</SelectItem>
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
              {/* TODO: 전체 가게 목록 | 위에서 선택한 건 제외하고 고를 수 있게끔 FE 처리 */}
              <Select>
                <SelectTrigger className="w-full h-4 text-xs font-medium text-black leading-md">
                  <SelectValue placeholder="가게를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starbucks">스타벅스</SelectItem>
                  <SelectItem value="twosomeplace">투썸플레이스</SelectItem>
                  <SelectItem value="coffeebean">커피빈</SelectItem>
                  <SelectItem value="ediya">이디야 커피</SelectItem>
                  <SelectItem value="paulbassett">폴 바셋</SelectItem>
                  <SelectItem value="angelinus">엔제리너스</SelectItem>
                  <SelectItem value="gongcha">공차</SelectItem>
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
      )}
    </div>
  )
}

export const TradeCardList = Object.assign(TradeCardListRoot, {
  Item: TradeCardItem,
})
