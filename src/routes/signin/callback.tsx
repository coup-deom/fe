import { createFileRoute } from '@tanstack/react-router'

import { withoutAccessToken } from '@/contexts/AccessToken.context'

export const Route = createFileRoute('/signin/callback')({
  beforeLoad: withoutAccessToken,
  onEnter: () => {
    const url = new URL(window.location.href)
    const accessToken = url.searchParams.get('accessToken')

    console.log(window.location.href, structuredClone(url.searchParams))

    if (accessToken === null || Boolean(accessToken) === false) {
      queueMicrotask(() => window.history.replaceState({}, '', '/'))
      return
    }

    window.localStorage.setItem('access_token', accessToken)
    queueMicrotask(() => window.history.replaceState({}, '', '/'))
  },
})
