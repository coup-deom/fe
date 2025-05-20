import React, { createContext, useContext, useState } from 'react'

import { useNavigate } from '@tanstack/react-router'

import { decodeJWT } from '@/routes/signin/callback'

export type Role = 'PENDING' | 'CUSTOMER' | 'OWNER'
export interface AccessToken {
  sub: string
  iat: number
  exp: number
}
export type IDToken = {
  userId: number
  nickname: string
  iat: number
  exp: number
} & (
  | {
      role: 'OWNER'
      storeApproved: boolean
      storeId: number
    }
  | {
      role: 'CUSTOMER' | 'PENDING'
      storeApproved: never
      storeId: never
    }
)

export type UpdateAccessTokenFn = (
  ...props:
    | [
        'reissue',
        {
          accessToken: string
          idToken: string
        },
      ]
    | [
        'id_token',
        {
          idToken: IDToken
        },
      ]
) => void

interface ContextType {
  rawAccessToken: string
  accessToken: AccessToken
  idToken: IDToken
  update: UpdateAccessTokenFn
}
const Context = createContext<ContextType>({
  rawAccessToken: '',
  accessToken: {} as AccessToken,
  idToken: {} as IDToken,
  update: () => {},
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
      <ContextProvider
        value={{
          rawAccessToken,
          accessToken: accessTokenJSON,
          idToken: idTokenJSON,
        }}
      >
        {children}
      </ContextProvider>
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

/** NOTE: 주의! axios 용 */
// eslint-disable-next-line react-refresh/only-export-components
export const UpdateAccessToken: ContextType = {
  rawAccessToken: '',
  accessToken: {} as AccessToken,
  idToken: {} as IDToken,
  update: () => {},
}

const ContextProvider: React.FC<
  React.PropsWithChildren<{ value: Omit<ContextType, 'update'> }>
> = ({ children, value }) => {
  const [state, setState] = useState(value)
  const navigate = useNavigate()

  UpdateAccessToken.rawAccessToken = state.rawAccessToken
  UpdateAccessToken.accessToken = state.accessToken
  UpdateAccessToken.idToken = state.idToken
  const update: UpdateAccessTokenFn = (mode, props) => {
    if (mode === 'reissue') {
      window.localStorage.setItem('raw_access_token', props.accessToken)
      window.localStorage.setItem('access_token', props.accessToken)
      window.localStorage.setItem('id_token', props.idToken)
      window.localStorage.setItem(
        'signed_version',
        import.meta.env.VITE_RELEASE_VERSION,
      )

      try {
        const accessTokenJSON = decodeJWT<AccessToken>(props.accessToken)
        const IDTokenJSON = decodeJWT<IDToken>(props.idToken)

        if (accessTokenJSON === null || IDTokenJSON === null) {
          window.localStorage.removeItem('raw_access_token')
          window.localStorage.removeItem('access_token')
          window.localStorage.removeItem('id_token')
          window.localStorage.removeItem('signed_version')
          navigate({ to: '/signin' })
          return
        }

        setState({
          rawAccessToken: props.accessToken,
          accessToken: accessTokenJSON,
          idToken: IDTokenJSON,
        })
      } catch {
        window.localStorage.removeItem('raw_access_token')
        window.localStorage.removeItem('access_token')
        window.localStorage.removeItem('id_token')
        window.localStorage.removeItem('signed_version')
        navigate({ to: '/signin' })
      }
    }
    if (mode === 'id_token') {
      window.localStorage.setItem('id_token', JSON.stringify(props.idToken))
      setState({
        ...state,
        idToken: props.idToken,
      })
    }
  }
  UpdateAccessToken.update = update

  return (
    <Context.Provider value={{ ...state, update }}>{children}</Context.Provider>
  )
}
export const useAccessToken = () => useContext(Context)

export function withAccessToken(Component: React.FC, role?: Role): React.FC {
  return () => (
    <AccessTokenProvider role={role}>
      <Component />
    </AccessTokenProvider>
  )
}
export function withStoreApproval(Component: React.FC): React.FC {
  return () => {
    const { idToken } = useAccessToken()
    const navigate = useNavigate()

    if (idToken.role === 'OWNER' && idToken.storeApproved !== true) {
      navigate({ to: '/owner/entry' })
      return null
    }

    return <Component />
  }
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
