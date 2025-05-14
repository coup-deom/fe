import React from 'react'

import { Dialog } from '../Dialog'
import { Stamp } from '../Stamp'

import { Button } from '@/components/airbnbs/button'

const ShopCardRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [otp, setOTP] = React.useState<string>()
  const [open, setOpen] = React.useState(false)

  const onRequest = () => {
    setOTP('1392')
    setOpen(true)
  }
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
        <Dialog open={open}>
          <Dialog.Trigger asChild onClick={onRequest}>
            <div className="flex flex-col justify-start grow-1">
              <div className="w-full overflow-hidden text-base font-bold text-black text-ellipsis">
                {/* TODO: */}
                {
                  [
                    '도담 숭실',
                    '요거바라 숭실대점',
                    '뚜레쥬르 숭실대점',
                    '이디야 숭실대점',
                    '스타벅스 숭실대점',
                    '투썸플레이스 숭실대점',
                    '파리바게뜨 숭실대점',
                    '할리스 숭실대점',
                    '커피빈 숭실대점',
                    '빽다방 숭실대점',
                    '카페베네 숭실대점',
                    '탐앤탐스 숭실대점',
                  ][Math.floor(Math.random() * 100) % 3]
                }
              </div>
              <div className="text-xs text-black font-bold w-full mt-2.5">
                나의 스탬프: 5개
              </div>
            </div>
          </Dialog.Trigger>
          {otp !== undefined && otp.length === 4 && (
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

interface ShopCardStampProps {
  count: number
  threshold: { now: number; prev: number }
  name: string
}
const ShopCardStamp: React.FC<ShopCardStampProps> = ({
  count,
  threshold,
  name,
}) => {
  const isAchieved = threshold.now <= count
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
          if (isAchieved === false) {
            return
          }
          setOTP(undefined)
          setOpen(true)
        }}
      >
        <Stamp count={count} threshold={threshold} name={name} />
      </Dialog.Trigger>
      {otp === undefined ? (
        <Dialog.Content>
          <Dialog.Title>정말 쿠폰을 소진하시겠어요?</Dialog.Title>
          <Dialog.Description>
            소진 쿠폰 갯수는 "{threshold.now}개" 에요
          </Dialog.Description>

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
