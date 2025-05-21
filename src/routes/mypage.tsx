import React, { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { useLogoutMutation } from '@/apis/caches/auth/logout.mutation'
import { useCustomerRequestAllQuery } from '@/apis/caches/customers/request/all.query'
import { UseUserMeQuery } from '@/apis/caches/user/me.query'
import { useWithdrawalMutation } from '@/apis/caches/user/withdrawal.mutation'
import { ProviderMap } from '@/apis/types/Provider.types'
import { Button } from '@/components/airbnbs/button'
import { Dialog } from '@/components/base/Dialog'
import { Filters } from '@/components/base/Filters'
import { HistoryCard } from '@/components/base/HistoryCard'
import { InfoSection } from '@/components/base/InfoSection'
import { SearchFilter } from '@/components/base/SearchFilter'
import { Tabs } from '@/components/base/Tabs'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { useAccessToken, withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/mypage')({
  component: withAccessToken(MyPage, 'CUSTOMER'),
})

function MyPage() {
  const { idToken } = useAccessToken()
  const [tab, setTab] = useState('requests')
  return (
    <CommonLayout title={<>{idToken.nickname}님 반가워요!</>}>
      <Tabs.WithWrapper
        data={[
          { value: 'requests', label: '요청현황' },
          { value: 'setting', label: '기타' },
        ]}
        value={tab}
        onChange={setTab}
      >
        {tab === 'requests' && <Requests />}
        {tab === 'setting' && <Settings />}
      </Tabs.WithWrapper>
    </CommonLayout>
  )
}

const Requests: React.FC = () => {
  const requestQuery = useCustomerRequestAllQuery()
  const [filters, setFilters] = useState(new Set<string>())
  const [store, setStore] = useState('')

  const list = requestQuery.data
    ?.filter(
      request =>
        filters.size === 0 ||
        [...filters.values()].every(f => f === request.status),
    )
    .filter(
      request =>
        store.length === 0 ||
        request.storeName
          .replaceAll(' ', '')
          .includes(store.replaceAll(' ', '')),
    )
  return (
    <Filters.WithWrapper
      className="top-25"
      value={filters}
      onChange={setFilters}
      options={[
        { label: '진행 중인 가게만', value: 'PENDING' },
        { label: '완료된 가게만', value: 'APPROVED' },
      ]}
    >
      <SearchFilter.WithWrapper
        className="top-40"
        value={store}
        onChange={v => setStore(v)}
      >
        <VerticalCardList>
          {(list?.length ?? 0) > 0 ? (
            list?.map(request => (
              <HistoryCard
                key={request.otpId}
                storeName={request.storeName}
                otp={request.otpCode?.toString()}
                createdAt={new Date(request.createdAt)}
                deom={
                  request.deomId &&
                  request.deomName &&
                  request.deomRequiredStampAmount
                    ? {
                        id: request.deomId,
                        name: request.deomName,
                        amount: request.deomRequiredStampAmount,
                      }
                    : undefined
                }
              />
            ))
          ) : (
            <div className="w-full py-4 text-gray-500 font-bold text-lg text-center">
              요청한 내역이 없습니다.
            </div>
          )}
        </VerticalCardList>
      </SearchFilter.WithWrapper>
    </Filters.WithWrapper>
  )
}

const Settings: React.FC = () => {
  const userMeQuery = UseUserMeQuery()

  const logoutMutation = useLogoutMutation()
  const withdrawalMutation = useWithdrawalMutation()

  const onSignout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        window.localStorage.removeItem('raw_access_token')
        window.localStorage.removeItem('access_token')
        window.localStorage.removeItem('id_token')
        window.localStorage.removeItem('signed_version')

        queueMicrotask(() => window.history.replaceState({}, '', '/'))
      },
    })
  }

  const onWithdrawal = () => {
    withdrawalMutation.mutate(undefined, {
      onSettled: () => {
        window.localStorage.removeItem('raw_access_token')
        window.localStorage.removeItem('access_token')
        window.localStorage.removeItem('id_token')
        window.localStorage.removeItem('signed_version')

        queueMicrotask(() => window.history.replaceState({}, '', '/'))
      },
    })
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <InfoSection>
        <InfoSection.Item title="닉네임">
          {userMeQuery.data?.nickname}
        </InfoSection.Item>
        <InfoSection.Item title="연결된 소셜 계정">
          {userMeQuery.data?.provider && ProviderMap[userMeQuery.data.provider]}
        </InfoSection.Item>
      </InfoSection>

      <Dialog>
        <Dialog.Trigger asChild>
          <Button
            size="lg"
            variant="secondary"
            className="py-4 mt-12"
            disabled={logoutMutation.isPending || withdrawalMutation.isPending}
          >
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
          <Button
            size="lg"
            className="py-4"
            disabled={logoutMutation.isPending || withdrawalMutation.isPending}
          >
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
  )
}
