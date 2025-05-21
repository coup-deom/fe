import { useSetUserRoleMutation } from '@/apis/caches/user/role.mutation'
import { Button } from '@/components/airbnbs/button'
import { Dialog } from '@/components/base/Dialog'
import { FullScreenLayout } from '@/components/layouts/pages/FullScreenLayout'
import {
  Role,
  useAccessToken,
  withAccessToken,
} from '@/contexts/AccessToken.context'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/signin/choose')({
  component: withAccessToken(Choose, 'PENDING'),
})

function Choose() {
  const { update, idToken } = useAccessToken()
  const navigate = useNavigate({
    from: '/signin/choose',
  })

  const mutation = useSetUserRoleMutation()
  const onSubmit = async (role: Extract<Role, 'OWNER' | 'CUSTOMER'>) => {
    mutation.mutateAsync(
      { role },
      {
        onSuccess: () => {
          update('id_token', {
            idToken: {
              ...(idToken as any),
              role,
              storeApproved: role === 'OWNER' ? false : undefined,
            },
          })
          navigate({
            to: '/',
          })
        },
      },
    )
  }

  return (
    <FullScreenLayout>
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-12">
        <div className="flex flex-col items-center justify-center w-full gap-4 mb-8 text-2xl font-bold">
          어떤 계정으로 가입하시겠어요?
        </div>

        <Dialog>
          <Dialog.Trigger asChild>
            <Button
              variant="outline"
              size="xl"
              className="w-full font-bold border-2 border-[#22CC88]"
              style={{ color: 'color-mix(in oklab, #22cc88, #000000 40%)' }}
            >
              <div className="w-24">일반 회원</div>
              <div className="w-40">
                <span className="text-xs">쿠폰을 적립하고 교환해요</span>
              </div>
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>일반 회원 가입</Dialog.Title>
            <Dialog.Description>
              일반 회원으로 가입하시겠습니까?
              <br />
              선택하신 계정 유형은 변경할 수 없습니다.
            </Dialog.Description>
            <Dialog.Footer className="flex flex-row justify-end gap-2">
              <Dialog.Close>
                <Button variant="outline">취소</Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button variant="primary" onClick={() => onSubmit('CUSTOMER')}>
                  확인
                </Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>

        <Dialog>
          <Dialog.Trigger asChild>
            <Button
              variant="outline"
              size="xl"
              className="w-full font-bold border-2 border-[#DD3F57] "
              style={{ color: 'color-mix(in oklab, #DD3F57, #000000 40%)' }}
            >
              <div className="w-24">가게 회원</div>
              <div className="w-40">
                <span className="text-xs">우리 가게만의 쿠폰을 운영해요</span>
              </div>
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>가게 회원 가입</Dialog.Title>
            <Dialog.Description>
              가게 회원으로 가입하시겠습니까?
              <br />
              선택하신 계정 유형은 변경할 수 없습니다.
            </Dialog.Description>
            <Dialog.Footer className="flex flex-row justify-end gap-2">
              <Dialog.Close>
                <Button variant="outline">취소</Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button variant="primary" onClick={() => onSubmit('OWNER')}>
                  확인
                </Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </div>
    </FullScreenLayout>
  )
}
