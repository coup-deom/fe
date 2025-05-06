import React from 'react'

import { Dialog } from '../Dialog'
import { Stamp } from '../Stamp'

import { Button } from '@/components/airbnbs/button'

const ShopCardRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full gap-6 px-3 py-3 bg-white shadow-xs rounded-2xl">
      <div className="flex flex-row w-full h-12 gap-5 shrink-0">
        <img
          src="TODO: image url"
          alt=""
          width="100%"
          height="100%"
          className="w-12 h-12 bg-black rounded-full"
        />
        <div className="flex flex-col justify-start grow-1">
          <div className="w-full overflow-hidden text-base font-bold text-black text-ellipsis">
            기본 카드
          </div>
          <div className="text-xs text-black font-bold w-full mt-2.5">
            나의 스탬프: 5개
          </div>
        </div>
      </div>
      {children ? (
        <div className="w-full h-[82px] overflow-hidden">
          <div className="flex flex-row items-start w-full gap-2 pb-[16px] overflow-auto">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  )
}

const ShopCardStamp: React.FC = () => {
  const [otp, setOTP] = React.useState<string>()
  const [open, setOpen] = React.useState(false)

  const onConfirm = () => {
    // TODO: API 요청, 쿠폰 갯수 갱신, OTP 발급 및 설정
    setOTP('1392')
  }

  return (
    <Dialog open={open}>
      <Dialog.Trigger
        asChild
        onClick={() => {
          setOTP(undefined)
          setOpen(true)
        }}
      >
        <Stamp
          count={10}
          threshold={{ now: 10, prev: 0 }}
          name="아메리카노 1잔"
        />
      </Dialog.Trigger>
      {otp === undefined ? (
        <Dialog.Content>
          <Dialog.Title>정말 쿠폰을 소진하시겠어요?</Dialog.Title>
          <Dialog.Description>소진 쿠폰 갯수는 "10개" 에요</Dialog.Description>

          <Dialog.Footer className="flex flex-row justify-end w-full gap-2">
            <Dialog.Close onClick={() => setOpen(false)}>
              <Button variant="outline">취소</Button>
            </Dialog.Close>
            <Button variant="default" onClick={onConfirm}>
              소진
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      ) : (
        <Dialog.Content>
          <Dialog.Title>OTP를 사장님께 전해주세요</Dialog.Title>
          <Dialog.Description>
            <div className="flex flex-row items-center justify-center w-full py-4">
              {[...otp].map((v, i) => (
                <span key={i} className="px-3 text-2xl font-bold">
                  {v}
                </span>
              ))}
            </div>

            <div className="w-full font-light text-center text-md">
              OTP가 클립보드에 복사되었어요!
            </div>
          </Dialog.Description>
          <Dialog.Footer className="flex flex-row justify-end w-full gap-2">
            <Dialog.Close onClick={() => setOpen(false)}>
              <Button variant="default">닫기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      )}
    </Dialog>
  )
}

export const ShopCard = Object.assign(ShopCardRoot, {
  Stamp: ShopCardStamp,
})
