import { useCallback, useEffect, useState } from 'react'

import {
  useDeomPoliciesMutation,
  UseDeomPoliciesMutationResponse,
} from '@/apis/caches/deom-policies/[store-id].mutation'
import {
  useDeomPoliciesQuery,
  UseDeomPoliciesQueryResponse,
} from '@/apis/caches/deom-policies/[store-id].query'
import { UseUserMeQuery } from '@/apis/caches/user/me.query'
import {
  useStampPoliciesMutation,
  UseStampPoliciesMutationResponse,
} from '@/apis/stamp-policies/[store-id].mutation'
import {
  useStampPoliciesQuery,
  UseStampPoliciesQueryResponse,
} from '@/apis/stamp-policies/[store-id].query'
import { ProviderMap } from '@/apis/types/Provider.types'
import { Button } from '@/components/airbnbs/button'
import { Input } from '@/components/airbnbs/input'
import { Stepper } from '@/components/airbnbs/stepper'
import { Dialog } from '@/components/base/Dialog'
import { InfoSection } from '@/components/base/InfoSection'
import { DeleteForeverIcon } from '@/components/base/svgs/DeleteForeverIcon'
import { PlusIcon } from '@/components/base/svgs/PlusIcon'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import {
  useAccessToken,
  withAccessToken,
  withStoreApproval,
} from '@/contexts/AccessToken.context'
import { createFileRoute, deepEqual } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/mypage')({
  component: withAccessToken(withStoreApproval(MyPage), 'OWNER'),
})

function MyPage() {
  const { idToken } = useAccessToken()
  const userMeQuery = UseUserMeQuery()

  const onSignout = () => {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')

    queueMicrotask(() => window.history.replaceState({}, '', '/'))
  }
  const onWithdrawal = () => {}

  return (
    <CommonLayout title={<>{idToken.nickname}님 반가워요!</>}>
      <div className="flex flex-col w-full gap-2">
        <InfoSection>
          <InfoSection.Item title="닉네임">{idToken.nickname}</InfoSection.Item>
          <InfoSection.Item title="연결된 소셜 계정">
            {userMeQuery.data?.provider &&
              ProviderMap[userMeQuery.data.provider]}
          </InfoSection.Item>
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
  type FormData = Omit<UseDeomPoliciesMutationResponse, 'id'> & {
    id?: UseDeomPoliciesMutationResponse['id']
  }

  const { idToken } = useAccessToken()
  const deomPoliciesQuery = useDeomPoliciesQuery({ storeId: idToken.storeId })
  const deomPoliciesMutation = useDeomPoliciesMutation({
    storeId: idToken.storeId,
  })

  const [mode, setMode] = useState<'edit' | 'view'>('view')
  const [formData, setFormData] = useState<FormData[]>([])

  const init = useCallback(
    (d: UseDeomPoliciesQueryResponse[]) => {
      setFormData(
        d.map(r => ({
          name: r.name,
          requiredStampAmount: r.requiredStampAmount,
          id: r.id,
        })),
      )
    },
    [setFormData],
  )

  const submit = async (policies: FormData[], callback: () => void) => {
    deomPoliciesMutation.mutate(
      { policies },
      {
        onSuccess: () => callback(),
      },
    )
  }

  const onModeChange = (m?: 'edit' | 'view') => {
    if (deomPoliciesQuery.isPending || deomPoliciesMutation.isPending) {
      return
    }
    const data = deomPoliciesQuery.data
    if (m === undefined || data === undefined) {
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

    void submit(formData, () => setMode('view'))
  }

  const onFormDataChange = (index: number) => (r?: FormData) => {
    setFormData(
      [...formData.slice(0, index), r, ...formData.slice(index + 1)].filter(
        (v): v is FormData => v !== undefined,
      ),
    )
  }

  useEffect(() => {
    if (deomPoliciesQuery.data === undefined) {
      return
    }

    init(deomPoliciesQuery.data)
  }, [deomPoliciesQuery.data, init])

  return (
    <InfoSection.Item
      title="우리 가게 덤"
      mode={mode}
      onModeChange={onModeChange}
    >
      {mode === 'view' ? (
        deomPoliciesQuery.data?.map((r, i) => (
          <div
            key={`${i.toString().padStart(4, '0')}_${r.requiredStampAmount}`}
            className="flex flex-row justify-between font-medium align-center text-medium"
          >
            <div>스탬프 {r.requiredStampAmount}개</div>
            <div>{r.name}</div>
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
                      value={r.requiredStampAmount}
                      onChange={requiredStampAmount =>
                        onFormDataChange(i)({ ...r, requiredStampAmount })
                      }
                      formatter={v => v}
                    />
                  </div>
                </div>
                <Input
                  placeholder="덤 이름을 입력해주세요."
                  value={r.name}
                  onChange={({ currentTarget: { value: name } }) =>
                    onFormDataChange(i)({ ...r, name })
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
                  requiredStampAmount: 0,
                  name: '',
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
  type FormData = Omit<UseStampPoliciesMutationResponse, 'id'> & {
    id?: UseStampPoliciesMutationResponse['id']
  }
  const { idToken } = useAccessToken()
  const stampPoliciesQuery = useStampPoliciesQuery({ storeId: idToken.storeId })
  const stampPoliciesMutation = useStampPoliciesMutation({
    storeId: idToken.storeId,
  })

  const [mode, setMode] = useState<'edit' | 'view'>('view')
  const [formData, setFormData] = useState<FormData[]>([])

  const init = (d: UseStampPoliciesQueryResponse[]) => {
    setFormData(
      d.map(r => ({
        baseAmount: r.baseAmount,
        stampCount: r.stampCount,
        id: r.id,
      })),
    )
  }
  const submit = async (policies: FormData[], callback: () => void) => {
    stampPoliciesMutation.mutate(
      { policies },
      {
        onSuccess: () => callback(),
      },
    )
  }
  const onModeChange = (m?: 'edit' | 'view') => {
    const data = stampPoliciesQuery.data
    if (m === undefined || data === undefined) {
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

    void submit(formData, () => setMode('view'))
  }

  const onFormDataChange = (index: number) => (r?: FormData) => {
    setFormData(
      [...formData.slice(0, index), r, ...formData.slice(index + 1)].filter(
        (v): v is FormData => v !== undefined,
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
        stampPoliciesQuery.data?.map(r => (
          <div
            key={r.baseAmount}
            className="flex flex-row justify-between font-medium align-center text-medium"
          >
            <div>{r.baseAmount.toLocaleString()} 원 이상</div>
            <div>스탬프 {r.stampCount}개</div>
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
                      value={r.stampCount}
                      onChange={stampCount =>
                        onFormDataChange(i)({ ...r, stampCount })
                      }
                      formatter={v => v}
                    />
                  </div>
                </div>
                <Input
                  placeholder="기준 금액을 입력해주세요."
                  value={r.baseAmount.toLocaleString()}
                  onChange={({ currentTarget: { value } }) => {
                    const baseAmount = Number(value.replaceAll(',', ''))
                    if (!Number.isSafeInteger(baseAmount)) {
                      return
                    }
                    onFormDataChange(i)({ ...r, baseAmount })
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
                  baseAmount: 0,
                  stampCount: 0,
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
