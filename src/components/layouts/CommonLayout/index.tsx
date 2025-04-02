import React, { PropsWithChildren } from 'react'

import { Link } from '@tanstack/react-router'

import { AccountBoxIcon } from '@/components/base/svgs/AccountBoxIcon'
import { CompareArrowIcon } from '@/components/base/svgs/CompareArrowIcon'
import { HomeIcon } from '@/components/base/svgs/HomeIcon'

interface Props {
  title: React.ReactNode
}
export const CommonLayout: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return (
    <Root>
      <Header title={title} />
      <Body>{children}</Body>
      <BottomNavigationBar />
    </Root>
  )
}

interface HeaderProps {
  title: React.ReactNode
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="fixed top-0 flex flex-row items-center justify-between w-full h-16 px-4 py-5 bg-white shadow-md">
      <span className="text-lg font-bold">{title}</span>
    </div>
  )
}

const Body: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="box-border flex flex-col flex-1 px-4 overflow-x-hidden overflow-y-auto py-18 bg-gray-50">
      {children}
    </div>
  )
}
const BottomNavigationBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex flex-row items-center justify-around w-full h-16 px-4 bg-white inset-shadow-xs">
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
