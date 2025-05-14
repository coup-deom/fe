import { useState } from 'react'

import { createFileRoute, deepEqual } from '@tanstack/react-router'

import { Button } from '@/components/airbnbs/button'
import { Input } from '@/components/airbnbs/input'
import { Stepper } from '@/components/airbnbs/stepper'
import { Dialog } from '@/components/base/Dialog'
import { InfoSection } from '@/components/base/InfoSection'
import { DeleteForeverIcon } from '@/components/base/svgs/DeleteForeverIcon'
import { PlusIcon } from '@/components/base/svgs/PlusIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/owner/mypage')({
  component: withAccessToken(MyPage, 'OWNER'),
})

function MyPage() {
  const nickname = '황금사장'
  const social = '구글'
  const onSignout = () => {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')

    queueMicrotask(() => window.history.replaceState({}, '', '/'))
  }
  const onWithdrawal = () => {}

  return (
    <CommonLayout title={<>{nickname}님 반가워요!</>}>
      <div className="flex flex-col w-full gap-2">
        <InfoSection>
          <InfoSection.Item title="닉네임">{nickname}</InfoSection.Item>
          <InfoSection.Item title="연결된 소셜 계정">{social}</InfoSection.Item>
          <DeomSection />
          <StampGuideSection />
        </InfoSection>

        <Dialog>
          <Dialog.Trigger asChild>
            <Button size="lg" variant="secondary" className="py-4 mt-12">
              로그아웃
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>로그아웃</Dialog.Title>
            <Dialog.Description>정말 계속 진행하시겠습니까?</Dialog.Description>
            <Dialog.Footer className="flex flex-row justify-end">
              <Dialog.Close>
                <Button variant="outline">취소</Button>
              </Dialog.Close>
              <Button onClick={() => onSignout()}>확인</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>

        <Dialog>
          <Dialog.Trigger asChild>
            <Button size="lg" className="py-4">
              탈퇴하기
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>회원 탈퇴</Dialog.Title>
            <Dialog.Description>
              정말 계속 진행하시겠습니까?
              <br />
              탈퇴 계정의 데이터는 복구할 수 없습니다.
            </Dialog.Description>
            <Dialog.Footer className="flex flex-row justify-end">
              <Dialog.Close>
                <Button variant="outline">취소</Button>
              </Dialog.Close>
              <Button onClick={() => onWithdrawal()}>확인</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </CommonLayout>
  )
}

