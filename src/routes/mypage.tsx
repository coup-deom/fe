import React, { useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/airbnbs/button'
import { Dialog } from '@/components/base/Dialog'
import { Filters } from '@/components/base/Filters'
import { HistoryCard } from '@/components/base/HistoryCard'
import { InfoSection } from '@/components/base/InfoSection'
import { SearchFilter } from '@/components/base/SearchFilter'
import { Tabs } from '@/components/base/Tabs'
import { VerticalCardList } from '@/components/layouts/lists/VerticalCardList'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/mypage')({
  component: withAccessToken(MyPage, 'CUSTOMER'),
})

function MyPage() {
  const [tab, setTab] = useState('requests')
  return (
    <CommonLayout title={<>강철용사님 반가워요!</>}>
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
  const [filters, setFilters] = useState(new Set<string>())
  const [shop, setShop] = useState('')
  return (
    <Filters.WithWrapper
      className="top-25"
      value={filters}
      onChange={setFilters}
      options={[
        { label: '진행 중인 가게만', value: '진행 중인 가게만' },
        {
          label: '완료된 가게만',
          value: '완료된 가게만',
        },
      ]}
    >
      <SearchFilter.WithWrapper
        className="top-40"
        value={shop}
        onChange={setShop}
      >
        <VerticalCardList>
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </VerticalCardList>
      </SearchFilter.WithWrapper>
    </Filters.WithWrapper>
  )
}

const Settings: React.FC = () => {
  const onSignout = () => {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')

    queueMicrotask(() => window.history.replaceState({}, '', '/'))
  }

  const onWithdrawal = () => {}

  return (
    <div className="flex flex-col w-full gap-2">
      <InfoSection>
        <InfoSection.Item title="닉네임">강철용사</InfoSection.Item>
        <InfoSection.Item title="연결된 소셜 계정">구글</InfoSection.Item>
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
  )
}
