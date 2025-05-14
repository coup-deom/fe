import { useEffect, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: import.meta.env.DEV
    ? () => {
        const [toggle, setToggle] = useState(false)
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
