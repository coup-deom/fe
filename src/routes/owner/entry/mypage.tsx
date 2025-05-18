import { createFileRoute } from '@tanstack/react-router'

import { useLogoutMutation } from '@/apis/caches/auth/logout.mutation'
import { UseUserMeQuery } from '@/apis/caches/user/me.query'
import { useWithdrawalMutation } from '@/apis/caches/user/withdrawal.mutation'
import { ProviderMap } from '@/apis/types/Provider.types'
import { Button } from '@/components/airbnbs/button'
import { Dialog } from '@/components/base/Dialog'
import { InfoSection } from '@/components/base/InfoSection'
import { CommonLayout } from '@/components/layouts/pages/CommonLayout'
import { useAccessToken, withAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/owner/entry/mypage')({
  component: withAccessToken(MyPage, 'OWNER'),
})

function MyPage() {
  const userMeQuery = UseUserMeQuery()
  const { idToken } = useAccessToken()

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
    <CommonLayout title={<>{idToken.nickname}님 반가워요!</>}>
      <div className="flex flex-col w-full gap-2">
        <InfoSection>
          <InfoSection.Item title="닉네임">{idToken.nickname}</InfoSection.Item>
          <InfoSection.Item title="연결된 소셜 계정">
            {userMeQuery.data?.provider &&
              ProviderMap[userMeQuery.data.provider]}
          </InfoSection.Item>
        </InfoSection>

        <Dialog>
          <Dialog.Trigger asChild>
            <Button
              size="lg"
              variant="secondary"
              className="py-4 mt-12"
              disabled={
                logoutMutation.isPending || withdrawalMutation.isPending
              }
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
              disabled={
                logoutMutation.isPending || withdrawalMutation.isPending
              }
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
    </CommonLayout>
  )
}
