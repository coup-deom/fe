import { useEffect, useState } from 'react'

import { Button } from '@/components/airbnbs/button'
import { Dialog } from '@/components/base/Dialog'
import {
  createRootRoute,
  Outlet,
  useLocation,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: import.meta.env.DEV
    ? () => {
        const router = useRouter()

        const { search }: any = useLocation()
        const [toggle, setToggle] = useState(search.devtool ? true : false)
        const [dialog, setDialog] = useState<{
          message: string
          callback: () => void
        } | null>(null)

        useEffect(() => {
          const navigate = router.navigate
          router.navigate = toggle
            ? (...params) => {
                if (dialog !== null) {
                  return
                }
                setDialog({
                  message: `move to ${params[0].to}`,
                  callback: () => {
                    console.log(params)
                    navigate(...params)
                    setDialog(null)
                  },
                })
              }
            : router.navigate
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [router.navigate])

        useEffect(() => {
          function fn(e: KeyboardEvent) {
            if (e.key === 'ç' && e.altKey) {
              setToggle(prev => !prev)
            }
          }
          window.addEventListener('keydown', fn)
          return () => window.removeEventListener('keydown', fn)
        }, [setToggle])

        return (
          <>
            <Outlet />
            <Dialog open={dialog !== null}>
              {dialog && (
                <>
                  <Dialog.Content>
                    <Dialog.Title>{dialog?.message}</Dialog.Title>
                    <Dialog.Footer>
                      <Button onClick={dialog?.callback}>확인</Button>
                      <Button variant="outline" onClick={() => setDialog(null)}>
                        취소
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </>
              )}
            </Dialog>
            {toggle && (
              <>
                <TanStackRouterDevtools />
              </>
            )}
          </>
        )
      }
    : () => <Outlet />,
})
