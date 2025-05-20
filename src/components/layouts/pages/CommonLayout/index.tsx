import React, { PropsWithChildren } from 'react'

import { Link } from '@tanstack/react-router'

import { AccountBoxIcon } from '@/components/base/svgs/AccountBoxIcon'
import { ChartIcon } from '@/components/base/svgs/ChartIcon'
import { CodeIcon } from '@/components/base/svgs/CodeIcon'
import { CompareArrowIcon } from '@/components/base/svgs/CompareArrowIcon'
import { CouponIcon } from '@/components/base/svgs/CouponIcon'
import { HomeIcon } from '@/components/base/svgs/HomeIcon'
import { useAccessToken } from '@/contexts/AccessToken.context'
import { ToastProvider } from '@/contexts/Toast.context'
import { cn } from '@/lib/utils'

interface Props {
  title: React.ReactNode
  seamless?: boolean
}
export const CommonLayout: React.FC<PropsWithChildren<Props>> = ({
  title,
  seamless,
  children,
}) => {
  return (
    <Root>
      <Header title={title} seamless={seamless} />
      <ToastProvider>
        <Body seamless={seamless}>{children}</Body>
      </ToastProvider>
      <BottomNavigationBar seamless={seamless} />
    </Root>
  )
}

interface HeaderProps {
  title: React.ReactNode
  seamless?: boolean
}
const Header: React.FC<HeaderProps> = ({ title, seamless }) => {
  return (
    <div
      className={cn(
        'fixed z-50 top-0 flex flex-row items-center justify-between w-full h-16 px-4 py-5 bg-white',
        seamless ? undefined : 'shadow-md',
      )}
    >
      <span className="text-lg font-bold">{title}</span>
    </div>
  )
}

interface BodyProps {
  seamless?: boolean
}
const Body: React.FC<React.PropsWithChildren<BodyProps>> = ({
  children,
  seamless,
}) => {
  return (
    <div
      className={cn(
        'box-border flex flex-col flex-1 px-4 overflow-x-hidden overflow-y-auto py-18 ',
        seamless ? 'bg-white' : 'bg-gray-50',
      )}
    >
      {children}
    </div>
  )
}
interface BottomNavigationBarProps {
  seamless?: boolean
}
const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  seamless,
}) => {
  const { idToken } = useAccessToken()
  const isOwner = idToken.role === 'OWNER'
  const isStoreApproved = idToken.storeApproved

  if (isOwner) {
    return (
      <div
        className={cn(
          'fixed z-50 bottom-0 flex flex-row items-center justify-around w-full h-16 px-4 bg-white',
          seamless ? undefined : 'inset-shadow-xs',
        )}
      >
        {isStoreApproved ? (
          <>
            <Link to="/owner/analysis">
              <ChartIcon className="text-black" />
            </Link>
            <Link to="/owner/otp">
              <CodeIcon className="text-black" />
            </Link>
            <Link to="/">
              <CouponIcon className="text-black" />
            </Link>
            <Link to="/owner/mypage">
              <AccountBoxIcon className="text-black" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <CouponIcon className="text-black" />
            </Link>
            <Link to="/owner/entry/mypage">
              <AccountBoxIcon className="text-black" />
            </Link>
          </>
        )}
      </div>
    )
  }
  return (
    <div
      className={cn(
        'fixed z-50 bottom-0 flex flex-row items-center justify-around w-full h-16 px-4 bg-white',
        seamless ? undefined : 'inset-shadow-xs',
      )}
    >
      <Link to="/trade">
        <CompareArrowIcon className="text-black" />
      </Link>
      <Link to="/">
        <HomeIcon className="text-black" />
      </Link>
      <Link to="/mypage">
        <AccountBoxIcon className="text-black" />
      </Link>
    </div>
  )
}

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-dvw h-dvh pt-safe pb-safe px-safe bg-gray-50">
      {children}
    </div>
  )
}
