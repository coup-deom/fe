import React, { PropsWithChildren } from 'react'

import { AccountBoxIcon } from '@/components/base/svgs/AccountBoxIcon'
import { CompareArrowIcon } from '@/components/base/svgs/CompareArrowIcon'
import { HomeIcon } from '@/components/base/svgs/HomeIcon'

export const CommonLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Root>
      <Header />
      <SubHeader />
      <Body>{children}</Body>
      <BottomNavigationBar />
    </Root>
  )
}

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 flex flex-row items-center justify-between w-full h-16 px-4 py-5 bg-white ">
      <span className="text-lg font-bold">기본 프레임</span>
    </div>
  )
}

const SubHeader: React.FC = () => {
  return (
    <div className="fixed w-full overflow-y-hidden shadow-md top-16 h-15">
      <div className="flex flex-row items-center justify-start gap-3 px-4 pb-4 overflow-x-auto overflow-y-hidden bg-white h-19 flex-nowrap">
        <span className="flex flex-row items-center justify-center px-6 py-2 rounded-full whitespace-nowrap border-1">
          스탬프 보유한 가게만
        </span>
        <span className="flex flex-row items-center justify-center px-6 py-2 rounded-full whitespace-nowrap border-1">
          지금 받을 수 있는 가게만
        </span>
        <span className="flex flex-row items-center justify-center px-6 py-2 rounded-full whitespace-nowrap border-1">
          etc
        </span>
      </div>
    </div>
  )
}

const Body: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center justify-center flex-1 overflow-x-hidden overflow-y-auto">
      {children}
    </div>
  )
}
const BottomNavigationBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex flex-row items-center justify-around w-full h-16 px-4 bg-white inset-shadow-xs">
      <CompareArrowIcon />
      <HomeIcon />
      <AccountBoxIcon />
    </div>
  )
}

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-dvw h-dvh pt-safe pb-safe px-safe">
      {children}
    </div>
  )
}
