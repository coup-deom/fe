import { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/airbnbs/button'
import { DeleteIcon } from '@/components/base/svgs/DeleteIcon'
import { MinusIcon } from '@/components/base/svgs/MinusIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'

export const Route = createFileRoute('/otp')({
  component: RouteComponent,
  beforeLoad: () => null,
})

function RouteComponent() {
  const [OTP, setOTP] = useState('1234')
  return (
    <CommonLayout title="OTP" seamless>
      <div className="flex py-3 text-2xl items-center text-[#717171] font-bold justify-center w-full">
        고객의 OTP를 입력해주세요.
      </div>
      <div className="flex items-center justify-center gap-3 py-16 text-5xl font-bold">
        {OTP.padEnd(4, '.')
          .split('')
          .map((item, index) =>
            item === '.' ? (
              <span
                key={index}
                className="flex items-center justify-center w-16 h-16 text-black"
              >
                <MinusIcon />
              </span>
            ) : (
              <span
                key={index}
                className="w-16 h-16 flex justify-center font-bold items-center text-[#22CC88]"
              >
                {item}
              </span>
            ),
          )}
      </div>
      <div className="flex justify-center items-center font-bold text-xl text-[#D73B53]">
        유효하지 않은 OTP에요.
      </div>
      <div className="inline-flex items-center justify-center flex-1 w-full">
        <div className="grid w-full h-full grid-cols-3 grid-rows-4 py-12 font-bold text-black gap-y-10 justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '-'].map(item => {
            if (item === '.') {
              return <span key={item}></span>
            }
            if (item === '-') {
              return (
                <Button
                  key={item}
                  variant="ghost"
                  size="otp"
                  onClick={() => setOTP(OTP.slice(0, -1))}
                >
                  <DeleteIcon className="size-6" />
                </Button>
              )
            }
            return (
              <Button
                key={item}
                variant="ghost"
                size="otp"
                onClick={() => setOTP(OTP + item)}
              >
                {item}
              </Button>
            )
          })}
        </div>
      </div>
    </CommonLayout>
  )
}
