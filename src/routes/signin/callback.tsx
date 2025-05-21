import {
  AccessToken,
  IDToken,
  withoutAccessToken,
} from '@/contexts/AccessToken.context'
import { decodeJWT } from '@/lib/\boauth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signin/callback')({
  beforeLoad: withoutAccessToken,
  onEnter: () => {
    const url = new URL(window.location.href)
    const accessToken = url.searchParams.get('accessToken')
    const idToken = url.searchParams.get('idToken')

    if (
      accessToken === null ||
      Boolean(accessToken) === false ||
      idToken === null ||
      Boolean(idToken) === false
    ) {
      queueMicrotask(() => window.history.replaceState({}, '', '/'))
      return
    }
    try {
      const decodedAccessToken = decodeJWT<AccessToken>(accessToken)
      const decodedIdToken = decodeJWT<IDToken>(idToken)
      window.localStorage.setItem('raw_access_token', accessToken)
      window.localStorage.setItem(
        'access_token',
        JSON.stringify(decodedAccessToken),
      )
      window.localStorage.setItem('id_token', JSON.stringify(decodedIdToken))
      window.localStorage.setItem(
        'signed_version',
        import.meta.env.VITE_RELEASE_VERSION,
      )
      queueMicrotask(() => window.history.replaceState({}, '', '/'))
    } catch {
      window.localStorage.removeItem('raw_access_token')
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('id_token')
      window.localStorage.removeItem('signed_version')
      console.error('Error decoding JWT', accessToken, idToken)
    }
  },
})
