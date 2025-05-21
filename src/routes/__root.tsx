import { useEffect, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet, useLocation, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Dialog } from '@/components/base/Dialog'
import { Button } from '@/components/airbnbs/button'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: import.meta.env.DEV
    ? () => {
        const router = useRouter()
        
        const { search }: any = useLocation()
        const [toggle, setToggle] = useState(search.devtool ? true : false)
        const [dialog, setDialog] = useState<{ message: string, callback: () => void} | null>(null)

        useEffect(() => {
          const navigate = router.navigate
          router.navigate = toggle ? (...params) => {
            if (dialog !== null) {
              return
            }
            setDialog({
              message: `move to ${params[0].to}`,
              callback: () => {
                console.log(params);
                navigate(...params)
                setDialog(null)
              }
            })
          } : router.navigate
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
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
            <Dialog open={dialog !== null}>
              {dialog && (
                <>
                  <Dialog.Content>
                    <Dialog.Title>
                      {dialog?.message}
                    </Dialog.Title>
                    <Dialog.Footer>
                      <Button onClick={dialog?.callback}>
                        확인
                      </Button>
                      <Button variant='outline' onClick={() => setDialog(null)}>
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
    : () => (
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      ),
})