const DeomSection: React.FC = () => {
  interface Record {
    threshold: number
    deom: string
  }
  const data: Record[] = [
    { threshold: 1, deom: '머랭 쿠키 한 알' },
    { threshold: 10, deom: '아메리카노 한 잔' },
    { threshold: 15, deom: '콜드 브루 한 잔' },
  ]

  const [mode, setMode] = useState<'edit' | 'view'>('view')
  const [formData, setFormData] = useState<Record[]>([])

  const init = (d: Record[]) => {
    setFormData(structuredClone(d))
  }
  const submit = (d: Record[], callback: () => void) => {
    console.log(d)
    callback()
  }
  const onModeChange = (m?: 'edit' | 'view') => {
    if (m === undefined) {
      return
    }
    if (m === 'edit') {
      init(data)
      setMode('edit')
      return
    }

    if (deepEqual(formData, data)) {
      setMode('view')
      return
    }

    submit(formData, () => setMode('view'))
  }

  const onFormDataChange = (index: number) => (r?: Record) => {
    setFormData(
      [...formData.slice(0, index), r, ...formData.slice(index + 1)].filter(
        (v): v is Record => v !== undefined,
      ),
    )
  }
  return (
    <InfoSection.Item
      title="우리 가게 덤"
      mode={mode}
      onModeChange={onModeChange}
    >
      {mode === 'view' ? (
        data.map(r => (
          <div
            key={r.threshold}
            className="flex flex-row justify-between font-medium align-center text-medium"
          >
            <div>스탬프 {r.threshold}개</div>
            <div>{r.deom}</div>
          </div>
        ))
      ) : (
        <>
          {formData.map((r, i) => (
            <div
              key={i}
              className="flex flex-row justify-between gap-4 font-medium align-center text-medium"
            >
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex flex-row items-center justify-between w-full whitespace-nowrap">
                  <div className="flex">{i + 1}. 스탬프 개수</div>
                  <div>
                    <Stepper
                      value={r.threshold}
                      onChange={threshold =>
                        onFormDataChange(i)({ ...r, threshold })
                      }
                      formatter={v => v}
                    />
                  </div>
                </div>
                <Input
                  placeholder="덤 이름을 입력해주세요."
                  value={r.deom}
                  onChange={({ currentTarget: { value: deom } }) =>
                    onFormDataChange(i)({ ...r, deom })
                  }
                />
              </div>
              <div className="flex items-center justify-center shrink-0">
                <Dialog>
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" size="icon">
                      <DeleteForeverIcon />
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Dialog.Title>덤 삭제</Dialog.Title>
                    <Dialog.Description>
                      정말 계속 진행하시겠습니까?
                      <br />
                      삭제된 덤은 복구할 수 없습니다.
                    </Dialog.Description>
                    <Dialog.Footer className="flex flex-row justify-end">
                      <Dialog.Close>
                        <Button variant="outline">취소</Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button onClick={() => onFormDataChange(i)()}>
                          확인
                        </Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-center mt-12 mb-4">
            <Button
              variant="ghost"
              className="w-full text-lg font-bold"
              onClick={() =>
                onFormDataChange(formData.length)({
                  threshold: 0,
                  deom: '',
                })
              }
            >
              <PlusIcon /> 덤 목록 추가하기
            </Button>
          </div>
        </>
      )}
    </InfoSection.Item>
  )
}

const StampGuideSection: React.FC = () => {
  interface GuideRecord {
    threshold: number
    count: number
  }
  const data: GuideRecord[] = [
    { threshold: 5000, count: 1 },
    { threshold: 10000, count: 2 },
    { threshold: 15000, count: 3 },
    { threshold: 20000, count: 5 },
    { threshold: 25000, count: 8 },
    { threshold: 30000, count: 10 },
  ]

  const [mode, setMode] = useState<'edit' | 'view'>('view')
  const [formData, setFormData] = useState<GuideRecord[]>([])

  const init = (d: GuideRecord[]) => {
    setFormData(structuredClone(d))
  }
  const submit = (d: GuideRecord[], callback: () => void) => {
    console.log(d)
    callback()
  }
  const onModeChange = (m?: 'edit' | 'view') => {
    if (m === undefined) {
      return
    }
    if (m === 'edit') {
      init(data)
      setMode('edit')
      return
    }

    if (deepEqual(formData, data)) {
      setMode('view')
      return
    }

    submit(formData, () => setMode('view'))
  }

  const onFormDataChange = (index: number) => (r?: GuideRecord) => {
    setFormData(
      [...formData.slice(0, index), r, ...formData.slice(index + 1)].filter(
        (v): v is GuideRecord => v !== undefined,
      ),
    )
  }
  return (
    <InfoSection.Item
      title="우리 가게 스탬프 적립 가이드"
      mode={mode}
      onModeChange={onModeChange}
    >
      {mode === 'view' ? (
        data.map(r => (
          <div
            key={r.threshold}
            className="flex flex-row justify-between font-medium align-center text-medium"
          >
            <div>{r.threshold.toLocaleString()} 원 이상</div>
            <div>스탬프 {r.count}개</div>
          </div>
        ))
      ) : (
        <>
          {formData.map((r, i) => (
            <div
              key={i}
              className="flex flex-row justify-between gap-4 font-medium align-center text-medium"
            >
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex flex-row items-center justify-between w-full whitespace-nowrap">
                  <div className="flex">{i + 1}. 스탬프 개수</div>
                  <div>
                    <Stepper
                      value={r.count}
                      onChange={count => onFormDataChange(i)({ ...r, count })}
                      formatter={v => v}
                    />
                  </div>
                </div>
                <Input
                  placeholder="기준 금액을 입력해주세요."
                  value={r.threshold.toLocaleString()}
                  onChange={({ currentTarget: { value } }) => {
                    const threshold = Number(value.replaceAll(',', ''))
                    if (!Number.isSafeInteger(threshold)) {
                      return
                    }
                    onFormDataChange(i)({ ...r, threshold })
                  }}
                />
              </div>
              <div className="flex items-center justify-center shrink-0">
                <Dialog>
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" size="icon">
                      <DeleteForeverIcon />
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Dialog.Title>가이드 삭제</Dialog.Title>
                    <Dialog.Description>
                      정말 계속 진행하시겠습니까?
                      <br />
                      삭제된 가이드는 복구할 수 없습니다.
                    </Dialog.Description>
                    <Dialog.Footer className="flex flex-row justify-end">
                      <Dialog.Close>
                        <Button variant="outline">취소</Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button onClick={() => onFormDataChange(i)()}>
                          확인
                        </Button>
                      </Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-center mt-12 mb-4">
            <Button
              variant="ghost"
              className="w-full text-lg font-bold"
              onClick={() =>
                onFormDataChange(formData.length)({
                  threshold: 0,
                  count: 0,
                })
              }
            >
              <PlusIcon /> 가이드 목록 추가하기
            </Button>
          </div>
        </>
      )}
    </InfoSection.Item>
  )
}
