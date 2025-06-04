import { useEffect, useState } from 'react'

import { useAnalysisCustomerQuery } from '@/apis/caches/analysis/customer.query'
import { useDeomPoliciesQuery } from '@/apis/caches/deom-policies/[store-id].query'
import { useDeomRequestApprovalMutation } from '@/apis/caches/deom-requests/approval.mutation'
import { useDeomRequestRejectionMutation } from '@/apis/caches/deom-requests/rejection.mutation'
import {
  useOTPVerifyMutation,
  UseOTPVerifyMutationResponse,
} from '@/apis/caches/otp/verify.mutation'
import { useStampRequestApprovalMutation } from '@/apis/caches/stamp-requests/approval.mutation'
import { useStampRequestRejectionMutation } from '@/apis/caches/stamp-requests/rejection.mutation'
import { useStampPoliciesQuery } from '@/apis/stamp-policies/[store-id].query'
import { Button } from '@/components/airbnbs/button'
import { Stepper } from '@/components/airbnbs/stepper'
import { InfoSection } from '@/components/base/InfoSection'
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

  const [OTP, setOTP] = useState('')
  const [requestData, setRequestData] = useState<UseOTPVerifyMutationResponse>()

  const reset = otpVerifyMutation.reset
  const mutate = otpVerifyMutation.mutate

  useEffect(() => {
    if (OTP.length !== 4) {
      reset()
      return
    }

    mutate(
      { otpCode: Number(OTP), storeId: idToken.storeId },
      {
        onSuccess: data => setRequestData(data),
      },
    )
  }, [OTP, reset, mutate, idToken.storeId])

  if (requestData !== undefined) {
    return (
      <RequestContent
        data={requestData}
        otpCode={OTP}
        onSuccess={() => {
          setOTP('')
          setRequestData(undefined)
          otpVerifyMutation.reset()
        }}
      />
    )
  }

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
                  otpVerifyMutation.isError
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

        {otpVerifyMutation.isError && (
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

const RequestContent: React.FC<{
  data: UseOTPVerifyMutationResponse
  otpCode: string
  onSuccess: () => void
}> = ({ data, otpCode, onSuccess }) => {
  return (
    <CommonLayout title="요청 확인" seamless>
      {data.type === 'STAMP' && (
        <StampingRequest
          data={{ ...data }}
          otpCode={otpCode}
          onSuccess={onSuccess}
        />
      )}
      {data.type === 'DEOM' && data.deomId !== null && (
        <ExchangeRequest
          data={{ ...data, deomId: data.deomId }}
          otpCode={otpCode}
          onSuccess={onSuccess}
        />
      )}
    </CommonLayout>
  )
}

const StampingRequest: React.FC<{
  data: UseOTPVerifyMutationResponse
  otpCode: string
  onSuccess: () => void
}> = ({ data, otpCode, onSuccess }) => {
  const [count, setCount] = useState<number>(1)
  const stampPoliciesQuery = useStampPoliciesQuery({ storeId: data.storeId })
  const userRankQuery = useAnalysisCustomerQuery({ storeId: data.storeId })

  const matchedIndex =
    (stampPoliciesQuery.data?.findIndex(d => d.id === data.deomId) ?? -1) - 1

  const approvalMutation = useStampRequestApprovalMutation()
  const rejectionMutation = useStampRequestRejectionMutation()

  const isLoading =
    approvalMutation.isPending ||
    rejectionMutation.isPending ||
    stampPoliciesQuery.isFetching ||
    userRankQuery.isFetching

  const onDeny = () => {
    if (isLoading) {
      return
    }
    rejectionMutation.mutate(
      {
        userId: data.userId,
        storeId: data.storeId,
        otpCode: Number(otpCode),
        amount: count,
      },
      {
        onSuccess: () => onSuccess(),
      },
    )
  }
  const onConfirm = () => {
    if (isLoading) {
      return
    }
    approvalMutation.mutate(
      {
        userId: data.userId,
        storeId: data.storeId,
        otpCode: Number(otpCode),
        amount: count,
      },
      {
        onSuccess: () => onSuccess(),
      },
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <div className="pb-8 text-3xl font-bold">
        <span className="text-[#22CC88]">적립</span> 요청이에요!
      </div>

      <div className="flex flex-row justify-center text-xl font-bold">
        지금까지{' '}
        {userRankQuery.data?.find(r => r.userId === data.userId)
          ?.accumulatedStampAmount ?? 0}{' '}
        개를 적립하신 고객입니다
      </div>
      <div className="flex flex-row items-center justify-center gap-4 text-xl">
        <span className="font-bold">스탬프 개수</span>
        <div>
          <Stepper
            value={count}
            onChange={setCount}
            formatter={v => v}
            min={1}
          />
        </div>
      </div>
      {stampPoliciesQuery.isFetching ||
      stampPoliciesQuery.data === undefined ? (
        <div className="flex items-center justify-center w-full h-16">
          <CircleLoaderIcon />
        </div>
      ) : (
        <InfoSection>
          <InfoSection.Item title="우리 가게 스탬프 적립 가이드">
            {stampPoliciesQuery.data.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  'flex flex-row justify-between font-medium align-center text-medium',
                  matchedIndex === i ||
                    (matchedIndex === -2 &&
                      i === stampPoliciesQuery.data.length - 1)
                    ? 'text-[#22CC88]'
                    : '',
                )}
              >
                <div>{r.baseAmount.toLocaleString()} 원 이상</div>
                <div>스탬프 {r.stampCount}개</div>
              </div>
            ))}
          </InfoSection.Item>
        </InfoSection>
      )}

      <div className="flex flex-row items-center justify-between w-full pt-12">
        <Button
          variant="destructive"
          size="xl"
          onClick={onDeny}
          disabled={isLoading}
        >
          거절
        </Button>
        <Button
          variant="primary"
          size="xl"
          onClick={onConfirm}
          disabled={isLoading}
        >
          수락
        </Button>
      </div>
    </div>
  )
}

