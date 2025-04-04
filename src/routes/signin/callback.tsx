import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signin/callback')({
  beforeLoad: () => null,
  onEnter: () => {
    const url = new URL(window.location.href)
    const accessToken = url.searchParams.get('accessToken')

    if (accessToken === null || Boolean(accessToken) === false) {
      queueMicrotask(() => window.history.replaceState({}, '', '/'))
      return
    }

    window.localStorage.setItem('access_token', accessToken)
    queueMicrotask(() => window.history.replaceState({}, '', '/'))
  },
})
