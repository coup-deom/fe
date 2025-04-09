import React, { PropsWithChildren } from 'react'

import { Link } from '@tanstack/react-router'

import { AccountBoxIcon } from '@/components/base/svgs/AccountBoxIcon'
import { CompareArrowIcon } from '@/components/base/svgs/CompareArrowIcon'
import { HomeIcon } from '@/components/base/svgs/HomeIcon'
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
      <Body seamless={seamless}>{children}</Body>
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
        'fixed top-0 flex flex-row items-center justify-between w-full h-16 px-4 py-5 bg-white',
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
  return (
    <div
      className={cn(
        'fixed bottom-0 flex flex-row items-center justify-around w-full h-16 px-4 bg-white',
        seamless ? undefined : 'inset-shadow-xs',
      )}
    >
      <Link to="/signin">
        <CompareArrowIcon />
      </Link>
      <Link to="/">
        <HomeIcon />
      </Link>
      <Link to="/signin">
        <AccountBoxIcon />
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
