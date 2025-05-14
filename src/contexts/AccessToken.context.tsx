import React, { createContext, useContext } from 'react'

import { useNavigate } from '@tanstack/react-router'

export type Role = 'PENDING' | 'NORMAL' | 'OWNER'
export interface AccessToken {
  sub: string
  iat: number
  exp: number
}
export interface IDToken {
  userId: number
  role: Role
  nickname: string
  iat: number
  exp: number
}
const Context = createContext<{
  rawAccessToken: string
  accessToken: AccessToken
  idToken: IDToken
}>({
  rawAccessToken: '',
  accessToken: {} as AccessToken,
  idToken: {} as IDToken,
})

export const AccessTokenProvider: React.FC<
  React.PropsWithChildren<{ role?: Role }>
> = ({ children, role }) => {
  const rawAccessToken = import.meta.env.VITE_DEV_USER
    ? import.meta.env.VITE_DEV_USER
    : window.localStorage.getItem('raw_access_token')
  const accessToken = import.meta.env.VITE_DEV_USER
    ? import.meta.env.VITE_DEV_USER
    : window.localStorage.getItem('access_token')
  const idToken = window.localStorage.getItem('id_token')
  const version = window.localStorage.getItem('signed_version')
  const navigate = useNavigate()

  if (!rawAccessToken || !accessToken || !idToken) {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')
    navigate({ to: '/signin' })
    return null
  }
  if (
    import.meta.env.VITE_RELEASE_VERSION !== undefined &&
    import.meta.env.VITE_RELEASE_VERSION !== version
  ) {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')
    navigate({ to: '/signin' })
    return null
  }

  try {
    const accessTokenJSON = JSON.parse(accessToken) as AccessToken
    const idTokenJSON = JSON.parse(idToken) as IDToken
    const now = Date.now() / 1000
    if (
      accessTokenJSON === null ||
      idTokenJSON === null ||
      accessTokenJSON.exp <= now ||
      idTokenJSON.exp <= now
    ) {
      window.localStorage.removeItem('raw_access_token')
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('id_token')
      window.localStorage.removeItem('signed_version')
      navigate({ to: '/signin' })
      return null
    }

    if (role !== undefined && role !== idTokenJSON.role) {
      navigate({ to: '/' })
      return null
    }

    if (role !== 'PENDING' && idTokenJSON.role === 'PENDING') {
      navigate({ to: '/signin/choose' })
      return null
    }

    return (
      <Context.Provider
        value={{
          rawAccessToken,
          accessToken: accessTokenJSON,
          idToken: idTokenJSON,
        }}
      >
        {children}
      </Context.Provider>
    )
  } catch {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')
    navigate({ to: '/signin' })
    return null
  }
}
export const useAccessToken = () => useContext(Context)

export function withAccessToken(Component: React.FC, role?: Role): React.FC {
  return () => (
    <AccessTokenProvider role={role}>
      <Component />
    </AccessTokenProvider>
  )
}

export function withoutAccessToken(): void {
  const accessToken = import.meta.env.VITE_DEV_USER
    ? import.meta.env.VITE_DEV_USER
    : window.localStorage.getItem('access_token')
  const idToken = window.localStorage.getItem('id_token')
  const version = window.localStorage.getItem('signed_version')

  if (
    idToken &&
    accessToken &&
    import.meta.env.VITE_RELEASE_VERSION !== undefined &&
    import.meta.env.VITE_RELEASE_VERSION === version
  ) {
    try {
      if (JSON.parse(accessToken).exp > Date.now() / 1000) {
        window.location.href = import.meta.env.VITE_HOST
        return
      }
    } catch {}
  }

  if (accessToken || idToken) {
    window.localStorage.removeItem('raw_access_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('signed_version')
  }
}

export function useIsOwner(): boolean {
  const { idToken } = useAccessToken()

  return idToken.role === 'OWNER'
}
