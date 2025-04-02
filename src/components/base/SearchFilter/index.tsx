import React, { useEffect, useState } from 'react'

import { SearchIcon } from '../svgs/SearchIcon'

import { Input } from '@/components/airbnbs/input'
import { cn } from '@/lib/utils'

interface Props {
  value: string
  onChange: (value: string) => void
}
const SearchFilterRoot: React.FC<React.PropsWithChildren<Props>> = ({
  value,
  onChange: _onChange,
}) => {
  useEffect(() => {
    setBuf(value)
  }, [value])

  const [buf, setBuf] = useState(value)
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      _onChange?.(buf)
      return
    }
  }

  return (
    <div className="flex flex-row w-full items-center justify-start px-4 py-2.5 bg-white">
      <Input
        placeholder="가게 검색"
        value={buf}
        onKeyDown={onKeyDown}
        onChange={e => setBuf(e.target.value)}
        right={
          <SearchIcon className="fill-black" onClick={() => _onChange(buf)} />
        }
      />
    </div>
  )
}

const SearchFilterWithWrapper: React.FC<
  React.PropsWithChildren<Props & { className?: string }>
> = ({ className, children, ...props }) => {
  return (
    <div className={cn('pt-15', className)}>
      <div className="fixed left-0 right-0 top-31">
        <SearchFilterRoot {...props} />
      </div>
      {children}
    </div>
  )
}

export const SearchFilter = Object.assign(SearchFilterRoot, {
  WithWrapper: SearchFilterWithWrapper,
})
