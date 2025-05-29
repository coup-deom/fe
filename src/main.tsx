import setupLocatorUI from '@locator/runtime'
import { StrictMode } from 'react'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'

import { ToastProvider } from './contexts/Toast.context'
import { routeTree } from './routeTree.gen'

if (process.env.NODE_ENV === 'development') {
  setupLocatorUI()
}

const queryClient = new QueryClient()
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)

  queryClient.getMutationCache().subscribe(e => {
    if (e.type === 'updated' && e.action.type === 'success') {
      const mutationKey = e.mutation?.options.mutationKey
      queryClient.invalidateQueries({
        queryKey: mutationKey,
      })
    }
  })

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
