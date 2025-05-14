import { Suspense, use, useState } from 'react'

import { createFileRoute, useParams } from '@tanstack/react-router'

import { Button } from '@/components/airbnbs/button'
import { Stepper } from '@/components/airbnbs/stepper'
import { InfoSection } from '@/components/base/InfoSection'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/owner/request/$requestID')({
  component: withAccessToken(Request, 'OWNER'),
})

async function fetchData(requestID: string) {
  console.log('requestID', requestID)
  return Math.random() > 0.5 ? '적립' : '소진'
}
function Request() {
  const requestID = useParams({
    from: '/owner/request/$requestID',
    select: params => params.requestID,
  })

  const promise = fetchData(requestID)
  return (
    <CommonLayout title="요청 확인" seamless>
      <Suspense>
        <Content promise={promise} />
      </Suspense>
    </CommonLayout>
  )
}
const Content: React.FC<{ promise: Promise<'적립' | '소진'> }> = ({
  promise,
}) => {
  const data = use(promise)
  return (
    <>
      {data === '적립' && <StampingRequest />}
      {data === '소진' && <ExchangeRequest />}
    </>
  )
}

const StampingRequest = () => {
  interface GuideRecord {
    threshold: number
    count: number
  }
  const data = { count: 20 }

  const list: GuideRecord[] = [
    { threshold: 5000, count: 1 },
    { threshold: 10000, count: 2 },
    { threshold: 15000, count: 3 },
    { threshold: 20000, count: 5 },
    { threshold: 25000, count: 8 },
    { threshold: 30000, count: 10 },
  ]

  const [count, setCount] = useState(0)

  const matchedIndex = list.findIndex(r => r.count > count) - 1

  const onDeny = () => {
    console.log('거절')
  }
  const onConfirm = () => {
    console.log('수락')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <div className="pb-8 text-3xl font-bold">
        <span className="text-[#22CC88]">적립</span> 요청이에요!
      </div>

      <div className="flex flex-row justify-center text-xl font-bold">
        지금까지 {data.count} 개를 적립하신 고객입니다
      </div>
      <div className="flex flex-row items-center justify-center gap-4 text-xl">
        <span className="font-bold">스탬프 개수</span>
        <div>
          <Stepper value={count} onChange={setCount} formatter={v => v} />
        </div>
      </div>
      <InfoSection>
        <InfoSection.Item title="우리 가게 스탬프 적립 가이드">
          {list.map((r, i) => (
            <div
              key={r.threshold}
              className={cn(
                'flex flex-row justify-between font-medium align-center text-medium',
                matchedIndex === i ||
                  (matchedIndex === -2 && i === list.length - 1)
                  ? 'text-[#22CC88]'
                  : '',
              )}
            >
              <div>{r.threshold.toLocaleString()} 원 이상</div>
              <div>스탬프 {r.count}개</div>
            </div>
          ))}
        </InfoSection.Item>
      </InfoSection>

      <div className="flex flex-row items-center justify-between w-full pt-12">
        <Button variant="destructive" size="xl" onClick={onDeny}>
          거절
        </Button>
        <Button variant="primary" size="xl" onClick={onConfirm}>
          수락
        </Button>
      </div>
    </div>
  )
}

const ExchangeRequest = () => {
  interface DeomRecord {
    threshold: number
    deom: string
  }
  const data = { count: 20, deom: '아메리카노 한 잔' }

  const list: DeomRecord[] = [
    { threshold: 1, deom: '머랭 쿠키 한 알' },
    { threshold: 10, deom: '아메리카노 한 잔' },
    { threshold: 15, deom: '콜드 브루 한 잔' },
  ]

  const matchedIndex = list.findIndex(r => r.deom === data.deom)

  const onDeny = () => {
    console.log('거절')
  }
  const onConfirm = () => {
    console.log('수락')
  }
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8">
      <div className="pb-8 text-3xl font-bold">
        <span className="text-[#DD3F57]">소진</span> 요청이에요!
      </div>

      <div className="flex flex-row justify-center text-xl font-bold">
        지금까지 {data.count} 개를 적립하신 고객입니다
      </div>
      <div className="flex flex-row items-center justify-center gap-4 text-xl">
        <span className="font-bold text-[#DD3F57]">{data.deom}</span>
      </div>
      <InfoSection>
        <InfoSection.Item title="우리 가게 덤 목록">
          {list.map((r, i) => (
            <div
              key={r.threshold}
              className={cn(
                'flex flex-row justify-between font-medium align-center text-medium',
                matchedIndex === i ||
                  (matchedIndex === -2 && i === list.length - 1)
                  ? 'text-[#DD3F57]'
                  : '',
              )}
            >
              <div>스탬프 {r.threshold}개</div>
              <div>{r.deom}</div>
            </div>
          ))}
        </InfoSection.Item>
      </InfoSection>

      <div className="flex flex-row items-center justify-between w-full pt-12">
        <Button variant="destructive" size="xl" onClick={onDeny}>
          거절
        </Button>
        <Button variant="primary" size="xl" onClick={onConfirm}>
          수락
        </Button>
      </div>
    </div>
  )
}
