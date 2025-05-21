import { useEffect, useState } from 'react'

import { useOTPVerifyMutation } from '@/apis/caches/otp/verify.mutation'
import { Button } from '@/components/airbnbs/button'
import { CircleLoaderIcon } from '@/components/base/svgs/CircleLoaderIcon'
import { DeleteIcon } from '@/components/base/svgs/DeleteIcon'
import { MinusIcon } from '@/components/base/svgs/MinusIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import {
  useAccessToken,
  withAccessToken,
  withStoreApproval,
} from '@/contexts/AccessToken.context'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/otp')({
  component: withAccessToken(withStoreApproval(OTP), 'OWNER'),
})

function OTP() {
  const { idToken } = useAccessToken()
  const otpVerifyMutation = useOTPVerifyMutation()
  // const navigate = useNavigate()

  const [OTP, setOTP] = useState('')

  useEffect(() => {
    if (OTP.length !== 4) {
      otpVerifyMutation.reset()
      return
    }

    otpVerifyMutation.mutate(
      { otpCode: Number(OTP), storeId: idToken.storeId },
      {
        onSuccess: () => {
          // TODO: API 분리 후 처리 필요
          // navigate({ to: '/owner/request/$requestID', params: { requestID: data. } })
        },
      },
    )
  }, [OTP, otpVerifyMutation, idToken.storeId])

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
                  otpVerifyMutation.data?.status === false
                    ? 'text-[#D73B53]'
                    : 'text-[#22CC88]',
                )}
              >
                {item}
              </span>
            ),
          )}
      </div>
      <div className="flex items-center justify-center text-xl font-bold h-7">
        {otpVerifyMutation.isPending && (
          <div className="flex items-center justify-center mr-2 w-7 h-7">
            <CircleLoaderIcon />
          </div>
        )}

        {otpVerifyMutation.data?.status === false && (
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
                  disabled={otpVerifyMutation.isPending}
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
                disabled={otpVerifyMutation.isPending}
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
