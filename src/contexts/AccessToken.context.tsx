import React, { createContext, useContext } from 'react'

import { useNavigate } from '@tanstack/react-router'

const Context = createContext<string | null>(null)

export const AccessTokenProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const accessToken = import.meta.env.DEV ? 'dev-user' : window.localStorage.getItem('access_token')
  const navigate = useNavigate()
  if (!accessToken) {
    navigate({ to: '/signin' })
    return null
  }

  return <Context.Provider value={accessToken}>{children}</Context.Provider>
}
export const useAccessToken = () => useContext(Context)

export function withAccessToken(Component: React.FC): React.FC {
  return () => (
    <AccessTokenProvider>
      <Component />
    </AccessTokenProvider>
  )
}
