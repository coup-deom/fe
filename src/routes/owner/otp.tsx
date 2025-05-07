import { useEffect, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/airbnbs/button'
import { DeleteIcon } from '@/components/base/svgs/DeleteIcon'
import { MinusIcon } from '@/components/base/svgs/MinusIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/owner/otp')({
  component: withAccessToken(OTP),
})

function OTP() {
  const [OTP, setOTP] = useState('')
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState<boolean>()

  useEffect(() => {
    if (OTP.length !== 4) {
      setIsValid(undefined)
      return
    }

    setLoading(true)
    setTimeout(() => {
      setIsValid(Math.random() > 0.5)
      setLoading(false)
    }, 1000)
  }, [OTP])

  return (
    <CommonLayout title="OTP" seamless>
      <div className="flex items-center justify-center w-full py-3 text-2xl font-bold">
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
                className={cn(
                  'w-16 h-16 flex justify-center font-bold items-center ',
                  isValid === false ? 'text-[#D73B53]' : 'text-[#22CC88]',
                )}
              >
                {item}
              </span>
            ),
          )}
      </div>
      <div className="flex items-center justify-center text-xl font-bold h-7">
        {loading && (
          <div className="flex items-center justify-center mr-2 w-7 h-7">
            <svg
              className="w-7 h-7 animate-spin text-secondary-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="30 10"
              ></circle>
            </svg>
          </div>
        )}

        {isValid === false && (
          <span className="text-[#D73B53]">유효하지 않은 OTP에요</span>
        )}
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
                  disabled={loading}
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
                disabled={loading}
                variant="ghost"
                size="otp"
                onClick={() => setOTP((OTP + item).slice(0, 4))}
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