const ExchangeRequest: React.FC<{
  data: Omit<UseOTPVerifyMutationResponse, 'deomId'> & {
    deomId: number
  }
  otpCode: string
  onSuccess: () => void
}> = ({ data, otpCode, onSuccess }) => {
  const deomPoliciesQuery = useDeomPoliciesQuery({ storeId: data.storeId })
  const userRankQuery = useAnalysisCustomerQuery({ storeId: data.storeId })

  const matchedIndex =
    deomPoliciesQuery.data?.findIndex(d => d.id === data.deomId) ?? -1
  const matched =
    matchedIndex >= 0 ? deomPoliciesQuery.data?.at(matchedIndex) : undefined

  const approvalMutation = useDeomRequestApprovalMutation()
  const rejectionMutation = useDeomRequestRejectionMutation()

  const isLoading =
    approvalMutation.isPending ||
    rejectionMutation.isPending ||
    deomPoliciesQuery.isFetching ||
    userRankQuery.isFetching

  const onDeny = () => {
    if (isLoading) {
      return
    }
    rejectionMutation.mutate(
      {
        userId: data.userId,
        storeId: data.storeId,
        otpCode: Number(otpCode),
        deomId: data.deomId,
        usedStampAmount: data.usedStampAmount,
      },
      {
        onSuccess: () => onSuccess(),
      },
    )
  }
  const onConfirm = () => {
    if (isLoading) {
      return
    }
    approvalMutation.mutate(
      {
        userId: data.userId,
        storeId: data.storeId,
        otpCode: Number(otpCode),
        deomId: data.deomId,
        usedStampAmount: data.usedStampAmount,
      },
      {
        onSuccess: () => onSuccess(),
      },
    )
  }
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <div className="pb-8 text-3xl font-bold">
        <span className="text-[#DD3F57]">소진</span> 요청이에요!
      </div>

      <div className="flex flex-row justify-center text-xl font-bold">
        지금까지{' '}
        {userRankQuery.data?.find(r => r.userId === data.userId)
          ?.accumulatedStampAmount ?? 0}{' '}
        개를 적립하신 고객입니다
      </div>
      {deomPoliciesQuery.isFetching || deomPoliciesQuery.data === undefined ? (
        <div className="flex items-center justify-center w-full h-16">
          <CircleLoaderIcon />
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-center gap-4 text-xl">
            <span className="font-bold text-[#DD3F57]">{matched?.name}</span>
          </div>
          <InfoSection>
            <InfoSection.Item title="우리 가게 덤 목록">
              {deomPoliciesQuery.data.map((r, i) => (
                <div
                  key={r.id}
                  className={cn(
                    'flex flex-row justify-between font-medium align-center text-medium',
                    matchedIndex === i ? 'text-[#DD3F57]' : '',
                  )}
                >
                  <div>스탬프 {r.requiredStampAmount}개</div>
                  <div>{r.name}</div>
                </div>
              ))}
            </InfoSection.Item>
          </InfoSection>
        </>
      )}

      <div className="flex flex-row items-center justify-between w-full pt-12">
        <Button
          variant="destructive"
          size="xl"
          onClick={onDeny}
          disabled={isLoading}
        >
          거절
        </Button>
        <Button
          variant="primary"
          size="xl"
          onClick={onConfirm}
          disabled={isLoading}
        >
          수락
        </Button>
      </div>
    </div>
  )
}
